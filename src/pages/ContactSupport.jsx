import { useState } from 'react'
import { Mail, MessageSquare, Clock3, CheckCircle2 } from 'lucide-react'
import InfoPageShell from '../components/InfoPageShell'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

export default function ContactSupport() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('general')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSent(true)
  }

  return (
    <InfoPageShell
      title="Contact Support"
      subtitle="We’re here to help with your account, sessions, billing, or anything about using Sam."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <CheckCircle2 size={28} />
              </span>
              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Message sent
              </h2>
              <p className="mt-2 max-w-md text-sm text-slate-500">
                Thanks {name.trim()}. Our support team typically replies within
                one business day. Check your inbox at {email.trim()}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false)
                  setMessage('')
                }}
                className="mt-6 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Full name
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                  />
                </label>
              </div>

              <label className="block text-sm font-semibold text-slate-700">
                Topic
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={inputClass}
                >
                  <option value="general">General question</option>
                  <option value="account">Account & login</option>
                  <option value="billing">Billing & subscription</option>
                  <option value="session">Sessions & coaching</option>
                  <option value="technical">Technical issue</option>
                </select>
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                How can we help?
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className={`${inputClass} resize-y`}
                  placeholder="Share a few details so we can help faster…"
                  required
                />
              </label>

              <button
                type="submit"
                className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                Send Message
              </button>
            </form>
          )}
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Mail size={18} />
            </span>
            <h2 className="mt-3 text-sm font-bold text-slate-900">Email us</h2>
            <p className="mt-1 text-sm text-slate-500">
              Prefer email? Reach the team directly.
            </p>
            <a
              href="mailto:support@sam.ai"
              className="mt-3 inline-block text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              support@sam.ai
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <MessageSquare size={18} />
            </span>
            <h2 className="mt-3 text-sm font-bold text-slate-900">WhatsApp</h2>
            <p className="mt-1 text-sm text-slate-500">
              Message us for quick billing or booking help.
            </p>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              Open WhatsApp
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Clock3 size={18} />
            </span>
            <h2 className="mt-3 text-sm font-bold text-slate-900">
              Response time
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              We aim to reply within one business day (Mon–Fri). Urgent session
              issues are prioritized.
            </p>
          </div>
        </aside>
      </div>
    </InfoPageShell>
  )
}
