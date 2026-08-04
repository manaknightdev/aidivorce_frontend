import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Shield,
  MessageCircle,
  Baby,
  Wallet,
  Home,
  Scale,
  Send,
  Play,
  User,
  Star,
  X,
} from 'lucide-react'
import DashboardPage from '../components/DashboardPage'
import DashboardPageHeader from '../components/DashboardPageHeader'
import {
  getAdminContent,
  subscribeAdminContent,
} from '../data/adminContent'
import {
  getAdminSettings,
  subscribeAdminSettings,
} from '../data/adminSettings'

const CATEGORY_ICONS = {
  Parenting: Baby,
  Finance: Wallet,
  Property: Home,
  Legal: Scale,
}

const COACH_REPLY = {
  intro:
    'Thanks for your question about custody rights in Ontario. Here is a clear starting point based on what you shared:',
  sections: [
    {
      title: 'Your Parental Rights',
      body: 'In Ontario, both parents generally have equal rights and responsibilities regarding their children unless a court order or agreement says otherwise. Decision-making responsibility and parenting time are decided based on the best interests of the child.',
    },
    {
      title: 'Immediate Actions',
      body: 'Document schedule changes, keep communication written when possible, and note any missed exchanges. This helps if you later need mediation, a parenting plan, or court support.',
    },
    {
      title: 'Legal Support',
      body: 'This guidance is educational, not legal advice. If safety, urgent enforcement, or contested custody is involved, speak with a family lawyer or legal clinic familiar with Ontario family law.',
    },
  ],
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function SessionFeedbackModal({ open, onClose, onSubmit, copy }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState('')
  const [error, setError] = useState('')
  const feedback = copy || {
    title: 'Enjoying Your Free Consultation?',
    body: "You've reached your free question(s) limit. Share your feedback by leaving a quick review, and we'll gift you 1 more question — absolutely free!",
    rateLabel: 'Rate your experience:',
    placeholder: 'Write a short review (optional)',
    submitText: 'Submit Feedback',
    dismissText: 'Maybe Later',
  }

  useEffect(() => {
    if (!open) return
    setRating(0)
    setHover(0)
    setReview('')
    setError('')
  }, [open])

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

  function handleSubmit(e) {
    e.preventDefault()
    if (rating < 1) {
      setError('Please rate your experience to continue.')
      return
    }
    onSubmit({ rating, review: review.trim() })
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
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
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-400 text-white">
              <Star size={26} fill="currentColor" />
            </div>
            <h2
              id="feedback-title"
              className="mt-4 text-center text-xl font-bold text-slate-900"
            >
              {feedback.title}
            </h2>
            <p className="mt-2 text-center text-sm leading-relaxed text-slate-500">
              {feedback.body}
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <p className="text-sm font-semibold text-slate-800">
                {feedback.rateLabel}
              </p>
              <div className="mt-2 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => {
                  const active = value <= (hover || rating)
                  return (
                    <button
                      key={value}
                      type="button"
                      onMouseEnter={() => setHover(value)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(value)}
                      className="p-0.5"
                      aria-label={`${value} star${value > 1 ? 's' : ''}`}
                    >
                      <Star
                        size={28}
                        className={
                          active
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }
                      />
                    </button>
                  )
                })}
              </div>

              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={3}
                placeholder={feedback.placeholder}
                className="mt-4 w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />

              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
              >
                {feedback.submitText}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full text-center text-sm font-medium text-slate-500 hover:text-slate-800"
              >
                {feedback.dismissText}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function CoachAvatar() {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-200 text-[11px] font-bold text-slate-600">
      CS
    </span>
  )
}

function UserAvatar() {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
      <User size={14} />
    </span>
  )
}

function SessionStatus({
  messageCount,
  messageLimit,
  progress,
  bonusUnlocked,
  awaiting,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
            </span>
            Free Session Active
          </div>
          <p className="mt-1.5 text-sm text-slate-500">
            {bonusUnlocked
              ? 'Bonus question unlocked'
              : '1 of 1 consultation remaining'}
          </p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
          {messageCount}/{messageLimit} Messages
        </span>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Session Progress</span>
          <span className="text-slate-700">{progress}%</span>
        </div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {awaiting && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
            Awaiting Coach Sam&apos;s response
          </p>
        )}
      </div>
    </div>
  )
}

