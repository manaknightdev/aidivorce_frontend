import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  RefreshCw,
  Briefcase,
  Info,
  Wallet,
  BarChart3,
  Sparkles,
  ChevronDown,
  Check,
} from 'lucide-react'
import {
  BILLING_CYCLES,
  CANCEL_BEHAVIORS,
  PACKAGE_FEATURE_OPTIONS,
  SERVICE_TYPES,
  emptyPackageForm,
  getAdminPackageById,
  packageFromForm,
  upsertAdminPackage,
} from '../../data/adminPackages'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100'

const selectClass =
  'appearance-none mt-1.5 w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat [background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")]'

function Section({
  id,
  open,
  onToggle,
  icon: Icon,
  title,
  subtitle,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-slate-50/60"
        aria-expanded={open}
      >
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Icon size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
        </div>
        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-slate-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 py-5">{children}</div>
      )}
    </section>
  )
}

function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className="flex items-start justify-between gap-4">
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

function ActionBar({ onCancel, onDraft, onPublish, isEdit }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onDraft}
        className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-200"
      >
        Save Draft
      </button>
      <button
        type="button"
        onClick={onPublish}
        className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand-500/25 hover:bg-brand-600"
      >
        {isEdit ? 'Save Package' : 'Publish Package'}
      </button>
    </div>
  )
}

function calcFinal(basePrice, discount) {
  const base = Number(basePrice) || 0
  const d = Math.min(100, Math.max(0, Number(discount) || 0))
  return Math.round(base * (1 - d / 100) * 100) / 100
}

