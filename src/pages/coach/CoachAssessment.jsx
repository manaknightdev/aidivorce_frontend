import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  User,
  Heart,
  Baby,
  Scale,
  Target,
  Phone,
  Mail,
  MapPin,
  Video,
  CheckCircle2,
} from 'lucide-react'
import { getCoachSessionById } from '../../data/coachPortal'

function Field({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3.5 py-3">
      <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value || '—'}
      </p>
    </div>
  )
}

function Block({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Icon size={16} />
        </span>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function CoachAssessment() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const from = params.get('from') === 'pending' ? 'pending' : 'calendar'
  const backTo =
    from === 'pending' ? '/coach/calendar/pending' : '/coach/calendar'

  const session = getCoachSessionById(id)
  const intake = session?.intake

  if (!session || !intake) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-700"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-sm font-semibold text-slate-700">
            Intake form not found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            This session does not have a submitted assessment yet.
          </p>
        </div>
      </div>
    )
  }

  const serviceLabel = session.service || session.category || 'Live session'

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Link
            to={backTo}
            className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Session Intake Form
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Submitted by the client before the live call — same intake used in
              the user Book flow.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
          <CheckCircle2 size={13} />
          Submitted
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/70 p-4 ring-1 ring-brand-100">
        <div className="flex flex-wrap items-center gap-3">
          <img
            src={session.avatar}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900">{session.name}</p>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} />
                {session.location}
              </span>
              <span>{session.when}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-500">{serviceLabel}</p>
            <p className="mt-0.5 text-xs text-slate-400">
              Form received {intake.submittedAt}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <Block icon={User} title="Personal Information">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Full Name" value={intake.fullName} />
            <Field label="Phone Number" value={intake.phone} />
            <Field label="Email" value={intake.email} />
            <Field label="Location" value={session.location} />
          </div>
        </Block>

        <Block icon={Heart} title="Relationship Status">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Current status" value={intake.status} />
            <Field
              label="Length of marriage/relationship"
              value={intake.duration}
            />
          </div>
        </Block>

        <Block icon={Baby} title="Children">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Do you have children together?"
              value={intake.hasChildren}
            />
            <Field
              label="Ages of children"
              value={
                intake.hasChildren === 'Yes'
                  ? intake.childrenAges || 'Not provided'
                  : 'N/A'
              }
            />
          </div>
        </Block>

        <Block icon={Scale} title="Legal Status">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Have divorce papers been filed?"
              value={intake.divorceFiled}
            />
            <Field
              label="Do you have legal representation?"
              value={intake.legalRep}
            />
          </div>
        </Block>

        <Block icon={Target} title="Session Goals">
          <div className="rounded-xl bg-slate-50 px-3.5 py-3">
            <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">
              What do you want help with in this session?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-800">
              {intake.goal}
            </p>
          </div>
          {intake.topics?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {intake.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800 ring-1 ring-brand-100"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </Block>

        <Block icon={FileText} title="Coach prep notes">
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <CheckCircle2
                size={15}
                className="mt-0.5 shrink-0 text-brand-600"
              />
              Review parenting / finance topics the client selected before
              joining Zoom.
            </li>
            <li className="flex gap-2">
              <CheckCircle2
                size={15}
                className="mt-0.5 shrink-0 text-brand-600"
              />
              Confirm location-specific guidance for {session.location}.
            </li>
            <li className="flex gap-2">
              <CheckCircle2
                size={15}
                className="mt-0.5 shrink-0 text-brand-600"
              />
              Intake was required before payment approval in the user Book
              portal.
            </li>
          </ul>
        </Block>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <a
          href={`tel:${intake.phone.replace(/\D/g, '')}`}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          <Phone size={15} />
          Call
        </a>
        <a
          href={`mailto:${intake.email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          <Mail size={15} />
          Email
        </a>
        {from === 'calendar' && (
          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600 sm:flex-none"
          >
            <Video size={16} />
            Join Zoom Session
          </button>
        )}
      </div>
    </div>
  )
}
