import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  X,
  Wand2,
  Baby,
  Wallet,
  Home,
  Gavel,
  Folder,
  Check,
  Pencil,
  RefreshCw,
  Info,
  ArrowRight,
  Coins,
} from 'lucide-react'
import { caseDetails } from './CaseDetailModal'

const categoryMeta = {
  parenting: { icon: Baby, label: 'Parenting' },
  finance: { icon: Wallet, label: 'Finance' },
  property: { icon: Home, label: 'Property & Assets' },
  docs: { icon: Gavel, label: 'Documentations & Formalities' },
  general: { icon: Folder, label: 'General / Not Sure' },
}

const followUpsBySection = {
  parenting: [
    {
      id: 'p1',
      question: 'Was this the first time this happened?',
      hint: 'SamAI uses this to understand the pattern and frequency of incidents for your case.',
      placeholder:
        'E.g. This has happened several times over the past few months, usually on weekends…',
    },
    {
      id: 'p2',
      question: 'How did this affect your children or your schedule?',
      hint: 'Impact details help strengthen the context in your parenting timeline.',
      placeholder:
        'E.g. The kids were confused and bedtime was delayed by almost two hours…',
    },
    {
      id: 'p3',
      question: 'Have you raised this with your spouse in writing?',
      hint: 'Written communication can support your case notes and follow-up planning.',
      placeholder:
        'E.g. I sent a text the next morning asking for notice next time…',
    },
  ],
  finance: [
    {
      id: 'f1',
      question: 'Do you have documents that support these amounts?',
      hint: 'Pay stubs, statements, or invoices help SamAI structure your finance timeline.',
      placeholder: 'E.g. I have recent pay stubs and a joint bank statement from March…',
    },
    {
      id: 'f2',
      question: 'Is this expense shared, or paid by one of you only?',
      hint: 'Knowing who pays helps clarify support and budget planning.',
      placeholder: 'E.g. I have been covering childcare; they cover the mortgage…',
    },
    {
      id: 'f3',
      question: 'Has this amount changed recently?',
      hint: 'Trends over time make your finance section more accurate.',
      placeholder: 'E.g. Childcare went up in January; otherwise it has been steady…',
    },
  ],
  property: [
    {
      id: 'pr1',
      question: "Is this asset jointly owned or in one person's name?",
      hint: 'Ownership details help SamAI place this correctly in your property section.',
      placeholder: 'E.g. The home is jointly owned; the savings account is in my name only…',
    },
    {
      id: 'pr2',
      question: 'Do you have an approximate value or recent appraisal?',
      hint: 'Even rough numbers improve division planning.',
      placeholder: 'E.g. The house was valued around $650,000 last fall…',
    },
    {
      id: 'pr3',
      question: 'Are there any debts tied to this asset?',
      hint: 'Mortgages and loans matter for net property calculations.',
      placeholder: 'E.g. There is about $220,000 left on the mortgage…',
    },
  ],
  docs: [
    {
      id: 'd1',
      question: 'Have you already filed or received any related paperwork?',
      hint: 'Knowing what exists already helps avoid duplicate formal steps.',
      placeholder: 'E.g. I received a draft separation agreement but have not signed it…',
    },
    {
      id: 'd2',
      question: 'What is the next deadline or court date, if any?',
      hint: 'Dates keep your formalities timeline on track.',
      placeholder: 'E.g. We have a case conference scheduled for April 12…',
    },
    {
      id: 'd3',
      question: 'Who else has copies of these documents?',
      hint: 'Shared access can affect how you organize and follow up.',
      placeholder: 'E.g. My lawyer and I each have a copy; my spouse has the draft…',
    },
  ],
  general: [
    {
      id: 'g1',
      question: 'Which part of your case does this relate to most?',
      hint: 'A little context helps SamAI place this in the right section.',
      placeholder: 'E.g. This is mainly about parenting schedules, but money is involved too…',
    },
    {
      id: 'g2',
      question: 'What outcome are you hoping for with this update?',
      hint: 'Goals help SamAI organise the note more usefully.',
      placeholder: 'E.g. I want this documented so we can discuss a clearer schedule…',
    },
    {
      id: 'g3',
      question: 'Is there anything else SamAI should know right now?',
      hint: 'Optional extras can improve the next overview of your case.',
      placeholder: 'E.g. We also have a mediation session next week…',
    },
  ],
}

