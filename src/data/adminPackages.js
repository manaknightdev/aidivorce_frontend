export const PACKAGE_FEATURE_OPTIONS = [
  { id: 'dedicated-support', label: 'Dedicated Support' },
  { id: 'ai-organization', label: 'AI Organization' },
  { id: 'personalized-reports', label: 'Personalized Reports' },
  { id: 'service-discounts', label: 'Discounts on Services' },
  { id: 'case-tracking', label: 'Case Tracking' },
  { id: 'report-generation', label: 'Report Generation' },
  { id: 'priority-response', label: 'Priority Response' },
  { id: 'free-access', label: 'Free access for trial days' },
]

export const SERVICE_TYPES = [
  { value: 'Trial', label: 'Trial' },
  { value: 'Text Session', label: 'Text Session' },
  { value: 'Video Call', label: 'Video Call' },
  { value: 'Strategy', label: 'Strategy Package' },
]

export const BILLING_CYCLES = [
  { value: 'Monthly', label: 'Monthly' },
  { value: '3 Months', label: '3 Months' },
  { value: '6 Months', label: '6 Months' },
  { value: '12 Months', label: '12 Months' },
]

export const CANCEL_BEHAVIORS = [
  { value: 'end_of_cycle', label: 'End of billing cycle' },
  { value: 'immediate', label: 'Immediate' },
  { value: 'period_end_access', label: 'Access until period end' },
]

