import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import BrandLogo from '../BrandLogo'
import { ADMIN_PROFILE } from '../../data/adminPortal'
import expertImg from '../../assets/expert-headshot.png'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'User Management', icon: Users },
  { to: '/admin/packages', label: 'Packages', icon: Package },
  { to: '/admin/subscribed', label: 'Subscriptions', icon: CreditCard },
  { to: '/admin/content', label: 'Content', icon: FileText },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

function SidebarNav({ onNavigate }) {
  const location = useLocation()

  return (
    <nav className="mt-8 space-y-1 px-3">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) => {
            const active =
              item.to === '/admin/packages'
                ? location.pathname.startsWith('/admin/packages')
                : isActive
            return `relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-brand-100 text-brand-800'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`
          }}
        >
          {({ isActive }) => {
            const active =
              item.to === '/admin/packages'
                ? location.pathname.startsWith('/admin/packages')
                : isActive
            return (
              <>
                {active && (
                  <span className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-500" />
                )}
                <item.icon size={18} strokeWidth={2} />
                {item.label}
              </>
            )
          }}
        </NavLink>
      ))}
    </nav>
  )
}

function AdminCard({ onLogout }) {
  return (
    <div className="mx-3 mb-4 rounded-2xl border border-slate-100 bg-brand-50/50 p-3">
      <div className="flex items-center gap-3">
        <img
          src={expertImg}
          alt=""
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-900">
            {ADMIN_PROFILE.name}
          </p>
          <p className="truncate text-xs text-slate-500">{ADMIN_PROFILE.email}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        <LogOut size={13} />
        Log out
      </button>
    </div>
  )
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  function logout() {
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#f7f8f6]">
      <aside className="sticky top-0 hidden h-screen w-[250px] shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
        <div className="px-5 pt-5">
          <BrandLogo
            size={36}
            withText
            to="/admin"
            textClassName="text-lg font-bold text-slate-900"
          />
          <p className="mt-1 text-[11px] font-semibold tracking-wide text-brand-700 uppercase">
            Admin Portal
          </p>
        </div>
        <SidebarNav />
        <div className="mt-auto">
          <AdminCard onLogout={logout} />
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-[260px] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 pt-4">
              <BrandLogo
                size={36}
                withText
                to="/admin"
                textClassName="text-lg font-bold text-slate-900"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-500"
              >
                <X size={18} />
              </button>
            </div>
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
            <div className="mt-auto">
              <AdminCard onLogout={logout} />
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-slate-200/80 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <Link to="/admin" className="text-sm font-bold text-slate-900">
            Admin Portal
          </Link>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
