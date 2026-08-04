import { useState } from 'react'
import {
  User,
  Bot,
  Clock3,
  CalendarCheck,
  Gift,
  Layers,
  Plus,
  Trash2,
} from 'lucide-react'
import { COACH_PROFILE } from '../../data/coachPortal'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100'

const selectClass = `${inputClass} appearance-none bg-[length:1rem] bg-[right_0.875rem_center] bg-no-repeat pr-10 [background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9 6 6 6-6'/%3E%3C/svg%3E")]`

const START_OPTIONS = [
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
]
const END_OPTIONS = [
  '10:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '4:00 PM',
  '6:00 PM',
  '8:00 PM',
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function emptySlot() {
  return {
    id: `slot-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    days: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false },
    start: '8:00 AM',
    end: '2:00 PM',
  }
}

function Section({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Icon size={18} />
        </span>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default function CoachSettings() {
  const [name, setName] = useState(COACH_PROFILE.name)
  const [email, setEmail] = useState(COACH_PROFILE.email)
  const [timezone, setTimezone] = useState('Eastern Time (UTC-5)')
  const [systemMessage, setSystemMessage] = useState(
    'You are a compassionate divorce coach focusing on financial and emotional support. Provide practical guidance while being empathetic to the client’s situation.',
  )
  const [slaOn, setSlaOn] = useState(true)
  const [responseTime, setResponseTime] = useState('2 hours')
  const [slots, setSlots] = useState([
    {
      id: 'slot-weekday',
      days: {
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
        Sat: false,
        Sun: false,
      },
      start: '8:00 AM',
      end: '2:00 PM',
    },
  ])
  const [freeMessages, setFreeMessages] = useState(3)
  const [saved, setSaved] = useState(false)

  function updateSlot(id, patch) {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, ...patch } : slot)),
    )
  }

  function toggleSlotDay(id, day) {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id
          ? { ...slot, days: { ...slot.days, [day]: !slot.days[day] } }
          : slot,
      ),
    )
  }

  function addSlot() {
    setSlots((prev) => [...prev, emptySlot()])
  }

  function removeSlot(id) {
    setSlots((prev) => (prev.length <= 1 ? prev : prev.filter((s) => s.id !== id)))
  }

  function save() {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>
        <button
          type="button"
          onClick={save}
          className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
        >
          {saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="mt-6 space-y-5">
        <Section icon={User} title="Profile Information">
          <div className="flex flex-wrap items-center gap-4">
            <img
              src={COACH_PROFILE.avatar}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Change Photo
            </button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold text-slate-700">
            Timezone
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={selectClass}
            >
              <option>Eastern Time (UTC-5)</option>
              <option>Central Time (UTC-6)</option>
              <option>Mountain Time (UTC-7)</option>
              <option>Pacific Time (UTC-8)</option>
            </select>
          </label>
        </Section>

        <Section icon={Bot} title="AI Configuration">
          <label className="block text-sm font-semibold text-slate-700">
            System Message
            <textarea
              value={systemMessage}
              onChange={(e) => setSystemMessage(e.target.value)}
              rows={4}
              className={`${inputClass} resize-y`}
            />
          </label>
        </Section>

        <Section icon={Clock3} title="Response Timing">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                SLA Enforcement
              </p>
              <p className="text-xs text-slate-500">
                Flag replies that miss the expected window.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={slaOn}
              onClick={() => setSlaOn((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                slaOn ? 'bg-brand-500' : 'bg-slate-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  slaOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <label className="mt-4 block text-sm font-semibold text-slate-700">
            Expected Response Time
            <select
              value={responseTime}
              onChange={(e) => setResponseTime(e.target.value)}
              className={selectClass}
            >
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
              <option>12 hours</option>
              <option>24 hours</option>
            </select>
          </label>
        </Section>

        <Section icon={CalendarCheck} title="Live Session Availability">
          <p className="mb-4 text-sm text-slate-500">
            Add one or more time slots. Different days can use different hours.
          </p>

          <div className="space-y-4">
            {slots.map((slot, index) => (
              <div
                key={slot.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-slate-900">
                    Time slot {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeSlot(slot.id)}
                    disabled={slots.length <= 1}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Remove time slot ${index + 1}`}
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Start Time
                    <select
                      value={slot.start}
                      onChange={(e) =>
                        updateSlot(slot.id, { start: e.target.value })
                      }
                      className={selectClass}
                    >
                      {START_OPTIONS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm font-semibold text-slate-700">
                    End Time
                    <select
                      value={slot.end}
                      onChange={(e) =>
                        updateSlot(slot.id, { end: e.target.value })
                      }
                      className={selectClass}
                    >
                      {END_OPTIONS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Days for this slot
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {DAYS.map((day) => (
                    <label
                      key={day}
                      className="inline-flex items-center gap-2 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={slot.days[day]}
                        onChange={() => toggleSlotDay(slot.id, day)}
                        className="h-4 w-4 rounded border-slate-300 accent-brand-500 text-brand-500 focus:ring-brand-400"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSlot}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-brand-300 bg-brand-50/50 py-3 text-sm font-bold text-brand-800 transition-colors hover:bg-brand-50"
          >
            <Plus size={16} />
            Add Time Slot
          </button>
        </Section>

        <Section icon={Gift} title="Free Session Limits">
          <label className="block text-sm font-semibold text-slate-700">
            Messages per Free Session
            <input
              type="range"
              min={1}
              max={5}
              value={freeMessages}
              onChange={(e) => setFreeMessages(Number(e.target.value))}
              className="mt-3 w-full accent-brand-500"
            />
          </label>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Current: {freeMessages} messages
          </p>
          <p className="mt-3 rounded-xl bg-slate-50 px-3.5 py-3 text-xs leading-relaxed text-slate-500">
            Free users can send up to {freeMessages} messages per session.
            Adjust this for promotional periods.
          </p>
        </Section>

        <Section icon={Layers} title="Package Management">
          <button
            type="button"
            className="w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white hover:bg-brand-600"
          >
            Manage Packages
          </button>
        </Section>
      </div>
    </div>
  )
}
