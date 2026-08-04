import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  FolderOpen,
  Baby,
  Wallet,
  Home,
  Scale,
  Folder,
  StickyNote,
  MessageCircle,
  HelpCircle,
  Eye,
  Download,
  FileText,
  Share2,
  Check,
  ListChecks,
  ArrowUpRight,
} from 'lucide-react'
import DashboardPage from '../components/DashboardPage'
import DashboardPageHeader from '../components/DashboardPageHeader'
import { exportCaseReportPdf } from '../utils/exportCaseReportPdf'
import {
  REPORT_META,
  REPORT_SOURCES,
  REPORT_OVERVIEW,
  REPORT_TIMELINE,
  REPORT_OBSERVATIONS,
  REPORT_NEXT_STEPS,
  REPORT_DISCLAIMER,
  LATEST_REPORT_CARD,
} from '../data/caseReport'

const SECTIONS = [
  { id: 'parenting', label: 'Parenting', icon: Baby },
  { id: 'finance', label: 'Finance', icon: Wallet },
  { id: 'property', label: 'Property & Assets', icon: Home },
  { id: 'legal', label: 'Legal', icon: Scale },
  { id: 'general', label: 'General / Not Sure', icon: Folder },
]

const CONTAINS = [
  { label: 'User notes', icon: StickyNote },
  { label: 'Interactive question answers', icon: ListChecks },
  { label: 'User questions', icon: HelpCircle },
  { label: 'Coach responses', icon: MessageCircle },
]

function kindStyles(kind) {
  if (kind === 'interactive') {
    return {
      chip: 'bg-sky-100 text-sky-800',
      box: 'bg-sky-50 ring-sky-100',
    }
  }
  if (kind === 'coach') {
    return {
      chip: 'bg-violet-100 text-violet-800',
      box: 'bg-violet-50 ring-violet-100',
    }
  }
  return {
    chip: 'bg-brand-100 text-brand-800',
    box: 'bg-brand-50 ring-brand-100',
  }
}

