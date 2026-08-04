import { useState } from 'react'
import {
  Plus,
  Star,
  Video,
  Clock3,
  DollarSign,
  MessageSquare,
  CalendarCheck,
  UserPlus,
} from 'lucide-react'
import { COACH_ACTIVITY, COACH_REVIEWS } from '../../data/coachPortal'

const kindIcons = {
  session: Plus,
  rating: Star,
  zoom: Video,
  reminder: Clock3,
  payment: DollarSign,
  message: MessageSquare,
  completed: CalendarCheck,
  client: UserPlus,
}

export default function CoachNotifications() {
  const [tab, setTab] = useState('activity')
  const items = tab === 'activity' ? COACH_ACTIVITY : COACH_REVIEWS

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Notifications
      </h1>

      <div className="mt-5 inline-flex rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setTab('activity')}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
            tab === 'activity'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Activity
        </button>
        <button
          type="button"
          onClick={() => setTab('reviews')}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
            tab === 'reviews'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Reviews
        </button>
      </div>

      <ul className="mt-5 space-y-3">
        {items.map((item) => {
          const Icon = kindIcons[item.kind] || BellFallback
          return (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-sm font-bold text-slate-900">
                    {item.title}
                  </p>
                  <p className="shrink-0 text-xs text-slate-400">{item.time}</p>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function BellFallback() {
  return <Star size={16} />
}
