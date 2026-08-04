import { useMemo, useState } from 'react'
import {
  Users,
  Star,
  Clock3,
  AlertTriangle,
  TrendingUp,
  Percent,
  Download,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Check,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  ADMIN_SUBSCRIPTION_STATS,
  ADMIN_SUBSCRIPTION_METRICS,
  ADMIN_SUBSCRIPTIONS,
} from '../../data/adminSubscriptions'

const selectClass =
  'appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat [background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")]'

const statIcons = {
  users: Users,
  star: Star,
  clock: Clock3,
  alert: AlertTriangle,
}

const metricIcons = {
  chart: TrendingUp,
  percent: Percent,
}

function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-brand-50 text-brand-800 ring-brand-100',
    Trial: 'bg-sky-50 text-sky-800 ring-sky-100',
    Expiring: 'bg-amber-50 text-amber-800 ring-amber-100',
    Cancelled: 'bg-slate-100 text-slate-500 ring-slate-200',
  }
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${
        styles[status] || styles.Cancelled
      }`}
    >
      {status}
    </span>
  )
}

function RenewalCell({ value }) {
  const map = {
    'Auto-renew': {
      icon: Check,
      className: 'text-brand-700',
    },
    Pending: {
      icon: Clock3,
      className: 'text-amber-700',
    },
    Manual: {
      icon: RefreshCw,
      className: 'text-slate-600',
    },
    Cancelled: {
      icon: X,
      className: 'text-slate-400',
    },
  }
  const conf = map[value] || map.Manual
  const Icon = conf.icon
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${conf.className}`}>
      <Icon size={13} />
      {value}
    </span>
  )
}

export default function AdminSubscriptions() {
  const [rows] = useState(ADMIN_SUBSCRIPTIONS)
  const [query, setQuery] = useState('')
  const [planFilter, setPlanFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [toast, setToast] = useState('')
  const [viewRow, setViewRow] = useState(null)

  function flash(msg) {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((row) => {
      if (
        q &&
        !row.name.toLowerCase().includes(q) &&
        !row.email.toLowerCase().includes(q)
      ) {
        return false
      }
      if (planFilter !== 'all' && row.variant !== planFilter) return false
      if (statusFilter !== 'all' && row.status !== statusFilter) return false
      return true
    })
  }, [rows, query, planFilter, statusFilter])

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Subscriptions
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage subscription plans and service purchases
          </p>
        </div>
        <button
          type="button"
          onClick={() => flash('Export started for subscription data.')}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand-500/25 hover:bg-brand-600"
        >
          <Download size={16} />
          Export Data
        </button>
      </div>

      {toast && (
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
          {toast}
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {ADMIN_SUBSCRIPTION_STATS.map((stat) => {
          const Icon = statIcons[stat.icon]
          return (
            <div
              key={stat.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{stat.hint}</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={16} />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {ADMIN_SUBSCRIPTION_METRICS.map((metric) => {
          const Icon = metricIcons[metric.icon]
          return (
            <div
              key={metric.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{metric.hint}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                    <TrendingUp size={13} />
                    {metric.trend}
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-bold text-slate-900">Subscriptions</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Users with active subscription plans.
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className={selectClass}
                aria-label="Filter by plan variant"
              >
                <option value="all">All Plans</option>
                <option value="Monthly">Monthly</option>
                <option value="Annual">Annual</option>
                <option value="3 Months">3 Months</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={selectClass}
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Trial">Trial</option>
                <option value="Expiring">Expiring</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <SlidersHorizontal size={15} />
                More Filters
              </button>
            </div>
            <label className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-800 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                <th className="px-5 py-3 font-bold">User</th>
                <th className="px-4 py-3 font-bold">Plan</th>
                <th className="px-4 py-3 font-bold">Plan Variant</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold">Trial Status</th>
                <th className="px-4 py-3 font-bold">Usage</th>
                <th className="px-4 py-3 font-bold">Renewal Type</th>
                <th className="px-4 py-3 font-bold">Expiry Date</th>
                <th className="px-4 py-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No subscriptions match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={row.avatar}
                          alt=""
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{row.name}</p>
                          <p className="text-xs text-slate-500">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">{row.plan}</p>
                      <p className="text-xs text-slate-500">{row.planPrice}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-700">{row.variant}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="max-w-48 px-4 py-4 text-xs leading-relaxed text-slate-600">
                      {row.trialStatus}
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">{row.usage}</p>
                      <p className="text-xs text-slate-500">{row.usageLabel}</p>
                    </td>
                    <td className="px-4 py-4">
                      <RenewalCell value={row.renewal} />
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">{row.expiry}</p>
                      <p className="text-xs text-slate-500">{row.expiryHint}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setViewRow(row)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                          aria-label="View"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            flash(`Edit form for ${row.name} coming next.`)
                          }
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3">
          <p className="text-xs text-slate-500">
            Showing 1 to {filtered.length} of 847 subscribers
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              className="grid h-8 min-w-8 place-items-center rounded-lg bg-brand-500 px-2 text-xs font-bold text-white"
            >
              1
            </button>
            <button
              type="button"
              className="grid h-8 min-w-8 place-items-center rounded-lg px-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              2
            </button>
            <button
              type="button"
              className="grid h-8 min-w-8 place-items-center rounded-lg px-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              3
            </button>
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label="Next"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {viewRow && (
        <div className="fixed inset-0 z-80 flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Close"
            onClick={() => setViewRow(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-900">
                Subscription details
              </h2>
              <button
                type="button"
                onClick={() => setViewRow(null)}
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4 px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={viewRow.avatar}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900">{viewRow.name}</p>
                  <p className="text-sm text-slate-500">{viewRow.email}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Plan', viewRow.plan],
                  ['Price', viewRow.planPrice],
                  ['Variant', viewRow.variant],
                  ['Status', viewRow.status],
                  ['Trial', viewRow.trialStatus],
                  ['Usage', `${viewRow.usage} ${viewRow.usageLabel}`],
                  ['Renewal', viewRow.renewal],
                  ['Expiry', `${viewRow.expiry} · ${viewRow.expiryHint}`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-slate-50 px-3.5 py-3"
                  >
                    <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewRow(null)}
                  className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
