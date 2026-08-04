import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  Check,
  ShieldCheck,
  Lock,
  Sparkles,
} from 'lucide-react'
import AuthLayout, { AuthTimeline } from '../components/AuthLayout'
import BrandLogo from '../components/BrandLogo'
import signupBg from '../assets/signup-bg.png'

const leftItems = [
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    text: 'Your information is encrypted and never shared without your consent',
  },
  {
    icon: Lock,
    title: 'Your Data, Your Control',
    text: 'Create an account to save progress and return anytime',
  },
  {
    icon: Sparkles,
    title: 'Personalized Guidance',
    text: 'Get a roadmap tailored to your situation and location',
  },
]

export default function Signup() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all required fields.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!agreed) {
      setError('Please agree to the Terms of Service and Privacy Policy.')
      return
    }

    navigate('/signup/location', {
      state: { fullName: fullName.trim(), email: email.trim() },
    })
  }

  return (
    <AuthLayout
      background={signupBg}
      imageClass="opacity-45 brightness-[1.05] contrast-[0.95] object-[center_20%]"
      title="Start With Clarity"
      subtitle="Create your account to unlock personalized divorce guidance built around your needs."
      form={
        <>
          <div className="text-center">
            <div className="mx-auto flex justify-center">
              <BrandLogo size={72} to={null} />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
              Create Your Account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Create your secure account to get started with personalized divorce
              support.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-3.5">
            <Field
              label="Full Name"
              required
              type="text"
              value={fullName}
              onChange={setFullName}
              placeholder="Jane Doe"
              autoComplete="name"
            />
            <Field
              label="Email Address"
              required
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="jane@example.com"
              autoComplete="email"
            />
            <Field
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete="new-password"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-400 transition-colors hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <Field
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="••••••••"
              autoComplete="new-password"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-slate-400 transition-colors hover:text-slate-600"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <label className="flex cursor-pointer items-start gap-2.5 pt-1 select-none">
              <button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                onClick={() => setAgreed((v) => !v)}
                className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border transition-all duration-150 ${
                  agreed
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {agreed && <Check size={11} strokeWidth={3} />}
              </button>
              <span className="text-sm leading-snug text-slate-600">
                I agree to the{' '}
                <a
                  href="#"
                  className="font-medium text-brand-500 hover:text-brand-600"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="font-medium text-brand-500 hover:text-brand-600"
                >
                  Privacy Policy
                </a>
              </span>
            </label>

            {error && (
              <p className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-1 w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30 active:translate-y-0"
            >
              Create Account
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-brand-500 underline underline-offset-2 transition-colors hover:text-brand-600"
            >
              Log In
            </Link>
          </p>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <Link
            to="/assessment"
            className="block w-full rounded-xl border border-slate-200 bg-white py-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-md active:translate-y-0"
          >
            Continue as Guest (Free Assessment)
          </Link>

          <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
            No account required to start. Begin with a quick assessment.
          </p>
        </>
      }
    >
      <AuthTimeline items={leftItems} />
    </AuthLayout>
  )
}

function Field({
  label,
  required,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  trailing,
}) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-sm font-medium text-slate-500">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </span>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 ${
            trailing ? 'pr-11' : ''
          }`}
        />
        {trailing && (
          <span className="absolute top-1/2 right-3 -translate-y-1/2">
            {trailing}
          </span>
        )}
      </div>
    </label>
  )
}
