import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import guideImg from '../assets/assessment-guide.png'

const benefits = [
  {
    title: 'Takes 2–3 minutes',
    text: 'Quick and simple questions',
  },
  {
    title: 'Organized overview',
    text: 'Tailored to your specific situation',
  },
  {
    title: 'No payment required',
    text: 'Completely free to start',
  },
  {
    title: 'Includes your first free question',
    text: 'Ask immediately after completion',
  },
]

export default function AssessmentIntro() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fbf4]">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <BrandLogo
          size={40}
          withText
          textClassName="text-base text-slate-900"
        />
        <Link
          to="/"
          className="text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
        >
          Skip
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-5 pb-12 pt-2 sm:px-8 lg:flex-row lg:items-center lg:gap-14 lg:px-10">
        {/* Left */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[48%]"
        >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Start Your Free Assessment
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500">
            Answer a few quick questions to organize your situation and build
            your case.
          </p>

          <div className="relative mt-8 aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-[2rem] bg-[#e2eecd] shadow-lg shadow-brand-500/10">
            <img
              src={guideImg}
              alt="Your divorce guidance expert"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent px-5 pt-16 pb-5">
              <p className="text-sm font-semibold text-white">
                You’re not alone in this
              </p>
              <p className="text-xs text-white/80">
                Clear next steps in just a few minutes
              </p>
            </div>
          </div>
        </motion.section>

        {/* Right */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="w-full lg:w-[42%]"
        >
          <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100 sm:p-9">
            <ul className="space-y-6">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 sm:text-[0.95rem]">
                      {b.title}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-500">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => navigate('/assessment/questions')}
              className="mt-9 w-full rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl active:translate-y-0"
            >
              Start Assessment
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
