import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  Home,
  MessageSquare,
  CalendarDays,
  FileText,
  History,
  Settings,
  MapPin,
  Clock3,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import BrandLogo from './BrandLogo'
import AvatarMenu from './AvatarMenu'
import avatarImg from '../assets/expert-headshot.png'

const footerLinks = [
  { label: 'Contact Support', to: '/dashboard/support' },
  { label: 'Terms & Privacy', to: '/dashboard/terms' },
  { label: 'About Coach Sam', to: '/dashboard/about' },
  { label: 'How It Works', to: '/dashboard/how-it-works' },
]

const navItems = [
  { to: '/dashboard', label: 'Home', icon: Home, end: true },
  { to: '/dashboard/session', label: 'Session', icon: MessageSquare },
  { to: '/dashboard/book', label: 'Book', icon: CalendarDays },
  { to: '/dashboard/reports', label: 'Reports', icon: FileText },
  { to: '/dashboard/history', label: 'History', icon: History },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
]

function SidebarNav({ onNavigate }) {
  return (
    <nav className="mt-8 space-y-1 px-3">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-brand-100 text-brand-800'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`
          }
        >
          <item.icon size={18} strokeWidth={2} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

function TrialCard() {
  return (
    <div className="mx-3 mb-4 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Clock3 size={15} className="text-brand-600" />
        Free Trial Active
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        12 days remaining. Upgrade to keep your data. Your case will be removed
        after trial ends.
      </p>
      <Link
        to="/dashboard/settings?tab=subscription"
        className="mt-3 block w-full rounded-lg border border-slate-200 bg-white py-2 text-center text-xs font-semibold text-slate-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
      >
        View Plans →
      </Link>
    </div>
  )
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f7f8f6]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
        <div className="px-5 pt-5">
          <BrandLogo
            size={36}
            withText
            to="/dashboard"
            textClassName="text-lg font-bold text-slate-900"
          />
        </div>
        <SidebarNav />
        <div className="mt-auto">
          <TrialCard />
        </div>
      </aside>

      {/* Mobile drawer */}
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
                to="/dashboard"
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
              <TrialCard />
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} className="text-slate-400" />
              <span className="hidden sm:inline">Ontario, Canada</span>
              <span className="sm:hidden">Ontario</span>
            </span>
            <AvatarMenu
              avatar={avatarImg}
              alt="Your profile"
              settingsTo="/dashboard/settings"
              logoutTo="/login"
            />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-auto">
          <div className="flex-1">
            <Outlet />
          </div>

          <footer className="border-t border-slate-200/80 bg-white px-4 py-5 sm:px-6 lg:px-8">
            <nav
              aria-label="Footer"
              className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start"
            >
              {footerLinks.map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}
