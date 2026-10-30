import { CARE_ACTIONS, EMOTION_MAP } from './data'
import type { CareAction, CareLog, EmotionKey, Entry } from './types'

const DAY = 86_400_000
export const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function sortDesc(entries: Entry[]): Entry[] {
  return [...entries].sort((a, b) => b.at - a.at)
}

export function isNegative(entry: Entry): boolean {
  return EMOTION_MAP[entry.emotion].valence === 'negative'
}

export function startOfDay(ts: number): number {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export function daysAgoSeries(entries: Entry[], days: number): Array<Entry | null> {
  const byDay = new Map<number, Entry>()
  for (const e of entries) {
    const k = startOfDay(e.at)
    const prev = byDay.get(k)
    if (!prev || e.at > prev.at) byDay.set(k, e)
  }
  const today = startOfDay(Date.now())
  const out: Array<Entry | null> = []
  for (let i = days - 1; i >= 0; i--) {
    out.push(byDay.get(today - i * DAY) ?? null)
  }
  return out
}

export function negativeRatio(entries: Entry[]): number {
  if (!entries.length) return 0
  return entries.filter(isNegative).length / entries.length
}

export function emotionCounts(entries: Entry[]) {
  const counts = new Map<EmotionKey, number>()
  for (const e of entries) counts.set(e.emotion, (counts.get(e.emotion) ?? 0) + 1)
  const total = entries.length || 1
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count, pct: count / total }))
    .sort((a, b) => b.count - a.count)
}

