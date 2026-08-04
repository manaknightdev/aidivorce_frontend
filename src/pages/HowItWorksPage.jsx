import { Link } from 'react-router-dom'
import {
  ClipboardList,
  Compass,
  Route,
  MessageSquare,
  FolderOpen,
  CalendarDays,
  FileText,
  Check,
} from 'lucide-react'
import InfoPageShell from '../components/InfoPageShell'

const steps = [
  {
    icon: ClipboardList,
    title: '1. Answer a few quick questions',
    text: 'Start with a short assessment about your situation — parenting, finances, property, and what feels most urgent. No legal jargon, no pressure.',
  },
  {
    icon: Compass,
    title: '2. Build your case overview',
    text: 'Sam turns your answers into a clear dashboard: sections for parenting, finance, property, and legal, plus notes and guided follow-ups.',
  },
  {
    icon: Route,
    title: '3. Move forward with support',
    text: 'Ask Coach Sam questions, book a live session when you need deeper help, and export a structured case report whenever you’re ready.',
  },
]

const features = [
  {
    icon: FolderOpen,
    title: 'Organize your case',
    text: 'Add notes, answer interactive questions, and keep everything in one secure case file.',
  },
  {
    icon: MessageSquare,
    title: 'Ask Coach Sam',
    text: 'Use your free text consultation, then upgrade for more sessions or a live Zoom call.',
  },
  {
    icon: CalendarDays,
    title: 'Book professional help',
    text: 'Schedule one-on-one consultations or a multi-session strategy package when you need it.',
  },
  {
    icon: FileText,
    title: 'Export reports',
    text: 'Generate a Full Case Report with timeline, observations, and next steps — ready to preview or download as PDF.',
  },
]

export default function HowItWorksPage() {
  return (
    <InfoPageShell
      title="How It Works"
      subtitle="Clarity in a few simple steps — start free, then add coaching only when you need it."
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <article
                key={step.title}
                className="rounded-2xl border border-brand-100 bg-brand-50/40 p-5 sm:p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/25">
                  <Icon size={20} />
                </span>
                <h2 className="mt-4 text-base font-bold text-slate-900">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.text}
                </p>
              </article>
            )
          })}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">
            What you can do in Sam
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Everything lives in your dashboard so progress isn’t lost between
            sessions.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {features.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">
            A typical first week
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              'Complete your assessment and review the Home dashboard',
              'Add a practice note or answer a guided question in your case',
              'Use your free text session with Coach Sam',
              'Preview or export a Full Case Report from Reports',
              'Book a live call if you want deeper, one-on-one strategy',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-slate-700"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Start from your dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Jump back in — or open a session whenever you’re ready.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/dashboard"
              className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
            >
              Go to Home
            </Link>
            <Link
              to="/dashboard/session"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-300 hover:bg-brand-50"
            >
              Open Session
            </Link>
          </div>
        </section>
      </div>
    </InfoPageShell>
  )
}
