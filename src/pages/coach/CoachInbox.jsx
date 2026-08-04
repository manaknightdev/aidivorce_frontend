import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  MapPin,
  UserRound,
  CreditCard,
  Star,
  Reply,
  Gift,
  ChevronDown,
} from 'lucide-react'
import { COACH_INBOX } from '../../data/coachPortal'

const LOCATION_OPTIONS = [
  { value: null, label: 'All locations' },
  { value: 'Canada', label: 'Canada' },
  { value: 'USA', label: 'USA' },
]

function Stars({ rating }) {
  if (rating == null) {
    return <p className="text-xs text-slate-400">No rating yet</p>
  }
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? 'fill-brand-500 text-brand-500'
              : 'fill-slate-200 text-slate-200'
          }
        />
      ))}
    </div>
  )
}

function Badge({ badge }) {
  if (badge === 'PAID') {
    return (
      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 ring-1 ring-brand-100">
        PAID
      </span>
    )
  }
  if (badge === 'GUEST') {
    return (
      <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700 ring-1 ring-sky-100">
        GUEST
      </span>
    )
  }
  return (
    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
      FREE
    </span>
  )
}

export default function CoachInbox() {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState(null)
  const [locationOpen, setLocationOpen] = useState(false)
  const locationRef = useRef(null)
  const [filters, setFilters] = useState({
    guest: false,
    paid: false,
    free: false,
  })

  useEffect(() => {
    if (!locationOpen) return undefined
    function onPointerDown(e) {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false)
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setLocationOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [locationOpen])

  const items = useMemo(() => {
    return COACH_INBOX.filter((item) => {
      if (
        query &&
        !item.name.toLowerCase().includes(query.trim().toLowerCase())
      ) {
        return false
      }
      if (country && item.country !== country) return false
      if (filters.guest && item.badge !== 'GUEST') return false
      if (filters.paid && item.badge !== 'PAID') return false
      if (filters.free && item.badge !== 'FREE') return false
      return true
    })
  }, [query, country, filters])

  function toggleFilter(key) {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Inbox
      </h1>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <div className="relative" ref={locationRef}>
            <button
              type="button"
              onClick={() => setLocationOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors ${
                country
                  ? 'border-brand-300 bg-brand-50 text-brand-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200'
              }`}
              aria-expanded={locationOpen}
              aria-haspopup="listbox"
            >
              <MapPin size={13} />
              {country || 'Location'}
              <ChevronDown size={12} />
            </button>
            {locationOpen && (
              <div
                role="listbox"
                className="absolute top-full left-0 z-20 mt-1.5 min-w-[150px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
              >
                {LOCATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    role="option"
                    aria-selected={country === opt.value}
                    onClick={() => {
                      setCountry(opt.value)
                      setLocationOpen(false)
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-xs font-semibold transition-colors ${
                      country === opt.value
                        ? 'bg-brand-50 text-brand-800'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {[
            { key: 'free', label: 'Free', icon: Gift },
            { key: 'guest', label: 'Guest', icon: UserRound },
            { key: 'paid', label: 'Paid', icon: CreditCard },
          ].map((f) => {
            const Icon = f.icon
            const active = filters[f.key]
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => toggleFilter(f.key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors ${
                  active
                    ? 'border-brand-300 bg-brand-50 text-brand-800'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200'
                }`}
              >
                <Icon size={13} />
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            {item.avatar ? (
              <img
                src={item.avatar}
                alt=""
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400">
                <UserRound size={22} />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-slate-900">{item.name}</p>
                <Badge badge={item.badge} />
              </div>
              <p className="mt-0.5 text-sm text-slate-600">{item.messageLabel}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <Stars rating={item.rating} />
                <p className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                  <MapPin size={11} />
                  {item.country}
                </p>
                <p className="text-xs font-medium text-slate-400">{item.due}</p>
              </div>
            </div>
            <Link
              to={`/coach/inbox/${item.id}`}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-500 text-white shadow-sm shadow-brand-500/30 transition-colors hover:bg-brand-600"
              aria-label={`Reply to ${item.name}`}
            >
              <Reply size={18} />
            </Link>
          </li>
        ))}
        {items.length === 0 && (
          <li className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
            No messages match your filters.
          </li>
        )}
      </ul>
    </div>
  )
}
