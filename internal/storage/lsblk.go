package storage

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
)

// blockDev is one node of `lsblk -J`'s tree.
type blockDev struct {
	Name, Path, Type, FSType, Label, UUID, PartUUID string
	Tran, Model, Vendor, PKName, PartTypeName       string
	Size                                            uint64
	RO, RM, Hotplug                                 bool
	Mountpoints                                     []string
	Children                                        []blockDev
}

// lsblkColumns is what TarOS asks lsblk for (never SERIAL: it is not needed and
// would end up in logs and bug reports).
const lsblkColumns = "NAME,PATH,TYPE,FSTYPE,LABEL,UUID,PARTUUID,SIZE,RO,RM,HOTPLUG,TRAN,MODEL,VENDOR,PKNAME,MOUNTPOINTS,PARTTYPENAME"

// flex absorbs the differences between util-linux versions: numbers as numbers
// or strings, booleans as true/false or "0"/"1", a single mountpoint or a list.
type flex struct{ raw json.RawMessage }

func (f *flex) UnmarshalJSON(b []byte) error { f.raw = append([]byte(nil), b...); return nil }

func (f flex) str() string {
	s := strings.TrimSpace(string(f.raw))
	if s == "" || s == "null" {
		return ""
	}
	var v string
	if err := json.Unmarshal(f.raw, &v); err == nil {
		return v
	}
	return s
}

func (f flex) uint() uint64 {
	n, _ := strconv.ParseUint(strings.Trim(f.str(), `"`), 10, 64)
	return n
}

func (f flex) bool() bool {
	switch strings.ToLower(f.str()) {
	case "true", "1":
		return true
	}
	return false
}

func (f flex) list() []string {
	var l []string
	if err := json.Unmarshal(f.raw, &l); err == nil {
		out := l[:0]
		for _, s := range l {
			if s != "" {
				out = append(out, s)
			}
		}
		return out
	}
	if s := f.str(); s != "" {
		return []string{s}
	}
	return nil
}

type rawDev struct {
	Name         flex     `json:"name"`
	Path         flex     `json:"path"`
	Type         flex     `json:"type"`
	FSType       flex     `json:"fstype"`
	Label        flex     `json:"label"`
	UUID         flex     `json:"uuid"`
	PartUUID     flex     `json:"partuuid"`
	Size         flex     `json:"size"`
	RO           flex     `json:"ro"`
	RM           flex     `json:"rm"`
	Hotplug      flex     `json:"hotplug"`
	Tran         flex     `json:"tran"`
	Model        flex     `json:"model"`
	Vendor       flex     `json:"vendor"`
	PKName       flex     `json:"pkname"`
	Mountpoints  flex     `json:"mountpoints"`
	Mountpoint   flex     `json:"mountpoint"`
	PartTypeName flex     `json:"parttypename"`
	Children     []rawDev `json:"children"`
}

func (r rawDev) convert() blockDev {
	d := blockDev{
		Name: r.Name.str(), Path: r.Path.str(), Type: r.Type.str(), FSType: r.FSType.str(), Label: r.Label.str(),
		UUID: r.UUID.str(), PartUUID: r.PartUUID.str(), Tran: strings.ToLower(r.Tran.str()),
		Model: strings.TrimSpace(r.Model.str()), Vendor: strings.TrimSpace(r.Vendor.str()), PKName: r.PKName.str(),
		PartTypeName: r.PartTypeName.str(), Size: r.Size.uint(), RO: r.RO.bool(), RM: r.RM.bool(), Hotplug: r.Hotplug.bool(),
		Mountpoints: r.Mountpoints.list(),
	}
	if len(d.Mountpoints) == 0 {
		d.Mountpoints = r.Mountpoint.list()
	}
	if d.Path == "" && d.Name != "" {
		d.Path = "/dev/" + d.Name
	}
	for _, c := range r.Children {
		d.Children = append(d.Children, c.convert())
	}
	return d
}

// parseLsblk reads `lsblk -J` output.
func parseLsblk(out string) ([]blockDev, error) {
	var doc struct {
		Blockdevices []rawDev `json:"blockdevices"`
	}
	if err := json.Unmarshal([]byte(out), &doc); err != nil {
		return nil, fmt.Errorf("storage: parse lsblk: %w", err)
	}
	devs := make([]blockDev, 0, len(doc.Blockdevices))
	for _, r := range doc.Blockdevices {
		devs = append(devs, r.convert())
	}
	return devs, nil
}

// walk calls fn on d and every descendant.
func (d blockDev) walk(fn func(blockDev)) {
	fn(d)
	for _, c := range d.Children {
		c.walk(fn)
	}
}
