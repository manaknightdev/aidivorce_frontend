import { Link } from 'react-router-dom'
import { Video, FileText, Clock3 } from 'lucide-react'
import { COACH_CALENDAR_SESSIONS } from '../../data/coachPortal'

export default function CoachCalendar() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Calendar
      </h1>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div>
          <p className="text-sm font-bold text-slate-900">
            Your scheduled 1-on-1 sessions
          </p>
          <p className="mt-0.5 text-sm text-slate-500">5 Approved</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
            Confirmed
          </span>
          <Link
            to="/coach/calendar/pending"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand-500/25 transition-colors hover:bg-brand-600"
          >
            <Clock3 size={15} />
            View Pending Approvals
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold">
              3
            </span>
          </Link>
        </div>
      </div>

      <ul className="mt-5 space-y-4">
        {COACH_CALENDAR_SESSIONS.map((session) => (
          <li
            key={session.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={session.avatar}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">
                    {session.name}
                  </p>
                  <p className="text-xs text-slate-500">{session.location}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-brand-700 uppercase ring-1 ring-brand-100">
                {session.badge}
              </span>
            </div>

            <p className="mt-4 text-sm font-bold text-brand-600">
              {session.when}
            </p>
            <p className="mt-1 text-sm text-slate-600">{session.service}</p>
            <p className="mt-2 text-xs text-slate-400">
              Intake form submitted · Review before joining Zoom
            </p>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                <Video size={16} />
                Join Zoom
              </button>
              <Link
                to={`/coach/calendar/${session.id}/assessment`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-300 hover:bg-brand-50"
              >
                <FileText size={16} />
                Assessment
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to="/coach/calendar/pending"
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-brand-300 bg-brand-50 py-4 text-sm font-bold text-brand-800 shadow-sm transition-colors hover:border-brand-400 hover:bg-brand-100"
      >
        <Clock3 size={18} />
        View Pending Approvals
        <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
          3 waiting
        </span>
      </Link>
    </div>
  )
}
