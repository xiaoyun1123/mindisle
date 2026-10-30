export type EmotionKey =
  | 'joy'
  | 'calm'
  | 'hope'
  | 'anxiety'
  | 'sadness'
  | 'anger'
  | 'tired'
  | 'lonely'

export type Valence = 'positive' | 'neutral' | 'negative'

export interface Emotion {
  key: EmotionKey
  label: string
  en: string
  color: string
  valence: Valence
}

export interface Entry {
  id: string
  at: number
  emotion: EmotionKey
  intensity: 1 | 2 | 3 | 4 | 5
  who?: string
  where?: string
  what?: string
  note?: string
}

export type CareKind = 'breath' | 'move' | 'listen' | 'write' | 'connect' | 'reset'

export interface CareAction {
  id: string
  title: string
  duration: string
  seconds: number
  desc: string
  why: string
  steps: string[]
  kind: CareKind
  emotions: EmotionKey[]
}

export interface CareLog {
  at: number
  actionId: string
  before: EmotionKey
  after: 'better' | 'same' | 'worse'
}
