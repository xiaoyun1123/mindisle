import { useEffect, useState, type ReactNode } from 'react'
import { ArrowLeft, Check, X } from '@phosphor-icons/react'
import { CARE_ACTIONS, EMOTION_MAP, EMOTIONS, WHAT_OPTIONS, WHERE_OPTIONS, WHO_OPTIONS } from '../../lib/data'
import type { CareAction, EmotionKey, Entry } from '../../lib/types'
import { EmotionDot } from './bits'

const INTENSITY_LABEL = ['很轻', '较轻', '一般', '较强', '很强']

export function RecordSheet({
  initialEmotion,
  onClose,
  onSave,
  onPractice,
}: {
  initialEmotion?: EmotionKey
  onClose: () => void
  onSave: (input: Omit<Entry, 'id' | 'at'>) => Entry
  onPractice: (action: CareAction) => void
}) {
  const [step, setStep] = useState(0)
  const [emotion, setEmotion] = useState<EmotionKey | null>(initialEmotion ?? null)
  const [intensity, setIntensity] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [who, setWho] = useState<string>()
  const [where, setWhere] = useState<string>()
  const [what, setWhat] = useState<string>()
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  const toggle = (value: string, current: string | undefined, set: (v?: string) => void) => {
    set(current === value ? undefined : value)
  }

  const submit = () => {
    if (!emotion) return
    onSave({ emotion, intensity, who, where, what, note: note.trim() || undefined })
    setSaved(true)
  }

  if (saved && emotion) {
    const next = CARE_ACTIONS.filter((a) => a.emotions.includes(emotion)).slice(0, 2)
    return (
      <SheetShell>
        <div className="flex flex-1 flex-col px-5 pb-6 pt-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
            <Check size={22} className="text-accent-ink" weight="bold" />
          </div>
          <h2 className="mt-5 text-[22px] font-medium tracking-tight text-ink">记下了</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink2">
            你记录了一次「{EMOTION_MAP[emotion].label}」，强度 {intensity}/5。
          </p>
          <p className="mt-6 text-[12px] text-ink3">现在要照顾一下自己吗？</p>
          <div className="mt-2 space-y-2">
            {next.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onPractice(a)}
                className="flex w-full items-center justify-between rounded-[16px] border border-line bg-surface px-4 py-3 text-left"
              >
                <span>
                  <span className="block text-[13px] text-ink">{a.title}</span>
                  <span className="mt-0.5 block text-[10.5px] text-ink3">{a.duration}</span>
                </span>
                <span className="text-[11px] text-accent">开始</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-auto rounded-full border border-line py-2.5 text-[12px] text-ink2"
          >
            先这样
          </button>
        </div>
      </SheetShell>
    )
  }

  return (
    <SheetShell>
      <div className="flex items-center gap-3 px-5 pt-3">
        <button
          type="button"
          onClick={() => (step === 0 ? onClose() : setStep(0))}
          aria-label={step === 0 ? '关闭' : '返回'}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink2 hover:bg-surface2"
        >
          {step === 0 ? <X size={16} /> : <ArrowLeft size={16} />}
        </button>
        <div className="flex flex-1 gap-1">
          <span className="h-0.5 flex-1 rounded-full bg-accent" />
          <span className={`h-0.5 flex-1 rounded-full ${step === 1 ? 'bg-accent' : 'bg-line'}`} />
        </div>
        <span className="w-8 text-right text-[10px] text-ink3">{step + 1}/2</span>
      </div>

      {step === 0 ? (
        <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-6 no-scrollbar">
          <h2 className="text-[22px] font-medium tracking-tight text-ink">现在是什么感觉？</h2>
          <p className="mt-1.5 text-[12px] text-ink3">不用准确，选一个最接近的就好。</p>

          <div className="mt-5 grid grid-cols-4 gap-2">
            {EMOTIONS.map((e) => {
              const active = emotion === e.key
              return (
                <button
                  key={e.key}
                  type="button"
                  onClick={() => setEmotion(e.key)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-1.5 rounded-[14px] border py-3 text-[12px] transition-colors ${
                    active
                      ? 'border-accent bg-accent-soft text-accent-ink'
                      : 'border-line bg-surface text-ink2'
                  }`}
                >
                  <EmotionDot emotion={e.key} size={9} />
                  {e.label}
                </button>
              )
            })}
          </div>

          <p className="mb-3 mt-7 text-[12px] text-ink2">有多强烈？</p>
          <div className="flex items-end justify-between gap-2">
            {[1, 2, 3, 4, 5].map((v) => {
              const active = intensity === v
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setIntensity(v as 1 | 2 | 3 | 4 | 5)}
                  aria-pressed={active}
                  aria-label={INTENSITY_LABEL[v - 1]}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span
                    className={`w-full rounded-md transition-colors ${
                      active ? 'bg-accent' : 'bg-line'
                    }`}
                    style={{ height: 10 + v * 8 }}
                  />
                  <span className={`text-[10px] ${active ? 'text-ink' : 'text-ink3'}`}>
                    {INTENSITY_LABEL[v - 1]}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-auto" />
          <button
            type="button"
            disabled={!emotion}
            onClick={() => setStep(1)}
            className="mt-6 w-full rounded-full bg-accent py-3 text-[13px] text-bg disabled:opacity-35"
          >
            下一步
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-6 no-scrollbar">
          <h2 className="text-[22px] font-medium tracking-tight text-ink">发生了什么？</h2>
          <p className="mt-1.5 text-[12px] text-ink3">都可以跳过。标签用来找出你的触发因素。</p>

          <TagGroup label="和谁" options={WHO_OPTIONS} value={who} onPick={(v) => toggle(v, who, setWho)} />
          <TagGroup
            label="在哪"
            options={WHERE_OPTIONS}
            value={where}
            onPick={(v) => toggle(v, where, setWhere)}
          />
          <TagGroup
            label="什么事"
            options={WHAT_OPTIONS}
            value={what}
            onPick={(v) => toggle(v, what, setWhat)}
          />

          <label className="mt-6 block text-[12px] text-ink2" htmlFor="note">
            想说点什么
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="可以只写一句，也可以不写"
            className="mt-2 w-full resize-none rounded-[14px] border border-line bg-surface px-3.5 py-3 text-[13px] text-ink placeholder:text-ink3 focus:border-accent focus:outline-none"
          />

          <div className="mt-auto" />
          <button
            type="button"
            onClick={submit}
            className="mt-6 w-full rounded-full bg-accent py-3 text-[13px] text-bg"
          >
            记下了
          </button>
        </div>
      )}
    </SheetShell>
  )
}

function TagGroup({
  label,
  options,
  value,
  onPick,
}: {
  label: string
  options: string[]
  value?: string
  onPick: (v: string) => void
}) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-[12px] text-ink2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onPick(o)}
            aria-pressed={value === o}
            className={`rounded-full border px-3 py-1.5 text-[11.5px] ${
              value === o
                ? 'border-accent bg-accent-soft text-accent-ink'
                : 'border-line text-ink2'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function SheetShell({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-bg" role="dialog" aria-modal="true">
      {children}
    </div>
  )
}

export function PracticeSheet({
  action,
  before,
  onClose,
  onDone,
}: {
  action: CareAction
  before: EmotionKey
  onClose: () => void
  onDone: (after: 'better' | 'same' | 'worse') => void
}) {
  const [left, setLeft] = useState(action.seconds)
  const [phase, setPhase] = useState<'practice' | 'check'>('practice')

  useEffect(() => {
    if (phase !== 'practice') return
    const t = window.setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000)
    return () => window.clearInterval(t)
  }, [phase])

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  return (
    <SheetShell>
      <div className="flex items-center justify-between px-5 pt-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink2 hover:bg-surface2"
        >
          <X size={16} />
        </button>
        <span className="text-[11px] text-ink3">
          开始前：{EMOTION_MAP[before].label} · {action.duration}
        </span>
      </div>

      {phase === 'practice' ? (
        <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-6 no-scrollbar">
          <h2 className="mt-4 text-[21px] font-medium tracking-tight text-ink">{action.title}</h2>
          <p className="mt-2 text-[12px] leading-relaxed text-ink2">{action.desc}</p>

          <div className="relative mx-auto mt-8 flex h-44 w-44 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-accent-soft" />
            <span
              className={`absolute inset-6 rounded-full bg-accent/15 ${
                action.kind === 'breath' ? 'animate-breathe' : ''
              }`}
            />
            <div className="relative text-center">
              <p className="text-[26px] text-ink tnum">
                {mm}:{ss}
              </p>
              <p className="mt-1 text-[10px] text-ink3">
                {action.kind === 'breath' ? '跟随圆圈呼吸' : '不用着急，慢慢来'}
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-2">
            {action.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-[12.5px] text-ink2">
                <span className="tnum text-ink3">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setPhase('check')}
            className="mt-auto w-full rounded-full bg-accent py-3 text-[13px] text-bg"
          >
            完成了
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col px-6 pb-6">
          <h2 className="mt-6 text-[21px] font-medium tracking-tight text-ink">现在感觉如何？</h2>
          <p className="mt-2 text-[12px] text-ink2">这个反馈会用来调整之后的推荐。</p>
          <div className="mt-6 space-y-2">
            {[
              { key: 'better', label: '好一些' },
              { key: 'same', label: '没变化' },
              { key: 'worse', label: '更难受' },
            ].map((o) => (
              <button
                key={o.key}
                type="button"
                onClick={() => onDone(o.key as 'better' | 'same' | 'worse')}
                className="w-full rounded-[16px] border border-line bg-surface py-3 text-[13px] text-ink hover:border-line2"
              >
                {o.label}
              </button>
            ))}
          </div>
          <p className="mt-auto text-[10px] leading-relaxed text-ink3">
            如果做完仍然很难受，可以在「我的」里查看安全计划。
          </p>
        </div>
      )}
    </SheetShell>
  )
}
