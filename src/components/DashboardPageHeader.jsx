import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function DashboardPageHeader({
  title,
  subtitle,
  backTo = '/dashboard',
  showBack = true,
  right,
  className = 'mb-8',
}) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {right}
        {showBack && (
          <Link
            to={backTo}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </Link>
        )}
      </div>
    </div>
  )
}
