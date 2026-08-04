import { Link } from 'react-router-dom'
import { Check, Info } from 'lucide-react'
import { SectionHeading, Reveal } from './Reveal'

const included = [
  'Full access to your personalized AI roadmap',
  'Unlimited AI support chat, day or night',
  'Secure document organizer and checklists',
  'Cost estimator, worksheets, and planning tools',
  'Progress tracking across every stage',
]

function PlanOption({ price, period, note, cta, highlight }) {
  return (
    <div
      className={`relative flex-1 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        highlight
          ? 'border-brand-300 bg-white shadow-md shadow-brand-500/10'
          : 'border-slate-200 bg-white'
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 right-5 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold text-white">
          Save 10%
        </span>
      )}
      <p className="flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold tracking-tight text-slate-900">
          {price}
        </span>
        <span className="text-sm font-medium text-slate-500">{period}</span>
      </p>
      <p className="mt-1.5 text-xs text-slate-500">{note}</p>
      <Link
        to="/login"
        className="mt-5 block rounded-lg bg-brand-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-600 hover:shadow-md"
      >
        {cta}
      </Link>
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Choose Your Support Level"
          subtitle="One simple membership with everything you need to move forward."
        />

        <Reveal className="mx-auto max-w-3xl">
          <p className="mb-5 text-center text-sm font-bold tracking-wide text-slate-900 uppercase">
            Essential Membership
          </p>

          <div className="rounded-3xl border border-brand-100 bg-gradient-to-b from-brand-50/60 to-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row">
              <PlanOption
                price="$19"
                period="/month"
                note="Billed monthly, cancel anytime"
                cta="Start Monthly"
              />
              <PlanOption
                price="$205"
                period="/year"
                note="Two months free compared to monthly"
                cta="Start Yearly"
                highlight
              />
            </div>

            <ul className="mt-8 space-y-3">
              {included.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <Info size={17} className="mt-0.5 shrink-0 text-amber-500" />
              <p className="text-xs leading-relaxed text-amber-800">
                Membership includes all AI tools and self-guided resources.
                Sessions with coaches, mediators, and financial professionals
                are available separately as add-ons below — only pay for what
                you actually need.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
