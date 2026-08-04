import { useMemo, useState } from 'react'
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Pencil,
  Type,
  AlignLeft,
  List,
  CircleDot,
  CheckSquare,
  Hash,
  Calendar,
  Mail,
  Phone,
  Paperclip,
} from 'lucide-react'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

const FIELD_LIBRARY = [
  { type: 'text', label: 'Text Input', icon: Type },
  { type: 'textarea', label: 'Textarea', icon: AlignLeft },
  { type: 'dropdown', label: 'Dropdown', icon: List },
  { type: 'radio', label: 'Radio', icon: CircleDot },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { type: 'number', label: 'Number', icon: Hash },
  { type: 'date', label: 'Date', icon: Calendar },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'phone', label: 'Phone', icon: Phone },
  { type: 'file', label: 'File Upload', icon: Paperclip },
]

const TYPE_LABELS = Object.fromEntries(
  FIELD_LIBRARY.map((f) => [f.type, f.label]),
)

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function emptyField(type = 'text') {
  return {
    id: uid('f'),
    type,
    label: TYPE_LABELS[type] || 'New Field',
    placeholder: '',
    helpText: '',
    required: false,
    conditional: false,
    options:
      type === 'dropdown' || type === 'radio' || type === 'checkbox'
        ? ['Option 1', 'Option 2']
        : undefined,
  }
}

