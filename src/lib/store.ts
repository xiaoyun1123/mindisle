import { useCallback, useEffect, useState } from 'react'
import { seedEntries } from './data'
import type { CareLog, Entry } from './types'

const ENTRIES_KEY = 'mindisle.entries.v2'
const LOG_KEY = 'mindisle.carelog.v2'

function readEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Entry[]
      if (Array.isArray(parsed)) return parsed.sort((a, b) => b.at - a.at)
    }
  } catch {
    // 本地存储不可用时退回演示数据，页面仍然可浏览
  }
  const seed = seedEntries()
  try {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(seed))
  } catch {
    /* ignore */
  }
  return seed
}

function readLogs(): CareLog[] {
  try {
    const raw = localStorage.getItem(LOG_KEY)
    if (raw) return JSON.parse(raw) as CareLog[]
  } catch {
    /* ignore */
  }
  return []
}

export function useDiary() {
  const [entries, setEntries] = useState<Entry[]>(readEntries)
  const [logs, setLogs] = useState<CareLog[]>(readLogs)

  useEffect(() => {
    try {
      localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
    } catch {
      /* ignore */
    }
  }, [entries])

  useEffect(() => {
    try {
      localStorage.setItem(LOG_KEY, JSON.stringify(logs))
    } catch {
      /* ignore */
    }
  }, [logs])

  const addEntry = useCallback((input: Omit<Entry, 'id' | 'at'>) => {
    const entry: Entry = {
      ...input,
      id: `e-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      at: Date.now(),
    }
    setEntries((prev) => [entry, ...prev])
    return entry
  }, [])

  const addLog = useCallback((log: CareLog) => {
    setLogs((prev) => [...prev, log])
  }, [])

  const resetDemo = useCallback(() => {
    setEntries(seedEntries())
    setLogs([])
  }, [])

  const clearAll = useCallback(() => {
    setEntries([])
    setLogs([])
  }, [])

  return { entries, logs, addEntry, addLog, resetDemo, clearAll }
}
