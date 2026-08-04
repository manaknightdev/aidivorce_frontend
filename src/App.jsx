import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Location from './pages/Location'
import AssessmentIntro from './pages/AssessmentIntro'
import Assessment from './pages/Assessment'
import AssessmentComplete from './pages/AssessmentComplete'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Session from './pages/Session'
import Book from './pages/Book'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import History from './pages/History'
import ContactSupport from './pages/ContactSupport'
import TermsPrivacy from './pages/TermsPrivacy'
import AboutCoachSam from './pages/AboutCoachSam'
import HowItWorksPage from './pages/HowItWorksPage'
import CoachLayout from './components/coach/CoachLayout'
import CoachLogin from './pages/coach/CoachLogin'
import CoachDashboard from './pages/coach/CoachDashboard'
import CoachInbox from './pages/coach/CoachInbox'
import CoachReply from './pages/coach/CoachReply'
import CoachCalendar from './pages/coach/CoachCalendar'
import CoachPendingApprovals from './pages/coach/CoachPendingApprovals'
import CoachAssessment from './pages/coach/CoachAssessment'
import CoachNotifications from './pages/coach/CoachNotifications'
import CoachSettings from './pages/coach/CoachSettings'
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminPackages from './pages/admin/AdminPackages'
import AdminPackageForm from './pages/admin/AdminPackageForm'
import AdminSubscriptions from './pages/admin/AdminSubscriptions'
import AdminContent from './pages/admin/AdminContent'
import AdminSettings from './pages/admin/AdminSettings'
import AdminPlaceholder from './pages/admin/AdminPlaceholder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/location" element={<Location />} />
        <Route path="/assessment" element={<AssessmentIntro />} />
        <Route path="/assessment/questions" element={<Assessment />} />
        <Route path="/assessment/complete" element={<AssessmentComplete />} />

        <Route path="/coach/login" element={<CoachLogin />} />
        <Route path="/coach" element={<CoachLayout />}>
          <Route index element={<CoachDashboard />} />
          <Route path="inbox" element={<CoachInbox />} />
          <Route path="inbox/:id" element={<CoachReply />} />
          <Route path="calendar" element={<CoachCalendar />} />
          <Route path="calendar/pending" element={<CoachPendingApprovals />} />
          <Route
            path="calendar/:id/assessment"
            element={<CoachAssessment />}
          />
          <Route path="notifications" element={<CoachNotifications />} />
          <Route path="settings" element={<CoachSettings />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="packages/new" element={<AdminPackageForm />} />
          <Route path="packages/:id/edit" element={<AdminPackageForm />} />
          <Route path="subscribed" element={<AdminSubscriptions />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="session" element={<Session />} />
          <Route path="book" element={<Book />} />
          <Route path="reports" element={<Reports />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<ContactSupport />} />
          <Route path="terms" element={<TermsPrivacy />} />
          <Route path="about" element={<AboutCoachSam />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
