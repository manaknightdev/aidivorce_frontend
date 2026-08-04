import { Link } from 'react-router-dom'
import {
  MessagesSquare,
  Video,
  Check,
  CalendarDays,
} from 'lucide-react'
import DashboardPage from '../components/DashboardPage'
import DashboardPageHeader from '../components/DashboardPageHeader'

const SESSIONS = [
  {
    id: 'text-consult',
    title: 'Free Text Consultation',
    status: 'completed',
    icon: MessagesSquare,
    rows: [
      { label: 'Date', value: 'August 10, 2025' },
      { label: 'Type', value: 'Text Session (Free – 1 message)' },
      { label: 'Province', value: 'Ontario' },
      { label: 'Questions Asked', value: '1 of 1' },
      { label: 'Coach Response Time', value: '12 hours' },
    ],
    action: {
      label: 'View Conversation',
      to: '/dashboard/session',
    },
  },
  {
    id: 'live-call',
    title: '1-on-1 Live Call',
    status: 'scheduled',
    icon: Video,
    rows: [
      { label: 'Date', value: 'August 12, 2025' },
      { label: 'Type', value: 'Paid Zoom Session' },
      { label: 'Duration', value: '45 minutes' },
      { label: 'Scheduled', value: 'Aug 12, 1:30 PM' },
    ],
    action: {
      label: 'View Booking Details',
      to: '/dashboard/book',
    },
  },
]

function StatusBadge({ status }) {
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700">
        <Check size={12} strokeWidth={2.5} />
        Completed
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
      <CalendarDays size={12} strokeWidth={2.5} />
      Scheduled
    </span>
  )
}

function SessionCard({ session }) {
  const Icon = session.icon

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500 text-white shadow-sm shadow-brand-500/25">
            <Icon size={20} strokeWidth={2} />
          </span>
          <div className="min-w-0 pt-0.5">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              {session.title}
            </h2>
            <div className="mt-2">
              <StatusBadge status={session.status} />
            </div>
          </div>
        </div>
      </div>

      <dl className="mt-5 flex-1 divide-y divide-slate-100 border-t border-slate-100">
        {session.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 py-2.5"
          >
            <dt className="text-sm text-slate-500">{row.label}</dt>
            <dd className="text-right text-sm font-semibold text-slate-800">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <Link
        to={session.action.to}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
      >
        {session.action.label}
      </Link>
    </article>
  )
}

export default function History() {
  return (
    <DashboardPage>
      <DashboardPageHeader
        title="Session History"
        subtitle="View your completed and scheduled coaching sessions."
        backTo="/dashboard"
      />

      <div className="grid gap-5 md:grid-cols-2">
        {SESSIONS.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </DashboardPage>
  )
}
