import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Users,
  UserCheck,
  CreditCard,
  UserRound,
  UserPlus,
  Plus,
  Search,
  Download,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Pencil,
  MoreHorizontal,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from 'lucide-react'
import expertImg from '../../assets/expert-headshot.png'
import {
  ADMIN_USER_STATS,
  ADMIN_REGISTERED_USERS,
  ADMIN_GUEST_USERS,
} from '../../data/adminPortal'
import { countries, provinces } from '../../data/locations'

const emptyAddForm = () => ({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: 'CA',
  region: '',
  role: 'Client',
  status: 'Active',
  subscribed: false,
})

const selectClass =
  'appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat [background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")]'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100'

const statIcons = {
  users: Users,
  check: UserCheck,
  card: CreditCard,
  user: UserRound,
  guest: UserPlus,
}

function AssessmentPill({ value }) {
  if (value === 'Completed') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-800 ring-1 ring-brand-100">
        <Check size={11} strokeWidth={3} />
        Completed
      </span>
    )
  }
  if (value === 'Pending') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 ring-1 ring-amber-100">
        <X size={11} strokeWidth={3} />
        Pending
      </span>
    )
  }
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
      N/A
    </span>
  )
}

function StatusPill({ value }) {
  if (value === 'Active') {
    return (
      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-800 ring-1 ring-brand-100">
        Active
      </span>
    )
  }
  if (value === 'Expired') {
    return (
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
        Expired
      </span>
    )
  }
  return (
    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 ring-1 ring-rose-100">
      Inactive
    </span>
  )
}

