import type { CareAction, CareLog, EmotionKey, Entry } from '../../lib/types'

export type Tab = 'today' | 'insight' | 'care' | 'me'

export interface ScreenProps {
  entries: Entry[]
  logs: CareLog[]
  onRecord: (emotion?: EmotionKey) => void
  onPractice: (action: CareAction) => void
  onTab: (tab: Tab) => void
  onReset: () => void
  onClear: () => void
}
