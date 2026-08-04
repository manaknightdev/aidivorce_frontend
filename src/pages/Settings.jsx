import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  User,
  MapPin,
  Bell,
  Lock,
  CreditCard,
  Receipt,
  LogOut,
  Eye,
  EyeOff,
  Check,
  Mail,
  Plus,
  FileText,
  Info,
  MessageSquare,
  Video,
  Briefcase,
  Headset,
  Gift,
} from 'lucide-react'
import DashboardPage from '../components/DashboardPage'
import { countries, provinces } from '../data/locations'
import avatarImg from '../assets/expert-headshot.png'

const TABS = [
  { id: 'account', label: 'Account' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'payment', label: 'Payment' },
]

const ESSENTIAL_INCLUDED = [
  'Create multiple coaching sessions',
  'Ask multiple questions in each session',
  'Dashboard access to see all your information',
  'Interactive brainstorming Q&A',
  'Generate structured reports (PDF)',
  'Organize and manage your case files',
  'All generated answers added to dashboard (with consent)',
  'Fresh updates across parenting, finance, and legal',
]

const PROFESSIONAL_SERVICES = [
  {
    id: 'case-consult',
    icon: MessageSquare,
    title: 'Case consultation',
    price: '$69',
    features: [
      'One expert consultation via messaging',
      'Submit up to 300 words',
      'Private secure chat room',
      'Expertise in Parenting, Finance, Assets, Legal',
      'Summary of chat added to dashboard (with context)',
    ],
    cta: 'Book Chat Session – $69',
    to: '/dashboard/session',
  },
  {
    id: 'live-consult',
    icon: Video,
    title: 'Live Case Consultation (online)',
    price: '$179',
    features: [
      'One-on-one video call session',
      '30 mins with Coach Sam',
      'Screening assessment required before booking',
    ],
    cta: 'Book Online Session – $179',
    to: '/dashboard/book?service=svc-zoom',
  },
  {
    id: 'strategy',
    icon: Briefcase,
    title: '30 Day Strategy Package',
    price: '$599',
    features: [
      '4 × one-on-one video call sessions (45 min each)',
      'Direct messaging channel',
      'Personalized guidance and support',
      'Screening assessment required before booking',
    ],
    cta: 'Get Strategy Package – $599',
    to: '/dashboard/book?service=svc-strategy',
  },
]

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

function ApplePayIcon() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M16.365 12.83c-.025-2.53 2.065-3.74 2.16-3.8-1.18-1.72-3.01-1.96-3.66-1.98-1.55-.16-3.03.92-3.82.92-.8 0-2.02-.9-3.32-.87-1.71.02-3.29 1-4.17 2.53-1.79 3.1-.46 7.68 1.28 10.19.85 1.23 1.86 2.6 3.18 2.55 1.28-.05 1.76-.82 3.3-.82 1.53 0 1.97.82 3.31.79 1.37-.02 2.24-1.25 3.08-2.49.97-1.41 1.37-2.78 1.39-2.85-.03-.01-2.67-1.03-2.7-4.07zm-2.53-7.48c.7-.85 1.17-2.04 1.04-3.22-1.01.04-2.23.67-2.95 1.52-.65.75-1.21 1.96-1.06 3.11 1.12.09 2.27-.57 2.97-1.41z" />
      </svg>
    </span>
  )
}

function GooglePayIcon() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    </span>
  )
}

