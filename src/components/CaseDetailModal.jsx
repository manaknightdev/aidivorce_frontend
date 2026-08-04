import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ClipboardList,
  List,
  MessageCircle,
  User,
  ChevronDown,
  Plus,
  RefreshCw,
} from 'lucide-react'

export const caseDetails = {
  parenting: {
    id: 'parenting',
    title: 'Parenting',
    description: 'Custody, schedule, communication',
    entryCount: 3,
    lastUpdated: 'March 18',
    metaNote: 'Notes with linked follow-up questions',
    overview:
      'Custody and communication need structuring to reduce conflict and ensure consistency for your children.',
    overviewAlternatives: [
      'Pickup reliability and clearer shared schedules stand out as the main opportunities to lower stress for the kids.',
      'Documented communication and a predictable parenting plan would strengthen your position and day-to-day stability.',
      'Focus next on written agreements around custody changes so expectations stay consistent between households.',
    ],
    groups: [
      {
        date: 'March 18',
        entries: [
          {
            id: 'p-n1',
            type: 'note',
            text: 'My spouse frequently changes pickup times without notice, which is confusing for the kids.',
            followUp: {
              progress: '1 of 1 answered',
              question:
                'Have you documented these schedule changes in writing?',
            },
          },
        ],
      },
      {
        date: 'March 17',
        entries: [
          {
            id: 'p-q1',
            type: 'question',
            text: 'What are my rights if my spouse violates the custody agreement?',
            response:
              'You can document the violations and request enforcement through mediation or court. Keep a dated record of each incident.',
          },
        ],
      },
      {
        date: 'March 15',
        entries: [
          {
            id: 'p-n2',
            type: 'note',
            text: 'Initial assessment completed — shared parenting goals and current schedule captured.',
          },
        ],
      },
    ],
  },
  finance: {
    id: 'finance',
    title: 'Finance',
    description: 'Income, expenses, support',
    entryCount: 4,
    lastUpdated: 'March 16',
    metaNote: 'Income and support notes tracked',
    overview:
      'Household income and monthly obligations are being mapped so support and budgets can be planned with clearer numbers.',
    overviewAlternatives: [
      'Gathering income proof and listing joint debts will make support and budget conversations more concrete.',
      'Your notes point to uneven day-to-day spending — clarifying who covers what can reduce friction early.',
      'Child support estimates and a shared expense list look like the highest-impact next steps in this section.',
    ],
    groups: [
      {
        date: 'March 16',
        entries: [
          {
            id: 'f-n1',
            type: 'note',
            text: 'Started a monthly budget outline covering housing, childcare, and debt payments.',
            followUp: {
              progress: '2 of 2 answered',
              question: 'Do you have pay stubs from the last 3 months?',
            },
          },
          {
            id: 'f-q1',
            type: 'question',
            text: 'How is child support typically calculated in my province?',
            response:
              'Support is usually guided by federal/provincial tables based on income, parenting time, and special expenses. Your coach can walk through an estimate once income docs are in.',
          },
        ],
      },
      {
        date: 'March 14',
        entries: [
          {
            id: 'f-n2',
            type: 'note',
            text: 'Listed joint credit cards and the current balances on each account.',
          },
          {
            id: 'f-n3',
            type: 'note',
            text: 'Noted that one spouse handles most day-to-day household expenses.',
          },
        ],
      },
    ],
  },
  property: {
    id: 'property',
    title: 'Property & Assets',
    description: 'Home, savings, division',
    entryCount: 0,
    lastUpdated: '—',
    metaNote: 'No information added yet',
    overview:
      'Add details about your home, savings, and other assets so we can help you think through fair division options.',
    overviewAlternatives: [
      'Start with the family home, bank accounts, and retirement savings to build a complete asset picture.',
      'Once major assets are listed, we can help flag what may be considered shared versus individual property.',
      'Add valuations or approximate values where you can — even rough numbers improve division planning.',
    ],
    groups: [],
  },
  docs: {
    id: 'docs',
    title: 'Documentations & Formalities',
    description: 'Court, agreements, procedures',
    entryCount: 2,
    lastUpdated: 'March 12',
    metaNote: 'Checklist and agreement notes',
    overview:
      'Key formal steps are underway. Keep gathering agreements and court-related documents so nothing is missed in your filing timeline.',
    overviewAlternatives: [
      'Your checklist is a strong start — prioritize missing agreements and financial disclosure next.',
      'Filing readiness improves as marriage, parenting, and financial documents come together in one place.',
      'Consider a short legal review once your core paperwork set is complete, especially if issues are contested.',
    ],
    groups: [
      {
        date: 'March 12',
        entries: [
          {
            id: 'd-n1',
            type: 'note',
            text: 'Created a document checklist: marriage certificate, financial statements, and parenting plan draft.',
            followUp: {
              progress: '1 of 2 answered',
              question: 'Have you received a copy of any existing separation agreement?',
            },
          },
        ],
      },
      {
        date: 'March 10',
        entries: [
          {
            id: 'd-q1',
            type: 'question',
            text: 'Do I need a lawyer to file for divorce in my province?',
            response:
              'You can often file independently, but legal review is recommended when assets, support, or parenting issues are contested. A coach can help you decide when counsel is worth it.',
          },
        ],
      },
    ],
  },
  general: {
    id: 'general',
    title: 'General / Not Sure',
    description: 'AI will place it in the right category',
    entryCount: 0,
    lastUpdated: '—',
    metaNote: 'Unsorted entries appear here first',
    overview:
      'Drop anything you are unsure about here. Sam will suggest the best case section once enough context is available.',
    overviewAlternatives: [
      'Unsorted notes help capture context quickly — Sam can re-home them once patterns are clearer.',
      'Add whatever is on your mind; categorization can wait until you have a fuller picture.',
      'This section is a holding place so nothing important gets lost while you organize your case.',
    ],
    groups: [],
  },
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'notes', label: 'Notes' },
  { id: 'questions', label: 'Questions' },
]

