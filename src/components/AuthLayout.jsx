import { motion } from 'framer-motion'
import BrandLogo from './BrandLogo'

export default function AuthLayout({
  background,
  imageClass = 'opacity-45 brightness-[1.08] contrast-[0.95] object-center',
  title,
  subtitle,
  children: leftExtras,
  form,
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left panel — static branding */}
      <aside className="relative hidden w-1/2 overflow-hidden bg-[#f4f5f3] lg:block">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={background}
            alt=""
            className={`absolute inset-0 h-full w-full scale-105 object-cover ${imageClass}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4f5f3] via-[#f4f5f3]/55 to-white/30" />
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-brand-100/35 blur-3xl" />
        </div>

        <div className="relative z-10 flex h-full flex-col px-10 py-8 xl:px-14">
          <BrandLogo size={52} />

          <div className="flex flex-1 flex-col items-center justify-center px-2 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-full max-w-md"
            >
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase xl:text-[2rem] xl:leading-[1.15]">
                {title}
              </h1>
              {subtitle && (
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500 xl:text-base">
                  {subtitle}
                </p>
              )}
              {leftExtras}
            </motion.div>
          </div>
        </div>
      </aside>

      {/* Right panel — form */}
      <main className="relative flex w-full flex-col lg:w-1/2">
        <div className="flex items-center px-5 py-4 lg:hidden">
          <BrandLogo
            size={40}
            withText
            textClassName="text-base text-slate-900"
          />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-[400px]"
          >
            {form}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export function AuthTimeline({ items }) {
  return (
    <div className="mx-auto mt-10 w-full max-w-sm text-left">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="relative flex gap-3.5 pb-5 last:pb-0">
            {i < items.length - 1 && (
              <span className="absolute top-10 left-[1.15rem] h-[calc(100%-2.25rem)] w-0.5 bg-brand-300" />
            )}
            <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white shadow-md shadow-brand-500/30 ring-4 ring-white/70">
              <Icon size={16} strokeWidth={2.2} />
            </span>
            <div className="pt-0.5">
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="mt-0.5 text-[13px] leading-snug text-slate-500">
                {item.text}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
