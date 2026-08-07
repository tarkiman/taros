import { createI18n } from 'vue-i18n'
import en, { type MessageSchema } from './en'
import id from './id'

export type { MessageSchema }
export type Locale = 'en' | 'id'

// legacy: false — Composition API mode (useI18n()) only, matching how the
// rest of this codebase is written (<script setup>, no Options API).
// fallbackLocale stays 'en' even when the initial locale is 'id': a key
// added to en.ts but not yet ported to id.ts (shouldn't happen given the
// `satisfies MessageSchema` check in id.ts, but this is a second line of
// defense) renders in English rather than as a raw "ns.key" string.
export const i18n = createI18n<[MessageSchema], Locale, false>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, id },
})
