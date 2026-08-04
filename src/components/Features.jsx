import {
  Map,
  FolderLock,
  Calculator,
  Users,
  MessageCircleHeart,
  LineChart,
} from 'lucide-react'
import { SectionHeading, Stagger, StaggerItem } from './Reveal'

const features = [
  {
    icon: Map,
    title: 'AI Roadmap',
    text: 'A step-by-step plan built around your situation, updated as things change so you always know what comes next.',
  },
  {
    icon: FolderLock,
    title: 'Document Organizer',
    text: 'Keep financial statements, agreements, and records safe, organized, and ready whenever they are needed.',
  },
  {
    icon: Calculator,
    title: 'Cost Estimator',
    text: 'Understand what your divorce could cost before you commit, with realistic estimates for different paths.',
  },
  {
    icon: Users,
    title: 'Co-Parenting Tools',
    text: 'Build parenting schedules and agreements that put your children first and reduce day-to-day friction.',
  },
  {
    icon: MessageCircleHeart,
    title: 'AI Support Chat',
    text: 'Ask questions any time, day or night, and get calm, plain-language answers grounded in your own plan.',
  },
  {
    icon: LineChart,
    title: 'Progress Tracker',
    text: 'See exactly how far you have come and what remains, so nothing important slips through the cracks.',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-brand-50/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Everything You Need in One Place"
          subtitle="Practical tools that bring order to a difficult process — designed to save you time, money, and stress."
        />

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem
              key={f.title}
              className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/25 transition-transform duration-300 group-hover:scale-110">
                <f.icon size={20} />
              </span>
              <h3 className="mt-5 text-base font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{f.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
