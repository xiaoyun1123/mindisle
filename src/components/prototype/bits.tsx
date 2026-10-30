import type { ReactNode } from 'react'
import { EMOTION_MAP } from '../../lib/data'
import type { EmotionKey } from '../../lib/types'

export function EmotionDot({
  emotion,
  size = 8,
  muted = false,
}: {
  emotion: EmotionKey
  size?: number
  muted?: boolean
}) {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: muted ? 'transparent' : EMOTION_MAP[emotion].color,
        boxShadow: muted ? `inset 0 0 0 1.5px var(--line-strong)` : undefined,
      }}
    />
  )
}

export function Chip({
  active,
  children,
  onClick,
  className = '',
}: {
  active?: boolean
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-full border px-3 py-1.5 text-[12px] transition-colors',
        active
          ? 'border-accent bg-accent text-bg'
          : 'border-line bg-transparent text-ink2 hover:border-line2 hover:text-ink',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export function AppCard({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const base = `rounded-[18px] border border-line bg-surface ${className}`
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${base} text-left`}>
        {children}
      </button>
    )
  }
  return <div className={base}>{children}</div>
}

export function MiniBar({ value, color }: { value: number; color?: string }) {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-line/70">
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${Math.max(4, Math.round(value * 100))}%`, background: color ?? 'var(--accent)' }}
      />
    </div>
  )
}

export function AppHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="pb-4 pt-3">
      <h1 className="text-[20px] font-medium tracking-tight text-ink">{title}</h1>
      {sub ? <p className="mt-1 text-[12px] text-ink3">{sub}</p> : null}
    </header>
  )
}
