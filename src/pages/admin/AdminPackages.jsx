import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Package,
  CheckCircle2,
  RefreshCw,
  Briefcase,
  Plus,
  Search,
  Download,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Star,
  X,
} from 'lucide-react'
import {
  getAdminPackages,
  subscribeAdminPackages,
  updateAdminPackage,
  deleteAdminPackage,
  getPackageStats,
} from '../../data/adminPackages'

const selectClass =
  'appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat [background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")]'

const statIcons = {
  box: Package,
  check: CheckCircle2,
  refresh: RefreshCw,
  briefcase: Briefcase,
}

function money(value) {
  if (value == null || value === '') return '—'
  const n = Number(value)
  if (Number.isNaN(n)) return '—'
  if (n === 0) return '$0'
  return `$${n % 1 === 0 ? n : n.toFixed(2)}`
}

function StatusToggle({ checked, onChange, label }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`text-xs font-bold ${
          checked ? 'text-brand-800' : 'text-slate-400'
        }`}
      >
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label}`}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-brand-500' : 'bg-slate-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

function TagBadge({ tag }) {
  if (!tag) return null
  return (
    <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 uppercase">
      {tag}
    </span>
  )
}

function RowActions({ onEdit, onDelete, featured, onToggleFeatured }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onEdit}
        className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        aria-label="Edit"
      >
        <Pencil size={15} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"
        aria-label="Delete"
      >
        <Trash2 size={15} />
      </button>
      <button
        type="button"
        onClick={onToggleFeatured}
        className={`grid h-8 w-8 place-items-center rounded-lg ${
          featured
            ? 'text-amber-500 hover:bg-amber-50'
            : 'text-slate-400 hover:bg-slate-100 hover:text-amber-500'
        }`}
        aria-label={featured ? 'Unmark featured' : 'Mark featured'}
      >
        <Star size={15} fill={featured ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}

function ModalShell({ title, onClose, children }) {
  useEffect(() => {
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
  }, [onClose])

  return (
    <div className="fixed inset-0 z-80 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}

function matchesQuery(pkg, q) {
  if (!q) return true
  const hay = [
    pkg.name,
    pkg.tag,
    pkg.description,
    pkg.billingCycle,
    pkg.serviceType,
    pkg.duration,
    pkg.details,
    ...(pkg.featureLines || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return hay.includes(q)
}

export default function AdminPackages() {
  const packages = useSyncExternalStore(
    subscribeAdminPackages,
    getAdminPackages,
    getAdminPackages,
  )
  const navigate = useNavigate()
  const location = useLocation()

  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [toast, setToast] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast)
      window.setTimeout(() => setToast(''), 2400)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  function flash(msg) {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return packages.filter((p) => {
      if (!matchesQuery(p, q)) return false
      if (typeFilter === 'subscription' && p.kind !== 'subscription') return false
      if (typeFilter === 'service' && p.kind !== 'service') return false
      if (statusFilter !== 'all' && p.status !== statusFilter) return false
      return true
    })
  }, [packages, query, typeFilter, statusFilter])

  const subscriptions = filtered.filter((p) => p.kind === 'subscription')
  const services = filtered.filter((p) => p.kind === 'service')
  const stats = getPackageStats(packages)

  function toggleStatus(pkg) {
    const next =
      pkg.status === 'Active'
        ? 'Hidden'
        : pkg.status === 'Draft'
          ? 'Active'
          : 'Active'
    updateAdminPackage(pkg.id, { status: next })
    flash(
      next === 'Active'
        ? `${pkg.name} is now active.`
        : `${pkg.name} status set to ${next}.`,
    )
  }

  function toggleFeatured(pkg) {
    updateAdminPackage(pkg.id, { featured: !pkg.featured })
    flash(
      pkg.featured
        ? `Removed featured mark from ${pkg.name}.`
        : `${pkg.name} marked as featured.`,
    )
  }

  function confirmDelete() {
    if (!deleteTarget) return
    deleteAdminPackage(deleteTarget.id)
    flash(`${deleteTarget.name} deleted.`)
    setDeleteTarget(null)
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Package Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage subscription plans and professional services for your
            platform.
          </p>
        </div>
        <Link
          to="/admin/packages/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand-500/25 hover:bg-brand-600"
        >
          <Plus size={16} />
          Add Package
        </Link>
      </div>

      {toast && (
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
          {toast}
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
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
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={16} />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative min-w-0 flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search packages..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-800 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className={selectClass}
              aria-label="Filter by type"
            >
              <option value="all">All Types</option>
              <option value="subscription">Subscriptions</option>
              <option value="service">Services</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={selectClass}
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Hidden">Hidden</option>
            </select>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
            <button
              type="button"
              onClick={() => flash('Export started for filtered packages.')}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-sm font-bold text-brand-800 hover:bg-brand-100"
            >
              <Download size={15} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      {(typeFilter === 'all' || typeFilter === 'subscription') && (
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Subscription Plans
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Recurring monthly subscriptions with ongoing support
              </p>
            </div>
            <Link
              to="/admin/packages/new?type=subscription"
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2 text-sm font-bold text-brand-800 hover:bg-brand-100"
            >
              <Plus size={15} />
              Add Subscription
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                  <th className="px-5 py-3 font-bold">Name</th>
                  <th className="px-4 py-3 font-bold">Billing Cycle</th>
                  <th className="px-4 py-3 font-bold">Price</th>
                  <th className="px-4 py-3 font-bold">Member Price</th>
                  <th className="px-4 py-3 font-bold">Sessions / Limits</th>
                  <th className="px-4 py-3 font-bold">Features</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      No subscription plans match your filters.
                    </td>
                  </tr>
                ) : (
                  subscriptions.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">{pkg.name}</p>
                        <TagBadge tag={pkg.tag} />
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {pkg.billingCycle}
                      </td>
                      <td className="px-4 py-4 font-bold text-slate-900">
                        {money(pkg.finalPrice)}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {money(pkg.memberPrice)}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">
                          {pkg.sessionLimitLabel}
                        </p>
                        {pkg.sessionLimitSub && (
                          <p className="mt-0.5 text-xs text-slate-500">
                            {pkg.sessionLimitSub}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <ul className="space-y-0.5 text-xs text-slate-600">
                          {(pkg.featureLines || []).slice(0, 2).map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-4">
                        <StatusToggle
                          checked={pkg.status === 'Active'}
                          label={pkg.status}
                          onChange={() => toggleStatus(pkg)}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <RowActions
                          featured={pkg.featured}
                          onEdit={() =>
                            navigate(`/admin/packages/${pkg.id}/edit`)
                          }
                          onDelete={() => setDeleteTarget(pkg)}
                          onToggleFeatured={() => toggleFeatured(pkg)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Professional Services */}
      {(typeFilter === 'all' || typeFilter === 'service') && (
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Professional Services
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                One-time consultation sessions and specialized services
              </p>
            </div>
            <Link
              to="/admin/packages/new?type=service"
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2 text-sm font-bold text-brand-800 hover:bg-brand-100"
            >
              <Plus size={15} />
              Add Service
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                  <th className="px-5 py-3 font-bold">Name</th>
                  <th className="px-4 py-3 font-bold">Type</th>
                  <th className="px-4 py-3 font-bold">Price</th>
                  <th className="px-4 py-3 font-bold">Member Price</th>
                  <th className="px-4 py-3 font-bold">Sessions</th>
                  <th className="px-4 py-3 font-bold">Duration</th>
                  <th className="px-4 py-3 font-bold">Details</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      No professional services match your filters.
                    </td>
                  </tr>
                ) : (
                  services.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">{pkg.name}</p>
                        <TagBadge tag={pkg.tag} />
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {pkg.serviceType}
                      </td>
                      <td className="px-4 py-4 font-bold text-slate-900">
                        {money(pkg.finalPrice)}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {money(pkg.memberPrice)}
                      </td>
                      <td className="px-4 py-4 font-semibold text-slate-800">
                        {pkg.sessionsIncluded || 1}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {pkg.durationMinutes
                          ? `${pkg.durationMinutes} min`
                          : pkg.duration || '—'}
                      </td>
                      <td className="max-w-55 px-4 py-4 text-xs leading-relaxed text-slate-600">
                        {pkg.details}
                      </td>
                      <td className="px-4 py-4">
                        <StatusToggle
                          checked={pkg.status === 'Active'}
                          label={pkg.status}
                          onChange={() => toggleStatus(pkg)}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <RowActions
                          featured={pkg.featured}
                          onEdit={() =>
                            navigate(`/admin/packages/${pkg.id}/edit`)
                          }
                          onDelete={() => setDeleteTarget(pkg)}
                          onToggleFeatured={() => toggleFeatured(pkg)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {deleteTarget && (
        <ModalShell
          title="Delete package?"
          onClose={() => setDeleteTarget(null)}
        >
          <p className="text-sm leading-relaxed text-slate-600">
            Are you sure you want to delete{' '}
            <span className="font-bold text-slate-900">{deleteTarget.name}</span>
            ? This cannot be undone.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-700"
            >
              Delete
            </button>
          </div>
        </ModalShell>
      )}
    </div>
  )
}