function rephraseEntry(text, date) {
  const cleaned = text.trim().replace(/\s+/g, ' ')
  const datePrefix = date ? `On ${formatDateLabel(date)}, ` : ''
  const body = cleaned.replace(/\.$/, '')

  const polished = `${datePrefix}${body.charAt(0).toUpperCase()}${body.slice(1)}`
    .replace(
      /did not follow the custody schedule/i,
      'failed to adhere to the agreed custody schedule',
    )
    .replace(
      /kept the child longer than agreed/i,
      'retaining the child beyond the permitted timeframe',
    )
    .replace(
      /without letting me know/i,
      'without prior notice or consent',
    )

  return `${polished.replace(/\.$/, '')}.`
}

function formatDateLabel(value) {
  if (!value) return ''
  const d = new Date(`${value}T00:00:00`)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function SideDrawer({ open, onClose, labelledBy, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-slate-900/40"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-xl [contain:layout_paint]"
          >
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function AddInformationModal({
  open,
  sectionId,
  onClose,
  onComplete,
}) {
  const [step, setStep] = useState('compose')
  const [entry, setEntry] = useState('')
  const [date, setDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [rephrased, setRephrased] = useState('')
  const [acceptedText, setAcceptedText] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [error, setError] = useState('')

  const detail = sectionId ? caseDetails[sectionId] : null
  const meta = categoryMeta[sectionId] || categoryMeta.general
  const Icon = meta.icon
  const questions = followUpsBySection[sectionId] || followUpsBySection.general
  const currentQuestion = questions[questionIndex]
  const sectionLabel = (detail?.description || meta.label).toLowerCase()
  const isLastQuestion = questionIndex >= questions.length - 1

  useEffect(() => {
    if (!open) return
    setStep('compose')
    setEntry('')
    setDate('')
    setSubmitting(false)
    setRephrased('')
    setAcceptedText('')
    setQuestionIndex(0)
    setAnswers([])
    setCurrentAnswer('')
    setError('')
  }, [open, sectionId])

  function handleSubmitToSamAI(e) {
    e.preventDefault()
    if (!entry.trim()) {
      setError('Please describe your situation before submitting.')
      return
    }
    setError('')
    setSubmitting(true)
    window.setTimeout(() => {
      setRephrased(rephraseEntry(entry, date))
      setSubmitting(false)
      setStep('review')
    }, 650)
  }

  function handleRegenerate() {
    setSubmitting(true)
    window.setTimeout(() => {
      const variants = [
        rephraseEntry(entry, date),
        rephraseEntry(entry, date).replace(
          /\.$/,
          ', which created uncertainty for everyone involved.',
        ),
        `According to your notes${date ? ` from ${formatDateLabel(date)}` : ''}: ${entry.trim().replace(/\.$/, '')}.`,
      ]
      const others = variants.filter((v) => v !== rephrased)
      setRephrased(others[Math.floor(Math.random() * others.length)] || variants[0])
      setSubmitting(false)
    }, 500)
  }

  function goToFollowUp(text) {
    setAcceptedText(text)
    setQuestionIndex(0)
    setAnswers([])
    setCurrentAnswer('')
    setError('')
    setStep('followup')
  }

  function handleFollowUpSubmit(e) {
    e.preventDefault()
    if (!currentAnswer.trim()) {
      setError('Please answer this question to continue.')
      return
    }

    const nextAnswers = [
      ...answers,
      {
        id: currentQuestion.id,
        question: currentQuestion.question,
        answer: currentAnswer.trim(),
      },
    ]
    setAnswers(nextAnswers)
    setError('')

    if (!isLastQuestion) {
      setCurrentAnswer('')
      setQuestionIndex((i) => i + 1)
      return
    }

    onComplete?.({
      sectionId,
      original: entry,
      accepted: acceptedText,
      date,
      followUps: nextAnswers,
    })
    onClose()
  }

  function handleBack() {
    if (step === 'review') {
      setStep('compose')
      return
    }
    if (step === 'followup') {
      if (questionIndex > 0) {
        const prev = answers[questionIndex - 1]
        setAnswers((list) => list.slice(0, -1))
        setQuestionIndex((i) => i - 1)
        setCurrentAnswer(prev?.answer || '')
        setError('')
        return
      }
      setStep('review')
      return
    }
    onClose()
  }

  return (
    <SideDrawer
      open={open && !!sectionId}
      onClose={onClose}
      labelledBy={step === 'followup' ? 'followup-title' : 'add-info-title'}
    >
      {step !== 'followup' ? (
        <>
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
            <button
              type="button"
              onClick={handleBack}
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
            <h2
              id="add-info-title"
              className="text-base font-bold text-slate-900 sm:text-lg"
            >
              Add Information
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 ring-1 ring-brand-100">
              <Icon size={13} />
              {meta.label}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Category may be adjusted by SamAI for better organization.
            </p>

            <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
              Describe your situation
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              Add any facts, concerns, or updates related to {sectionLabel}.
            </p>

            <div className="mt-4 flex gap-2.5 rounded-xl bg-brand-50 px-3.5 py-3 ring-1 ring-brand-100">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-500 text-white">
                <Wand2 size={14} />
              </span>
              <p className="text-sm leading-relaxed text-slate-600">
                <span className="font-bold text-slate-900">Powered by SamAI</span>{' '}
                — your entry will be automatically rephrased and organised. You
                can accept, keep yours, or regenerate.
              </p>
            </div>

            <form
              id="add-info-form"
              onSubmit={handleSubmitToSamAI}
              className="mt-5"
            >
              <label className="block text-sm font-bold text-slate-900">
                Your Entry
              </label>
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                rows={5}
                disabled={step === 'review'}
                placeholder="Example: My spouse did not follow the custody schedule on March 1 and kept the child longer than agreed."
                className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 disabled:bg-slate-50"
              />
              <p className="mt-1.5 text-xs text-slate-400">
                Write freely — SamAI will refine it for clarity and structure.
              </p>

              <label className="mt-5 block text-sm font-bold text-slate-900">
                Date of incident{' '}
                <span className="font-medium text-slate-400">(optional)</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={step === 'review'}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100 disabled:bg-slate-50"
              />
              <p className="mt-1.5 text-xs text-slate-400">
                If unsure, you can skip this.
              </p>

              {error && step === 'compose' && (
                <p className="mt-3 text-sm text-red-600">{error}</p>
              )}
            </form>

            {step === 'review' && (
              <div className="mt-6 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Wand2 size={16} className="text-brand-600" />
                    SamAI Rephrased Version
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    Ready
                  </span>
                </div>

                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
                    Your Original
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 italic">
                    “{entry.trim()}”
                  </p>
                </div>

                <div className="relative my-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-brand-200" />
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white">
                    <Wand2 size={12} />
                  </span>
                  <span className="h-px flex-1 bg-brand-200" />
                </div>

                <div className="rounded-xl bg-brand-100/60 p-3.5 ring-1 ring-brand-200">
                  <p className="text-[10px] font-semibold tracking-wide text-brand-800 uppercase">
                    SamAI Version
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-800">
                    {submitting ? 'Regenerating…' : rephrased}
                  </p>
                </div>

                <div className="mt-4 space-y-2.5">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => goToFollowUp(rephrased)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
                  >
                    <Check size={16} strokeWidth={2.5} />
                    Accept SamAI Version + Follow-up
                  </button>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => goToFollowUp(entry.trim())}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 disabled:opacity-60"
                  >
                    <Pencil size={15} />
                    Keep Mine + Follow-up
                  </button>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleRegenerate}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 disabled:opacity-60"
                  >
                    <RefreshCw
                      size={15}
                      className={submitting ? 'animate-spin' : ''}
                    />
                    Regenerate
                  </button>
                </div>

                <p className="mt-3 flex gap-2 text-xs leading-relaxed text-slate-500">
                  <Info size={14} className="mt-0.5 shrink-0 text-slate-400" />
                  Accepting or keeping your version opens follow-up questions
                  so SamAI can strengthen your case entry.
                </p>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-slate-100 px-4 py-4 sm:px-6">
            {step === 'compose' && (
              <>
                <button
                  type="submit"
                  form="add-info-form"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-slate-900 transition-colors hover:bg-brand-600 hover:text-white disabled:opacity-60"
                >
                  <Wand2 size={16} />
                  {submitting ? 'Submitting…' : 'Submit to SamAI'}
                </button>
                <p className="mt-2 text-center text-xs text-slate-400">
                  Your entry will be automatically rephrased and organised.
                </p>
              </>
            )}
            <p className="mt-2 text-center text-[11px] leading-relaxed text-slate-400">
              This information is for guidance only and does not constitute
              legal advice.
            </p>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleFollowUpSubmit}
          className="flex h-full min-h-0 flex-col"
        >
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 pt-5 pb-4">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                aria-label="Back"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-500 text-white">
                    <Wand2 size={15} />
                  </span>
                  <h2
                    id="followup-title"
                    className="text-lg font-bold text-slate-900"
                  >
                    SamAI Follow-up
                  </h2>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Helping strengthen your case with a few quick questions.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-100">
                <Check size={13} strokeWidth={3} />
                SamAI version accepted.
              </div>
              <span className="text-xs font-medium text-slate-400">
                Question {questionIndex + 1} of {questions.length}
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-300"
                style={{
                  width: `${((questionIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/50 p-3.5">
              <p className="text-[10px] font-semibold tracking-wide text-brand-700 uppercase">
                Accepted Entry
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700 italic">
                “{acceptedText}”
              </p>
            </div>

            {answers.length > 0 && (
              <div className="mt-4 space-y-3">
                {answers.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-white p-3.5"
                  >
                    <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
                      Question {index + 1}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {item.question}
                    </p>
                    <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-sm leading-relaxed text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
                We need a bit more info
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <h3 className="text-lg font-bold text-slate-900">
                  {currentQuestion.question}
                </h3>
                <p className="mt-1.5 text-sm text-slate-500">
                  {currentQuestion.hint}
                </p>

                <div className="relative mt-4">
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    rows={4}
                    placeholder={currentQuestion.placeholder}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 pr-10 text-sm leading-relaxed text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                  <Wand2
                    size={16}
                    className="pointer-events-none absolute right-3 bottom-3 text-brand-500"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex gap-2.5 rounded-xl bg-amber-50 px-3.5 py-3 ring-1 ring-amber-100">
              <Coins size={16} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-sm leading-relaxed text-amber-900/80">
                {isLastQuestion
                  ? 'This is the last follow-up — submit to finish this case entry.'
                  : `SamAI may ask ${questions.length - questionIndex - 1} more question${
                      questions.length - questionIndex - 1 === 1 ? '' : 's'
                    } after this to complete your case entry.`}
              </p>
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </div>

          <div className="shrink-0 border-t border-slate-100 px-5 py-4">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
            >
              <Wand2 size={16} className="text-brand-400" />
              {isLastQuestion ? 'Submit & Finish' : 'Submit & Continue'}
              <ArrowRight size={16} />
            </button>
            <p className="mt-2 text-center text-[11px] leading-relaxed text-slate-400">
              This information is for guidance only and does not constitute
              legal advice.
            </p>
          </div>
        </form>
      )}
    </SideDrawer>
  )
}
