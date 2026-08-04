import { Link } from 'react-router-dom'
import { FileQuestion, MessageSquareText, CreditCard } from 'lucide-react'
import { SectionHeading, Reveal, Stagger, StaggerItem } from './Reveal'

const cards = [
  {
    icon: FileQuestion,
    title: 'Free Assessment',
    text: 'Answer a short set of questions about your situation — it takes less than 10 minutes.',
  },
  {
    icon: MessageSquareText,
    title: 'Instant Insights',
    text: 'Get an immediate snapshot of your options, key decisions, and what to expect next.',
  },
  {
    icon: CreditCard,
    title: 'No Credit Card',
    text: 'Explore your results with zero commitment. Upgrade only if and when it helps you.',
  },
]

export default function StartFree() {
  return (
    <section id="start-free" className="bg-brand-50/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Start Free — No Commitment"
          subtitle="Get clear answers before you spend a single dollar."
        />

        <Stagger className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem
              key={c.title}
              className="rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-600">
                <c.icon size={22} />
              </span>
              <h3 className="mt-5 text-base font-bold text-slate-900">{c.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{c.text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-10 text-center">
          <Link
            to="/login"
            className="inline-flex items-center rounded-xl bg-brand-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30"
          >
            Try the Free Assessment
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
