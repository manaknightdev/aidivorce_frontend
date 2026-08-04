import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  Bell,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import BrandLogo from '../BrandLogo'
import AvatarMenu from '../AvatarMenu'
import { COACH_PROFILE } from '../../data/coachPortal'

const navItems = [
  { to: '/coach', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/coach/inbox', label: 'Inbox', icon: Inbox },
  { to: '/coach/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/coach/notifications', label: 'Notifications', icon: Bell },
  { to: '/coach/settings', label: 'Settings', icon: Settings },
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

function CoachCard() {
  return (
    <div className="mx-3 mb-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
      <img
        src={COACH_PROFILE.avatar}
        alt=""
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-slate-900">Coach Portal</p>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          {COACH_PROFILE.status}
        </p>
      </div>
    </div>
  )
}

export default function CoachLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f7f8f6]">
      <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
        <div className="px-5 pt-5">
          <BrandLogo
            size={36}
            withText
            to="/coach"
            textClassName="text-lg font-bold text-slate-900"
          />
        </div>
        <SidebarNav />
        <div className="mt-auto">
          <CoachCard />
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
                to="/coach"
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
              <CoachCard />
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

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/coach/notifications"
              className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Link>
            <AvatarMenu
              avatar={COACH_PROFILE.avatar}
              alt="Coach profile"
              settingsTo="/coach/settings"
              logoutTo="/coach/login"
            />
          </div>
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
