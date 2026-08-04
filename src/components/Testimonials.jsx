import { Star } from 'lucide-react'
import { SectionHeading, Stagger, StaggerItem } from './Reveal'

const testimonials = [
  {
    quote:
      'I felt completely lost before I found this. The roadmap broke everything into small steps, and for the first time in months I could actually breathe.',
    name: 'Amanda R.',
    detail: 'Member for 6 months',
    initials: 'AR',
  },
  {
    quote:
      'The cost estimator alone saved me thousands. I walked into mediation organized and prepared, and it completely changed the tone of the process.',
    name: 'Marcus T.',
    detail: 'Member for 4 months',
    initials: 'MT',
  },
  {
    quote:
      'Being able to ask questions at 2am without judgment was priceless. It kept me calm and focused on decisions instead of drowning in worry.',
    name: 'Jennifer L.',
    detail: 'Member for 8 months',
    initials: 'JL',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-gradient-to-b from-brand-50/50 to-brand-100/40 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Helping People Navigate Divorce With Clarity"
          subtitle="Real experiences from members who found their way forward."
        />

        <Stagger className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.detail}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
