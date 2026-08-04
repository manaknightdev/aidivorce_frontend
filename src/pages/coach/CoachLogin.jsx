import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Shield,
  ClipboardCheck,
} from 'lucide-react'
import BrandLogo from '../../components/BrandLogo'
import step1Bg from '../../assets/login-step1.png'
import familyBg from '../../assets/onboard-family.png'
import deskBg from '../../assets/onboard-desk.png'
import expertImg from '../../assets/expert-headshot.png'

const slides = [
  {
    title: 'Build Your Divorce Strategy',
    subtitle:
      'Separation is not just a process — it requires clear thinking and informed decisions.',
    background: step1Bg,
  },
  {
    title: 'Guide Clients With Clarity',
    subtitle:
      'Respond to inbox messages, approve sessions, and keep every case moving forward.',
    background: familyBg,
  },
  {
    title: 'Stay Ahead Of Your Schedule',
    subtitle:
      'Review calendar bookings, join Zoom sessions, and track reviews in one portal.',
    background: deskBg,
  },
  {
    title: 'Expert Coaching, Organized',
    subtitle:
      'AI drafts help you reply faster while you stay in control of every conversation.',
    background: expertImg,
  },
]

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100'

export default function CoachLogin() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length)
    }, 5500)
    return () => clearInterval(id)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/coach')
  }

  const current = slides[slide]

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="relative hidden w-1/2 overflow-hidden bg-[#f4f5f3] lg:block">
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${slide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="pointer-events-none absolute inset-0"
          >
            <img
              src={current.background}
              alt=""
              className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40 brightness-[1.05] contrast-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f4f5f3] via-[#f4f5f3]/60 to-white/30" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex h-full flex-col px-10 py-8 xl:px-14">
          <div className="flex items-center gap-2">
            <BrandLogo size={36} to={null} />
            <span className="text-lg font-bold text-slate-900">Login</span>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase xl:text-4xl">
                  {current.title}
                </h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
                  {current.subtitle}
                </p>
                <div className="mx-auto mt-8 grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-600 shadow-inner">
                  <ClipboardCheck size={28} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 pb-4">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === slide ? 'w-8 bg-brand-500' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </aside>

      <div className="relative flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-md"
        >
          <div className="text-center lg:text-left">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30 lg:mx-0">
              <Shield size={26} />
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
              Coach Portal
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sign in to your account
            </p>
          </div>

          <label className="mt-8 block text-sm font-bold text-slate-900">
            Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="coach@example.com"
              className={inputClass}
              required
              autoComplete="username"
            />
          </label>

          <label className="mt-4 block text-sm font-bold text-slate-900">
            Password
            <span className="relative mt-1.5 block">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputClass} !mt-0 pr-10`}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
          </label>

          <div className="mt-4 flex items-center justify-between gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-slate-500">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-brand-500 text-brand-500 focus:ring-brand-400"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
