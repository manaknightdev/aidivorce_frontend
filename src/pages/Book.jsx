import { useMemo, useState, useSyncExternalStore } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Video,
  Clock3,
  DollarSign,
  MessageCircle,
  Info,
  User,
  Heart,
  Scale,
  Lightbulb,
  Lock,
  Hourglass,
  Check,
  ArrowLeft,
  Layers,
} from 'lucide-react'
import DashboardPage from '../components/DashboardPage'
import DashboardPageHeader from '../components/DashboardPageHeader'
import coachImg from '../assets/expert-headshot.png'
import {
  formatDurationLabel,
  getAdminPackages,
  getBookableOfferings,
  getBookingOfferingById,
  subscribeAdminPackages,
} from '../data/adminPackages'

const TIMES = ['10:00 AM', '1:30 PM', '5:00 PM']

const STATUS_OPTIONS = [
  'Separated',
  'Divorced',
  'Considering separation',
  'Married / living together',
]

const DURATION_OPTIONS = [
  'Under 1 year',
  '1–3 years',
  '3–7 years',
  '7–15 years',
  '15+ years',
]

const TOPIC_OPTIONS = [
  'Parenting plan & custody',
  'Financial planning',
  'Property & assets',
  'Communication & conflict',
  'Legal process overview',
  'Emotional support',
]

