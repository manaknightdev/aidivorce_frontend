import DashboardPage from '../components/DashboardPage'
import DashboardPageHeader from '../components/DashboardPageHeader'

export default function DashboardPlaceholder({ title, description }) {
  return (
    <DashboardPage>
      <DashboardPageHeader title={title} subtitle={description} backTo="/dashboard" />
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
        <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
          This section is coming soon. You will see your {title.toLowerCase()} details here.
        </p>
      </div>
    </DashboardPage>
  )
}