export default function IntakeFormBuilder({ draft, onChange }) {
  const sections = draft.sections || []
  const [activeSectionId, setActiveSectionId] = useState(
    sections[0]?.id || null,
  )
  const [selectedFieldId, setSelectedFieldId] = useState(null)
  const [propsDraft, setPropsDraft] = useState(null)

  const selected = useMemo(() => {
    for (const sec of sections) {
      const field = sec.fields.find((f) => f.id === selectedFieldId)
      if (field) return { sectionId: sec.id, field }
    }
    return null
  }, [sections, selectedFieldId])

  function patchSections(nextSections) {
    onChange({ sections: nextSections })
  }

  function updateSection(sectionId, patch) {
    patchSections(
      sections.map((s) => (s.id === sectionId ? { ...s, ...patch } : s)),
    )
  }

  function moveSection(index, dir) {
    const target = index + dir
    if (target < 0 || target >= sections.length) return
    const next = [...sections]
    ;[next[index], next[target]] = [next[target], next[index]]
    patchSections(next)
  }

  function removeSection(sectionId) {
    const next = sections.filter((s) => s.id !== sectionId)
    patchSections(next)
    if (activeSectionId === sectionId) {
      setActiveSectionId(next[0]?.id || null)
    }
    if (selected?.sectionId === sectionId) {
      setSelectedFieldId(null)
      setPropsDraft(null)
    }
  }

  function addSection() {
    const sec = {
      id: uid('sec'),
      title: 'New Section',
      fields: [],
    }
    patchSections([...sections, sec])
    setActiveSectionId(sec.id)
  }

  function addFieldToSection(sectionId, type) {
    const field = emptyField(type)
    patchSections(
      sections.map((s) =>
        s.id === sectionId ? { ...s, fields: [...s.fields, field] } : s,
      ),
    )
    setActiveSectionId(sectionId)
    setSelectedFieldId(field.id)
    setPropsDraft({ ...field })
  }

  function addFieldFromLibrary(type) {
    const targetId = activeSectionId || sections[0]?.id
    if (!targetId) {
      const sec = { id: uid('sec'), title: 'New Section', fields: [] }
      const field = emptyField(type)
      sec.fields = [field]
      patchSections([...sections, sec])
      setActiveSectionId(sec.id)
      setSelectedFieldId(field.id)
      setPropsDraft({ ...field })
      return
    }
    addFieldToSection(targetId, type)
  }

  function moveField(sectionId, index, dir) {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return
    const target = index + dir
    if (target < 0 || target >= section.fields.length) return
    const fields = [...section.fields]
    ;[fields[index], fields[target]] = [fields[target], fields[index]]
    updateSection(sectionId, { fields })
  }

  function removeField(sectionId, fieldId) {
    updateSection(sectionId, {
      fields: sections
        .find((s) => s.id === sectionId)
        .fields.filter((f) => f.id !== fieldId),
    })
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null)
      setPropsDraft(null)
    }
  }

  function selectField(field) {
    setSelectedFieldId(field.id)
    setPropsDraft({ ...field, options: field.options ? [...field.options] : [] })
  }

  function applyFieldProps() {
    if (!selected || !propsDraft) return
    updateSection(selected.sectionId, {
      fields: sections
        .find((s) => s.id === selected.sectionId)
        .fields.map((f) =>
          f.id === selected.field.id
            ? {
                ...f,
                ...propsDraft,
                options:
                  propsDraft.type === 'dropdown' ||
                  propsDraft.type === 'radio' ||
                  propsDraft.type === 'checkbox'
                    ? propsDraft.options || []
                    : undefined,
              }
            : f,
        ),
    })
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-slate-900">
          Session Intake Form Builder
        </h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Organize intake into sections and fields for the booking flow.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700">
            Form Title
            <input
              type="text"
              value={draft.formTitle || ''}
              onChange={(e) => onChange({ formTitle: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
            Form Description
            <textarea
              rows={2}
              value={draft.formDescription || ''}
              onChange={(e) => onChange({ formDescription: e.target.value })}
              className={`${inputClass} resize-y`}
            />
          </label>
        </div>

        <div className="mt-6 space-y-4">
          {sections.map((section, sIndex) => (
            <article
              key={section.id}
              className={`rounded-2xl border p-4 transition-colors ${
                activeSectionId === section.id
                  ? 'border-brand-300 bg-brand-50/40 ring-1 ring-brand-100'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSectionId(section.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(section.id, { title: e.target.value })
                    }
                    onFocus={() => setActiveSectionId(section.id)}
                    className="w-full rounded-lg border border-transparent bg-transparent px-1 py-0.5 text-sm font-bold text-slate-900 outline-none hover:border-slate-200 focus:border-brand-300 focus:bg-white"
                  />
                </button>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      addFieldToSection(section.id, 'text')
                    }
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-50"
                  >
                    <Plus size={13} />
                    Add Field
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(sIndex, -1)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                    aria-label="Move section up"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(sIndex, 1)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                    aria-label="Move section down"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete section"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <ul className="mt-3 space-y-2">
                {section.fields.map((field, fIndex) => (
                  <li
                    key={field.id}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${
                      selectedFieldId === field.id
                        ? 'border-brand-300 bg-white ring-1 ring-brand-100'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-rose-500">*</span>
                        )}
                      </p>
                      <p className="text-[11px] font-medium text-slate-400">
                        {TYPE_LABELS[field.type] || field.type}
                        {field.conditional ? ' · Conditional' : ''}
                        {field.helpText ? ` · ${field.helpText}` : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSectionId(section.id)
                        selectField(field)
                      }}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-800"
                      aria-label="Edit field"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveField(section.id, fIndex, -1)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveField(section.id, fIndex, 1)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeField(section.id, field.id)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
                {section.fields.length === 0 && (
                  <li className="rounded-xl border border-dashed border-slate-200 px-3 py-4 text-center text-xs text-slate-400">
                    No fields yet — use Add Field or the library on the right.
                  </li>
                )}
              </ul>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={addSection}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 py-3.5 text-sm font-bold text-brand-800 hover:bg-brand-50"
        >
          <Plus size={16} />
          Add New Section
        </button>
      </section>

      <aside className="space-y-4 lg:sticky lg:top-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Field Library</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Adds to the selected section
            {activeSectionId
              ? `: ${sections.find((s) => s.id === activeSectionId)?.title || ''}`
              : ''}
            .
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {FIELD_LIBRARY.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => addFieldFromLibrary(item.type)}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2 py-3 text-center transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <Icon size={16} className="text-brand-600" />
                  <span className="text-[11px] font-bold text-slate-700">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Field Properties</h3>
          {!propsDraft ? (
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Select a field with the pencil icon to edit its properties.
            </p>
          ) : (
            <div className="mt-3 space-y-3">
              <label className="block text-xs font-bold text-slate-600">
                Field Label
                <input
                  type="text"
                  value={propsDraft.label}
                  onChange={(e) =>
                    setPropsDraft((p) => ({ ...p, label: e.target.value }))
                  }
                  className={inputClass}
                />
              </label>
              <label className="block text-xs font-bold text-slate-600">
                Placeholder Text
                <input
                  type="text"
                  value={propsDraft.placeholder || ''}
                  onChange={(e) =>
                    setPropsDraft((p) => ({
                      ...p,
                      placeholder: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </label>
              <label className="block text-xs font-bold text-slate-600">
                Help Text
                <textarea
                  rows={2}
                  value={propsDraft.helpText || ''}
                  onChange={(e) =>
                    setPropsDraft((p) => ({ ...p, helpText: e.target.value }))
                  }
                  className={`${inputClass} resize-y`}
                />
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={!!propsDraft.required}
                    onChange={(e) =>
                      setPropsDraft((p) => ({
                        ...p,
                        required: e.target.checked,
                      }))
                    }
                    className="accent-brand-500"
                  />
                  Required
                </label>
                <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={!!propsDraft.conditional}
                    onChange={(e) =>
                      setPropsDraft((p) => ({
                        ...p,
                        conditional: e.target.checked,
                      }))
                    }
                    className="accent-brand-500"
                  />
                  Conditional
                </label>
              </div>
              <button
                type="button"
                onClick={applyFieldProps}
                className="w-full rounded-xl bg-brand-500 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
              >
                Apply Changes
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
