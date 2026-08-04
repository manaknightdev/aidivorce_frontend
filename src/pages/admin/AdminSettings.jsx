import { useEffect, useState, useSyncExternalStore } from 'react'
import {
  Save,
  Globe,
  Bot,
  Clock3,
  Gift,
  Star,
  Mail,
} from 'lucide-react'
import {
  getAdminSettings,
  subscribeAdminSettings,
  setAdminSettings,
  resetAdminSettings,
  TEMPERATURE_OPTIONS,
  LANGUAGE_OPTIONS,
  INITIAL_SETTINGS,
} from '../../data/adminSettings'
import {
  getAdminContent,
  setAdminContent,
} from '../../data/adminContent'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100'

const selectClass =
  'appearance-none mt-1.5 w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat [background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")]'

const textareaClass = `${inputClass} resize-y`

function SettingsCard({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Icon size={18} />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-brand-500' : 'bg-slate-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

function formatUpdatedAt(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default function AdminSettings() {
  const saved = useSyncExternalStore(
    subscribeAdminSettings,
    getAdminSettings,
    getAdminSettings,
  )
  const [draft, setDraft] = useState(() => structuredClone(saved))
  const [dirty, setDirty] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!dirty) setDraft(structuredClone(saved))
  }, [saved, dirty])

  function patch(path, value) {
    setDirty(true)
    setDraft((prev) => {
      const next = structuredClone(prev)
      const [a, b] = path.split('.')
      if (b) next[a][b] = value
      else next[a] = value
      return next
    })
  }

  function toggleLanguage(id) {
    if (id === draft.languages.defaultLang && draft.languages[id]) return
    setDirty(true)
    setDraft((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [id]: !prev.languages[id],
      },
    }))
  }

  function save() {
    const next = setAdminSettings(draft)
    // Keep content feedback reward in sync with platform settings
    const content = getAdminContent()
    setAdminContent({
      ...content,
      feedback: {
        ...content.feedback,
        rewardMessages: Number(next.feedbackRewards.freeMessages) || 1,
      },
      chat: {
        ...content.chat,
        responseTimeMain:
          content.chat.responseTimeMain ||
          `Coach Sam will get back to you as he's online— always within ${next.responseTiming.expectedHours} hours.`,
      },
    })
    setDirty(false)
    setToast('Settings saved successfully.')
    window.setTimeout(() => setToast(''), 2400)
  }

  function reset() {
    const next = resetAdminSettings()
    setDraft(structuredClone(next))
    setDirty(false)
    setToast('Settings reset to defaults.')
    window.setTimeout(() => setToast(''), 2400)
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure system settings, AI behavior, and platform preferences.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand-500/25 hover:bg-brand-600"
        >
          <Save size={16} />
          Save Settings
          {dirty && (
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase">
              Unsaved
            </span>
          )}
        </button>
      </div>

      {toast && (
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
          {toast}
        </p>
      )}

      <div className="mt-6 space-y-4">
        <SettingsCard
          icon={Globe}
          title="Language Configuration"
          description="Choose the languages that will be available to the coach."
        >
          <div className="space-y-3">
            {LANGUAGE_OPTIONS.map((lang) => {
              const checked = !!draft.languages[lang.id]
              const isDefault = draft.languages.defaultLang === lang.id
              return (
                <label
                  key={lang.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleLanguage(lang.id)}
                    disabled={isDefault && checked}
                    className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                  />
                  <span className="text-sm font-semibold text-slate-800">
                    {lang.label}
                  </span>
                  {isDefault && (
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 uppercase">
                      Default
                    </span>
                  )}
                </label>
              )
            })}
          </div>
        </SettingsCard>

        <SettingsCard
          icon={Bot}
          title="AI Configuration"
          description="Control how the AI greets users and shapes answers."
        >
          <label className="block text-sm font-semibold text-slate-700">
            System Message
            <span className="mt-0.5 block text-xs font-normal text-slate-500">
              Define the greeting message the AI will send to users.
            </span>
            <textarea
              rows={4}
              value={draft.ai.systemMessage}
              onChange={(e) => patch('ai.systemMessage', e.target.value)}
              className={textareaClass}
            />
          </label>

          <label className="mt-4 block text-sm font-semibold text-slate-700">
            Response Temperature
            <span className="mt-0.5 block text-xs font-normal text-slate-500">
              Choose the response style for the AI&apos;s answer.
            </span>
            <select
              value={draft.ai.temperature}
              onChange={(e) => patch('ai.temperature', e.target.value)}
              className={selectClass}
            >
              {TEMPERATURE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </SettingsCard>

        <SettingsCard
          icon={Clock3}
          title="Response Timing Configuration"
          description="Set the expected response time (in hours) for the AI to respond."
        >
          <label className="block text-sm font-semibold text-slate-700">
            Expected Response Time
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="72"
                value={draft.responseTiming.expectedHours}
                onChange={(e) =>
                  patch(
                    'responseTiming.expectedHours',
                    Math.max(1, Number(e.target.value) || 1),
                  )
                }
                className="w-24 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
              <span className="text-sm font-medium text-slate-600">hours</span>
            </div>
            <p className="mt-2 text-xs font-normal text-slate-500">
              This will be displayed to users as the expected response time.
            </p>
          </label>
        </SettingsCard>

        <SettingsCard
          icon={Gift}
          title="Free Session Limits"
          description="Set the number of messages allowed per free session."
        >
          <label className="block text-sm font-semibold text-slate-700">
            Messages per Free Session
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="20"
                value={draft.freeSession.messagesPerSession}
                onChange={(e) =>
                  patch(
                    'freeSession.messagesPerSession',
                    Math.max(1, Number(e.target.value) || 1),
                  )
                }
                className="w-24 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
              <span className="text-sm font-medium text-slate-600">
                messages
              </span>
            </div>
            <p className="mt-2 text-xs font-normal text-slate-500">
              Users will be able to send this many messages during their free
              trial.
            </p>
          </label>
        </SettingsCard>

        <SettingsCard
          icon={Star}
          title="Feedback Rewards"
          description="Configure rewards for users who provide feedback through the feedback modal."
        >
          <label className="block text-sm font-semibold text-slate-700">
            Free Messages After Feedback
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                value={draft.feedbackRewards.freeMessages}
                onChange={(e) =>
                  patch(
                    'feedbackRewards.freeMessages',
                    Math.max(1, Number(e.target.value) || 1),
                  )
                }
                className="w-24 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
              <span className="text-sm font-medium text-slate-600">
                messages
              </span>
            </div>
            <p className="mt-2 text-xs font-normal text-slate-500">
              Users will receive this many free messages as a reward after
              submitting feedback.
            </p>
          </label>
        </SettingsCard>

        <SettingsCard
          icon={Mail}
          title="Notification Settings"
          description="Configure email notifications and alerts."
        >
          <div className="divide-y divide-slate-100">
            <Toggle
              checked={draft.notifications.newUserRegistration}
              onChange={(v) => patch('notifications.newUserRegistration', v)}
              label="New User Registration"
              hint="Get notified when new users sign up"
            />
            <Toggle
              checked={draft.notifications.sessionRequests}
              onChange={(v) => patch('notifications.sessionRequests', v)}
              label="Session Requests"
              hint="Get notified about new session bookings"
            />
            <Toggle
              checked={draft.notifications.paymentNotifications}
              onChange={(v) => patch('notifications.paymentNotifications', v)}
              label="Payment Notifications"
              hint="Get notified about subscription changes"
            />
          </div>
        </SettingsCard>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
        <p className="text-xs text-slate-500">
          Last updated: {formatUpdatedAt(saved.updatedAt || INITIAL_SETTINGS.updatedAt)}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Reset to Defaults
          </button>
          <button
            type="button"
            onClick={save}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
          >
            <Save size={16} />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  )
}
