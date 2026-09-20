// Attribute bundles for Naive UI's <NInput :input-props="…">.
//
// NInput puts autocomplete/name/data-* attributes on its wrapper <div>, NOT on
// the real <input> — so `autocomplete="…"` written directly on <NInput> never
// reaches the browser. Chrome then guesses from the layout: a text field
// sitting above/near a password field looks like a "username" and gets the
// saved login autofilled into it (an app-name confirmation, a "new username",
// a list filter…). input-props is the only route to the actual element.
// Always give each field its own `name` so the browser can't pair them up.

type Props = Record<string, string>

// A text/number field that must never be autofilled from saved logins.
export const noAutofill = (name: string): Props => ({
  autocomplete: 'off',
  name,
  'data-1p-ignore': '',
  'data-lpignore': 'true',
})

// "Type your own dashboard password to confirm" — the current password.
export const currentPassword = (name: string): Props => ({ autocomplete: 'current-password', name })

// A password being chosen (or a secret pasted into a password-type field):
// 'new-password' is what stops Chrome from filling the saved password here.
export const newPassword = (name: string): Props => ({
  autocomplete: 'new-password',
  name,
  'data-1p-ignore': '',
  'data-lpignore': 'true',
})

// TOTP / one-time codes.
export const oneTimeCode = (name: string): Props => ({ autocomplete: 'one-time-code', name })