const INITIAL_PACKAGES = [
  {
    id: 'sub-essential',
    kind: 'subscription',
    name: 'Essential Plan',
    tag: 'Popular',
    description:
      'Recurring monthly plan with unlimited coaching access and case tracking.',
    status: 'Active',
    featured: true,
    billingCycle: 'Monthly',
    customBilling: false,
    customBillingName: '',
    customBillingType: 'MONTH',
    basePrice: 19,
    discount: 0,
    finalPrice: 19,
    memberDiscountEnabled: false,
    memberPrice: null,
    memberDiscount: 0,
    trialEnabled: false,
    trialDays: 0,
    autoRenew: true,
    cancelBehavior: 'end_of_cycle',
    sessionsPerMonth: null,
    sessionsUnlimited: true,
    messagesPerSession: 10,
    totalMessagesPerMonth: null,
    messagesUnlimited: true,
    aiAnalysisAllowed: 50,
    wordsLimit: 400,
    sessionLimitLabel: 'Unlimited Access',
    sessionLimitSub: 'Case Building & Tracking',
    featureLines: [
      'Save & organize case info',
      'Generate structured PDF reports',
    ],
    features: [
      'dedicated-support',
      'ai-organization',
      'personalized-reports',
      'case-tracking',
      'report-generation',
    ],
    subscribers: 1,
  },
  {
    id: 'svc-free-trial',
    kind: 'service',
    name: 'Free Trial',
    tag: '',
    description: 'One-time trial message to experience coaching support.',
    status: 'Active',
    featured: false,
    serviceType: 'Trial',
    basePrice: 0,
    discount: 0,
    finalPrice: 0,
    memberDiscountEnabled: false,
    memberPrice: null,
    memberDiscount: 0,
    duration: 'One-time',
    durationMinutes: null,
    sessionsIncluded: 1,
    details: '1 message (400 words), No follow-ups',
    messagesPerSession: 1,
    wordsLimit: 400,
    features: ['free-access'],
    featureLines: ['1 message (400 words)', 'No follow-ups'],
  },
  {
    id: 'svc-clarity',
    kind: 'service',
    name: 'Clarity Session',
    tag: 'Recommended',
    description:
      'Expert text consultation with multiple messages and fast response.',
    status: 'Active',
    featured: true,
    serviceType: 'Text Session',
    basePrice: 158,
    discount: 0,
    finalPrice: 158,
    memberDiscountEnabled: true,
    memberPrice: 142,
    memberDiscount: 10,
    duration: '60 min',
    durationMinutes: 60,
    sessionsIncluded: 1,
    details: '3 total messages (400 words), 48-hour response time',
    messagesPerSession: 3,
    wordsLimit: 400,
    features: [
      'dedicated-support',
      'priority-response',
      'personalized-reports',
    ],
    featureLines: [
      '3 total messages (400 words)',
      '48-hour response time',
    ],
  },
  {
    id: 'svc-zoom',
    kind: 'service',
    name: 'Live Zoom Session',
    tag: '',
    description: 'One-on-one live video consultation with Coach Sam.',
    status: 'Active',
    featured: false,
    serviceType: 'Video Call',
    basePrice: 149,
    discount: 0,
    finalPrice: 149,
    memberDiscountEnabled: true,
    memberPrice: 134,
    memberDiscount: 10,
    duration: '45 min',
    durationMinutes: 45,
    sessionsIncluded: 1,
    details: 'One-on-one video call, English or Arabic',
    messagesPerSession: 0,
    wordsLimit: 0,
    features: ['dedicated-support', 'priority-response'],
    featureLines: ['One-on-one video call', 'English or Arabic'],
  },
  {
    id: 'svc-extended',
    kind: 'service',
    name: 'Extended Deep-Dive Call',
    tag: '',
    description:
      'Long-form professional Zoom session for complex cases needing deeper coaching time.',
    status: 'Active',
    featured: false,
    serviceType: 'Video Call',
    basePrice: 399,
    discount: 0,
    finalPrice: 399,
    memberDiscountEnabled: true,
    memberPrice: 359,
    memberDiscount: 10,
    duration: '200 min',
    durationMinutes: 200,
    sessionsIncluded: 1,
    details: 'One-on-one video call, extended 200-minute session',
    messagesPerSession: 0,
    wordsLimit: 0,
    features: ['dedicated-support', 'priority-response', 'case-tracking'],
    featureLines: ['200-minute Zoom call', 'Complex case deep-dive'],
  },
  {
    id: 'svc-strategy',
    kind: 'service',
    name: '30 Day Strategy Package',
    tag: '',
    description:
      'Four live Zoom sessions plus messaging support over 30 days.',
    status: 'Active',
    featured: false,
    serviceType: 'Strategy',
    basePrice: 599,
    discount: 0,
    finalPrice: 599,
    memberDiscountEnabled: false,
    memberPrice: null,
    memberDiscount: 0,
    duration: '45 min',
    durationMinutes: 45,
    sessionsIncluded: 4,
    details: '4 × 45-min Zoom calls, messaging channel included',
    messagesPerSession: 0,
    wordsLimit: 0,
    features: [
      'dedicated-support',
      'priority-response',
      'case-tracking',
      'personalized-reports',
    ],
    featureLines: ['4 Zoom sessions (45 min each)', 'Direct messaging channel'],
  },
]

function clonePackages() {
  return structuredClone(INITIAL_PACKAGES)
}

let packages = clonePackages()
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn())
}

export function getAdminPackages() {
  return packages
}

