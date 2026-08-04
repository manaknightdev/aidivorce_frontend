import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Check,
  ClipboardCheck,
  Lightbulb,
  Route,
  Users,
  TrendingUp,
  MessagesSquare,
  Shield,
  Compass,
  UserRound,
} from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import step1Bg from '../assets/login-step1.png'
import familyBg from '../assets/onboard-family.png'
import deskBg from '../assets/onboard-desk.png'
import expertImg from '../assets/expert-headshot.png'

const slides = [
  {
    title: 'Build Your Divorce Strategy',
    subtitle:
      'Separation is not just a process — it requires clear thinking and informed decisions.',
    background: step1Bg,
    imageClass:
      'opacity-45 brightness-[1.05] contrast-[0.95] object-[center_20%]',
    items: [
      {
        icon: ClipboardCheck,
        title: 'Clear Thinking',
        text: 'Organize your thoughts and priorities with structured guidance',
      },
      {
        icon: Lightbulb,
        title: 'Informed Decisions',
        text: 'Make choices based on knowledge and understanding of outcomes',
      },
      {
        icon: Route,
        title: 'Strategic Planning',
        text: 'Build a roadmap that guides you through each step confidently',
      },
    ],
  },
  {
    title: 'Every Decision Shapes Your Outcome',
    subtitle:
      'Parenting, finances, and communication all have a lasting impact on your future.',
    background: familyBg,
    imageClass:
      'opacity-40 brightness-[1.05] contrast-[0.95] object-[center_30%]',
    items: [
      {
        icon: Users,
        title: 'Parenting',
        text: "Co-parenting arrangements that prioritize your children's wellbeing",
      },
      {
        icon: TrendingUp,
        title: 'Finances',
        text: 'Asset division and support decisions that secure your future',
      },
      {
        icon: MessagesSquare,
        title: 'Communication',
        text: 'Effective strategies that reduce conflict and stress',
      },
    ],
  },
  {
    title: 'Think Ahead. Not Just React.',
    subtitle:
      'Anticipate outcomes, avoid costly mistakes, and move forward with clarity and confidence.',
    background: deskBg,
    imageClass:
      'opacity-40 brightness-[1.08] contrast-[0.95] object-[center_25%]',
    items: [
      {
        icon: Lightbulb,
        title: 'Anticipate Outcomes',
        text: 'See potential consequences before making critical decisions',
      },
      {
        icon: Shield,
        title: 'Avoid Costly Mistakes',
        text: 'Identify pitfalls and protect yourself from common errors',
      },
      {
        icon: Compass,
        title: 'Move Forward with Clarity',
        text: 'Build confidence with a clear roadmap for your next chapter',
      },
    ],
  },
  {
    type: 'expert',
    background: expertImg,
    imageClass:
      'opacity-25 grayscale brightness-[1.25] contrast-[0.8] object-[center_20%]',
    credentials: [
      '10+ years experience',
      'Certified mediator',
      'Financial strategy focus',
    ],
    about:
      'Developed from hands-on experience as a divorce coach and certified family mediator, with a strong focus on financial strategy and case preparation — helping you make clear, structured, and confident decisions throughout your divorce.',
  },
]

function TimelineItems({ items }) {
  return (
    <div className="mx-auto mt-8 w-full max-w-sm text-left">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="relative flex gap-3.5 pb-5 last:pb-0">
            {i < items.length - 1 && (
              <span className="absolute top-10 left-[1.15rem] h-[calc(100%-2.25rem)] w-0.5 bg-brand-300" />
            )}
            <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white shadow-md shadow-brand-500/30 ring-4 ring-white/70">
              <Icon size={16} strokeWidth={2.2} />
            </span>
            <div className="pt-0.5">
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="mt-0.5 text-[13px] leading-snug text-slate-500">
                {item.text}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ExpertSlide({ credentials, about }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative rounded-3xl bg-brand-50 px-5 pt-11 pb-5">
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/35 ring-4 ring-white">
            <UserRound size={26} strokeWidth={2} />
          </span>
        </div>
        <div className="text-center">
          <h3 className="text-base font-bold text-slate-900">
            Divorce Strategy Expert
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Certified Divorce Coach &amp; Family Mediator
          </p>
        </div>
        <ul className="mt-4 space-y-2">
          {credentials.map((c) => (
            <li
              key={c}
              className="flex items-center gap-3 rounded-xl bg-white px-3.5 py-2.5 shadow-sm"
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="text-sm font-medium text-slate-800">{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-base font-extrabold tracking-tight text-slate-900 uppercase">
          About Your Divorce Expert
        </h2>
        <p className="mt-2.5 text-[13px] leading-relaxed text-slate-500">{about}</p>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-full bg-brand-500 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600"
      >
        Get Started →
      </button>
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length)
    }, 5500)
    return () => clearInterval(id)
  }, [paused, slide])

  function goToSlide(index) {
    setSlide(index)
    setPaused(true)
    window.setTimeout(() => setPaused(false), 8000)
  }

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/assessment')
  }

  function skipToEnd() {
    goToSlide(slides.length - 1)
  }

  function nextSlide() {
    goToSlide((slide + 1) % slides.length)
  }

  const current = slides[slide]

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left panel */}
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
              className={`absolute inset-0 h-full w-full scale-105 object-cover ${current.imageClass}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f4f5f3] via-[#f4f5f3]/55 to-white/30" />
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex h-full flex-col px-10 py-8 xl:px-14">
          {/* Progress + Skip */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-1 gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goToSlide(i)}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i <= slide ? 'bg-brand-500' : 'bg-slate-300/80'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={skipToEnd}
              className="shrink-0 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
            >
              Skip
            </button>
          </div>

          {/* Slide content — tap to advance */}
          <div
            role="presentation"
            onClick={nextSlide}
            className="flex flex-1 cursor-pointer flex-col items-center justify-center px-2 text-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="w-full"
              >
                {current.type === 'expert' ? (
                  <div onClick={(e) => e.stopPropagation()}>
                    <ExpertSlide
                      credentials={current.credentials}
                      about={current.about}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase xl:text-[2rem] xl:leading-[1.15]">
                      {current.title}
                    </h1>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 xl:text-base">
                      {current.subtitle}
                    </p>
                    <TimelineItems items={current.items} />
                    <p className="mt-8 text-sm text-slate-400">
                      Tap anywhere to continue →
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </aside>

      {/* Right panel */}
      <main className="relative flex w-full flex-col lg:w-1/2">
        <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-[400px]"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mx-auto flex justify-center"
              >
                <BrandLogo size={72} to={null} />
              </motion.div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
                Welcome to Sam
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Your AI-powered divorce guidance tool
              </p>
              <p className="mt-1 text-sm font-medium text-brand-500">
                Guided by a certified divorce coach
              </p>
            </div>

            <div className="mt-9 text-center">
              <p className="text-base font-bold text-slate-900">
                Log in or continue as Guest
              </p>
              <p className="mt-1 text-sm text-slate-500">to start your assessment</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
                autoComplete="email"
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500 select-none">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={remember}
                    onClick={() => setRemember((v) => !v)}
                    className={`grid h-4 w-4 place-items-center rounded border transition-all duration-150 ${
                      remember
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {remember && <Check size={11} strokeWidth={3} />}
                  </button>
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30 active:translate-y-0"
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link
                to="/signup"
                className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
              >
                Create New Account
              </Link>
            </div>

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
          </motion.div>
        </div>
      </main>
    </div>
  )
}
