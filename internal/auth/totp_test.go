package auth

import (
	"encoding/base32"
	"testing"
	"time"
)

// RFC 6238 Appendix B test vectors (SHA1 secret "12345678901234567890",
// 8-digit truncation in the RFC for legibility). This implementation always
// truncates to 6 digits (totpDigits), which is exactly the last 6 digits of
// the RFC's 8-digit values — same HOTP computation, only the final modulus
// differs (10^6 vs 10^8) — so the 8-digit RFC codes below are truncated to
// their last 6 digits as the expected values.
func TestTOTPCodeAt_RFC6238Vectors(t *testing.T) {
	secret := base32.StdEncoding.WithPadding(base32.NoPadding).EncodeToString([]byte("12345678901234567890"))

	cases := []struct {
		unixTime  int64
		rfc8digit string
		want6     string
	}{
		{59, "94287082", "287082"},
		{1111111109, "07081804", "081804"},
		{1111111111, "14050471", "050471"},
		{1234567890, "89005924", "005924"},
		{2000000000, "69279037", "279037"},
	}

	for _, c := range cases {
		got, err := totpCodeAt(secret, time.Unix(c.unixTime, 0).UTC())
		if err != nil {
			t.Fatalf("totpCodeAt(%d): %v", c.unixTime, err)
		}
		if got != c.want6 {
			t.Errorf("totpCodeAt(%d) = %q, want %q (RFC 8-digit value: %s)", c.unixTime, got, c.want6, c.rfc8digit)
		}
	}
}

func TestValidateTOTP_CorrectAndWrongCode(t *testing.T) {
	secret, err := GenerateTOTPSecret()
	if err != nil {
		t.Fatalf("GenerateTOTPSecret: %v", err)
	}
	now := time.Unix(1700000000, 0).UTC()

	code, err := totpCodeAt(secret, now)
	if err != nil {
		t.Fatalf("totpCodeAt: %v", err)
	}
	if !ValidateTOTP(secret, code, now) {
		t.Error("correct code should validate")
	}
	if ValidateTOTP(secret, "000000", now) && code != "000000" {
		t.Error("wrong code should not validate")
	}
}

func TestValidateTOTP_ClockSkewTolerance(t *testing.T) {
	secret, _ := GenerateTOTPSecret()
	now := time.Unix(1700000000, 0).UTC()

	oneStepBefore := now.Add(-totpStep)
	code, _ := totpCodeAt(secret, oneStepBefore)
	if !ValidateTOTP(secret, code, now) {
		t.Error("code from one step before now should still validate (skew tolerance)")
	}

	twoStepsBefore := now.Add(-2 * totpStep)
	code2, _ := totpCodeAt(secret, twoStepsBefore)
	if ValidateTOTP(secret, code2, now) {
		t.Error("code from two steps before now should NOT validate (outside skew window)")
	}
}

func TestGenerateTOTPSecret_Unique(t *testing.T) {
	a, err := GenerateTOTPSecret()
	if err != nil {
		t.Fatal(err)
	}
	b, err := GenerateTOTPSecret()
	if err != nil {
		t.Fatal(err)
	}
	if a == b {
		t.Error("two generated secrets should not be equal")
	}
}
