package auth

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha1" //nolint:gosec // SHA1 is what RFC 6238/every authenticator app (Google Authenticator, Authy, ...) actually implements — not a choice, TOTP interop requires it.
	"crypto/subtle"
	"encoding/base32"
	"encoding/binary"
	"fmt"
	"net/url"
	"strings"
	"time"
)

// Package-level TOTP (RFC 6238) implementation — deliberately hand-rolled
// against the RFC rather than pulling in a third-party library. The
// algorithm itself is small, stable (unchanged since 2011), and precisely
// specified (unlike something like WebSocket framing, where this project
// does reach for a library — see internal/web/ws_terminal.go); everything
// here is stdlib crypto/hmac + crypto/sha1, consistent with the "why not
// gopsutil" reasoning in docs/03-tech-stack.md: prefer a direct, auditable
// implementation over a dependency when the direct version is genuinely
// simple. Cross-verified against RFC 6238's own test vectors and against
// Python's pyotp (an independent, widely-used reference implementation)
// before this ever touched the login path — see the accompanying test.

const (
	totpDigits = 6
	totpStep   = 30 * time.Second
	// totpSkew allows the code from one step before/after "now" to also
	// validate — clocks drift, and NTP sync on a fresh STB boot can lag a
	// few seconds; without this, a code entered right at a 30s boundary
	// would intermittently and confusingly fail.
	totpSkew = 1
)

// GenerateTOTPSecret returns a fresh random 160-bit secret, base32-encoded
// (no padding) the way every authenticator app expects it typed/scanned.
func GenerateTOTPSecret() (string, error) {
	raw := make([]byte, 20) // 160 bits — matches SHA1's block strength, standard TOTP secret size
	if _, err := rand.Read(raw); err != nil {
		return "", fmt.Errorf("auth: generate totp secret: %w", err)
	}
	return base32.StdEncoding.WithPadding(base32.NoPadding).EncodeToString(raw), nil
}

// totpCodeAt computes the 6-digit TOTP code for secret at unix time t,
// per RFC 6238 (time-step derivation) + RFC 4226 §5.3 (HOTP dynamic
// truncation).
func totpCodeAt(secretBase32 string, t time.Time) (string, error) {
	key, err := base32.StdEncoding.WithPadding(base32.NoPadding).DecodeString(strings.ToUpper(secretBase32))
	if err != nil {
		return "", fmt.Errorf("auth: decode totp secret: %w", err)
	}
	counter := uint64(t.Unix()) / uint64(totpStep.Seconds())

	var counterBytes [8]byte
	binary.BigEndian.PutUint64(counterBytes[:], counter)

	mac := hmac.New(sha1.New, key)
	mac.Write(counterBytes[:])
	sum := mac.Sum(nil)

	offset := sum[len(sum)-1] & 0x0f
	truncated := (uint32(sum[offset])&0x7f)<<24 |
		(uint32(sum[offset+1])&0xff)<<16 |
		(uint32(sum[offset+2])&0xff)<<8 |
		uint32(sum[offset+3])

	mod := uint32(1)
	for i := 0; i < totpDigits; i++ {
		mod *= 10
	}
	return fmt.Sprintf("%0*d", totpDigits, truncated%mod), nil
}

// ValidateTOTP checks code against secret, tolerating clock drift of up
// to totpSkew steps either side of now. Comparison is constant-time so a
// timing side channel can't leak which digit position first mismatched.
func ValidateTOTP(secretBase32, code string, now time.Time) bool {
	code = strings.TrimSpace(code)
	if len(code) != totpDigits {
		return false
	}
	for skew := -totpSkew; skew <= totpSkew; skew++ {
		want, err := totpCodeAt(secretBase32, now.Add(time.Duration(skew)*totpStep))
		if err != nil {
			return false
		}
		if subtle.ConstantTimeCompare([]byte(want), []byte(code)) == 1 {
			return true
		}
	}
	return false
}

// TOTPProvisioningURI builds the otpauth:// URI authenticator apps scan
// (as a QR code, rendered client-side — see web/frontend) or accept as a
// manual-entry link. Issuer+account name show up in the app's UI so the
// entry is identifiable among a user's other accounts.
func TOTPProvisioningURI(secretBase32, accountName, issuer string) string {
	u := url.URL{
		Scheme: "otpauth",
		Host:   "totp",
		Path:   "/" + issuer + ":" + accountName,
	}
	q := url.Values{}
	q.Set("secret", secretBase32)
	q.Set("issuer", issuer)
	q.Set("algorithm", "SHA1")
	q.Set("digits", fmt.Sprintf("%d", totpDigits))
	q.Set("period", fmt.Sprintf("%d", int(totpStep.Seconds())))
	u.RawQuery = q.Encode()
	return u.String()
}
