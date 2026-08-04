import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import BrandLogo from '../components/BrandLogo'

function formatAnswer(value) {
  if (Array.isArray(value)) return value.join(', ')
  return value
}

export default function AssessmentComplete() {
  const { state } = useLocation()
  const answers = state?.answers
  const questions = state?.questions

  const summary =
    questions && answers
      ? questions
          .map((q) => ({
            title: q.title,
            answer: formatAnswer(answers[q.id]),
          }))
          .filter((row) => row.answer)
      : null

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center px-5 py-4 sm:px-8">
        <BrandLogo
          size={40}
          withText
          textClassName="text-base text-slate-900"
        />
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-5 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="w-full"
        >
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-600">
            <CheckCircle2 size={32} strokeWidth={2} />
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            You’re all set
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-500">
            Thanks for sharing your situation. We’ve started building your
            personalized overview — and your first free question is ready.
          </p>

          {summary && (
            <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left">
              <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Your snapshot
              </p>
              <ul className="mt-4 space-y-4">
                {summary.map((row) => (
                  <li key={row.title}>
                    <p className="text-xs font-medium text-slate-400">
                      {row.title}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {row.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            to="/dashboard"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl"
          >
            Go to your dashboard
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
