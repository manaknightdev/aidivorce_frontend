import {
  Users,
  CreditCard,
  UserRound,
  MessagesSquare,
  CalendarPlus,
  TrendingUp,
  Minus,
} from 'lucide-react'
import {
  ADMIN_OVERVIEW,
  ADMIN_SESSIONS,
  ADMIN_DISTRIBUTION,
  ADMIN_WEEKLY_SESSIONS,
} from '../../data/adminPortal'

const overviewIcons = {
  users: Users,
  card: CreditCard,
  user: UserRound,
}

const sessionIcons = {
  chat: MessagesSquare,
  calendar: CalendarPlus,
}

const maxWeekly = Math.max(...ADMIN_WEEKLY_SESSIONS.map((d) => d.count))

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Welcome back! Here&apos;s an overview of your platform.
      </p>

      <p className="mt-8 text-xs font-bold tracking-wide text-slate-400 uppercase">
        Platform Overview
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ADMIN_OVERVIEW.map((card) => {
          const Icon = overviewIcons[card.icon]
          return (
            <article
              key={card.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                    {card.value}
                  </p>
                  <p
                    className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                      card.trendUp
                        ? 'text-brand-700'
                        : card.trendUp === false
                          ? 'text-rose-600'
                          : 'text-slate-400'
                    }`}
                  >
                    {card.trendUp ? (
                      <TrendingUp size={13} />
                    ) : (
                      <Minus size={13} />
                    )}
                    {card.trend}
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </span>
              </div>
            </article>
          )
        })}
      </div>

      <p className="mt-8 text-xs font-bold tracking-wide text-slate-400 uppercase">
        Session Overview
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {ADMIN_SESSIONS.map((card) => {
          const Icon = sessionIcons[card.icon]
          return (
            <article
              key={card.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                    {card.value}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    {card.hint}
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </span>
              </div>
            </article>
          )
        })}
      </div>

      <p className="mt-8 text-xs font-bold tracking-wide text-slate-400 uppercase">
        Platform Metrics
      </p>
      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900">User Distribution</h2>
          <div className="mt-5 space-y-4">
            {ADMIN_DISTRIBUTION.map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">{row.label}</span>
                  <span className="font-bold text-slate-900">
                    {row.percent}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      row.tone === 'brand' ? 'bg-brand-500' : 'bg-slate-300'
                    }`}
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900">
            Sessions This Week
          </h2>
          <div className="mt-5 space-y-3">
            {ADMIN_WEEKLY_SESSIONS.map((row) => (
              <div key={row.day} className="flex items-center gap-3">
                <span className="w-8 text-xs font-bold text-slate-500">
                  {row.day}
                </span>
                <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${(row.count / maxWeekly) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-xs font-bold text-slate-700">
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
