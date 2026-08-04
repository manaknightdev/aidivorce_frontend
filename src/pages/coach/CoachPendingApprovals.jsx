import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, Check, X } from 'lucide-react'
import { COACH_PENDING } from '../../data/coachPortal'

export default function CoachPendingApprovals() {
  const [items, setItems] = useState(COACH_PENDING)
  const [toast, setToast] = useState('')

  function decide(id, action) {
    setItems((prev) => prev.filter((p) => p.id !== id))
    setToast(action === 'approve' ? 'Session approved.' : 'Session denied.')
    window.setTimeout(() => setToast(''), 2000)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/coach/calendar"
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          aria-label="Back to calendar"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Pending Approvals
        </h1>
      </div>

      {toast && (
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
          {toast}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div>
          <p className="text-sm font-bold text-slate-900">Assessment Forms</p>
          <p className="mt-0.5 text-sm text-slate-500">
            {items.length} Pending
          </p>
        </div>
        <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
          Awaiting review
        </span>
      </div>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={item.avatar}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                Pending
              </span>
            </div>

            <p className="mt-4 text-sm font-bold text-brand-600">{item.when}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {item.category}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-bold text-slate-800">Brief Issue: </span>
              {item.issue}
            </p>
            <p className="mt-2 text-xs text-slate-400">{item.submitted}</p>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
              <Link
                to={`/coach/calendar/${item.id}/assessment?from=pending`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <FileText size={15} />
                View Full Form
              </Link>
              <button
                type="button"
                onClick={() => decide(item.id, 'approve')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-3 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                <Check size={15} />
                Approve
              </button>
              <button
                type="button"
                onClick={() => decide(item.id, 'deny')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-3 py-2.5 text-sm font-bold text-white hover:bg-rose-600"
              >
                <X size={15} />
                Deny
              </button>
            </div>
          </li>
        ))}

        {items.length === 0 && (
          <li className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-12 text-center text-sm text-slate-500">
            No pending approvals. You&apos;re all caught up.
          </li>
        )}
      </ul>
    </div>
  )
}