export default function Session() {
  const content = useSyncExternalStore(
    subscribeAdminContent,
    getAdminContent,
    getAdminContent,
  )
  const platformSettings = useSyncExternalStore(
    subscribeAdminSettings,
    getAdminSettings,
    getAdminSettings,
  )
  const terms = content.terms
  const chat = content.chat
  const categories = useMemo(
    () =>
      (chat.categories || []).map((label) => ({
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        icon: CATEGORY_ICONS[label] || Scale,
      })),
    [chat.categories],
  )

  const [phase, setPhase] = useState('intro') // intro | chat
  const [accepted, setAccepted] = useState(false)
  const [category, setCategory] = useState('parenting')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState([])
  const [messageLimit, setMessageLimit] = useState(
    () => Math.max(1, Number(platformSettings.freeSession?.messagesPerSession) || 1),
  )
  const [bonusUnlocked, setBonusUnlocked] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [awaitingReply, setAwaitingReply] = useState(false)
  const chatEndRef = useRef(null)
  const replyTimer = useRef(null)
  const bonusUnlockedRef = useRef(false)

  useEffect(() => {
    if (categories.length && !categories.some((c) => c.id === category)) {
      setCategory(categories[0].id)
    }
  }, [categories, category])

  const userMessageCount = useMemo(
    () => messages.filter((m) => m.role === 'user').length,
    [messages],
  )

  const sessionComplete = userMessageCount >= messageLimit
  const progress =
    phase === 'intro'
      ? 0
      : sessionComplete
        ? 100
        : Math.min(90, Math.round((userMessageCount / messageLimit) * 100) || 5)

  const pageTitle =
    phase === 'intro'
      ? 'Your Free Session'
      : sessionComplete
        ? 'Your Free Session'
        : 'Ask Your Free Question'

  useEffect(() => {
    return () => {
      if (replyTimer.current) window.clearTimeout(replyTimer.current)
    }
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, phase])

  function startConsultation() {
    if (!accepted) return
    const freeLimit = Math.max(
      1,
      Number(platformSettings.freeSession?.messagesPerSession) || 1,
    )
    setMessageLimit(freeLimit)
    setPhase('chat')
    setMessages([
      {
        id: 'welcome',
        role: 'coach',
        type: 'text',
        text: platformSettings.ai?.systemMessage || chat.welcomeText,
        time: formatTime(),
      },
    ])
  }

  function deliverCoachReply(afterUserId, isFirstQuestion) {
    setAwaitingReply(true)
    if (replyTimer.current) window.clearTimeout(replyTimer.current)

    replyTimer.current = window.setTimeout(() => {
      if (isFirstQuestion) {
        setMessages((prev) => [
          ...prev,
          {
            id: `video-${afterUserId}`,
            role: 'coach',
            type: 'video',
            title: chat.videoTitle || 'Welcome video — Guidelines for your consultation',
            duration: '2:34',
            videoUrl: chat.videoUrl || '',
            time: formatTime(),
          },
          {
            id: `wait-${afterUserId}`,
            role: 'coach',
            type: 'text',
            text:
              [chat.responseTimeMain, chat.responseTimeSub]
                .filter(Boolean)
                .join(' ') ||
              chat.waitingText ||
              "Coach Sam will get back to you soon. Thanks for your patience!",
            time: formatTime(),
          },
        ])
      }

      replyTimer.current = window.setTimeout(() => {
        setMessages((prev) => [
          ...prev.filter((m) => m.type !== 'wait'),
          {
            id: `reply-${afterUserId}`,
            role: 'coach',
            type: 'rich',
            ...COACH_REPLY,
            time: formatTime(),
          },
        ])
        setAwaitingReply(false)
        if (!bonusUnlockedRef.current) {
          window.setTimeout(() => setFeedbackOpen(true), 400)
        }
      }, isFirstQuestion ? 1800 : 900)
    }, isFirstQuestion ? 900 : 600)
  }

  function sendQuestion(e) {
    e?.preventDefault()
    if (!draft.trim() || sessionComplete) return

    const id = `user-${Date.now()}`
    const nextCount = userMessageCount + 1
    setMessages((prev) => [
      ...prev,
      {
        id,
        role: 'user',
        type: 'text',
        text: draft.trim(),
        category,
        time: formatTime(),
      },
    ])
    setDraft('')

    if (nextCount >= messageLimit) {
      deliverCoachReply(id, nextCount === 1)
    }
  }

  function unlockBonus({ rating, review }) {
    const reward = Math.max(
      1,
      Number(platformSettings.feedbackRewards?.freeMessages) ||
        Number(content.feedback.rewardMessages) ||
        1,
    )
    bonusUnlockedRef.current = true
    setBonusUnlocked(true)
    setMessageLimit((prev) => prev + reward)
    setFeedbackOpen(false)
    setMessages((prev) => [
      ...prev,
      {
        id: `bonus-${Date.now()}`,
        role: 'coach',
        type: 'text',
        text: `Thanks for the ${rating}-star feedback${
          review ? ` — “${review.slice(0, 80)}${review.length > 80 ? '…' : ''}”` : ''
        }. ${reward} bonus question${reward === 1 ? '' : 's'} unlocked. Ask when you're ready.`,
        time: formatTime(),
      },
    ])
  }

  return (
    <DashboardPage className="flex min-h-[calc(100vh-8rem)] flex-col">
      <DashboardPageHeader
        title={pageTitle}
        subtitle="Free consultation with Coach Sam"
        backTo="/dashboard"
      />

      {phase === 'intro' ? (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start xl:gap-10">
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/90 via-white to-white p-7 shadow-sm sm:p-8">
              <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand-100/60 blur-2xl" />
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold text-brand-800 ring-1 ring-brand-200">
                <Shield size={13} />
                Free Consultation
              </span>
              <h2 className="mt-4 max-w-md text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welcome to Your Free Session
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
                Get personalized divorce guidance from Coach Sam. Your
                consultation is completely confidential and tailored to your
                situation.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-2.5 text-base font-bold text-slate-900">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Shield size={17} />
                </span>
                {terms.modalTitle}
              </div>
              <ul className="mt-5 space-y-3.5 text-sm text-slate-600 sm:text-[0.925rem]">
                {terms.points.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-brand-100 text-[9px] text-brand-700">
                      ●
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <label
                className={`mt-6 flex cursor-pointer items-start gap-3 rounded-2xl p-4 ring-1 transition-colors ${
                  accepted
                    ? 'bg-brand-50/80 ring-brand-200'
                    : 'bg-slate-50 ring-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 h-4.5 w-4.5 rounded border-slate-300 accent-brand-500 text-brand-500 focus:ring-brand-400"
                />
                <span className="text-sm leading-relaxed text-slate-600">
                  {terms.acceptanceText}
                </span>
              </label>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <div className="rounded-3xl bg-brand-500 p-6 text-white shadow-lg shadow-brand-500/25">
              <div className="flex items-start gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                  <MessageCircle size={19} />
                </span>
                <div>
                  <p className="text-sm font-bold sm:text-base">
                    {terms.previewCaption}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">
                    Additional messages available with subscription
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={!accepted}
                onClick={startConsultation}
                className={`mt-6 w-full rounded-2xl py-4 text-sm font-bold transition-all sm:text-base ${
                  accepted
                    ? 'bg-white text-brand-700 shadow-sm hover:-translate-y-0.5 hover:shadow-md'
                    : 'cursor-not-allowed bg-white/30 text-white/70'
                }`}
              >
                {terms.actionButtonText}
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-slate-900">What to expect</p>
              <ol className="mt-4 space-y-3.5 text-sm text-slate-600">
                {[
                  'Share your question clearly',
                  'Coach Sam reviews your situation',
                  'Receive structured guidance within 12 hours',
                ].map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      ) : (
        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
          <div className="flex min-h-0 min-w-0 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto pb-4">
              {messages.map((msg) => {
                if (msg.role === 'coach') {
                  return (
                    <div key={msg.id} className="flex items-start gap-2.5">
                      <CoachAvatar />
                      <div className="min-w-0 max-w-[min(100%,42rem)]">
                        <p className="mb-1 text-xs font-semibold text-slate-500">
                          Coach Sam
                        </p>
                        {msg.type === 'video' ? (
                          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="relative grid aspect-video max-h-56 place-items-center bg-gradient-to-br from-brand-100 to-brand-50 sm:max-h-64">
                              <button
                                type="button"
                                className="grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-white shadow-lg"
                                aria-label="Play welcome video"
                              >
                                <Play
                                  size={22}
                                  fill="currentColor"
                                  className="ml-0.5"
                                />
                              </button>
                            </div>
                            <div className="p-3.5">
                              <p className="text-sm font-semibold text-slate-800">
                                {msg.title}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                Duration: {msg.duration}
                              </p>
                            </div>
                          </div>
                        ) : msg.type === 'rich' ? (
                          <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                            <p className="text-sm leading-relaxed text-slate-700">
                              {msg.intro}
                            </p>
                            <div className="mt-3 space-y-3">
                              {msg.sections.map((section) => (
                                <div key={section.title}>
                                  <p className="text-sm font-bold text-brand-700">
                                    {section.title}
                                  </p>
                                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                    {section.body}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
                            {msg.text}
                          </div>
                        )}
                        <p className="mt-1 text-[11px] text-slate-400">
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  )
                }

                return (
                  <div
                    key={msg.id}
                    className="flex items-start justify-end gap-2.5"
                  >
                    <div className="min-w-0 max-w-[min(100%,42rem)] text-right">
                      <div className="rounded-2xl rounded-tr-md bg-brand-500 px-4 py-3 text-left text-sm leading-relaxed text-white shadow-sm">
                        {msg.text}
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {msg.time}
                      </p>
                    </div>
                    <UserAvatar />
                  </div>
                )
              })}

              {userMessageCount === 0 && (
                <div className="rounded-3xl border border-dashed border-brand-200 bg-gradient-to-b from-white to-brand-50/40 px-6 py-10 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/25">
                    <MessageCircle size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    Ask Your Free Question
                  </h3>
                  <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
                    Based on your assessment, ask 1 question about your
                    situation. You will receive a response within 12 hours.
                  </p>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {!sessionComplete && userMessageCount === 0 && (
              <div className="mb-4">
                <p className="mb-3 text-sm font-bold text-slate-800">
                  What is your question about?
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {categories.map((item) => {
                    const Icon = item.icon
                    const active = category === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCategory(item.id)}
                        className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left text-sm font-bold transition-all ${
                          active
                            ? 'border-brand-500 bg-brand-500 text-white shadow-sm shadow-brand-500/25'
                            : 'border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm'
                        }`}
                      >
                        <Icon size={16} />
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <form
              onSubmit={sendQuestion}
              className="shrink-0 border-t border-slate-200/80 pt-4"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-shadow focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
                <div className="relative">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value.slice(0, 250))}
                    disabled={sessionComplete}
                    rows={3}
                    placeholder={
                      sessionComplete
                        ? awaitingReply
                          ? 'Session complete - awaiting response'
                          : 'Session complete - no more messages'
                        : chat.composerPlaceholder || 'Write your question here...'
                    }
                    className="w-full resize-none rounded-xl bg-transparent px-3 py-2.5 text-sm leading-relaxed text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-3 pt-2.5 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      {sessionComplete
                        ? 'Session completed - awaiting response'
                        : 'Free session active'}
                    </span>
                    {!sessionComplete && (
                      <span className="text-[11px] text-slate-400">
                        {draft.length}/250
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={sessionComplete || !draft.trim()}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-sm font-bold text-white shadow-sm shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                  >
                    Send
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <SessionStatus
              messageCount={userMessageCount}
              messageLimit={messageLimit}
              progress={progress}
              bonusUnlocked={bonusUnlocked}
              awaiting={awaitingReply}
            />
          </aside>
        </div>
      )}

      <SessionFeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        onSubmit={unlockBonus}
        copy={content.feedback}
      />
    </DashboardPage>
  )
}