function SettingsTabs({ active, onChange }) {
  return (
    <div className="border-b border-slate-200">
      <nav className="-mb-px flex gap-6 sm:gap-8" aria-label="Settings sections">
        {TABS.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative pb-3 text-sm font-semibold transition-colors ${
                isActive
                  ? 'text-brand-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-500" />
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

function ToggleRow({ checked, onChange, label, hint }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-brand-500' : 'bg-slate-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

function AccountTab() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('Alex Morgan')
  const [email, setEmail] = useState('alex.morgan@email.com')
  const [country, setCountry] = useState('CA')
  const [region, setRegion] = useState('Ontario')
  const [pushUpdates, setPushUpdates] = useState(true)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')

  const regionOptions = useMemo(() => provinces[country] || [], [country])

  function flash(msg) {
    setSavedMsg(msg)
    window.setTimeout(() => setSavedMsg(''), 2200)
  }

  function handleCountryChange(next) {
    setCountry(next)
    setRegion((provinces[next] || [])[0] || '')
  }

  function saveProfile(e) {
    e.preventDefault()
    flash('Profile saved')
  }

  function saveLocation(e) {
    e.preventDefault()
    flash('Location saved')
  }

  function savePassword(e) {
    e.preventDefault()
    if (!currentPassword || !newPassword || !confirmPassword) {
      flash('Fill in all password fields')
      return
    }
    if (newPassword.length < 8) {
      flash('Password must be 8+ characters')
      return
    }
    if (newPassword !== confirmPassword) {
      flash('Passwords do not match')
      return
    }
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    flash('Password updated')
  }

  return (
    <div className="space-y-5">
      {savedMsg && (
        <p className="rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
          {savedMsg}
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <User size={18} />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-900">Profile</h2>
            <p className="text-sm text-slate-500">
              Your name and email on this account.
            </p>
          </div>
        </div>

        <form onSubmit={saveProfile} className="mt-5 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={avatarImg}
              alt=""
              className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-100"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">{fullName}</p>
              <p className="text-xs text-slate-500">{email}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Full name
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
          >
            Save Profile
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <MapPin size={18} />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-900">Location</h2>
            <p className="text-sm text-slate-500">
              Used to tailor guidance to your province or state.
            </p>
          </div>
        </div>
        <form onSubmit={saveLocation} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Country
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className={inputClass}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              {country === 'US' ? 'State' : 'Province / Territory'}
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={inputClass}
              >
                {regionOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
          >
            Save Location
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Bell size={18} />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-900">Notifications</h2>
            <p className="text-sm text-slate-500">
              Manage how Sam keeps you informed.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <ToggleRow
            checked={pushUpdates}
            onChange={setPushUpdates}
            label="Receive push updates"
            hint="Get notified about sessions, reports, and important case updates."
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Lock size={18} />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-900">Security</h2>
            <p className="text-sm text-slate-500">
              Update your password to keep your case private.
            </p>
          </div>
        </div>
        <form onSubmit={savePassword} className="mt-5 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            Current password
            <span className="relative mt-1.5 block">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`${inputClass} !mt-0 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
                aria-label="Toggle password visibility"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              New password
              <span className="relative mt-1.5 block">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`${inputClass} !mt-0 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
                  aria-label="Toggle password visibility"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Confirm new password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
          >
            Update Password
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-bold text-slate-900">Sign out</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Sign out of Sam on this device.
        </p>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </section>
    </div>
  )
}

function SubscriptionTab({ onGoToPayment }) {
  const [billing, setBilling] = useState('monthly')

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm font-medium text-slate-700">
          Your free session is complete. Upgrade to continue getting value and
          build your complete case file.
        </p>
        <button
          type="button"
          onClick={() =>
            document
              .getElementById('your-plan')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          className="shrink-0 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
        >
          Upgrade Plan
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div id="your-plan">
          <div className="mb-3 flex items-center gap-2">
            <Gift size={16} className="text-brand-600" />
            <h2 className="text-base font-bold text-slate-900">Your Plan</h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                Essential Membership
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100">
                <Check size={12} strokeWidth={3} />
                Active
              </span>
            </div>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  billing === 'monthly'
                    ? 'border-brand-300 bg-brand-50 ring-1 ring-brand-200'
                    : 'border-slate-200 bg-white hover:border-brand-200'
                }`}
              >
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Monthly
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900">
                  $19{' '}
                  <span className="text-sm font-semibold text-slate-500">
                    / month
                  </span>
                </p>
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={`relative rounded-xl border px-4 py-3 text-left transition-colors ${
                  billing === 'annual'
                    ? 'border-brand-300 bg-brand-50 ring-1 ring-brand-200'
                    : 'border-slate-200 bg-white hover:border-brand-200'
                }`}
              >
                <span className="absolute -top-2 right-3 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                  Save 15%
                </span>
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Annual
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900">
                  $199{' '}
                  <span className="text-sm font-semibold text-slate-500">
                    / year
                  </span>
                </p>
              </button>
            </div>

            <ul className="mt-5 space-y-2.5">
              {ESSENTIAL_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
              <Info size={16} className="mt-0.5 shrink-0 text-amber-500" />
              <p className="text-xs leading-relaxed text-amber-900">
                Auto-renews at the end of your subscription. Plan stays
                effective through the end of your billing period. 1-on-1 case
                consultations are available as add-ons.
              </p>
            </div>

            <button
              type="button"
              onClick={onGoToPayment}
              className="mt-5 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white hover:bg-brand-600"
            >
              {billing === 'monthly'
                ? 'Subscribe – $19 / month'
                : 'Subscribe – $199 / year'}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900">
            Professional Services
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            One-time add-ons for additional support
          </p>

          <div className="mt-3 space-y-4">
            {PROFESSIONAL_SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <article
                  key={service.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-sm font-bold text-slate-900">
                          {service.title}
                        </h3>
                        <p className="text-sm font-extrabold text-brand-700">
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check
                          size={14}
                          strokeWidth={3}
                          className="mt-0.5 shrink-0 text-brand-500"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={service.to}
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-brand-500 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
                  >
                    {service.cta}
                  </Link>
                </article>
              )
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Headset size={18} />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Support</h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Not sure what you need? We&apos;ll guide you through the
                  options.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <a
                href="mailto:support@sam.ai"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-300 hover:bg-brand-50"
              >
                <Mail size={15} />
                Email
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-300 hover:bg-brand-50"
              >
                <MessageSquare size={15} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentTab() {
  const [primary, setPrimary] = useState('apple')

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <CreditCard size={18} />
          </span>
          <h2 className="text-base font-bold text-slate-900">
            Payment Methods
          </h2>
        </div>

        <ul className="mt-5 divide-y divide-slate-100">
          <li className="flex items-center gap-3 py-3.5 first:pt-0">
            <ApplePayIcon />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900">Apple Pay</p>
              <p className="text-xs text-slate-500">Default payment method</p>
            </div>
            {primary === 'apple' ? (
              <span className="text-xs font-semibold text-slate-400">
                Primary
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setPrimary('apple')}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-brand-300 hover:bg-brand-50"
              >
                Set Primary
              </button>
            )}
          </li>
          <li className="flex items-center gap-3 py-3.5">
            <GooglePayIcon />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900">Google Pay</p>
              <p className="text-xs text-slate-500">Available as backup</p>
            </div>
            {primary === 'google' ? (
              <span className="text-xs font-semibold text-slate-400">
                Primary
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setPrimary('google')}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-brand-300 hover:bg-brand-50"
              >
                Set Primary
              </button>
            )}
          </li>
        </ul>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 py-3 text-sm font-bold text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
        >
          <Plus size={16} />
          Add Payment Method
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Receipt size={18} />
          </span>
          <h2 className="text-base font-bold text-slate-900">
            Billing History
          </h2>
        </div>

        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Free Trial Activation
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Jan 15, 2025 · Free
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">$0.00</p>
              <p className="mt-0.5 text-xs font-semibold text-brand-600">
                Completed
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center px-4 py-6 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <FileText size={22} />
          </span>
          <p className="mt-3 text-sm font-bold text-slate-500">
            No billing history yet
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Your future transactions will appear here.
          </p>
        </div>
      </section>
    </div>
  )
}

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab = TABS.some((t) => t.id === tabParam) ? tabParam : 'account'

  function setTab(id) {
    setSearchParams(id === 'account' ? {} : { tab: id }, { replace: true })
  }

  return (
    <DashboardPage>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>
      </div>

      <SettingsTabs active={activeTab} onChange={setTab} />

      <div className="mt-6">
        {activeTab === 'account' && <AccountTab />}
        {activeTab === 'subscription' && (
          <SubscriptionTab onGoToPayment={() => setTab('payment')} />
        )}
        {activeTab === 'payment' && <PaymentTab />}
      </div>
    </DashboardPage>
  )
}
