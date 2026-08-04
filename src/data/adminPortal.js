export const ADMIN_PROFILE = {
  name: 'Admin',
  email: 'admin@sam.ai',
}

export const ADMIN_OVERVIEW = [
  {
    id: 'total',
    label: 'Total Users',
    value: '1,247',
    trend: '+12% from last month',
    trendUp: true,
    icon: 'users',
  },
  {
    id: 'paid',
    label: 'Paid Users',
    value: '892',
    trend: '+8% from last month',
    trendUp: true,
    icon: 'card',
  },
  {
    id: 'guest',
    label: 'Guest Users',
    value: '355',
    trend: 'No change',
    trendUp: null,
    icon: 'user',
  },
]

export const ADMIN_SESSIONS = [
  {
    id: 'active',
    label: 'Active Sessions',
    value: '23',
    hint: 'Currently ongoing',
    icon: 'chat',
  },
  {
    id: 'new',
    label: 'New Sessions',
    value: '47',
    hint: 'Today',
    icon: 'calendar',
  },
]

export const ADMIN_DISTRIBUTION = [
  { label: 'Paid Users', percent: 71.5, tone: 'brand' },
  { label: 'Guest Users', percent: 28.5, tone: 'muted' },
]

export const ADMIN_WEEKLY_SESSIONS = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 16 },
  { day: 'Wed', count: 20 },
  { day: 'Thu', count: 14 },
  { day: 'Fri', count: 18 },
]

export const ADMIN_USER_STATS = [
  { id: 'total', label: 'Total Users', value: '1,247', icon: 'users' },
  { id: 'active', label: 'Active Users', value: '1,089', icon: 'check' },
  { id: 'paid', label: 'Paid Users', value: '892', icon: 'card' },
  { id: 'free', label: 'Free Users', value: '197', icon: 'user' },
  { id: 'guest', label: 'Guest Users', value: '158', icon: 'guest' },
]

export const ADMIN_REGISTERED_USERS = [
  {
    id: 'u1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    role: 'Client',
    subscribed: true,
    assessment: 'Completed',
    sessionsUsed: 12,
    sessionsLimit: 20,
    status: 'Active',
  },
  {
    id: 'u2',
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    role: 'Client',
    subscribed: true,
    assessment: 'Completed',
    sessionsUsed: 8,
    sessionsLimit: 20,
    status: 'Active',
  },
  {
    id: 'u3',
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    role: 'Client',
    subscribed: false,
    assessment: 'Pending',
    sessionsUsed: 1,
    sessionsLimit: 3,
    status: 'Active',
  },
  {
    id: 'u4',
    name: 'Coach Sam',
    email: 'sam@coachplatform.com',
    role: 'Coach',
    subscribed: true,
    assessment: 'N/A',
    sessionsUsed: 0,
    sessionsLimit: 0,
    status: 'Active',
  },
  {
    id: 'u5',
    name: 'David Laurent',
    email: 'david.l@email.com',
    role: 'Client',
    subscribed: true,
    assessment: 'Completed',
    sessionsUsed: 15,
    sessionsLimit: 20,
    status: 'Inactive',
  },
  {
    id: 'u6',
    name: 'Lisa Patel',
    email: 'lisa.p@email.com',
    role: 'Client',
    subscribed: false,
    assessment: 'Pending',
    sessionsUsed: 2,
    sessionsLimit: 3,
    status: 'Active',
  },
]

export const ADMIN_GUEST_USERS = [
  {
    id: 'g1',
    guestId: 'GUEST-001234',
    label: 'Anonymous User',
    email: null,
    assessment: 'Completed',
    sessionsUsed: 1,
    sessionsLimit: 1,
    status: 'Active',
  },
  {
    id: 'g2',
    guestId: 'GUEST-001891',
    label: 'Anonymous User',
    email: 'guest.temp@email.com',
    assessment: 'Pending',
    sessionsUsed: 0,
    sessionsLimit: 1,
    status: 'Active',
  },
  {
    id: 'g3',
    guestId: 'GUEST-002045',
    label: 'Anonymous User',
    email: null,
    assessment: 'Completed',
    sessionsUsed: 1,
    sessionsLimit: 1,
    status: 'Expired',
  },
  {
    id: 'g4',
    guestId: 'GUEST-002310',
    label: 'Anonymous User',
    email: 'anon.user47@email.com',
    assessment: 'Pending',
    sessionsUsed: 0,
    sessionsLimit: 1,
    status: 'Active',
  },
]
