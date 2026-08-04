import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  Save,
  Plus,
  Trash2,
  Check,
  Shield,
  MessageCircle,
  Star,
  Wrench,
  Upload,
  Play,
  Video,
  Info,
  GripVertical,
  Link2,
} from 'lucide-react'
import {
  CONTENT_TABS,
  getAdminContent,
  normalizeAdminContent,
  setAdminContent,
  subscribeAdminContent,
} from '../../data/adminContent'
import AssessmentBuilder from '../../components/admin/AssessmentBuilder'
import IntakeFormBuilder from '../../components/admin/IntakeFormBuilder'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100'

const textareaClass = `${inputClass} resize-y`

function FieldLabel({ children, hint }) {
  return (
    <div className="mb-1.5">
      <p className="text-sm font-semibold text-slate-700">{children}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

function EditorCard({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Icon size={16} />
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

function PreviewCard({ children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
      <p className="text-xs font-bold tracking-wide text-slate-400 uppercase">
        Live Preview
      </p>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function TermsEditor({ draft, onChange }) {
  function updatePoint(index, value) {
    const points = draft.points.map((p, i) => (i === index ? value : p))
    onChange({ points })
  }

  function addPoint() {
    onChange({ points: [...draft.points, 'New agreement point'] })
  }

  function removePoint(index) {
    if (draft.points.length <= 1) return
    onChange({ points: draft.points.filter((_, i) => i !== index) })
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      <EditorCard
        icon={Shield}
        title="Terms & Conditions Editor"
        subtitle="Edit the agreement users see before starting a free consultation."
      >
        <div className="space-y-4">
          <label className="block">
            <FieldLabel>Modal Title</FieldLabel>
            <input
              type="text"
              value={draft.modalTitle}
              onChange={(e) => onChange({ modalTitle: e.target.value })}
              className={inputClass}
            />
          </label>

          <div>
            <FieldLabel>Agreement Points</FieldLabel>
            <div className="space-y-2.5">
              {draft.points.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-3 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updatePoint(index, e.target.value)}
                    className={`${inputClass} mt-0`}
                  />
                  <button
                    type="button"
                    onClick={() => removePoint(index)}
                    className="mt-2 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Remove point"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addPoint}
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2 text-sm font-bold text-brand-800 hover:bg-brand-100"
            >
              <Plus size={14} />
              Add Point
            </button>
          </div>

          <label className="block">
            <FieldLabel hint='To create a link, use markdown, e.g. [Terms of Service](https://example.com/tos).'>
              Acceptance Checkbox Text
            </FieldLabel>
            <textarea
              rows={4}
              value={draft.acceptanceText}
              onChange={(e) => onChange({ acceptanceText: e.target.value })}
              className={textareaClass}
            />
          </label>

          <label className="block">
            <FieldLabel>Action Button Text</FieldLabel>
            <input
              type="text"
              value={draft.actionButtonText}
              onChange={(e) => onChange({ actionButtonText: e.target.value })}
              className={inputClass}
            />
          </label>

          <label className="block">
            <FieldLabel>Preview caption</FieldLabel>
            <input
              type="text"
              value={draft.previewCaption}
              onChange={(e) => onChange({ previewCaption: e.target.value })}
              className={inputClass}
            />
          </label>
        </div>
      </EditorCard>

      <PreviewCard>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-900 text-white">
            <Shield size={20} />
          </div>
          <h3 className="mt-4 text-center text-lg font-bold text-slate-900">
            {draft.modalTitle || 'Terms & Agreement'}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {draft.points.filter(Boolean).map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-sm text-slate-600"
              >
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <Check size={10} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <label className="mt-5 flex items-start gap-2.5 rounded-xl bg-white p-3 ring-1 ring-slate-200">
            <input
              type="checkbox"
              readOnly
              checked
              className="mt-0.5 accent-brand-500"
            />
            <span className="text-xs leading-relaxed text-slate-600">
              {draft.acceptanceText}
            </span>
          </label>
          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-slate-200 py-3 text-sm font-bold text-slate-700"
          >
            {draft.actionButtonText || 'Continue'}
          </button>
          <p className="mt-3 text-center text-[11px] text-slate-400">
            {draft.previewCaption}
          </p>
        </div>
      </PreviewCard>
    </div>
  )
}

function ChatEditor({ draft, onChange }) {
  const fileRef = useRef(null)

  function handleVideoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 50 * 1024 * 1024) {
      window.alert('Video must be 50MB or smaller.')
      e.target.value = ''
      return
    }
    const url = URL.createObjectURL(file)
    if (draft.videoUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(draft.videoUrl)
    }
    onChange({
      videoFileName: file.name,
      videoUrl: url,
    })
  }

  function removeVideo() {
    if (draft.videoUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(draft.videoUrl)
    }
    onChange({
      videoFileName: '',
      videoUrl: '',
    })
  }

  function previewVideo() {
    if (draft.videoUrl) {
      window.open(draft.videoUrl, '_blank', 'noopener,noreferrer')
      return
    }
    window.alert(
      draft.videoFileName
        ? `${draft.videoFileName} is saved as the current coach video. Upload a new file to preview locally.`
        : 'No video uploaded yet.',
    )
  }

  return (
    <EditorCard
      icon={MessageCircle}
      title="Chat Screen Content"
      subtitle="Manage dynamic content that appears in the chat interface."
    >
      <div className="space-y-5">
        <label className="block">
          <FieldLabel hint="This message will be displayed as the coach's introduction in the chat.">
            Coach&apos;s Message
          </FieldLabel>
          <textarea
            rows={5}
            value={draft.welcomeText}
            onChange={(e) => onChange({ welcomeText: e.target.value })}
            className={textareaClass}
          />
        </label>

        <div>
          <FieldLabel>Coach Video Message</FieldLabel>
          <div className="mt-1.5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
            {draft.videoFileName ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                    <Video size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {draft.videoFileName}
                    </p>
                    <input
                      type="text"
                      value={draft.videoTitle}
                      onChange={(e) => onChange({ videoTitle: e.target.value })}
                      className={`${inputClass} mt-1.5`}
                      placeholder="Video description"
                    />
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={previewVideo}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Play size={13} />
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-100 bg-white px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No coach intro video uploaded yet.
              </p>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="video/mp4,video/quicktime,video/x-msvideo,.mp4,.mov,.avi"
              className="hidden"
              onChange={handleVideoUpload}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
            >
              <Upload size={15} />
              Upload New Video
            </button>
            <p className="mt-2 text-xs text-slate-400">
              Supported formats: MP4, MOV, AVI (Max size: 50MB)
            </p>
          </div>
        </div>

        <label className="block">
          <FieldLabel hint="The primary message about response time.">
            Response Time Text (Main)
          </FieldLabel>
          <input
            type="text"
            value={draft.responseTimeMain}
            onChange={(e) => onChange({ responseTimeMain: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className="block">
          <FieldLabel hint="A smaller, secondary message displayed below the main text.">
            Response Time Text (Sub-label)
          </FieldLabel>
          <input
            type="text"
            value={draft.responseTimeSub}
            onChange={(e) => onChange({ responseTimeSub: e.target.value })}
            className={inputClass}
          />
        </label>
      </div>
    </EditorCard>
  )
}

function FeedbackEditor({ draft, onChange }) {
  return (
    <EditorCard
      icon={Star}
      title="Feedback Modal Editor"
      subtitle="Customize the feedback request shown when free questions are used up."
    >
      <div className="space-y-4">
        <label className="block">
          <FieldLabel>Modal Title</FieldLabel>
          <input
            type="text"
            value={draft.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className="block">
          <FieldLabel>Modal Body Text</FieldLabel>
          <textarea
            rows={4}
            value={draft.body}
            onChange={(e) => onChange({ body: e.target.value })}
            className={textareaClass}
          />
        </label>

        <label className="block max-w-xs">
          <FieldLabel hint="Free message(s) given to user upon feedback submission. Set the number of free messages users receive after submitting feedback.">
            Reward Messages
          </FieldLabel>
          <input
            type="number"
            min="1"
            max="10"
            value={draft.rewardMessages ?? 1}
            onChange={(e) =>
              onChange({
                rewardMessages: Math.max(1, Number(e.target.value) || 1),
              })
            }
            className={inputClass}
          />
        </label>

        <label className="block">
          <FieldLabel>Rating Prompt</FieldLabel>
          <input
            type="text"
            value={draft.rateLabel}
            onChange={(e) => onChange({ rateLabel: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className="block">
          <FieldLabel>Comment Box Placeholder</FieldLabel>
          <input
            type="text"
            value={draft.placeholder}
            onChange={(e) => onChange({ placeholder: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className="block">
          <FieldLabel>Primary Button Text</FieldLabel>
          <input
            type="text"
            value={draft.submitText}
            onChange={(e) => onChange({ submitText: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className="block">
          <FieldLabel>Secondary Action Text</FieldLabel>
          <input
            type="text"
            value={draft.dismissText}
            onChange={(e) => onChange({ dismissText: e.target.value })}
            className={inputClass}
          />
        </label>
      </div>
    </EditorCard>
  )
}

function ToolsEditor({ draft, onChange }) {
  const instructions = draft.instructions || []
  const items = draft.items || []
  const [localToast, setLocalToast] = useState('')

  function flash(msg) {
    setLocalToast(msg)
    window.setTimeout(() => setLocalToast(''), 2000)
  }

  function updateInstruction(index, value) {
    onChange({
      instructions: instructions.map((line, i) => (i === index ? value : line)),
    })
  }

  function addInstruction() {
    onChange({ instructions: [...instructions, 'New instruction line'] })
  }

  function removeInstruction(index) {
    onChange({ instructions: instructions.filter((_, i) => i !== index) })
  }

  function updateItem(index, patch) {
    onChange({
      items: items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    })
  }

  function addTool() {
    onChange({
      items: [
        ...items,
        {
          id: `t${Date.now()}`,
          title: '',
          description: '',
          link: '',
          enabled: true,
        },
      ],
    })
  }

  function removeTool(index) {
    onChange({ items: items.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            {draft.heading || 'Tools & Checklists'}
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Manage how-to copy and each tool&apos;s title, description, and link.
          </p>
        </div>
        <label className="block min-w-56 text-xs font-bold text-slate-500">
          Section heading
          <input
            type="text"
            value={draft.heading || ''}
            onChange={(e) => onChange({ heading: e.target.value })}
            className={inputClass}
          />
        </label>
      </div>

      {localToast && (
        <p className="rounded-xl bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
          {localToast}
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-50 text-sky-600">
            <Info size={15} />
          </span>
          <input
            type="text"
            value={draft.instructionsTitle || 'How to Use These Tools'}
            onChange={(e) => onChange({ instructionsTitle: e.target.value })}
            className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-1 py-0.5 text-sm font-bold text-slate-900 outline-none hover:border-slate-200 focus:border-brand-300 focus:bg-slate-50"
          />
        </div>

        <div className="mt-4 space-y-2.5">
          {instructions.map((line, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2"
            >
              <GripVertical size={16} className="shrink-0 text-slate-300" />
              <input
                type="text"
                value={line}
                onChange={(e) => updateInstruction(index, e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-sm text-slate-800 outline-none focus:border-brand-300 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                aria-label="Remove instruction"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={addInstruction}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800"
          >
            <Plus size={14} />
            Add new instruction line
          </button>
          <button
            type="button"
            onClick={() => flash('Instructions saved to draft.')}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-bold text-white hover:bg-brand-600"
          >
            Save Instructions
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Tools</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Each tool needs a title, description, and link.
            </p>
          </div>
          <button
            type="button"
            onClick={addTool}
            className="inline-flex items-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2 text-sm font-bold text-brand-800 hover:bg-brand-100"
          >
            <Plus size={14} />
            Add Tool
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {items.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
              No tools yet. Add one to get started.
            </p>
          )}

          {items.map((item, index) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-bold tracking-wide text-slate-400 uppercase">
                  Tool {index + 1}
                </p>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-600">
                    <input
                      type="checkbox"
                      checked={item.enabled !== false}
                      onChange={(e) =>
                        updateItem(index, { enabled: e.target.checked })
                      }
                      className="accent-brand-500"
                    />
                    Enabled
                  </label>
                  <button
                    type="button"
                    onClick={() => removeTool(index)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete tool"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3">
                <label className="block text-sm font-semibold text-slate-700">
                  Title
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) =>
                      updateItem(index, { title: e.target.value })
                    }
                    className={inputClass}
                    placeholder="e.g., Document checklist"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Description
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) =>
                      updateItem(index, { description: e.target.value })
                    }
                    className={`${inputClass} resize-y`}
                    placeholder="Short description of what this tool helps with"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Link
                  <div className="relative">
                    <Link2
                      size={15}
                      className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="url"
                      value={item.link || ''}
                      onChange={(e) =>
                        updateItem(index, { link: e.target.value })
                      }
                      className={`${inputClass} pl-10`}
                      placeholder="https://docs.google.com/spreadsheets/..."
                    />
                  </div>
                </label>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function AdminContent() {
  const saved = useSyncExternalStore(
    subscribeAdminContent,
    getAdminContent,
    getAdminContent,
  )
  const [tab, setTab] = useState('terms')
  const [draft, setDraft] = useState(() =>
    normalizeAdminContent(structuredClone(saved)),
  )
  const [toast, setToast] = useState('')
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (!dirty) setDraft(normalizeAdminContent(structuredClone(saved)))
  }, [saved, dirty])

  const section = draft[tab] || {}

  function patchSection(patch) {
    setDirty(true)
    setDraft((prev) => ({
      ...prev,
      [tab]: { ...(prev[tab] || {}), ...patch },
    }))
  }

  function saveAll() {
    setAdminContent(normalizeAdminContent(draft))
    setDirty(false)
    setToast('All content changes saved.')
    window.setTimeout(() => setToast(''), 2400)
  }

  let tabPanel = null
  if (tab === 'terms') {
    tabPanel = <TermsEditor draft={section} onChange={patchSection} />
  } else if (tab === 'chat') {
    tabPanel = <ChatEditor draft={section} onChange={patchSection} />
  } else if (tab === 'feedback') {
    tabPanel = <FeedbackEditor draft={section} onChange={patchSection} />
  } else if (tab === 'intake') {
    tabPanel = <IntakeFormBuilder draft={section} onChange={patchSection} />
  } else if (tab === 'assessment') {
    tabPanel = <AssessmentBuilder draft={section} onChange={patchSection} />
  } else if (tab === 'tools') {
    tabPanel = <ToolsEditor draft={section} onChange={patchSection} />
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Content Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage all content templates, forms, and user-facing materials.
          </p>
        </div>
        <button
          type="button"
          onClick={saveAll}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand-500/25 hover:bg-brand-600"
        >
          <Save size={16} />
          Save All Changes
          {dirty && (
            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase">
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

      <div className="mt-6">
        <nav
          className="flex flex-wrap gap-2"
          aria-label="Content tabs"
        >
          {CONTENT_TABS.map((item) => {
            const active = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mt-6">{tabPanel}</div>
    </div>
  )
}
