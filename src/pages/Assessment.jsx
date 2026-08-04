import { useMemo, useState, useSyncExternalStore } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import {
  getAdminContent,
  normalizeAdminContent,
  subscribeAdminContent,
} from '../data/adminContent'

const FALLBACK_QUESTIONS = [
  {
    id: 'marital_status',
    type: 'radio',
    title: 'What is your current marital status?',
    subtitle: 'Choose the option that best fits you right now',
    options: [
      'Married, considering divorce',
      'Separated',
      'In the process of divorce',
      'Recently divorced',
    ],
  },
  {
    id: 'concerns',
    type: 'checkbox',
    title: 'What are your primary concerns?',
    subtitle: 'Select all that apply — you can choose more than one',
    options: [
      'Child custody & parenting',
      'Financial division',
      'Spousal support',
      'Property & assets',
      'Emotional support',
      'Legal process & timeline',
    ],
  },
]

function mapAdminQuestions(assessment) {
  const list = assessment?.questions
  if (!Array.isArray(list) || list.length === 0) return FALLBACK_QUESTIONS
  return list.map((q) => ({
    id: q.id,
    type: q.type || 'short',
    title: q.text || q.title || 'Untitled question',
    subtitle: q.subtitle || '',
    options: q.options || [],
    placeholder: q.placeholder || '',
  }))
}

function emptyAnswer(type) {
  if (type === 'checkbox') return []
  return ''
}

function isAnswered(question, value) {
  if (question.type === 'checkbox') return Array.isArray(value) && value.length > 0
  if (question.type === 'radio') return Boolean(value)
  return typeof value === 'string' && value.trim().length > 0
}

export default function Assessment() {
  const navigate = useNavigate()
  const content = useSyncExternalStore(
    subscribeAdminContent,
    getAdminContent,
    getAdminContent,
  )
  const questions = useMemo(
    () => mapAdminQuestions(normalizeAdminContent(content).assessment),
    [content],
  )
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const safeStep = Math.min(step, Math.max(0, questions.length - 1))
  const current = questions[safeStep]
  const value = answers[current?.id] ?? emptyAnswer(current?.type || 'short')
  const isLast = safeStep === questions.length - 1
  const canContinue = current ? isAnswered(current, value) : false

  if (!current) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f8f6] px-4">
        <p className="text-sm text-slate-500">
          No assessment questions configured yet.
        </p>
      </div>
    )
  }

  function setValue(next) {
    setAnswers((prev) => ({ ...prev, [current.id]: next }))
  }

  function toggleCheckbox(option) {
    const currentList = Array.isArray(value) ? value : []
    if (currentList.includes(option)) {
      setValue(currentList.filter((o) => o !== option))
    } else {
      setValue([...currentList, option])
    }
  }

  function handleContinue() {
    if (!canContinue) return
    if (isLast) {
      navigate('/assessment/complete', { state: { answers, questions } })
      return
    }
    setStep((s) => s + 1)
  }

  function handleBack() {
    if (step === 0) {
      navigate('/assessment')
      return
    }
    setStep((s) => s - 1)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f6]">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <BrandLogo
          size={40}
          withText
          textClassName="text-base text-slate-900"
        />
        <div className="flex items-center gap-1.5">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === safeStep
                  ? 'w-5 bg-brand-500'
                  : i < safeStep
                    ? 'w-2 bg-brand-400'
                    : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-10 pt-8 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-1 flex-col"
          >
            <p className="text-center text-sm text-slate-400">
              Step {safeStep + 1} of {questions.length} • Takes under 3 minutes
            </p>
            <h1 className="mt-3 text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.7rem]">
              {current.title}
            </h1>
            <p className="mt-2 text-center text-sm text-slate-500">
              {current.subtitle}
            </p>

            <div className="mt-8">
              {current.type === 'radio' && (
                <div className="space-y-3">
                  {current.options.map((option) => {
                    const active = value === option
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setValue(option)}
                        className={`flex w-full items-center justify-between rounded-2xl border bg-white px-5 py-4 text-left transition-all duration-200 ${
                          active
                            ? 'border-brand-400 shadow-md shadow-brand-500/10 ring-2 ring-brand-100'
                            : 'border-slate-200 hover:border-brand-300 hover:shadow-sm'
                        }`}
                      >
                        <span
                          className={`pr-3 text-sm font-medium ${
                            active ? 'text-slate-900' : 'text-slate-700'
                          }`}
                        >
                          {option}
                        </span>
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                            active
                              ? 'border-brand-500 bg-brand-500'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {current.type === 'checkbox' && (
                <div className="space-y-3">
                  {current.options.map((option) => {
                    const active = Array.isArray(value) && value.includes(option)
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleCheckbox(option)}
                        className={`flex w-full items-center justify-between rounded-2xl border bg-white px-5 py-4 text-left transition-all duration-200 ${
                          active
                            ? 'border-brand-400 shadow-md shadow-brand-500/10 ring-2 ring-brand-100'
                            : 'border-slate-200 hover:border-brand-300 hover:shadow-sm'
                        }`}
                      >
                        <span
                          className={`pr-3 text-sm font-medium ${
                            active ? 'text-slate-900' : 'text-slate-700'
                          }`}
                        >
                          {option}
                        </span>
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors ${
                            active
                              ? 'border-brand-500 bg-brand-500 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {active && <Check size={12} strokeWidth={3} />}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {current.type === 'short' && (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={current.placeholder}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                  autoComplete="address-level2"
                />
              )}

              {current.type === 'long' && (
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={current.placeholder}
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              )}
            </div>

            <div className="mt-auto space-y-3 pt-10">
              <button
                type="button"
                disabled={!canContinue}
                onClick={handleContinue}
                className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ${
                  !canContinue
                    ? 'cursor-not-allowed bg-slate-200 text-slate-400'
                    : 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl active:translate-y-0'
                }`}
              >
                {isLast ? 'Finish Assessment' : 'Continue →'}
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="w-full py-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
              >
                {step === 0 ? 'Back to overview' : 'Back'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