export function tagRanking(entries: Entry[], dim: 'who' | 'where' | 'what', limit = 4) {
  const map = new Map<string, { total: number; negative: number }>()
  for (const e of entries) {
    const v = e[dim]
    if (!v) continue
    const cur = map.get(v) ?? { total: 0, negative: 0 }
    cur.total += 1
    if (isNegative(e)) cur.negative += 1
    map.set(v, cur)
  }
  return [...map.entries()]
    .map(([label, v]) => ({ label, ...v, negRate: v.negative / v.total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
}

export function weekdayStats(entries: Entry[]) {
  return WEEKDAYS.map((label, idx) => {
    const list = entries.filter((e) => new Date(e.at).getDay() === idx)
    return {
      label,
      total: list.length,
      negative: list.filter(isNegative).length,
    }
  })
}

export function timeBand(hour: number): string {
  if (hour < 6) return '深夜'
  if (hour < 12) return '上午'
  if (hour < 18) return '下午'
  return '晚上'
}

export function timeBandStats(entries: Entry[]) {
  const bands = ['上午', '下午', '晚上', '深夜']
  return bands.map((label) => {
    const list = entries.filter((e) => timeBand(new Date(e.at).getHours()) === label)
    return { label, total: list.length, negative: list.filter(isNegative).length }
  })
}

export function inLastDays(entries: Entry[], days: number): Entry[] {
  const cutoff = Date.now() - days * DAY
  return entries.filter((e) => e.at >= cutoff)
}

export function weekCompare(entries: Entry[]) {
  const thisWeek = inLastDays(entries, 7)
  const lastWeek = entries.filter((e) => e.at < Date.now() - 7 * DAY && e.at >= Date.now() - 14 * DAY)
  return {
    thisWeek: negativeRatio(thisWeek),
    lastWeek: negativeRatio(lastWeek),
    countThis: thisWeek.length,
  }
}

export function streakDays(entries: Entry[]): number {
  const days = new Set(entries.map((e) => startOfDay(e.at)))
  let streak = 0
  let cursor = startOfDay(Date.now())
  if (!days.has(cursor)) cursor -= DAY
  while (days.has(cursor)) {
    streak += 1
    cursor -= DAY
  }
  return streak
}

export interface PatternCard {
  id: string
  title: string
  body: string
  tone: 'warn' | 'good' | 'note'
}

const pct = (n: number) => `${Math.round(n * 100)}%`

export function patternCards(entries: Entry[]): PatternCard[] {
  if (entries.length < 5) {
    return [
      {
        id: 'empty',
        title: '还看不出模式',
        body: '记录满 5 天后，这里会开始出现你的情绪模式和触发因素。',
        tone: 'note',
      },
    ]
  }

  const cards: PatternCard[] = []
  const baseline = negativeRatio(entries)

  // 标签归因：找出负面占比明显高于平均的情境
  for (const dim of ['what', 'who', 'where'] as const) {
    for (const t of tagRanking(entries, dim, 6)) {
      if (t.total < 3) continue
      const lift = t.negRate - baseline
      if (lift >= 0.15) {
        cards.push({
          id: `lift-${dim}-${t.label}`,
          title: `「${t.label}」是你的高发情境`,
          body: `在 ${t.total} 次相关记录里，有 ${t.negative} 次是负面情绪，比你的平均水平高 ${Math.round(lift * 100)} 个百分点。`,
          tone: 'warn',
        })
      }
    }
  }

  // 正面情境：出现时几乎没有负面情绪
  const good = tagRanking(entries, 'what', 6).find((t) => t.total >= 3 && t.negRate === 0)
  if (good) {
    cards.push({
      id: `good-${good.label}`,
      title: `「${good.label}」是缓冲带`,
      body: `${good.total} 次与「${good.label}」有关的记录里没有出现负面情绪。可以想想它和其他情境有什么不同。`,
      tone: 'good',
    })
  }

  // 星期分布
  const weekday = weekdayStats(entries)
    .filter((d) => d.negative > 0)
    .sort((a, b) => b.negative - a.negative)[0]
  if (weekday && weekday.negative >= 3) {
    cards.push({
      id: `weekday-${weekday.label}`,
      title: `${weekday.label}最容易低落`,
      body: `最近的记录里，${weekday.label}出现了 ${weekday.negative} 次负面情绪，是所有星期里最多的。`,
      tone: 'warn',
    })
  }

  // 时段分布
  const bands = timeBandStats(entries).filter((b) => b.negative > 0)
  const topBand = bands.sort((a, b) => b.negative - a.negative)[0]
  const negTotal = entries.filter(isNegative).length
  if (topBand && negTotal > 0 && topBand.negative / negTotal >= 0.5) {
    cards.push({
      id: `band-${topBand.label}`,
      title: `${topBand.label}是情绪低点的高峰`,
      body: `${pct(topBand.negative / negTotal)} 的负面记录发生在${topBand.label}。可以试着在这个时段前安排一件让自己放松的小事。`,
      tone: 'note',
    })
  }

  // 趋势
  const { thisWeek, lastWeek } = weekCompare(entries)
  if (lastWeek > 0 && Math.abs(thisWeek - lastWeek) >= 0.15) {
    const up = thisWeek > lastWeek
    cards.push({
      id: 'trend',
      title: up ? '这周比上周沉一些' : '这周比上周轻一些',
      body: `最近 7 天的负面情绪占比 ${pct(thisWeek)}，${up ? '高于' : '低于'}前一周的 ${pct(lastWeek)}。`,
      tone: up ? 'warn' : 'good',
    })
  }

  return cards.slice(0, 3)
}

export function recommendCare(
  entries: Entry[],
  logs: CareLog[],
  limit = 3,
): Array<{ action: CareAction; note: string }> {
  const latest = entries[0]
  const emotion = latest?.emotion
  const matched = emotion
    ? CARE_ACTIONS.filter((a) => a.emotions.includes(emotion))
    : CARE_ACTIONS

  const betterRate = (id: string) => {
    const rel = logs.filter((l) => l.actionId === id)
    if (!rel.length) return -1
    return rel.filter((l) => l.after === 'better').length / rel.length
  }

  const ranked = [...matched].sort((a, b) => betterRate(b.id) - betterRate(a.id))
  return ranked.slice(0, limit).map((action) => {
    const rel = logs.filter((l) => l.actionId === action.id)
    const last = rel[rel.length - 1]
    return {
      action,
      note:
        last?.after === 'better'
          ? '上次做完，你选了「好一些」'
          : last?.after === 'same'
            ? '上次做完感觉没变化，可以换一个试试'
            : action.why,
    }
  })
}

export function formatDay(ts: number): string {
  const d = new Date(ts)
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

export function formatTime(ts: number): string {
  const d = new Date(ts)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function relativeDay(ts: number): string {
  const diff = startOfDay(Date.now()) - startOfDay(ts)
  if (diff === 0) return '今天'
  if (diff === DAY) return '昨天'
  const d = new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export function greeting(): string {
  const h = new Date().getHours()
  if (h < 6) return '夜深了'
  if (h < 11) return '早上好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
}
