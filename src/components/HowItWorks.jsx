import { ClipboardList, Compass, Route } from 'lucide-react'
import { SectionHeading, Stagger, StaggerItem } from './Reveal'

const steps = [
  {
    icon: ClipboardList,
    title: 'Answer a Few Quick Questions',
    text: 'Tell us about your situation in minutes. No legal jargon, no pressure — just simple questions about where you are today.',
  },
  {
    icon: Compass,
    title: 'Get a Personalized Overview',
    text: 'Our AI turns your answers into a clear picture of your finances, timeline, and the decisions ahead of you.',
  },
  {
    icon: Route,
    title: 'Follow Your Roadmap & Get Help',
    text: 'Move forward step by step with a tailored roadmap, and bring in vetted professionals whenever you need extra support.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How It Works"
          subtitle="Clarity in three simple steps — no appointments or paperwork to get started."
        />

        <Stagger className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <StaggerItem
              key={s.title}
              className="group rounded-2xl border border-brand-100 bg-brand-50/40 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:bg-white hover:shadow-xl hover:shadow-brand-500/10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/30 transition-transform duration-300 group-hover:scale-110">
                <s.icon size={22} />
              </span>
              <h3 className="mt-6 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
