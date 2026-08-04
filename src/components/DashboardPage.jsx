export default function DashboardPage({ children, className = '', ...props }) {
  return (
    <div
      {...props}
      className={`mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8 ${className}`}
    >
      {children}
    </div>
  )
}
