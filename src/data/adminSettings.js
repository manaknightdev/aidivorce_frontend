const INITIAL_SETTINGS = {
  languages: {
    en: true,
    fr: false,
    ar: false,
    defaultLang: 'en',
  },
  ai: {
    systemMessage:
      'Welcome to your consultation. Please share your question, and I will assist you.',
    temperature: '0.5',
  },
  responseTiming: {
    expectedHours: 6,
  },
  freeSession: {
    messagesPerSession: 1,
  },
  feedbackRewards: {
    freeMessages: 1,
  },
  notifications: {
    newUserRegistration: true,
    sessionRequests: true,
    paymentNotifications: false,
  },
  updatedAt: '2025-01-15T14:30:00',
}

const TEMPERATURE_OPTIONS = [
  {
    value: '0.2',
    label: 'Low (0.2) - Focused, consistent responses',
  },
  {
    value: '0.5',
    label: 'Medium (0.5) - Balanced responses with some variety',
  },
  {
    value: '0.8',
    label: 'High (0.8) - More creative, varied responses',
  },
]

const LANGUAGE_OPTIONS = [
  { id: 'en', label: 'English' },
  { id: 'fr', label: 'French' },
  { id: 'ar', label: 'Arabic' },
]

function cloneSettings() {
  return structuredClone(INITIAL_SETTINGS)
}

let settings = cloneSettings()
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn())
}

export function getAdminSettings() {
  return settings
}

export function subscribeAdminSettings(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function setAdminSettings(next) {
  settings = {
    ...structuredClone(next),
    updatedAt: new Date().toISOString(),
  }
  emit()
  return settings
}

export function resetAdminSettings() {
  settings = cloneSettings()
  emit()
  return settings
}

export { TEMPERATURE_OPTIONS, LANGUAGE_OPTIONS, INITIAL_SETTINGS }
