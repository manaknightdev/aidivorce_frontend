import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Bot,
  RefreshCw,
  Pencil,
  Paperclip,
  Video,
  Mic,
  X,
  Send,
  Trash2,
} from 'lucide-react'
import { COACH_INBOX } from '../../data/coachPortal'

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function MediaSlot({
  kind,
  icon: Icon,
  label,
  accept,
  file,
  previewUrl,
  onPick,
  onClear,
}) {
  const inputRef = useRef(null)

  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white">
      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 px-4 py-8 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50"
        >
          <Icon size={22} className="text-brand-600" />
          <span>Attach {label}</span>
          <span className="text-xs font-medium text-slate-400">
            Click to choose a file
          </span>
        </button>
      ) : (
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {label} · {formatBytes(file.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClear}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove ${label.toLowerCase()}`}
            >
              <Trash2 size={15} />
            </button>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl bg-slate-900/95">
            {kind === 'video' && previewUrl ? (
              <video
                key={previewUrl}
                src={previewUrl}
                controls
                className="aspect-video w-full bg-black object-contain"
              >
                <track kind="captions" />
              </video>
            ) : null}
            {kind === 'audio' && previewUrl ? (
              <div className="flex flex-col items-center gap-3 px-4 py-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                  <Mic size={22} />
                </span>
                <audio
                  key={previewUrl}
                  src={previewUrl}
                  controls
                  className="w-full"
                />
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-3 w-full rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
          >
            Replace {label.toLowerCase()}
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const next = e.target.files?.[0]
          if (next) onPick(next)
          e.target.value = ''
        }}
      />
    </div>
  )
}

export default function CoachReply() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = useMemo(
    () => COACH_INBOX.find((m) => m.id === id) || COACH_INBOX[0],
    [id],
  )

  const [draft, setDraft] = useState(item.aiDraft)
  const [grantExtra, setGrantExtra] = useState(false)
  const [sent, setSent] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)

  useEffect(() => {
    setDraft(item.aiDraft)
    setGrantExtra(false)
    setSent(false)
    setVideoFile(null)
    setAudioFile(null)
  }, [item])

  useEffect(() => {
    if (!videoFile) {
      setVideoUrl(null)
      return undefined
    }
    const url = URL.createObjectURL(videoFile)
    setVideoUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [videoFile])

  useEffect(() => {
    if (!audioFile) {
      setAudioUrl(null)
      return undefined
    }
    const url = URL.createObjectURL(audioFile)
    setAudioUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [audioFile])

  function regenerate() {
    setDraft(
      `${item.aiDraft}\n\n(Updated draft) I’ve also added a short checklist you can use this week so next steps stay concrete.`,
    )
  }

  function sendReply() {
    setSent(true)
    window.setTimeout(() => navigate('/coach/inbox'), 1200)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/coach/inbox"
            className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700 transition-colors hover:bg-brand-200"
            aria-label="Back to inbox"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Reply to {item.name}
          </h1>
        </div>
      </div>

      {sent && (
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 ring-1 ring-brand-100">
          Reply sent
          {(videoFile || audioFile) && ' with media'}
          . Returning to inbox…
        </p>
      )}

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          {item.avatar ? (
            <img
              src={item.avatar}
              alt=""
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <span className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
              ?
            </span>
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-slate-900">{item.name}</p>
              {item.badge === 'PAID' && (
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 ring-1 ring-brand-100">
                  PAID
                </span>
              )}
              {item.badge === 'GUEST' && (
                <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700 ring-1 ring-sky-100">
                  GUEST
                </span>
              )}
              {item.badge === 'FREE' && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                  FREE
                </span>
              )}
            </div>
          </div>
        </div>
        <blockquote className="mt-4 border-l-4 border-slate-200 pl-4 text-sm leading-relaxed text-slate-700">
          {item.message}
        </blockquote>
      </section>

      <section className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/70 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-brand-700" />
            <h2 className="text-sm font-bold text-slate-900">
              AI Draft Suggestion
            </h2>
          </div>
          <button
            type="button"
            onClick={regenerate}
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-2.5 py-1.5 text-xs font-bold text-brand-800 hover:bg-brand-50"
          >
            <RefreshCw size={12} />
            Regenerate
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          {item.aiDraft}
        </p>
      </section>

      <section className="mt-4">
        <div className="flex items-center gap-2">
          <Pencil size={15} className="text-slate-500" />
          <h2 className="text-sm font-bold text-slate-900">Your Response</h2>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={7}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </section>

      <section className="mt-4">
        <div className="flex items-center gap-2">
          <Paperclip size={15} className="text-slate-500" />
          <h2 className="text-sm font-bold text-slate-900">Media Attachments</h2>
        </div>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <MediaSlot
            kind="video"
            icon={Video}
            label="Video"
            accept="video/*"
            file={videoFile}
            previewUrl={videoUrl}
            onPick={setVideoFile}
            onClear={() => setVideoFile(null)}
          />
          <MediaSlot
            kind="audio"
            icon={Mic}
            label="Audio"
            accept="audio/*"
            file={audioFile}
            previewUrl={audioUrl}
            onPick={setAudioFile}
            onClear={() => setAudioFile(null)}
          />
        </div>
        {(videoFile || audioFile) && (
          <p className="mt-2 text-xs text-slate-500">
            {[videoFile && '1 video', audioFile && '1 audio']
              .filter(Boolean)
              .join(' · ')}{' '}
            ready to send with your reply.
          </p>
        )}
      </section>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <input
          type="checkbox"
          checked={grantExtra}
          onChange={(e) => setGrantExtra(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 accent-brand-500 text-brand-500 focus:ring-brand-400"
        />
        <span>
          <span className="block text-sm font-bold text-slate-900">
            Grant Additional Free Question
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">
            Sends: &quot;Coach Sam has granted you 1 more consultation.&quot;
          </span>
        </span>
      </label>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate('/coach/inbox')}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          <X size={16} />
          Reject
        </button>
        <button
          type="button"
          onClick={sendReply}
          disabled={!draft.trim() || sent}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          <Send size={16} />
          Send Reply
        </button>
      </div>
    </div>
  )
}
