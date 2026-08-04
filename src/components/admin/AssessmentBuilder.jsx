import { useState } from 'react'
import {
  Eye,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  CircleDot,
  CheckSquare,
  Type,
  AlignLeft,
} from 'lucide-react'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

const TYPE_META = {
  radio: {
    label: 'Multiple Choice Question',
    addLabel: 'Single Choice (Radio)',
    hint: 'User selects one option',
    icon: CircleDot,
  },
  checkbox: {
    label: 'Checkboxes Question',
    addLabel: 'Multiple Choice (Checkbox)',
    hint: 'User selects multiple options',
    icon: CheckSquare,
  },
  short: {
    label: 'Text Input Question',
    addLabel: 'Short Text',
    hint: 'Single line text input',
    icon: Type,
  },
  long: {
    label: 'Long Text Question',
    addLabel: 'Long Text',
    hint: 'Multi-line text area',
    icon: AlignLeft,
  },
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export default function AssessmentBuilder({ draft, onChange }) {
  const questions = draft.questions || []
  const [toast, setToast] = useState('')

  function flash(msg) {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2000)
  }

  function updateQuestion(index, patch) {
    const next = questions.map((q, i) => (i === index ? { ...q, ...patch } : q))
    onChange({ questions: next })
  }

  function moveQuestion(index, dir) {
    const target = index + dir
    if (target < 0 || target >= questions.length) return
    const next = [...questions]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange({ questions: next })
  }

  function removeQuestion(index) {
    onChange({ questions: questions.filter((_, i) => i !== index) })
  }

  function addOption(index) {
    const q = questions[index]
    updateQuestion(index, {
      options: [...(q.options || []), `Option ${(q.options?.length || 0) + 1}`],
    })
  }

  function updateOption(qIndex, oIndex, value) {
    const q = questions[qIndex]
    const options = (q.options || []).map((o, i) => (i === oIndex ? value : o))
    updateQuestion(qIndex, { options })
  }

  function removeOption(qIndex, oIndex) {
    const q = questions[qIndex]
    updateQuestion(qIndex, {
      options: (q.options || []).filter((_, i) => i !== oIndex),
    })
  }

  function addQuestion(type) {
    const base = {
      id: uid('q'),
      type,
      text: '',
      options: type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : [],
    }
    if (type === 'radio') base.text = 'New multiple choice question'
    if (type === 'checkbox') base.text = 'New checkboxes question'
    if (type === 'short') base.text = 'New short text question'
    if (type === 'long') base.text = 'New long text question'
    onChange({ questions: [...questions, base] })
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Free Assessment Questionnaire Builder
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Build and reorder questions shown in the free assessment flow.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => flash('Assessment preview opened.')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <Eye size={15} />
              Preview
            </button>
            <button
              type="button"
              onClick={() => flash('Questionnaire saved to draft. Use Save All Changes to persist.')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-3.5 py-2 text-sm font-bold text-white hover:bg-brand-600"
            >
              <Save size={15} />
              Save Questionnaire
            </button>
          </div>
        </div>

        {toast && (
          <p className="mt-3 rounded-xl bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
            {toast}
          </p>
        )}

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-800">Pagination Settings</p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="radio"
                name="assess-pagination"
                checked={draft.paginationMode !== 'custom'}
                onChange={() => onChange({ paginationMode: 'one' })}
                className="accent-brand-500"
              />
              1 Question per page
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="radio"
                name="assess-pagination"
                checked={draft.paginationMode === 'custom'}
                onChange={() => onChange({ paginationMode: 'custom' })}
                className="accent-brand-500"
              />
              Custom questions per page
            </label>
            {draft.paginationMode === 'custom' && (
              <input
                type="number"
                min="1"
                max="10"
                value={draft.questionsPerPage ?? 1}
                onChange={(e) =>
                  onChange({
                    questionsPerPage: Math.max(1, Number(e.target.value) || 1),
                  })
                }
                className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-400"
              />
            )}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {questions.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
              No questions yet. Add one from the panel on the right.
            </p>
          )}

          {questions.map((q, index) => {
            const meta = TYPE_META[q.type] || TYPE_META.short
            const isChoice = q.type === 'radio' || q.type === 'checkbox'
            return (
              <article
                key={q.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-bold tracking-wide text-slate-400 uppercase">
                    Question {index + 1} · {meta.label}
                  </p>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => moveQuestion(index, -1)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Move up"
                    >
                      <ChevronUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveQuestion(index, 1)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Move down"
                    >
                      <ChevronDown size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Delete question"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <label className="mt-3 block text-sm font-semibold text-slate-700">
                  Question Text
                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) => updateQuestion(index, { text: e.target.value })}
                    className={inputClass}
                  />
                </label>

                {isChoice ? (
                  <div className="mt-3 space-y-2">
                    {(q.options || []).map((opt, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-2">
                        <span className="text-slate-400">
                          {q.type === 'radio' ? (
                            <CircleDot size={14} />
                          ) : (
                            <CheckSquare size={14} />
                          )}
                        </span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            updateOption(index, oIndex, e.target.value)
                          }
                          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(index, oIndex)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addOption(index)}
                      className="inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-800"
                    >
                      <Plus size={14} />
                      Add Option
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3.5 py-3 text-xs text-slate-400">
                    {q.type === 'long'
                      ? 'Textarea input will be displayed here to the user'
                      : 'Single-line text input will be displayed here to the user'}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
        <h3 className="text-sm font-bold text-slate-900">Add Question</h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Click a type to append it to the questionnaire.
        </p>
        <div className="mt-3 space-y-2">
          {(['radio', 'checkbox', 'short', 'long']).map((type) => {
            const meta = TYPE_META[type]
            const Icon = meta.icon
            return (
              <button
                key={type}
                type="button"
                onClick={() => addQuestion(type)}
                className="flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-left transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand-600 ring-1 ring-slate-200">
                  <Icon size={16} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    {meta.addLabel}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {meta.hint}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </aside>
    </div>
  )
}
