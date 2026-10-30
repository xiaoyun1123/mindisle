import { MoonStars, Sun } from '@phosphor-icons/react'

const LINKS = [
  { href: '#problem', label: '问题' },
  { href: '#principles', label: '原则' },
  { href: '#loop', label: '闭环' },
  { href: '#prototype', label: '原型' },
  { href: '#evaluation', label: '评估' },
]

export function Nav({
  theme,
  onToggleTheme,
}: {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-2.5" aria-label="心屿首页">
          <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-accent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 14c2.6 0 2.6-3.2 5.2-3.2S10.8 14 13.4 14s2.6-3.2 5.2-3.2S21.2 14 24 14"
                stroke="var(--bg)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-[15px] font-medium tracking-tight text-ink">心屿</span>
          <span className="hidden text-[11px] tracking-wide text-ink3 sm:inline">Mindisle</span>
        </a>

        <nav className="hidden items-center gap-8 text-[13px] text-ink2 lg:flex" aria-label="页面导航">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink2 transition-colors hover:bg-surface2 hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={17} /> : <MoonStars size={17} />}
          </button>
          <a
            href="#prototype"
            className="rounded-full bg-accent px-4 py-2 text-[12.5px] text-bg transition-colors hover:bg-accent-hover"
          >
            体验原型
          </a>
        </div>
      </div>
    </header>
  )
}
