import { Link } from 'react-router-dom'
import { CreditCard, RefreshCcw, ShieldCheck } from 'lucide-react'
import { Reveal } from './Reveal'

const trust = [
  { icon: CreditCard, label: 'No credit card required' },
  { icon: RefreshCcw, label: 'Cancel anytime' },
  { icon: ShieldCheck, label: 'Secure & confidential' },
]

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 py-20 lg:py-24">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start Making Clear Decisions Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Join thousands of people who found their footing during divorce.
            Your free assessment takes less than 10 minutes.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="inline-flex items-center rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Start Your Free Assessment
          </Link>
          <a
            href="#pricing"
            className="inline-flex items-center rounded-xl border-2 border-white/60 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          >
            View Pricing
          </a>
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {trust.map((t) => (
            <span
              key={t.label}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90"
            >
              <t.icon size={16} />
              {t.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
