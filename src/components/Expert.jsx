import { motion } from 'framer-motion'
import { BadgeCheck, Star } from 'lucide-react'
import { SectionHeading, Reveal } from './Reveal'
import expertImg from '../assets/expert-headshot.png'

const points = [
  '15+ years of family-law and financial experience',
  '500+ families guided through divorce',
  'Every recommendation reviewed by real professionals',
]

export default function Expert() {
  return (
    <section id="expert" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Guidance You Can Trust"
          subtitle="AI-powered tools, reviewed and shaped by experienced professionals."
        />

        <Reveal>
          <div className="grid items-center gap-10 rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/70 to-white p-8 shadow-sm lg:grid-cols-2 lg:p-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white">
                <BadgeCheck size={14} />
                Expert Reviewed
              </span>
              <h3 className="mt-5 text-2xl font-bold text-slate-900">Sarah Kim</h3>
              <p className="mt-1 text-sm font-medium text-brand-700">
                Certified Divorce Financial Analyst®
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
                “Most people don’t need more information during divorce — they
                need clarity. We built this platform so every family can
                understand their options and move forward with confidence.”
              </p>

              <ul className="mt-6 space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                      <BadgeCheck size={13} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10">
                <img
                  src={expertImg}
                  alt="Sarah Kim, Certified Divorce Financial Analyst"
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-3 bottom-6 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-lg shadow-slate-900/10 sm:-right-6"
              >
                <Star size={18} className="fill-amber-400 text-amber-400" />
                <div>
                  <p className="text-sm font-bold text-slate-900">4.9 rating</p>
                  <p className="text-[11px] text-slate-500">from member reviews</p>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
