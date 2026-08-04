import { MessageSquare, Video, Crown, Check } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './Reveal'

const services = [
  {
    icon: MessageSquare,
    name: 'Coaching Session',
    price: '$49',
    period: '/session',
    features: [
      '45-minute one-on-one session',
      'Certified divorce coach',
      'Personalized action steps',
      'Session notes added to your roadmap',
      'Book as often as you like',
    ],
    cta: 'Book a Session',
  },
  {
    icon: Video,
    name: 'Expert Consultation',
    price: '$149',
    period: '/session',
    features: [
      '60-minute video consultation',
      'Financial or mediation expert',
      'Deep review of your situation',
      'Written summary and next steps',
      'Priority scheduling',
    ],
    cta: 'Book a Consultation',
  },
  {
    icon: Crown,
    name: 'Concierge Package',
    price: '$999',
    period: 'one-time',
    tagline: 'Most comprehensive',
    features: [
      'Dedicated case concierge',
      'Three expert consultations included',
      'Complete document preparation help',
      'Unlimited coaching messages',
      'White-glove support to the finish',
    ],
    cta: 'Get Concierge Support',
    featured: true,
  },
]

export default function Services() {
  return (
    <section className="bg-white pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-sm font-bold tracking-wide text-slate-900 uppercase">
            Professional Services <span className="text-slate-400">(Add-Ons)</span>
          </p>
        </Reveal>

        <Stagger className="grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem
              key={s.name}
              className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                s.featured
                  ? 'bg-brand-500 text-white shadow-xl shadow-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/40'
                  : 'border border-slate-100 bg-white shadow-sm hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10'
              }`}
            >
              {s.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-1 text-[11px] font-bold text-white">
                  {s.tagline}
                </span>
              )}

              <span
                className={`grid h-12 w-12 place-items-center rounded-xl ${
                  s.featured ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-600'
                }`}
              >
                <s.icon size={22} />
              </span>

              <h3
                className={`mt-5 text-lg font-bold ${
                  s.featured ? 'text-white' : 'text-slate-900'
                }`}
              >
                {s.name}
              </h3>

              <p className="mt-2 flex items-baseline gap-1.5">
                <span
                  className={`text-3xl font-extrabold tracking-tight ${
                    s.featured ? 'text-white' : 'text-brand-600'
                  }`}
                >
                  {s.price}
                </span>
                <span
                  className={`text-sm ${s.featured ? 'text-white/80' : 'text-slate-500'}`}
                >
                  {s.period}
                </span>
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {s.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-sm ${
                      s.featured ? 'text-white/90' : 'text-slate-600'
                    }`}
                  >
                    <Check
                      size={16}
                      strokeWidth={3}
                      className={`mt-0.5 shrink-0 ${
                        s.featured ? 'text-white' : 'text-brand-500'
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-all duration-200 ${
                  s.featured
                    ? 'bg-white text-brand-700 hover:bg-brand-50'
                    : 'border border-brand-300 text-brand-700 hover:bg-brand-50'
                }`}
              >
                {s.cta}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
