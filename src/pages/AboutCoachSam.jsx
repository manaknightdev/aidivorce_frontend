import { Link } from 'react-router-dom'
import { BadgeCheck, Star, HeartHandshake, Shield, Users } from 'lucide-react'
import InfoPageShell from '../components/InfoPageShell'
import expertImg from '../assets/expert-headshot.png'

const credentials = [
  '15+ years of family-law and financial experience',
  '500+ families guided through divorce',
  'Every recommendation reviewed by real professionals',
]

const values = [
  {
    icon: HeartHandshake,
    title: 'Calm, practical guidance',
    text: 'Divorce is overwhelming. Coach Sam focuses on clarity — what matters now, what can wait, and what to prepare next.',
  },
  {
    icon: Shield,
    title: 'Private by design',
    text: 'Your notes, sessions, and documents stay in your case file. We don’t sell personal data or share your story without consent.',
  },
  {
    icon: Users,
    title: 'Human when you need it',
    text: 'Use AI tools day to day, then book a text or live consultation when you want a real coach to think with you.',
  },
]

export default function AboutCoachSam() {
  return (
    <InfoPageShell
      title="About Coach Sam"
      subtitle="AI-powered tools shaped by experienced professionals — so you can move forward with confidence."
    >
      <div className="space-y-6">
        <section className="grid items-center gap-8 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/70 to-white p-6 shadow-sm lg:grid-cols-2 lg:p-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white">
              <BadgeCheck size={14} />
              Expert Reviewed
            </span>
            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              Meet Coach Sam
            </h2>
            <p className="mt-1 text-sm font-medium text-brand-700">
              Your divorce strategy companion
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Sam combines structured AI guidance with coaching from
              professionals who understand parenting schedules, finances,
              property, and the emotional weight of separation. The goal isn’t
              more information — it’s a clearer path.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Whether you’re organizing your case file, answering guided
              questions, or booking a live session, Coach Sam keeps everything
              in one place so you don’t have to start from scratch every time.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10">
              <img
                src={expertImg}
                alt="Coach Sam expert guidance"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-2 bottom-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-lg shadow-slate-900/10 sm:-right-4">
              <Star size={18} className="fill-amber-400 text-amber-400" />
              <div>
                <p className="text-sm font-bold text-slate-900">4.9 rating</p>
                <p className="text-[11px] text-slate-500">from member reviews</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">
            Guided by real expertise
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Platform guidance is reviewed and shaped with professionals such as{' '}
            <span className="font-semibold text-slate-800">Sarah Kim</span>,
            Certified Divorce Financial Analyst®, and coaching partners who
            specialize in family transitions.
          </p>
          <ul className="mt-5 space-y-3">
            {credentials.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-slate-700"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                  <BadgeCheck size={13} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            )
          })}
        </section>

        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Ready to talk with Coach Sam?
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Start a free text session or book a live consultation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/dashboard/session"
              className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
            >
              Start Session
            </Link>
            <Link
              to="/dashboard/book"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-300 hover:bg-brand-50"
            >
              Book a Call
            </Link>
          </div>
        </section>
      </div>
    </InfoPageShell>
  )
}