export function subscribeAdminPackages(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function resetAdminPackages() {
  packages = clonePackages()
  emit()
}

export function upsertAdminPackage(pkg) {
  const idx = packages.findIndex((p) => p.id === pkg.id)
  if (idx >= 0) {
    packages = packages.map((p, i) => (i === idx ? { ...pkg } : p))
  } else {
    packages = [{ ...pkg }, ...packages]
  }
  emit()
  return pkg
}

export function updateAdminPackage(id, patch) {
  packages = packages.map((p) => (p.id === id ? { ...p, ...patch } : p))
  emit()
}

export function deleteAdminPackage(id) {
  packages = packages.filter((p) => p.id !== id)
  emit()
}

export function getAdminPackageById(id) {
  return packages.find((p) => p.id === id) || null
}

export function getPackageStats(list = packages) {
  const subscriptions = list.filter((p) => p.kind === 'subscription')
  const services = list.filter((p) => p.kind === 'service')
  const active = list.filter((p) => p.status === 'Active')
  const subscriberCount = subscriptions.reduce(
    (sum, p) => sum + (p.subscribers || 0),
    0,
  )
  return [
    { id: 'total', label: 'Total Packages', value: String(list.length), icon: 'box' },
    {
      id: 'active',
      label: 'Active Packages',
      value: String(active.length),
      icon: 'check',
    },
    {
      id: 'subs',
      label: 'Subscriptions',
      value: String(subscriberCount || subscriptions.length),
      icon: 'refresh',
    },
    {
      id: 'services',
      label: 'Services',
      value: String(services.length),
      icon: 'briefcase',
    },
  ]
}

export function emptyPackageForm(kind = 'subscription') {
  const isSub = kind === 'subscription'
  return {
    id: '',
    kind,
    name: '',
    tag: '',
    description: '',
    status: 'Active',
    featured: false,
    billingCycle: 'Monthly',
    customBilling: false,
    customBillingName: '',
    customBillingType: 'MONTH',
    basePrice: isSub ? 19 : 0,
    discount: 0,
    finalPrice: isSub ? 19 : 0,
    memberDiscountEnabled: false,
    memberPrice: null,
    memberDiscount: 0,
    trialEnabled: false,
    trialDays: 7,
    autoRenew: true,
    cancelBehavior: 'end_of_cycle',
    sessionsPerMonth: 4,
    sessionsUnlimited: isSub,
    messagesPerSession: 3,
    totalMessagesPerMonth: 20,
    messagesUnlimited: false,
    aiAnalysisAllowed: 10,
    wordsLimit: 400,
    serviceType: 'Text Session',
    duration: isSub ? '' : '60 min',
    durationMinutes: isSub ? null : 60,
    sessionsIncluded: 1,
    details: '',
    sessionLimitLabel: isSub ? 'Unlimited Access' : '',
    sessionLimitSub: isSub ? 'Case Building & Tracking' : '',
    featureLines: [],
    features: isSub
      ? ['case-tracking', 'report-generation']
      : ['dedicated-support'],
    subscribers: 0,
  }
}

export function formatDurationLabel(minutes) {
  const n = Number(minutes)
  if (!n || Number.isNaN(n)) return null
  return `${n} minute${n === 1 ? '' : 's'}`
}

export function formatDurationShort(minutes) {
  const n = Number(minutes)
  if (!n || Number.isNaN(n)) return null
  return `${n} min`
}

export function isBookableService(pkg) {
  return (
    pkg?.kind === 'service' &&
    pkg.status === 'Active' &&
    (pkg.serviceType === 'Video Call' || pkg.serviceType === 'Strategy')
  )
}

/** Default standalone booking when no professional service is selected. */
export const DEFAULT_BOOKING_OFFERING = {
  id: 'default-live',
  name: '1-on-1 Live Coaching',
  serviceType: 'Video Call',
  durationMinutes: 45,
  price: 149,
  currency: 'CAD',
  sessionsIncluded: 1,
  description: 'Private Zoom session with Coach Sam',
}

export function packageToBookingOffering(pkg) {
  if (!pkg) return null
  const durationMinutes =
    pkg.durationMinutes != null && pkg.durationMinutes !== ''
      ? Number(pkg.durationMinutes)
      : Number(String(pkg.duration || '').replace(/\D/g, '')) || 45
  return {
    id: pkg.id,
    name: pkg.name,
    serviceType: pkg.serviceType,
    durationMinutes,
    price: Number(pkg.finalPrice) || 0,
    currency: 'CAD',
    sessionsIncluded: Number(pkg.sessionsIncluded) || 1,
    description: pkg.description || pkg.details || '',
    memberPrice: pkg.memberPrice,
  }
}

export function getBookableOfferings(list = packages) {
  const fromPackages = list
    .filter(isBookableService)
    .map(packageToBookingOffering)
  return fromPackages.length > 0 ? fromPackages : [DEFAULT_BOOKING_OFFERING]
}

export function getBookingOfferingById(id, list = packages) {
  const offerings = getBookableOfferings(list)
  if (!id) return offerings[0] || DEFAULT_BOOKING_OFFERING
  return offerings.find((o) => o.id === id) || offerings[0] || DEFAULT_BOOKING_OFFERING
}

export function packageFromForm(form, { asDraft = false } = {}) {
  const base = Number(form.basePrice) || 0
  const discount = Math.min(100, Math.max(0, Number(form.discount) || 0))
  const finalPrice = Math.round(base * (1 - discount / 100) * 100) / 100
  let memberPrice = form.memberPrice
  if (form.memberDiscountEnabled) {
    const md = Math.min(100, Math.max(0, Number(form.memberDiscount) || 0))
    memberPrice =
      form.memberPrice != null && form.memberPrice !== ''
        ? Number(form.memberPrice)
        : Math.round(finalPrice * (1 - md / 100) * 100) / 100
  } else {
    memberPrice = null
  }

  const featureLabels = PACKAGE_FEATURE_OPTIONS.filter((f) =>
    form.features.includes(f.id),
  ).map((f) => f.label)

  const featureLines =
    form.featureLines?.filter(Boolean).length > 0
      ? form.featureLines.filter(Boolean)
      : featureLabels.slice(0, 2)

  const status = asDraft ? 'Draft' : form.status || 'Active'

  if (form.kind === 'subscription') {
    return {
      ...form,
      id: form.id || `sub-${Date.now()}`,
      status,
      basePrice: base,
      discount,
      finalPrice,
      memberPrice,
      memberDiscount: Number(form.memberDiscount) || 0,
      trialDays: form.trialEnabled ? Number(form.trialDays) || 0 : 0,
      sessionsPerMonth: form.sessionsUnlimited
        ? null
        : Number(form.sessionsPerMonth) || 0,
      totalMessagesPerMonth: form.messagesUnlimited
        ? null
        : Number(form.totalMessagesPerMonth) || 0,
      messagesPerSession: Number(form.messagesPerSession) || 0,
      aiAnalysisAllowed: Number(form.aiAnalysisAllowed) || 0,
      wordsLimit: Number(form.wordsLimit) || 0,
      sessionLimitLabel: form.sessionsUnlimited
        ? 'Unlimited Access'
        : `${form.sessionsPerMonth || 0} sessions / month`,
      sessionLimitSub: form.sessionLimitSub || 'Case Building & Tracking',
      featureLines,
      subscribers: form.subscribers || 0,
    }
  }

  const durationMinutes =
    form.durationMinutes === '' || form.durationMinutes == null
      ? null
      : Number(form.durationMinutes)
  const sessionsIncluded = Math.max(1, Number(form.sessionsIncluded) || 1)
  const durationDisplay =
    durationMinutes != null && !Number.isNaN(durationMinutes)
      ? formatDurationShort(durationMinutes)
      : form.duration

  return {
    ...form,
    id: form.id || `svc-${Date.now()}`,
    status,
    basePrice: base,
    discount,
    finalPrice,
    memberPrice,
    memberDiscount: Number(form.memberDiscount) || 0,
    durationMinutes:
      durationMinutes != null && !Number.isNaN(durationMinutes)
        ? durationMinutes
        : null,
    duration: durationDisplay || form.duration || '',
    sessionsIncluded,
    messagesPerSession: Number(form.messagesPerSession) || 0,
    wordsLimit: Number(form.wordsLimit) || 0,
    details:
      form.details ||
      [
        sessionsIncluded > 1
          ? `${sessionsIncluded} sessions`
          : null,
        durationDisplay,
        form.messagesPerSession
          ? `${form.messagesPerSession} message${
              Number(form.messagesPerSession) === 1 ? '' : 's'
            }`
          : null,
        form.wordsLimit ? `${form.wordsLimit} words` : null,
      ]
        .filter(Boolean)
        .join(', '),
    featureLines:
      featureLines.length > 0
        ? featureLines
        : form.details
          ? [form.details]
          : [],
  }
}