function NoteCard({ entry, followUpOpen, onToggleFollowUp }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-600">
            <List size={14} />
          </span>
          Note
        </div>
        <button
          type="button"
          className="text-sm font-medium text-slate-500 transition-colors hover:text-brand-600"
        >
          Edit
        </button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{entry.text}</p>

      {entry.followUp && (
        <div className="mt-3 rounded-xl bg-brand-50/80 p-3 ring-1 ring-brand-100">
          <button
            type="button"
            onClick={onToggleFollowUp}
            className="flex w-full items-center justify-between gap-2 text-left"
          >
            <span>
              <span className="block text-sm font-semibold text-slate-800">
                Generated Follow-Up Question
              </span>
              <span className="mt-0.5 block text-xs text-slate-500">
                {entry.followUp.progress}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-600">
              View
              <ChevronDown
                size={14}
                className={`transition-transform ${followUpOpen ? 'rotate-180' : ''}`}
              />
            </span>
          </button>
          <AnimatePresence initial={false}>
            {followUpOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="mt-2 border-t border-brand-100 pt-2 text-sm leading-relaxed text-slate-600"
              >
                {entry.followUp.question}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

function QuestionCard({ entry }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-600">
          <MessageCircle size={14} />
        </span>
        Question
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{entry.text}</p>

      {entry.response && (
        <div className="mt-3 rounded-xl bg-brand-50 p-3 ring-1 ring-brand-100">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-brand-700">
              <User size={14} />
            </span>
            Response (Coach)
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {entry.response}
          </p>
        </div>
      )}
    </div>
  )
}

export default function CaseDetailModal({ open, sectionId, onClose, onAdd }) {
  const [filter, setFilter] = useState('all')
  const [openFollowUps, setOpenFollowUps] = useState({})
  const [overviewText, setOverviewText] = useState('')
  const [regenerating, setRegenerating] = useState(false)

  const detail = sectionId ? caseDetails[sectionId] : null

  useEffect(() => {
    if (!open || !sectionId) return
    const next = caseDetails[sectionId]
    if (!next) return
    setFilter('all')
    setOpenFollowUps({})
    setOverviewText(next.overview)
    setRegenerating(false)
  }, [open, sectionId])

  function regenerateOverview() {
    if (!detail || regenerating) return
    const options = [
      detail.overview,
      ...(detail.overviewAlternatives || []),
    ].filter(Boolean)
    setRegenerating(true)
    window.setTimeout(() => {
      const others = options.filter((text) => text !== overviewText)
      const next =
        others[Math.floor(Math.random() * others.length)] || detail.overview
      setOverviewText(next)
      setRegenerating(false)
    }, 700)
  }

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

  const filteredGroups = useMemo(() => {
    if (!detail) return []
    return detail.groups
      .map((group) => ({
        ...group,
        entries: group.entries.filter((entry) => {
          if (filter === 'notes') return entry.type === 'note'
          if (filter === 'questions') return entry.type === 'question'
          return true
        }),
      }))
      .filter((group) => group.entries.length > 0)
  }, [detail, filter])

  return (
    <AnimatePresence>
      {open && detail && (
        <div className="fixed inset-0 z-[60] flex justify-end">
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
            aria-labelledby="case-detail-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-xl [contain:layout_paint]"
          >
            <div className="shrink-0 border-b border-slate-100 px-5 pt-5 pb-4 sm:px-7">
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>

              <h2
                id="case-detail-title"
                className="mt-4 text-2xl font-bold tracking-tight text-slate-900"
              >
                {detail.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{detail.description}</p>

              <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-400">
                {detail.entryCount}{' '}
                {detail.entryCount === 1 ? 'entry' : 'entries'} · Last updated{' '}
                {detail.lastUpdated} · {detail.metaNote}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                    <ClipboardList size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Section Overview
                        </p>
                        <p className="text-xs text-slate-400">
                          Based on your entries
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={regenerateOverview}
                        disabled={regenerating}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <RefreshCw
                          size={13}
                          className={regenerating ? 'animate-spin' : ''}
                        />
                        {regenerating ? 'Regenerating…' : 'Regenerate'}
                      </button>
                    </div>
                  </div>
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed text-slate-600 transition-opacity ${
                    regenerating ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  {regenerating
                    ? 'Updating overview from your latest entries…'
                    : overviewText}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {filters.map((item) => {
                  const active = filter === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilter(item.id)}
                      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-brand-500 text-white'
                          : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:bg-brand-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>

              <div className="relative mt-6 space-y-8">
                {filteredGroups.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-5 py-10 text-center">
                    <p className="text-sm font-medium text-slate-700">
                      No {filter === 'all' ? 'entries' : filter} yet
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Add information to start building this section.
                    </p>
                  </div>
                ) : (
                  filteredGroups.map((group, groupIndex) => (
                    <div key={group.date} className="relative pl-6">
                      {groupIndex < filteredGroups.length - 1 && (
                        <span className="absolute top-3 left-[7px] h-[calc(100%+2rem)] w-px bg-slate-200" />
                      )}
                      <span className="absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-white ring-2 ring-slate-300" />
                      <p className="text-sm font-medium text-slate-400">
                        {group.date}
                      </p>
                      <div className="mt-3 space-y-3">
                        {group.entries.map((entry) =>
                          entry.type === 'note' ? (
                            <NoteCard
                              key={entry.id}
                              entry={entry}
                              followUpOpen={!!openFollowUps[entry.id]}
                              onToggleFollowUp={() =>
                                setOpenFollowUps((prev) => ({
                                  ...prev,
                                  [entry.id]: !prev[entry.id],
                                }))
                              }
                            />
                          ) : (
                            <QuestionCard key={entry.id} entry={entry} />
                          ),
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={() => onAdd?.(detail)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-sm font-bold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white hover:shadow-md"
              >
                <Plus size={16} strokeWidth={2.5} />
                Add Information
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
