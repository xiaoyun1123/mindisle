import { useEffect, useState } from 'react'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Architecture } from './components/sections/Architecture'
import { Compare } from './components/sections/Compare'
import { Engine } from './components/sections/Engine'
import { Evaluation } from './components/sections/Evaluation'
import { Footer } from './components/sections/Footer'
import { InsightBand } from './components/sections/InsightBand'
import { Loop } from './components/sections/Loop'
import { Principles } from './components/sections/Principles'
import { Problem } from './components/sections/Problem'
import { PrototypeSection } from './components/sections/PrototypeSection'
import { Roadmap } from './components/sections/Roadmap'

type Theme = 'light' | 'dark'

function initialTheme(): Theme {
  try {
    const stored = localStorage.getItem('mindisle.theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('mindisle.theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  return (
    <div className="grain min-h-[100dvh] bg-bg">
      <Nav theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Hero />
        <Problem />
        <InsightBand />
        <Principles />
        <Architecture />
        <Loop />
        <Engine />
        <PrototypeSection />
        <Compare />
        <Evaluation />
        <Roadmap />
      </main>
      <Footer />
    </div>
  )
}