export default function AdminPackageForm() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const existing = isEdit ? getAdminPackageById(id) : null
  const initialKind =
    existing?.kind ||
    (searchParams.get('type') === 'service' ? 'service' : 'subscription')

  const [form, setForm] = useState(() => {
    if (existing) return { ...emptyPackageForm(existing.kind), ...existing }
    return emptyPackageForm(initialKind)
  })
  const [error, setError] = useState('')
  const [openSections, setOpenSections] = useState({
    type: true,
    basic: true,
    billing: true,
    usage: true,
    features: true,
  })

  useEffect(() => {
    if (isEdit && !existing) {
      navigate('/admin/packages', {
        replace: true,
        state: { toast: 'Package not found.' },
      })
    }
  }, [isEdit, existing, navigate])

  const finalPrice = useMemo(
    () => calcFinal(form.basePrice, form.discount),
    [form.basePrice, form.discount],
  )

  const memberPreview = useMemo(() => {
    if (!form.memberDiscountEnabled) return null
    if (form.memberPrice != null && form.memberPrice !== '') {
      return Number(form.memberPrice)
    }
    const md = Math.min(100, Math.max(0, Number(form.memberDiscount) || 0))
    return Math.round(finalPrice * (1 - md / 100) * 100) / 100
  }, [
    form.memberDiscountEnabled,
    form.memberPrice,
    form.memberDiscount,
    finalPrice,
  ])

  function patch(partial) {
    setForm((f) => ({ ...f, ...partial }))
  }

  function toggleSection(key) {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }))
  }

  function setKind(kind) {
    if (form.kind === kind) return
    setForm((f) => ({
      ...emptyPackageForm(kind),
      id: f.id,
      name: f.name,
      tag: f.tag,
      description: f.description,
      status: f.status,
      basePrice: f.basePrice,
      discount: f.discount,
      finalPrice: f.finalPrice,
      memberDiscountEnabled: f.memberDiscountEnabled,
      memberPrice: f.memberPrice,
      memberDiscount: f.memberDiscount,
      features: f.features,
    }))
  }

  function toggleFeature(featureId) {
    setForm((f) => ({
      ...f,
      features: f.features.includes(featureId)
        ? f.features.filter((x) => x !== featureId)
        : [...f.features, featureId],
    }))
  }

  function validate() {
    if (!form.name.trim()) {
      setError('Package name is required.')
      return false
    }
    if (form.kind === 'service' && !form.serviceType) {
      setError('Please select a service type.')
      return false
    }
    setError('')
    return true
  }

  function save({ asDraft }) {
    if (!validate()) return
    const pkg = packageFromForm(
      {
        ...form,
        finalPrice,
        memberPrice: memberPreview,
        status: asDraft ? 'Draft' : form.status === 'Draft' ? 'Active' : form.status,
      },
      { asDraft },
    )
    upsertAdminPackage(pkg)
    navigate('/admin/packages', {
      state: {
        toast: asDraft
          ? `${pkg.name} saved as draft.`
          : isEdit
            ? `${pkg.name} updated.`
            : `${pkg.name} published.`,
      },
    })
  }

  function onCancel() {
    navigate('/admin/packages')
  }

  const isSub = form.kind === 'subscription'

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
            <Link to="/admin/packages" className="hover:underline">
              Packages
            </Link>
            <span className="mx-1.5 text-slate-300">/</span>
            {isEdit ? 'Edit' : 'New'}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {isEdit ? 'Edit Package' : 'Add New Package'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {isEdit
              ? 'Update this subscription plan or professional service.'
              : 'Create a new subscription plan or professional service.'}
          </p>
        </div>
        <ActionBar
          isEdit={isEdit}
          onCancel={onCancel}
          onDraft={() => save({ asDraft: true })}
          onPublish={() => save({ asDraft: false })}
        />
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-100">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {/* Package Type */}
        <Section
          id="type"
          open={openSections.type}
          onToggle={toggleSection}
          icon={RefreshCw}
          title="Package Type"
          subtitle="Choose between a recurring subscription or a one-time service."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setKind('subscription')}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                isSub
                  ? 'border-brand-300 bg-brand-50 ring-1 ring-brand-200'
                  : 'border-slate-200 bg-white hover:border-brand-200'
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${
                  isSub
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <RefreshCw size={18} />
              </span>
              <p className="mt-3 text-sm font-bold text-slate-900">
                Subscription
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Recurring monthly plans with ongoing support and services.
                Example: Monthly Coaching Plan.
              </p>
              {isSub && (
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-700">
                  <Check size={12} strokeWidth={3} /> Selected
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setKind('service')}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                !isSub
                  ? 'border-brand-300 bg-brand-50 ring-1 ring-brand-200'
                  : 'border-slate-200 bg-white hover:border-brand-200'
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${
                  !isSub
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Briefcase size={18} />
              </span>
              <p className="mt-3 text-sm font-bold text-slate-900">
                Service (One-time)
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Single sessions or consultations purchased separately. Example:
                Clarity Session, Intro Call.
              </p>
              {!isSub && (
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-700">
                  <Check size={12} strokeWidth={3} /> Selected
                </span>
              )}
            </button>
          </div>
        </Section>

        {/* Basic Information */}
        <Section
          id="basic"
          open={openSections.basic}
          onToggle={toggleSection}
          icon={Info}
          title="Basic Information"
          subtitle="Set basic information, description, and visibility settings."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
              Package Name <span className="text-rose-500">*</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => patch({ name: e.target.value })}
                className={inputClass}
                placeholder="e.g., Financial Plan"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Price Tag <span className="font-normal text-slate-400">(Optional)</span>
              <input
                type="text"
                value={form.tag}
                onChange={(e) => patch({ tag: e.target.value })}
                className={inputClass}
                placeholder="No tag"
              />
            </label>
            {!isSub && (
              <label className="block text-sm font-semibold text-slate-700">
                Service Type
                <select
                  value={form.serviceType}
                  onChange={(e) => patch({ serviceType: e.target.value })}
                  className={selectClass}
                >
                  {SERVICE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
              Description
              <textarea
                value={form.description}
                onChange={(e) => patch({ description: e.target.value })}
                rows={3}
                className={`${inputClass} resize-y`}
                placeholder="Short description of what this plan includes..."
              />
            </label>
            {!isSub && (
              <>
                <label className="block text-sm font-semibold text-slate-700">
                  Sessions included
                  <input
                    type="number"
                    min="1"
                    value={form.sessionsIncluded}
                    onChange={(e) =>
                      patch({ sessionsIncluded: e.target.value })
                    }
                    className={inputClass}
                    placeholder="e.g., 1 or 4"
                  />
                  <span className="mt-1 block text-xs font-normal text-slate-500">
                    How many Zoom/coaching sessions this service includes.
                  </span>
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Call duration (minutes)
                  <input
                    type="number"
                    min="1"
                    value={form.durationMinutes ?? ''}
                    onChange={(e) => {
                      const mins = e.target.value
                      patch({
                        durationMinutes: mins,
                        duration: mins ? `${mins} min` : form.duration,
                      })
                    }}
                    className={inputClass}
                    placeholder="e.g., 45 or 200"
                  />
                  <span className="mt-1 block text-xs font-normal text-slate-500">
                    Per Zoom call length shown on the booking page (45, 200,
                    etc.).
                  </span>
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Duration label
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => patch({ duration: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., 60 min or One-time"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Details
                  <input
                    type="text"
                    value={form.details}
                    onChange={(e) => patch({ details: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., 3 total messages, 48-hour response"
                  />
                </label>
              </>
            )}
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-semibold text-slate-700">
                Status
              </legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {['Active', 'Draft', 'Hidden'].map((status) => (
                  <label
                    key={status}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"
                  >
                    <input
                      type="radio"
                      name="pkg-status"
                      checked={form.status === status}
                      onChange={() => patch({ status })}
                      className="accent-brand-500"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </Section>

        {/* Billing & Pricing */}
        <Section
          id="billing"
          open={openSections.billing}
          onToggle={toggleSection}
          icon={Wallet}
          title="Billing & Pricing"
          subtitle={
            isSub
              ? 'Pricing and billing cycles, trials, and discounts.'
              : 'One-time pricing, member discounts, and display.'
          }
        >
          <div className="space-y-5">
            {isSub && (
              <>
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Billing Cycle
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BILLING_CYCLES.map((cycle) => (
                      <button
                        key={cycle.value}
                        type="button"
                        onClick={() => patch({ billingCycle: cycle.value })}
                        className={`rounded-xl px-3.5 py-2 text-sm font-bold transition-colors ${
                          form.billingCycle === cycle.value
                            ? 'bg-brand-500 text-white'
                            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {cycle.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.customBilling}
                    onChange={(e) =>
                      patch({ customBilling: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                  />
                  Use Custom Billing Name
                </label>
                {form.customBilling && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Display Name
                      <input
                        type="text"
                        value={form.customBillingName}
                        onChange={(e) =>
                          patch({ customBillingName: e.target.value })
                        }
                        className={inputClass}
                        placeholder="e.g., Billed monthly"
                      />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                      Display Type
                      <input
                        type="text"
                        value={form.customBillingType}
                        onChange={(e) =>
                          patch({ customBillingType: e.target.value })
                        }
                        className={inputClass}
                        placeholder="MONTH"
                      />
                    </label>
                  </div>
                )}
              </>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block text-sm font-semibold text-slate-700">
                Base Price ($)
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.basePrice}
                  onChange={(e) => patch({ basePrice: e.target.value })}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Discount (%)
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={form.discount}
                  onChange={(e) => patch({ discount: e.target.value })}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Final Price
                <input
                  type="text"
                  readOnly
                  value={`$${finalPrice}`}
                  className={`${inputClass} cursor-default bg-slate-100 font-bold text-slate-900`}
                />
              </label>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
              <Toggle
                checked={form.memberDiscountEnabled}
                onChange={(v) => patch({ memberDiscountEnabled: v })}
                label="Member Discount"
                hint="Offer a lower price for Essential members."
              />
              {form.memberDiscountEnabled && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Member Price ($)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.memberPrice ?? ''}
                      onChange={(e) =>
                        patch({
                          memberPrice:
                            e.target.value === '' ? null : e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder={
                        memberPreview != null ? String(memberPreview) : ''
                      }
                    />
                  </label>
                  <label className="block text-sm font-semibold text-slate-700">
                    Member Discount (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={form.memberDiscount}
                      onChange={(e) =>
                        patch({ memberDiscount: e.target.value })
                      }
                      className={inputClass}
                    />
                  </label>
                </div>
              )}
            </div>

            {isSub && (
              <>
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                  <Toggle
                    checked={form.trialEnabled}
                    onChange={(v) => patch({ trialEnabled: v })}
                    label="Trial"
                    hint="Offer a free trial before billing starts."
                  />
                  {form.trialEnabled && (
                    <label className="mt-4 block text-sm font-semibold text-slate-700">
                      Trial Duration (days)
                      <input
                        type="number"
                        min="1"
                        value={form.trialDays}
                        onChange={(e) => patch({ trialDays: e.target.value })}
                        className={inputClass}
                      />
                    </label>
                  )}
                </div>

                <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                  <p className="text-sm font-bold text-slate-900">
                    Renewal Settings
                  </p>
                  <Toggle
                    checked={form.autoRenew}
                    onChange={(v) => patch({ autoRenew: v })}
                    label="Auto-renew"
                    hint="Automatically renew at end of billing cycle."
                  />
                  <label className="block text-sm font-semibold text-slate-700">
                    Cancel Behavior
                    <select
                      value={form.cancelBehavior}
                      onChange={(e) =>
                        patch({ cancelBehavior: e.target.value })
                      }
                      className={selectClass}
                    >
                      {CANCEL_BEHAVIORS.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </>
            )}
          </div>
        </Section>

        {/* Usage */}
        <Section
          id="usage"
          open={openSections.usage}
          onToggle={toggleSection}
          icon={BarChart3}
          title="Usage"
          subtitle="Set limits for usage for items in this plan."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {isSub && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Sessions per Month
                    <input
                      type="number"
                      min="0"
                      disabled={form.sessionsUnlimited}
                      value={form.sessionsPerMonth ?? ''}
                      onChange={(e) =>
                        patch({ sessionsPerMonth: e.target.value })
                      }
                      className={`${inputClass} disabled:opacity-50`}
                    />
                  </label>
                  <label className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <input
                      type="checkbox"
                      checked={form.sessionsUnlimited}
                      onChange={(e) =>
                        patch({ sessionsUnlimited: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                    />
                    Unlimited
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Total Messages per Month
                    <input
                      type="number"
                      min="0"
                      disabled={form.messagesUnlimited}
                      value={form.totalMessagesPerMonth ?? ''}
                      onChange={(e) =>
                        patch({ totalMessagesPerMonth: e.target.value })
                      }
                      className={`${inputClass} disabled:opacity-50`}
                    />
                  </label>
                  <label className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <input
                      type="checkbox"
                      checked={form.messagesUnlimited}
                      onChange={(e) =>
                        patch({ messagesUnlimited: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                    />
                    Unlimited
                  </label>
                </div>
                <label className="block text-sm font-semibold text-slate-700">
                  AI Analysis Allowed
                  <input
                    type="number"
                    min="0"
                    value={form.aiAnalysisAllowed}
                    onChange={(e) =>
                      patch({ aiAnalysisAllowed: e.target.value })
                    }
                    className={inputClass}
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Sessions label (table)
                  <input
                    type="text"
                    value={form.sessionLimitSub}
                    onChange={(e) =>
                      patch({ sessionLimitSub: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Case Building & Tracking"
                  />
                </label>
              </>
            )}
            <label className="block text-sm font-semibold text-slate-700">
              Messages per Session
              <input
                type="number"
                min="0"
                value={form.messagesPerSession}
                onChange={(e) =>
                  patch({ messagesPerSession: e.target.value })
                }
                className={inputClass}
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Words Limit
              <input
                type="number"
                min="0"
                value={form.wordsLimit}
                onChange={(e) => patch({ wordsLimit: e.target.value })}
                className={inputClass}
              />
            </label>
          </div>
        </Section>

        {/* Features & Benefits */}
        <Section
          id="features"
          open={openSections.features}
          onToggle={toggleSection}
          icon={Sparkles}
          title="Features & Benefits"
          subtitle={
            isSub
              ? 'Subscription features included in this plan.'
              : 'Benefits included with this professional service.'
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {PACKAGE_FEATURE_OPTIONS.map((feature) => {
              const checked = form.features.includes(feature.id)
              return (
                <label
                  key={feature.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm font-semibold transition-colors ${
                    checked
                      ? 'border-brand-200 bg-brand-50 text-brand-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-brand-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleFeature(feature.id)}
                    className="h-4 w-4 rounded border-slate-300 accent-brand-500"
                  />
                  {feature.label}
                </label>
              )
            })}
          </div>
        </Section>
      </div>

      <div className="mt-6 flex justify-end border-t border-slate-200 pt-5">
        <ActionBar
          isEdit={isEdit}
          onCancel={onCancel}
          onDraft={() => save({ asDraft: true })}
          onPublish={() => save({ asDraft: false })}
        />
      </div>
    </div>
  )
}