function ReportPreviewDrawer({ open, onClose, onExport }) {
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
        <div className="fixed inset-0 z-[70] flex justify-end">
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
            aria-labelledby="report-preview-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-full w-full max-w-2xl flex-col bg-white shadow-xl [contain:layout_paint]"
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                  aria-label="Back"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h2
                    id="report-preview-title"
                    className="text-lg font-bold text-slate-900"
                  >
                    {REPORT_META.title}
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-400">
                    Generated {REPORT_META.generatedOn}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onExport}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                aria-label="Export PDF"
                title="Export as PDF"
              >
                <Share2 size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white">
                  <FileText size={22} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {REPORT_META.title} — {REPORT_META.preparedFor}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    This report combines your intake information, interactive
                    responses, notes, and coaching conversations into one
                    structured case view.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <FolderOpen size={15} className="text-brand-600" />
                  Report Sources
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {REPORT_SOURCES.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check
                        size={14}
                        className="text-brand-600"
                        strokeWidth={3}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <FolderOpen size={15} className="text-brand-600" />
                  Case Overview
                </div>
                {REPORT_OVERVIEW.map((para) => (
                  <p
                    key={para.slice(0, 24)}
                    className="mt-2 text-sm leading-relaxed text-slate-600"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm font-bold text-slate-900">Case Timeline</p>
                <div className="relative mt-5 ml-2 border-l-2 border-brand-200 pl-6">
                  {REPORT_TIMELINE.map((group) => (
                    <div key={group.date} className="relative mb-8 last:mb-0">
                      <span className="absolute top-1.5 -left-[1.9rem] h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-500 shadow-sm" />
                      <p className="mb-3 text-xs font-bold tracking-wide text-brand-700 uppercase">
                        {group.date}
                      </p>
                      <div className="space-y-3">
                        {group.entries.map((entry) => {
                          const styles = kindStyles(entry.kind)
                          return (
                            <div
                              key={entry.id}
                              className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm"
                            >
                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${styles.chip}`}
                              >
                                {entry.label}
                              </span>
                              {entry.kind === 'note' ? (
                                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                                  {entry.text}
                                </p>
                              ) : (
                                <div
                                  className={`mt-2 rounded-xl p-3 ring-1 ${styles.box}`}
                                >
                                  <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                                    {entry.kind === 'coach'
                                      ? 'Coach Question'
                                      : 'Question'}
                                  </p>
                                  <p className="mt-1 text-sm font-medium text-slate-800">
                                    {entry.question}
                                  </p>
                                  <p className="mt-3 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                                    {entry.kind === 'coach'
                                      ? 'Coach Response'
                                      : 'Response'}
                                  </p>
                                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                    {entry.response}
                                  </p>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Eye size={15} className="text-brand-600" />
                  Observations
                </div>
                <ul className="mt-3 space-y-2.5">
                  {REPORT_OBSERVATIONS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <ArrowUpRight size={15} className="text-brand-600" />
                  Suggested Next Steps
                </div>
                <ol className="mt-3 space-y-3">
                  {REPORT_NEXT_STEPS.map((item, index) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed text-slate-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-8 text-xs leading-relaxed text-slate-400">
                {REPORT_DISCLAIMER}
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-300 bg-white py-3 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-50"
              >
                <Download size={15} />
                Export as PDF
              </button>
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
              >
                <Share2 size={15} />
                Share Case Report
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function Reports() {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [downloadNote, setDownloadNote] = useState('')

  function downloadLatest() {
    exportCaseReportPdf()
    setDownloadNote('Latest report downloaded as PDF.')
    window.setTimeout(() => setDownloadNote(''), 2500)
  }

  return (
    <DashboardPage>
      <DashboardPageHeader
        title="Reports"
        subtitle="Your case report includes all sections: notes, interactive question answers, and coaching conversations."
        showBack={false}
      />

      {downloadNote && (
        <div className="mb-4 rounded-2xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800 ring-1 ring-brand-100">
          {downloadNote}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:items-start lg:gap-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <FolderOpen size={20} />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Full Case Report
                </h2>
                <p className="text-sm text-slate-500">
                  Complete overview of your case file
                </p>
              </div>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
              {REPORT_META.latestLabel}
            </span>
          </div>

          <div className="mt-5">
            <p className="text-sm font-bold text-slate-800">Includes Sections</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {SECTIONS.map((section) => {
                const Icon = section.icon
                return (
                  <span
                    key={section.id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-100"
                  >
                    <Icon size={13} />
                    {section.label}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-bold text-slate-800">Contains</p>
            <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {CONTAINS.map((item) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-500">
                      <Icon size={14} />
                    </span>
                    {item.label}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-100 pt-4 text-xs text-slate-400">
            <span>{REPORT_META.reportsSaved} reports saved</span>
            <span>Last updated {REPORT_META.lastUpdated}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              <Eye size={15} />
              Preview Latest
            </button>
            <button
              type="button"
              onClick={downloadLatest}
              className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50"
              aria-label="Download latest report as PDF"
              title="Download latest version as PDF"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        <aside>
          <div className="mb-3">
            <h3 className="text-base font-bold text-slate-900">Latest Report</h3>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <FileText size={16} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-slate-900">
                      {LATEST_REPORT_CARD.date}
                    </p>
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 ring-1 ring-brand-100">
                      Latest
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {LATEST_REPORT_CARD.meta}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  aria-label="View report"
                >
                  <Eye size={14} />
                </button>
                <button
                  type="button"
                  onClick={downloadLatest}
                  className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  aria-label="Download latest report as PDF"
                  title="Download latest version as PDF"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              {LATEST_REPORT_CARD.summary}
            </p>
          </div>
        </aside>
      </div>

      <ReportPreviewDrawer
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onExport={downloadLatest}
      />
    </DashboardPage>
  )
}
