import { Link } from 'react-router-dom'
import {
  Inbox,
  CalendarDays,
  Bell,
  Star,
  Plus,
  ArrowRight,
} from 'lucide-react'
import {
  COACH_STATS,
  COACH_TODAY_SESSIONS,
  COACH_ALERTS,
} from '../../data/coachPortal'

function StatCard({ stat }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm text-slate-500">{stat.label}</p>
      <div className="mt-2 flex items-center gap-2">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          {stat.value}
        </p>
        {stat.badgeTone === 'star' ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 ring-1 ring-amber-100">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {stat.badge}
          </span>
        ) : (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
              stat.badgeTone === 'green'
                ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-100'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {stat.badge}
          </span>
        )}
      </div>
    </div>
  )
}

export default function CoachDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Coach Dashboard
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage your coaching sessions and track your activity
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {COACH_STATS.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          to="/coach/inbox"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
        >
          <Inbox size={18} />
          Inbox
        </Link>
        <Link
          to="/coach/calendar"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
        >
          <CalendarDays size={18} />
          Calendar
        </Link>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-brand-600" />
            <h2 className="text-base font-bold text-slate-900">
              Today&apos;s Sessions
            </h2>
          </div>

          <ul className="mt-4 space-y-3">
            {COACH_TODAY_SESSIONS.map((session) => (
              <li
                key={session.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-3.5 py-3"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {session.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">
                    {session.name}
                  </p>
                  <p className="text-xs text-slate-500">{session.type}</p>
                </div>
                <p className="text-sm font-bold text-brand-600">
                  {session.time}
                </p>
                <button
                  type="button"
                  className="rounded-lg bg-brand-500 px-3.5 py-2 text-xs font-bold text-white hover:bg-brand-600"
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-brand-600" />
            <h2 className="text-base font-bold text-slate-900">Recent Alerts</h2>
          </div>

          <ul className="mt-4 space-y-4">
            {COACH_ALERTS.map((alert) => (
              <li key={alert.id} className="flex gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                  {alert.kind === 'session' ? (
                    <Plus size={14} />
                  ) : (
                    <Star size={14} />
                  )}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900">
                      {alert.title}
                    </p>
                    <p className="text-xs text-slate-400">{alert.time}</p>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {alert.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            to="/coach/notifications"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800"
          >
            View all alerts
            <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </div>
  )
}