function RolePill({ role }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
        role === 'Coach'
          ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-100'
          : 'bg-sky-50 text-sky-800 ring-1 ring-sky-100'
      }`}
    >
      {role}
    </span>
  )
}

function ModalShell({ title, onClose, children, wide }) {
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
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-modal-title"
        className={`relative w-full ${wide ? 'max-w-xl' : 'max-w-lg'} rounded-2xl border border-slate-200 bg-white shadow-xl`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <h2
            id="user-modal-title"
            className="text-lg font-bold text-slate-900"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3.5 py-3">
      <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">
        {label}
      </p>
      <div className="mt-1 text-sm font-semibold text-slate-800">{value}</div>
    </div>
  )
}

function ActionButtons({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function onPointer(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [open])

  return (
    <div className="relative flex items-center gap-1" ref={ref}>
      <button
        type="button"
        onClick={onView}
        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-brand-50 hover:text-brand-700"
        aria-label="View"
      >
        <Eye size={15} />
      </button>
      <button
        type="button"
        onClick={onEdit}
        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-brand-50 hover:text-brand-700"
        aria-label="Edit"
      >
        <Pencil size={15} />
      </button>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        aria-label="More"
        aria-expanded={open}
      >
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <div className="absolute top-full right-0 z-20 mt-1 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onDelete()
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

function Pagination({ label }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3">
      <p className="text-xs text-slate-500">{label}</p>
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
          className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
          aria-label="Next"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}

export default function AdminUsers() {
  const [users, setUsers] = useState(ADMIN_REGISTERED_USERS)
  const [guestUsers, setGuestUsers] = useState(ADMIN_GUEST_USERS)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [subFilter, setSubFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [assessmentFilter, setAssessmentFilter] = useState('all')
  const [selected, setSelected] = useState([])
  const [selectedGuests, setSelectedGuests] = useState([])
  const [toast, setToast] = useState('')

  const [viewTarget, setViewTarget] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [editForm, setEditForm] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [addForm, setAddForm] = useState(emptyAddForm)
  const [addError, setAddError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const regionOptions = useMemo(
    () => provinces[addForm.country] || [],
    [addForm.country],
  )
  const regionLabel = addForm.country === 'CA' ? 'Province' : 'State'

  const registered = useMemo(() => {
    return users.filter((u) => {
      const q = query.trim().toLowerCase()
      if (
        q &&
        !u.name.toLowerCase().includes(q) &&
        !u.email.toLowerCase().includes(q) &&
        !u.id.toLowerCase().includes(q)
      ) {
        return false
      }
      if (roleFilter !== 'all' && u.role !== roleFilter) return false
      if (subFilter === 'yes' && !u.subscribed) return false
      if (subFilter === 'no' && u.subscribed) return false
      if (statusFilter !== 'all' && u.status !== statusFilter) return false
      if (assessmentFilter !== 'all' && u.assessment !== assessmentFilter) {
        return false
      }
      return true
    })
  }, [users, query, roleFilter, subFilter, statusFilter, assessmentFilter])

  const guests = useMemo(() => {
    return guestUsers.filter((g) => {
      const q = query.trim().toLowerCase()
      if (
        q &&
        !g.guestId.toLowerCase().includes(q) &&
        !(g.email || '').toLowerCase().includes(q)
      ) {
        return false
      }
      if (assessmentFilter !== 'all' && g.assessment !== assessmentFilter) {
        return false
      }
      if (statusFilter === 'Active' && g.status !== 'Active') return false
      if (statusFilter === 'Inactive' && g.status === 'Active') return false
      return true
    })
  }, [guestUsers, query, assessmentFilter, statusFilter])

  function flash(msg) {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  function openEdit(record, kind) {
    setEditTarget({ kind, id: record.id })
    if (kind === 'user') {
      setEditForm({
        name: record.name,
        email: record.email,
        role: record.role,
        subscribed: record.subscribed,
        status: record.status,
      })
    } else {
      setEditForm({
        email: record.email || '',
        status: record.status,
      })
    }
  }

  function saveEdit(e) {
    e.preventDefault()
    if (!editTarget || !editForm) return

    if (editTarget.kind === 'user') {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editTarget.id
            ? {
                ...u,
                name: editForm.name.trim(),
                email: editForm.email.trim(),
                role: editForm.role,
                subscribed: editForm.subscribed,
                status: editForm.status,
              }
            : u,
        ),
      )
      flash('User details updated.')
    } else {
      setGuestUsers((prev) =>
        prev.map((g) =>
          g.id === editTarget.id
            ? {
                ...g,
                email: editForm.email.trim() || null,
                status: editForm.status,
              }
            : g,
        ),
      )
      flash('Guest details updated.')
    }
    setEditTarget(null)
    setEditForm(null)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    if (deleteTarget.kind === 'user') {
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id))
      setSelected((prev) => prev.filter((id) => id !== deleteTarget.id))
      flash('User deleted.')
    } else {
      setGuestUsers((prev) => prev.filter((g) => g.id !== deleteTarget.id))
      setSelectedGuests((prev) => prev.filter((id) => id !== deleteTarget.id))
      flash('Guest deleted.')
    }
    setDeleteTarget(null)
  }

  function openAdd() {
    setAddForm(emptyAddForm())
    setAddError('')
    setShowPassword(false)
    setShowConfirm(false)
    setAddOpen(true)
  }

  function closeAdd() {
    setAddOpen(false)
    setAddError('')
    setAddForm(emptyAddForm())
  }

  function saveAdd(e) {
    e.preventDefault()
    setAddError('')

    const name = addForm.name.trim()
    const email = addForm.email.trim().toLowerCase()
    const { password, confirmPassword, country, region, role, status, subscribed } =
      addForm

    if (!name || !email || !password || !confirmPassword) {
      setAddError('Please fill in all required fields.')
      return
    }
    if (password !== confirmPassword) {
      setAddError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setAddError('Password must be at least 8 characters.')
      return
    }
    if (!region) {
      setAddError(`Please select a ${regionLabel.toLowerCase()}.`)
      return
    }
    if (users.some((u) => u.email.toLowerCase() === email)) {
      setAddError('A user with this email already exists.')
      return
    }

    const countryName =
      countries.find((c) => c.code === country)?.name || country
    const isCoach = role === 'Coach'
    const newUser = {
      id: `u${Date.now()}`,
      name,
      email,
      role,
      subscribed,
      assessment: isCoach ? 'N/A' : 'Pending',
      sessionsUsed: 0,
      sessionsLimit: isCoach ? 0 : subscribed ? 20 : 3,
      status,
      country: countryName,
      region,
    }

    setUsers((prev) => [newUser, ...prev])
    closeAdd()
    flash(`${isCoach ? 'Coach' : 'User'} account created.`)
  }

  const viewRecord =
    viewTarget?.kind === 'user'
      ? users.find((u) => u.id === viewTarget.id)
      : viewTarget?.kind === 'guest'
        ? guestUsers.find((g) => g.id === viewTarget.id)
        : null

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            User Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage all users and guest accounts across your platform.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand-500/25 hover:bg-brand-600"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {toast && (
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
          {toast}
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {ADMIN_USER_STATS.map((stat) => {
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
              placeholder="Search by name, email, or ID..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-800 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
            <button
              type="button"
              onClick={() => flash('Export started for filtered users.')}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-sm font-bold text-brand-800 hover:bg-brand-100"
            >
              <Download size={15} />
              Export
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">All User Types</option>
            <option value="Client">Client</option>
            <option value="Coach">Coach</option>
          </select>
          <select
            value={subFilter}
            onChange={(e) => setSubFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">All Subscriptions</option>
            <option value="yes">Subscribed</option>
            <option value="no">Not subscribed</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={assessmentFilter}
            onChange={(e) => setAssessmentFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">Assessment Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="N/A">N/A</option>
          </select>
        </div>
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
          <h2 className="text-base font-bold text-slate-900">
            Registered Users
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {registered.length} matching · {users.length} total in list
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      registered.length > 0 &&
                      selected.length === registered.length
                    }
                    onChange={() =>
                      setSelected((prev) =>
                        prev.length === registered.length
                          ? []
                          : registered.map((u) => u.id),
                      )
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                    aria-label="Select all registered"
                  />
                </th>
                <th className="px-3 py-3">User</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Subscribed</th>
                <th className="px-3 py-3">Assessment</th>
                <th className="px-3 py-3">Sessions Used</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(user.id)}
                      onChange={() =>
                        setSelected((prev) =>
                          prev.includes(user.id)
                            ? prev.filter((id) => id !== user.id)
                            : [...prev, user.id],
                        )
                      }
                      className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                    />
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={expertImg}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <RolePill role={user.role} />
                  </td>
                  <td className="px-3 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        user.subscribed
                          ? 'bg-brand-50 text-brand-800 ring-1 ring-brand-100'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {user.subscribed ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <AssessmentPill value={user.assessment} />
                  </td>
                  <td className="px-3 py-3.5">
                    {user.role === 'Coach' ? (
                      <span className="text-xs text-slate-400">—</span>
                    ) : (
                      <div>
                        <p className="font-semibold text-slate-800">
                          {user.sessionsUsed}/{user.sessionsLimit}
                        </p>
                        <p className="text-xs text-slate-400">
                          {Math.max(user.sessionsLimit - user.sessionsUsed, 0)}{' '}
                          remaining
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3.5">
                    <StatusPill value={user.status} />
                  </td>
                  <td className="px-3 py-3.5">
                    <ActionButtons
                      onView={() => setViewTarget({ kind: 'user', id: user.id })}
                      onEdit={() => openEdit(user, 'user')}
                      onDelete={() =>
                        setDeleteTarget({
                          kind: 'user',
                          id: user.id,
                          label: user.name,
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
              {registered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No registered users match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination label={`Showing ${registered.length} registered users`} />
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
          <h2 className="text-base font-bold text-slate-900">Guest Users</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {guests.length} matching · {guestUsers.length} total in list
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      guests.length > 0 &&
                      selectedGuests.length === guests.length
                    }
                    onChange={() =>
                      setSelectedGuests((prev) =>
                        prev.length === guests.length
                          ? []
                          : guests.map((g) => g.id),
                      )
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                  />
                </th>
                <th className="px-3 py-3">Guest ID</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Assessment</th>
                <th className="px-3 py-3">Sessions Used</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedGuests.includes(guest.id)}
                      onChange={() =>
                        setSelectedGuests((prev) =>
                          prev.includes(guest.id)
                            ? prev.filter((id) => id !== guest.id)
                            : [...prev, guest.id],
                        )
                      }
                      className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                    />
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-400">
                        <UserRound size={16} />
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">
                          {guest.label}
                        </p>
                        <p className="text-xs text-slate-500">{guest.guestId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-slate-600">
                    {guest.email || (
                      <span className="text-slate-400">Not provided</span>
                    )}
                  </td>
                  <td className="px-3 py-3.5">
                    <AssessmentPill value={guest.assessment} />
                  </td>
                  <td className="px-3 py-3.5">
                    <p className="font-semibold text-slate-800">
                      {guest.sessionsUsed}/{guest.sessionsLimit}
                    </p>
                    <p className="text-xs text-slate-400">
                      {Math.max(guest.sessionsLimit - guest.sessionsUsed, 0)}{' '}
                      remaining
                    </p>
                  </td>
                  <td className="px-3 py-3.5">
                    <StatusPill value={guest.status} />
                  </td>
                  <td className="px-3 py-3.5">
                    <ActionButtons
                      onView={() =>
                        setViewTarget({ kind: 'guest', id: guest.id })
                      }
                      onEdit={() => openEdit(guest, 'guest')}
                      onDelete={() =>
                        setDeleteTarget({
                          kind: 'guest',
                          id: guest.id,
                          label: guest.guestId,
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
              {guests.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No guest users match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination label={`Showing ${guests.length} guest users`} />
      </section>

      {/* View modal */}
      {viewTarget && viewRecord && (
        <ModalShell
          title={
            viewTarget.kind === 'user' ? 'User details' : 'Guest details'
          }
          onClose={() => setViewTarget(null)}
        >
          {viewTarget.kind === 'user' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={expertImg}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-base font-bold text-slate-900">
                    {viewRecord.name}
                  </p>
                  <p className="text-sm text-slate-500">{viewRecord.email}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailRow label="Role" value={<RolePill role={viewRecord.role} />} />
                <DetailRow
                  label="Subscribed"
                  value={viewRecord.subscribed ? 'Yes' : 'No'}
                />
                <DetailRow
                  label="Assessment"
                  value={<AssessmentPill value={viewRecord.assessment} />}
                />
                <DetailRow
                  label="Status"
                  value={<StatusPill value={viewRecord.status} />}
                />
                <DetailRow
                  label="Sessions used"
                  value={
                    viewRecord.role === 'Coach'
                      ? '—'
                      : `${viewRecord.sessionsUsed} / ${viewRecord.sessionsLimit}`
                  }
                />
                <DetailRow label="User ID" value={viewRecord.id} />
                {viewRecord.country && (
                  <DetailRow
                    label="Location"
                    value={`${viewRecord.region}, ${viewRecord.country}`}
                  />
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setViewTarget(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openEdit(viewRecord, 'user')
                    setViewTarget(null)
                  }}
                  className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-base font-bold text-slate-900">
                  {viewRecord.label}
                </p>
                <p className="text-sm text-slate-500">{viewRecord.guestId}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailRow
                  label="Email"
                  value={viewRecord.email || 'Not provided'}
                />
                <DetailRow
                  label="Assessment"
                  value={<AssessmentPill value={viewRecord.assessment} />}
                />
                <DetailRow
                  label="Sessions used"
                  value={`${viewRecord.sessionsUsed} / ${viewRecord.sessionsLimit}`}
                />
                <DetailRow
                  label="Status"
                  value={<StatusPill value={viewRecord.status} />}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setViewTarget(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openEdit(viewRecord, 'guest')
                    setViewTarget(null)
                  }}
                  className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </ModalShell>
      )}

      {/* Add user modal */}
      {addOpen && (
        <ModalShell title="Add user" onClose={closeAdd} wide>
          <form onSubmit={saveAdd} className="space-y-4">
            <p className="text-sm text-slate-500">
              Creates a registered account with the same details collected on
              signup, plus admin role and access settings.
            </p>

            {addError && (
              <p className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-semibold text-rose-700 ring-1 ring-rose-100">
                {addError}
              </p>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
                Full name
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="Jane Doe"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
                Email
                <input
                  type="email"
                  value={addForm.email}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="jane@email.com"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Password
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={addForm.password}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, password: e.target.value }))
                    }
                    className={`${inputClass} pr-10`}
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Confirm password
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={addForm.confirmPassword}
                    onChange={(e) =>
                      setAddForm((f) => ({
                        ...f,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className={`${inputClass} pr-10`}
                    placeholder="Re-enter password"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={
                      showConfirm ? 'Hide password' : 'Show password'
                    }
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Country
                <select
                  value={addForm.country}
                  onChange={(e) =>
                    setAddForm((f) => ({
                      ...f,
                      country: e.target.value,
                      region: '',
                    }))
                  }
                  className={`${selectClass} mt-1.5 w-full`}
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                {regionLabel}
                <select
                  value={addForm.region}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, region: e.target.value }))
                  }
                  className={`${selectClass} mt-1.5 w-full`}
                  required
                >
                  <option value="">Select {regionLabel.toLowerCase()}</option>
                  {regionOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Role
                <select
                  value={addForm.role}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, role: e.target.value }))
                  }
                  className={`${selectClass} mt-1.5 w-full`}
                >
                  <option value="Client">Client</option>
                  <option value="Coach">Coach</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Status
                <select
                  value={addForm.status}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, status: e.target.value }))
                  }
                  className={`${selectClass} mt-1.5 w-full`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>

            <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={addForm.subscribed}
                onChange={(e) =>
                  setAddForm((f) => ({
                    ...f,
                    subscribed: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-slate-300 accent-brand-500"
              />
              Subscribed (paid plan)
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeAdd}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                Create user
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {/* Edit modal */}
      {editTarget && editForm && (
        <ModalShell
          title={editTarget.kind === 'user' ? 'Edit user' : 'Edit guest'}
          onClose={() => {
            setEditTarget(null)
            setEditForm(null)
          }}
        >
          <form onSubmit={saveEdit} className="space-y-4">
            {editTarget.kind === 'user' ? (
              <>
                <label className="block text-sm font-semibold text-slate-700">
                  Full name
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className={inputClass}
                    required
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Email
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className={inputClass}
                    required
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Role
                    <select
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, role: e.target.value }))
                      }
                      className={`${selectClass} mt-1.5 w-full`}
                    >
                      <option value="Client">Client</option>
                      <option value="Coach">Coach</option>
                    </select>
                  </label>
                  <label className="block text-sm font-semibold text-slate-700">
                    Status
                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, status: e.target.value }))
                      }
                      className={`${selectClass} mt-1.5 w-full`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>
                </div>
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editForm.subscribed}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        subscribed: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                  />
                  Subscribed
                </label>
              </>
            ) : (
              <>
                <label className="block text-sm font-semibold text-slate-700">
                  Email
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="Optional"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Status
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, status: e.target.value }))
                    }
                    className={`${selectClass} mt-1.5 w-full`}
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </label>
              </>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEditTarget(null)
                  setEditForm(null)
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                Save changes
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <ModalShell
          title="Delete account?"
          onClose={() => setDeleteTarget(null)}
        >
          <p className="text-sm leading-relaxed text-slate-600">
            Are you sure you want to delete{' '}
            <span className="font-bold text-slate-900">
              {deleteTarget.label}
            </span>
            ? This action cannot be undone.
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
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-600"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        </ModalShell>
      )}
    </div>
  )
}
