package netinfo

import "testing"

func TestClassify(t *testing.T) {
	cases := map[string]Kind{
		"wlan0":           KindWifi,
		"wlp2s0":          KindWifi,
		"eth0":            KindEthernet,
		"enp3s0":          KindEthernet,
		"zt6ntaqnn6":      KindZeroTier,
		"tailscale0":      KindTailscale,
		"docker0":         KindDocker,
		"br-9a1ff8df42b7": KindDocker,
		"veth1234":        KindDocker,
		"utun3":           KindOther,
	}
	for name, want := range cases {
		if got := classify(name); got != want {
			t.Errorf("classify(%q) = %q, want %q", name, got, want)
		}
	}
}
