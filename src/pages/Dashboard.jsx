import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Baby,
  Wallet,
  Home,
  Gavel,
  ChevronRight,
  MessageCircle,
  FileText,
  Check,
  Sparkles,
} from 'lucide-react'
import AddViewModal from '../components/AddViewModal'
import CaseDetailModal from '../components/CaseDetailModal'
import AddInformationModal from '../components/AddInformationModal'
import DashboardPage from '../components/DashboardPage'

const sections = [
  { id: 'parenting', title: 'Parenting', icon: Baby },
  { id: 'finance', title: 'Finance', icon: Wallet },
  { id: 'property', title: 'Property & Assets', icon: Home },
  { id: 'docs', title: 'Documentations & Formalities', icon: Gavel },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [addViewOpen, setAddViewOpen] = useState(false)
  const [detailId, setDetailId] = useState(null)
  const [addInfoId, setAddInfoId] = useState(null)
  const modalOpen = addViewOpen || !!detailId || !!addInfoId

  function openCase(id) {
    setAddViewOpen(false)
    setAddInfoId(null)
    setDetailId(id)
  }

  function openAddInfo(id) {
    setAddViewOpen(false)
    setDetailId(null)
    setAddInfoId(id)
  }

  return (
    <>
      <DashboardPage
        className={`grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 ${
          modalOpen ? 'pointer-events-none' : ''
        }`}
        aria-hidden={modalOpen || undefined}
      >
        <div className="min-w-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <div className="mt-5">
              <h2 className="text-lg font-bold text-slate-900">My Case</h2>
              <p className="mt-1 text-sm text-slate-400">
                Last updated: March 18
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAddViewOpen(true)}
            className="mt-5 flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-8 text-center shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50/40"
          >
            <span className="inline-flex items-center gap-2 text-base font-bold text-slate-900">
              <Plus size={18} className="text-brand-600" />
              Add or View Information
            </span>
            <span className="mt-1 text-sm text-slate-400">
              Add notes to build your case timeline
            </span>
          </button>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-slate-900">
              Your Case Sections
            </h3>
            <div className="mt-3 space-y-3">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => openCase(section.id)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon size={18} />
                    </span>
                    <span className="flex-1 text-sm font-semibold text-slate-900">
                      {section.title}
                    </span>
                    <ChevronRight size={18} className="text-slate-300" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl bg-brand-500 p-5 text-white shadow-lg shadow-brand-500/25">
            <div className="flex items-center gap-2 text-sm font-bold">
              <MessageCircle size={16} />
              Your Free Question
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              Ask your first question and get a response within 12 hours.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <Check size={14} strokeWidth={3} />
                Based on your assessment
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} strokeWidth={3} />
                Reviewed before delivery
              </li>
            </ul>
            <button
              type="button"
              onClick={() => navigate('/dashboard/session')}
              className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Start Free Question
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <FileText size={16} className="text-brand-600" />
              Your Report
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Generate a structured report including: Your notes, Your
              questions, Coach responses.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              Generate Report (Preview)
            </button>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Full export available with plan
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-900">Your Plan</p>
            <p className="mt-2 text-sm text-slate-500">
              Free Trial · Essential Plan Preview
            </p>
            <p className="mt-1 text-xs font-medium text-brand-600">
              12 days remaining
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Sparkles size={16} className="text-brand-600" />
              Enhance Your Strategy
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Get personalized guidance and 1-on-1 support.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Upgrade to Keep Your Data
            </button>
          </div>
        </aside>
      </DashboardPage>

      <AddViewModal
        open={addViewOpen}
        onClose={() => setAddViewOpen(false)}
        onSelect={(cat) => openAddInfo(cat.id)}
      />

      <CaseDetailModal
        open={!!detailId}
        sectionId={detailId}
        onClose={() => setDetailId(null)}
        onAdd={(section) => openAddInfo(section.id)}
      />

      <AddInformationModal
        open={!!addInfoId}
        sectionId={addInfoId}
        onClose={() => setAddInfoId(null)}
        onComplete={() => {
          const id = addInfoId
          setAddInfoId(null)
          if (id) setDetailId(id)
        }}
      />
    </>
  )
}
