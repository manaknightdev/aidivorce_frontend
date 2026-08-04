import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import DashboardPage from '../components/DashboardPage'

export default function InfoPageShell({ title, subtitle, children }) {
  return (
    <DashboardPage>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        <Link
          to="/dashboard"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </Link>
      </div>
      {children}
    </DashboardPage>
  )
}
