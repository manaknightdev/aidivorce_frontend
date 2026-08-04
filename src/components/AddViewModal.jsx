import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Baby,
  Wallet,
  Home,
  Gavel,
  Folder,
  ChevronRight,
  Check,
  Circle,
} from 'lucide-react'

const categories = [
  {
    id: 'parenting',
    title: 'Parenting',
    description: 'Custody, schedule, communication',
    icon: Baby,
    notes: 3,
    guided: { done: 2, total: 3 },
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Income, expenses, support',
    icon: Wallet,
    notes: 4,
    guided: { done: 4, total: 4 },
  },
  {
    id: 'property',
    title: 'Property & Assets',
    description: 'Home, savings, division',
    icon: Home,
    notes: 0,
    guided: null,
  },
  {
    id: 'docs',
    title: 'Documentations & Formalities',
    description: 'Court, agreements, procedures',
    icon: Gavel,
    notes: 2,
    guided: { done: 2, total: 2 },
  },
  {
    id: 'general',
    title: 'General / Not Sure',
    description: 'AI will place it in the right category',
    icon: Folder,
    notes: null,
    guided: null,
    muted: true,
  },
]

function CategoryStatus({ notes, guided }) {
  if (notes === 0) {
    return (
      <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
        <Circle size={10} strokeWidth={2.5} />
        No information added yet
      </p>
    )
  }

  if (notes == null) return null

  const guidedDone = guided && guided.done === guided.total
  const guidedLabel = guided
    ? guidedDone
      ? `${guided.done} Guided Questions Answered`
      : `${guided.done} of ${guided.total} Guided Questions Answered`
    : null

  return (
    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
      <span>· {notes} Notes</span>
      {guidedLabel && (
        <span className="inline-flex items-center gap-1 text-brand-600">
          <Check size={12} strokeWidth={3} />
          {guidedLabel}
        </span>
      )}
    </p>
  )
}

export default function AddViewModal({ open, onClose, onSelect }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-slate-900/40"
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-view-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-xl [contain:layout_paint]"
          >
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>

              <h2
                id="add-view-title"
                className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.65rem]"
              >
                Where does this belong?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                You can add multiple notes under each category over time. Select
                where you want to store this in your case file. You can add
                multiple entries to each section.
              </p>
              <p className="mt-3 text-sm font-medium text-brand-600">
                Each entry helps build your case and report.
              </p>

              <div className="mt-6 space-y-3">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onSelect?.(cat)}
                      className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left shadow-sm transition-all duration-200 hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-md"
                    >
                      <span
                        className={`mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                          cat.muted
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-brand-50 text-brand-600'
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-slate-900">
                          {cat.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-slate-500">
                          {cat.description}
                        </span>
                        <CategoryStatus notes={cat.notes} guided={cat.guided} />
                      </span>
                      <ChevronRight
                        size={18}
                        className="mt-3 shrink-0 text-slate-300"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
