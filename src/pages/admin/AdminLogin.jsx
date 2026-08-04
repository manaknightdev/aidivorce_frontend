import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Heart, Shield } from 'lucide-react'
import BrandLogo from '../../components/BrandLogo'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8f6] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <div className="text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
              <Heart size={22} fill="currentColor" />
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              Admin Login
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Sign in to your Sam admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Email Address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sam.ai"
                className={inputClass}
                required
                autoComplete="username"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Password
              <span className="relative mt-1.5 block">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${inputClass} !mt-0 pr-10`}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>

            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-sm shadow-brand-500/25 transition-colors hover:bg-brand-600"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
            <Shield size={12} className="text-brand-500" />
            Protected by enterprise-grade security
          </p>
        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          Need help accessing your account?{' '}
          <a
            href="mailto:support@sam.ai"
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            Contact support
          </a>
        </p>

        <div className="mt-6 flex justify-center">
          <BrandLogo size={28} withText to="/" textClassName="text-sm font-bold text-slate-700" />
        </div>
      </div>
    </div>
  )
}
