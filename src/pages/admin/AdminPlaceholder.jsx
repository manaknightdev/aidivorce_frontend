export default function AdminPlaceholder({ title, description }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <div className="mt-8 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 px-6 py-14 text-center">
        <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
          {title} is ready to build next. Navigation is wired — tell me which
          section to flesh out first.
        </p>
      </div>
    </div>
  )
}
