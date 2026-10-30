import { useEffect, useState } from 'react'
import { ChartLineUp, Heart, House, User } from '@phosphor-icons/react'
import { useDiary } from '../../lib/store'
import type { CareAction, EmotionKey, Entry } from '../../lib/types'
import { CareScreen, InsightScreen, MeScreen, TodayScreen } from './screens'
import { PracticeSheet, RecordSheet } from './sheets'
import type { Tab } from './proto-types'

const TABS: Array<{ key: Tab; label: string; icon: typeof House }> = [
  { key: 'today', label: '今天', icon: House },
  { key: 'insight', label: '洞察', icon: ChartLineUp },
  { key: 'care', label: '关怀', icon: Heart },
  { key: 'me', label: '我的', icon: User },
]

export function DiaryApp({ mode = 'live' }: { mode?: 'live' | 'preview' }) {
  const { entries, logs, addEntry, addLog, resetDemo, clearAll } = useDiary()
  const [tab, setTab] = useState<Tab>('today')
  const [recordOpen, setRecordOpen] = useState(false)
  const [initialEmotion, setInitialEmotion] = useState<EmotionKey>()
  const [practice, setPractice] = useState<CareAction | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(t)
  }, [toast])

  const openRecord = (emotion?: EmotionKey) => {
    if (mode === 'preview') return
    setInitialEmotion(emotion)
    setRecordOpen(true)
  }

  const openPractice = (action: CareAction) => {
    if (mode === 'preview') return
    setRecordOpen(false)
    setPractice(action)
  }

  const handleSave = (input: Omit<Entry, 'id' | 'at'>) => addEntry(input)

  const handleDone = (after: 'better' | 'same' | 'worse') => {
    if (!practice) return
    addLog({
      at: Date.now(),
      actionId: practice.id,
      before: entries[0]?.emotion ?? 'calm',
      after,
    })
    setPractice(null)
    setToast(after === 'better' ? '记下了，你感觉好一些' : after === 'same' ? '记下了，可以再试试别的' : '记下了，先休息一下')
  }

  const props = {
    entries,
    logs,
    onRecord: openRecord,
    onPractice: openPractice,
    onTab: setTab,
    onReset: resetDemo,
    onClear: clearAll,
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-bg text-ink">
      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
        {tab === 'today' ? <TodayScreen {...props} /> : null}
        {tab === 'insight' ? <InsightScreen {...props} /> : null}
        {tab === 'care' ? <CareScreen {...props} /> : null}
        {tab === 'me' ? <MeScreen {...props} /> : null}
      </div>

      <nav className="flex shrink-0 items-stretch border-t border-line bg-elev/95 px-2 pb-5 pt-1.5 backdrop-blur">
        {TABS.map(({ key, label, icon: Icon }) => {
          const active = tab === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] transition-colors ${
                active ? 'text-accent' : 'text-ink3'
              }`}
            >
              <Icon size={19} weight={active ? 'fill' : 'regular'} />
              {label}
            </button>
          )
        })}
      </nav>

      {recordOpen ? (
        <RecordSheet
          initialEmotion={initialEmotion}
          onClose={() => setRecordOpen(false)}
          onSave={handleSave}
          onPractice={openPractice}
        />
      ) : null}

      {practice ? (
        <PracticeSheet
          action={practice}
          before={entries[0]?.emotion ?? 'calm'}
          onClose={() => setPractice(null)}
          onDone={handleDone}
        />
      ) : null}

      {toast ? (
        <div className="pointer-events-none absolute bottom-24 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[11px] text-bg shadow-soft">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
