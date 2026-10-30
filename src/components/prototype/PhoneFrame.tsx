import type { ReactNode } from 'react'
import { BatteryFull, CellSignalFull, WifiHigh } from '@phosphor-icons/react'
import { formatTime } from '../../lib/analyze'

export function PhoneFrame({
  children,
  variant = 'live',
  className = '',
}: {
  children: ReactNode
  variant?: 'live' | 'preview'
  className?: string
}) {
  const size =
    variant === 'live'
      ? 'h-[780px] w-full max-w-[390px]'
      : 'h-[590px] w-full max-w-[292px]'

  return (
    <div
      className={`relative shrink-0 rounded-[44px] border-[7px] border-[#1b1f1e] bg-[#1b1f1e] shadow-lift ring-1 ring-black/10 dark:ring-white/15 ${size} ${className}`}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[37px] bg-bg">
        <div className="relative flex h-10 shrink-0 items-center justify-between px-6 pt-1 text-ink">
          <span className="text-[11px] font-medium tnum">{formatTime(Date.now())}</span>
          <span className="flex items-center gap-1.5 text-ink">
            <CellSignalFull size={13} weight="fill" />
            <WifiHigh size={13} weight="fill" />
            <BatteryFull size={17} weight="fill" />
          </span>
          <span className="absolute left-1/2 top-2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#1b1f1e]" />
        </div>
        <div className="min-h-0 flex-1">{children}</div>
        <span className="pointer-events-none absolute bottom-1.5 left-1/2 h-[4px] w-[110px] -translate-x-1/2 rounded-full bg-ink/25" />
      </div>
    </div>
  )
}