function buildDates(count = 6) {
  const start = new Date()
  start.setHours(12, 0, 0, 0)
  // Prefer weekdays starting tomorrow
  start.setDate(start.getDate() + 1)
  const days = []
  const cursor = new Date(start)
  while (days.length < count) {
    const day = cursor.getDay()
    if (day !== 0 && day !== 6) {
      days.push(new Date(cursor))
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

function formatShortDay(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

function formatDayNum(date) {
  return String(date.getDate())
}

function formatLongDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatSummaryDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function formatPendingDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function Card({ children, className = '' }) {
  return (
    <div
      className={`w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  )
}

function FieldLabel({ children }) {
  return (
    <label className="mb-1.5 block text-sm font-semibold text-slate-800">
      {children}
    </label>
  )
}

function TextInput(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 ${props.className || ''}`}
    />
  )
}

function SelectInput(props) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 ${props.className || ''}`}
    />
  )
}

function RadioPill({ name, value, checked, onChange, label }) {
  return (
    <label
      className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors ${
        checked
          ? 'border-brand-500 bg-brand-50 text-brand-800'
          : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`grid h-4 w-4 place-items-center rounded-full border ${
          checked ? 'border-brand-500' : 'border-slate-300'
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-brand-500" />}
      </span>
      {label}
    </label>
  )
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon size={16} />
      </span>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
    </div>
  )
}

export default function Book() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const packages = useSyncExternalStore(
    subscribeAdminPackages,
    getAdminPackages,
    getAdminPackages,
  )
  const offerings = useMemo(() => getBookableOfferings(packages), [packages])
  const serviceParam = searchParams.get('service')
  const offering = useMemo(
    () => getBookingOfferingById(serviceParam, packages),
    [serviceParam, packages],
  )
  const durationLabel =
    formatDurationLabel(offering.durationMinutes) || '45 minutes'
  const priceLabel = `$${offering.price} ${offering.currency || 'CAD'}`
  const priceOneTime = `${priceLabel} (one-time)`
  const sessionsNote =
    offering.sessionsIncluded > 1
      ? `${offering.sessionsIncluded} sessions included · ${durationLabel} each`
      : durationLabel

  const dates = useMemo(() => buildDates(6), [])
  const [step, setStep] = useState('schedule') // schedule | intake | pending
  const [selectedDateIdx, setSelectedDateIdx] = useState(1)
  const [selectedTime, setSelectedTime] = useState(TIMES[1])
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    status: '',
    duration: '',
    hasChildren: '',
    childrenAges: '',
    divorceFiled: '',
    legalRep: '',
    goal: '',
    topics: [],
    agreed: false,
  })

  const selectedDate = dates[selectedDateIdx] || dates[0]
  const summaryWhen = `${formatSummaryDate(selectedDate)}, ${selectedTime}`
  const pendingWhen = `${formatPendingDate(selectedDate)} at ${selectedTime}`

  const title =
    step === 'schedule'
      ? 'Book a Session'
      : step === 'intake'
        ? 'Session Intake Form'
        : 'Session Request'

  const subtitle =
    step === 'schedule'
      ? offering.name
      : step === 'intake'
        ? 'Help us prepare for your session'
        : 'Your request is being reviewed'

  function selectOffering(id) {
    const next = new URLSearchParams(searchParams)
    if (!id) {
      next.delete('service')
    } else {
      next.set('service', id)
    }
    setSearchParams(next, { replace: true })
  }

  function updateForm(patch) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  function toggleTopic(topic) {
    setForm((prev) => {
      const exists = prev.topics.includes(topic)
      if (exists) {
        return { ...prev, topics: prev.topics.filter((t) => t !== topic) }
      }
      if (prev.topics.length >= 2) return prev
      return { ...prev, topics: [...prev.topics, topic] }
    })
  }

  function continueToIntake() {
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time.')
      return
    }
    setError('')
    setStep('intake')
  }

  function submitIntake(e) {
    e.preventDefault()
    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.status ||
      !form.hasChildren ||
      !form.divorceFiled ||
      !form.legalRep ||
      !form.goal.trim() ||
      !form.agreed
    ) {
      setError('Please complete all required fields and accept the agreement.')
      return
    }
    setError('')
    setStep('pending')
  }

  function handleBack() {
    if (step === 'intake') {
      setStep('schedule')
      setError('')
      return
    }
    if (step === 'pending') {
      setStep('intake')
      return
    }
    navigate('/dashboard')
  }

  const backButton =
    step !== 'schedule' ? (
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
      >
        <ArrowLeft size={16} />
        <span className="hidden sm:inline">Back</span>
      </button>
    ) : null

  return (
    <DashboardPage>
      {step === 'schedule' && (
        <>
          <DashboardPageHeader
            title={title}
            subtitle={subtitle}
            showBack={false}
          />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8">
          <div className="space-y-5">
            <Card className="overflow-hidden">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <img
                  src={coachImg}
                  alt="Coach Sam"
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-brand-50"
                />
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-slate-900">Coach Sam</h2>
                  <p className="mt-0.5 text-sm font-semibold text-brand-700">
                    Certified Divorce Coach & Family Mediator
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    Get personalized guidance in a private Zoom session to help
                    you navigate your divorce with clarity and confidence.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="mb-4 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Layers size={16} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Choose session package
                  </h3>
                  <p className="text-xs text-slate-500">
                    Duration and price follow the professional service you
                    select — including longer Zoom calls.
                  </p>
                </div>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {offerings.map((opt) => {
                  const active = opt.id === offering.id
                  const mins =
                    formatDurationLabel(opt.durationMinutes) ||
                    `${opt.durationMinutes} minutes`
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectOffering(opt.id)}
                      className={`rounded-2xl border px-3.5 py-3 text-left transition-colors ${
                        active
                          ? 'border-brand-400 bg-brand-50 ring-1 ring-brand-200'
                          : 'border-slate-200 bg-white hover:border-brand-300'
                      }`}
                    >
                      <p className="text-sm font-bold text-slate-900">
                        {opt.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {mins}
                        {opt.sessionsIncluded > 1
                          ? ` · ${opt.sessionsIncluded} sessions`
                          : ''}
                      </p>
                      <p className="mt-1.5 text-sm font-extrabold text-brand-700">
                        ${opt.price} {opt.currency || 'CAD'}
                      </p>
                    </button>
                  )
                })}
              </div>
            </Card>

            <Card>
              <h3 className="text-base font-bold text-slate-900">
                Session Details
              </h3>
              <ul className="mt-4 space-y-3.5">
                {[
                  { icon: Video, label: 'Format', value: 'Zoom video call' },
                  { icon: Clock3, label: 'Duration', value: sessionsNote },
                  {
                    icon: DollarSign,
                    label: 'Price',
                    value: priceOneTime,
                  },
                  {
                    icon: MessageCircle,
                    label: 'Topics',
                    value:
                      'Parenting, money, property, communication, and next steps',
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <item.icon size={16} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-slate-800">
                        {item.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-base font-bold text-slate-900">
                Select Date & Time
              </h3>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {dates.map((date, index) => {
                  const active = index === selectedDateIdx
                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => setSelectedDateIdx(index)}
                      className={`min-w-[4.5rem] shrink-0 rounded-2xl px-3 py-3 text-center transition-all ${
                        active
                          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                          : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-300'
                      }`}
                    >
                      <span className="block text-xs font-semibold opacity-80">
                        {formatShortDay(date)}
                      </span>
                      <span className="mt-1 block text-lg font-bold">
                        {formatDayNum(date)}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-700">
                Available Times – {formatLongDate(selectedDate)}
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                {TIMES.map((time) => {
                  const active = selectedTime === time
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                        active
                          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                          : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-300'
                      }`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6">
            <Card>
              <h3 className="text-base font-bold text-slate-900">
                Payment Summary
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-slate-500">Session Type</dt>
                  <dd className="text-right font-semibold text-slate-800">
                    {offering.name}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-slate-500">Duration</dt>
                  <dd className="text-right font-semibold text-slate-800">
                    {sessionsNote}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-slate-500">Date & Time</dt>
                  <dd className="text-right font-semibold text-slate-800">
                    {summaryWhen}
                  </dd>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-bold text-slate-900">Total</dt>
                    <dd className="text-lg font-bold text-slate-900">
                      {priceLabel}
                    </dd>
                  </div>
                </div>
              </dl>
              <p className="mt-3 text-xs text-slate-400">
                Payment via Apple Pay / Google Pay
              </p>
            </Card>

            <div className="flex gap-2.5 rounded-2xl bg-brand-50 px-4 py-3.5 ring-1 ring-brand-100">
              <Info size={16} className="mt-0.5 shrink-0 text-brand-700" />
              <p className="text-sm leading-relaxed text-slate-600">
                Next step: Complete a brief session intake form. Payment will be
                processed after form submission and approval.
              </p>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="button"
              onClick={continueToIntake}
              className="w-full rounded-2xl bg-brand-500 py-3.5 text-sm font-bold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
            >
              Continue to Session Intake
            </button>
            <Link
              to="/dashboard"
              className="block text-center text-sm font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </Link>
          </aside>
          </div>
        </>
      )}

      {step === 'intake' && (
        <>
          <DashboardPageHeader
            title={title}
            subtitle={subtitle}
            showBack={false}
            right={backButton}
          />
          <form onSubmit={submitIntake} className="w-full space-y-5">
          <Card>
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={coachImg}
                alt="Coach Sam"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-slate-900">Coach Sam</p>
                <p className="text-sm text-slate-500">{pendingWhen}</p>
              </div>
            </div>
          </Card>

          <Card className="border-brand-100 bg-brand-50 shadow-none ring-1 ring-brand-100">
            <p className="text-sm font-bold text-brand-900">
              Help us prepare for your session
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Coach Sam will review this form before your call. It takes about 3
              minutes.
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Step 1 of 1</span>
                <span>0%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white">
                <div className="h-full w-[8%] rounded-full bg-brand-500" />
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle icon={User} title="Personal Information" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Full Name *</FieldLabel>
                <TextInput
                  value={form.fullName}
                  onChange={(e) => updateForm({ fullName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <FieldLabel>Phone Number *</FieldLabel>
                <TextInput
                  value={form.phone}
                  onChange={(e) => updateForm({ phone: e.target.value })}
                  placeholder="555-123-4567"
                />
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle icon={Heart} title="Relationship Status" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Current status *</FieldLabel>
                <SelectInput
                  value={form.status}
                  onChange={(e) => updateForm({ status: e.target.value })}
                >
                  <option value="">Select status</option>
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </SelectInput>
              </div>
              <div>
                <FieldLabel>Length of marriage/relationship</FieldLabel>
                <SelectInput
                  value={form.duration}
                  onChange={(e) => updateForm({ duration: e.target.value })}
                >
                  <option value="">Select duration</option>
                  {DURATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </SelectInput>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle icon={User} title="Children" />
            <FieldLabel>Do you have children together? *</FieldLabel>
            <div className="mt-1 flex flex-wrap gap-2">
              {['Yes', 'No'].map((opt) => (
                <RadioPill
                  key={opt}
                  name="hasChildren"
                  value={opt}
                  label={opt}
                  checked={form.hasChildren === opt}
                  onChange={() => updateForm({ hasChildren: opt })}
                />
              ))}
            </div>
            <div className="mt-4">
              <FieldLabel>Ages of children (if applicable)</FieldLabel>
              <TextInput
                value={form.childrenAges}
                onChange={(e) => updateForm({ childrenAges: e.target.value })}
                placeholder="e.g., 5, 12, 15"
              />
            </div>
          </Card>

          <Card>
            <SectionTitle icon={Scale} title="Legal Status" />
            <FieldLabel>Have divorce papers been filed? *</FieldLabel>
            <div className="mt-1 flex flex-wrap gap-2">
              {['Yes', 'No', 'Not sure'].map((opt) => (
                <RadioPill
                  key={opt}
                  name="divorceFiled"
                  value={opt}
                  label={opt}
                  checked={form.divorceFiled === opt}
                  onChange={() => updateForm({ divorceFiled: opt })}
                />
              ))}
            </div>
            <div className="mt-4">
              <FieldLabel>Do you have legal representation? *</FieldLabel>
              <div className="mt-1 flex flex-wrap gap-2">
                {['Yes', 'No', 'Considering it'].map((opt) => (
                  <RadioPill
                    key={opt}
                    name="legalRep"
                    value={opt}
                    label={opt}
                    checked={form.legalRep === opt}
                    onChange={() => updateForm({ legalRep: opt })}
                  />
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle icon={Lightbulb} title="Session Goal" />
            <FieldLabel>
              What do you want help with in this session? *
            </FieldLabel>
            <textarea
              value={form.goal}
              onChange={(e) => updateForm({ goal: e.target.value })}
              rows={4}
              placeholder="Example: I want help structuring custody and understanding my financial position."
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
            <p className="mt-4 text-sm font-semibold text-slate-800">
              Main areas to discuss (Select up to 2)
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {TOPIC_OPTIONS.map((topic) => {
                const active = form.topics.includes(topic)
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleTopic(topic)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                      active
                        ? 'border-brand-500 bg-brand-50 text-brand-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300'
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 place-items-center rounded border ${
                        active
                          ? 'border-brand-500 bg-brand-500 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {active && <Check size={10} strokeWidth={3} />}
                    </span>
                    {topic}
                  </button>
                )
              })}
            </div>
          </Card>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={(e) => updateForm({ agreed: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 accent-brand-500 text-brand-500 focus:ring-brand-400"
            />
            <span className="text-sm leading-relaxed text-slate-600">
              I agree to share this information for session preparation.
            </span>
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-2xl bg-brand-500 py-3.5 text-sm font-bold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
          >
            Submit for Review
          </button>
          <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
            <Lock size={12} />
            Coach will review before your session · Your information is encrypted
            and secure
          </p>
          </form>
        </>
      )}

      {step === 'pending' && (
        <>
          <DashboardPageHeader
            title={title}
            subtitle={subtitle}
            showBack={false}
            right={backButton}
          />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-8">
            <div className="space-y-5">
              <Card className="overflow-hidden border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-600">
                    <Hourglass size={26} />
                  </span>
                  <div className="min-w-0">
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                      Pending approval
                    </span>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Request Pending Approval
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
                      Your session intake form has been submitted successfully.
                      Coach Sam is reviewing your details and will follow up
                      shortly.
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-base font-bold text-slate-900">
                  What happens next?
                </h3>
                <ol className="mt-4 space-y-4">
                  {[
                    {
                      title: 'Coach reviews your intake',
                      body: 'Sam checks your goals and session notes so the call is prepared for you.',
                    },
                    {
                      title: 'You get approval + payment link',
                      body: `Once approved, you'll receive a secure payment link for the ${priceLabel} session.`,
                    },
                    {
                      title: 'Zoom details arrive',
                      body: `After payment, your Zoom link (${durationLabel}) and calendar confirmation are sent to you.`,
                    },
                  ].map((item, index) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>

              <div className="flex gap-2.5 rounded-2xl bg-sky-50 px-4 py-3.5 ring-1 ring-sky-100">
                <Info size={16} className="mt-0.5 shrink-0 text-sky-600" />
                <p className="text-sm leading-relaxed text-sky-900/80">
                  No payment has been taken yet. You will only be charged after
                  Coach Sam approves your request.
                </p>
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-6">
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={coachImg}
                      alt="Coach Sam"
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-50"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Coach Sam
                      </p>
                      <p className="text-xs text-slate-500">
                        {offering.name}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                    Pending
                  </span>
                </div>

                <dl className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                  {[
                    {
                      icon: Clock3,
                      label: 'Date & Time',
                      value: pendingWhen,
                    },
                    {
                      icon: Video,
                      label: 'Format',
                      value: 'Zoom Video Call',
                    },
                    {
                      icon: Clock3,
                      label: 'Duration',
                      value: sessionsNote,
                    },
                    {
                      icon: DollarSign,
                      label: 'Amount',
                      value: priceLabel,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                        <item.icon size={14} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <dt className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                          {item.label}
                        </dt>
                        <dd className="mt-0.5 font-semibold text-slate-800">
                          {item.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Card>

              <div className="grid gap-3">
                <Link
                  to="/dashboard"
                  className="rounded-2xl bg-brand-500 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-brand-600"
                >
                  Return to Home
                </Link>
                <Link
                  to="/dashboard/history"
                  className="rounded-2xl border border-slate-200 bg-white py-3.5 text-center text-sm font-bold text-slate-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  View Session History
                </Link>
              </div>
            </aside>
          </div>
        </>
      )}
    </DashboardPage>
  )
}
