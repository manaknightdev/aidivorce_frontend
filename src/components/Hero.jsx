import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react'
import heroImg from '../assets/hero-woman.png'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50 pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
          >
            <Sparkles size={14} className="text-brand-500" />
            AI-Powered Divorce Support
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
          >
            Make Clear Decisions During Your Divorce
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-slate-600">
            Get personalized guidance, organize what matters, and understand
            your options — all in one supportive, confidential place designed
            to reduce stress and uncertainty.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="inline-flex items-center rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30"
            >
              Start Your Free Assessment
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-md"
            >
              See How It Works
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-brand-500" />
              No credit card required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-brand-500" />
              Private &amp; confidential
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/15">
            <img
              src={heroImg}
              alt="Woman calmly reviewing documents at a desk"
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-slate-900/10 sm:left-8"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500 text-white">
              <CheckCircle2 size={22} />
            </span>
            <div>
              <p className="text-lg font-bold text-slate-900">92%</p>
              <p className="text-xs text-slate-500">feel more confident after week one</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
