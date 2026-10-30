import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  Heart,
  ShieldCheck,
  Sparkle,
} from '@phosphor-icons/react'
import { CARE_MAP, EMOTION_MAP } from '../../lib/data'
import {
  daysAgoSeries,
  emotionCounts,
  formatTime,
  greeting,
  inLastDays,
  patternCards,
  recommendCare,
  relativeDay,
  startOfDay,
  tagRanking,
  WEEKDAYS,
} from '../../lib/analyze'
import { AppCard, AppHeader, EmotionDot, MiniBar } from './bits'
import type { ScreenProps } from './proto-types'

const DAY = 86_400_000

export function TodayScreen({ entries, logs, onRecord, onPractice, onTab }: ScreenProps) {
  const latest = entries[0]
  const week = daysAgoSeries(entries, 7)
  const patterns = patternCards(entries)
  const recs = recommendCare(entries, logs, 1)
  const today = startOfDay(Date.now())
  const todayCount = entries.filter((e) => startOfDay(e.at) === today).length

  return (
    <div className="px-5 pb-6">
      <header className="pb-4 pt-3">
        <p className="text-[11px] text-ink3">
          {new Date().getMonth() + 1} 月 {new Date().getDate()} 日{' '}
          {WEEKDAYS[new Date().getDay()]}
        </p>
        <h1 className="mt-1.5 text-[21px] font-medium tracking-tight text-ink">
          {greeting()}，小满
        </h1>
        <p className="mt-1 text-[12px] text-ink3">
          {todayCount > 0 ? `今天已经记录了 ${todayCount} 次` : '今天还没有记录'}
        </p>
      </header>

      <div className="rounded-[20px] bg-accent px-4 py-4 text-bg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[15px] font-medium">现在感觉怎么样？</p>
            <p className="mt-0.5 text-[11px] text-bg/80">选一个，30 秒记完</p>
          </div>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-bg/25">
            <span className="text-[14px] leading-none text-bg/80">+</span>
          </span>
        </div>
        <div className="mt-3.5 grid grid-cols-4 gap-1.5">
          {(['joy', 'calm', 'anxiety', 'tired'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => onRecord(k)}
              className="rounded-xl border border-bg/20 bg-bg/10 py-2 text-[12px] text-bg transition-colors hover:bg-bg/20"
            >
              {EMOTION_MAP[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] text-ink3">最近 7 天</span>
          <button
            type="button"
            onClick={() => onTab('insight')}
            className="text-[11px] text-ink3 hover:text-ink"
          >
            全部
          </button>
        </div>
        <div className="flex items-end justify-between">
          {week.map((e, i) => {
            const d = new Date(today - (6 - i) * DAY)
            const isToday = i === 6
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className={`text-[10px] ${isToday ? 'text-ink' : 'text-ink3'}`}>
                  {WEEKDAYS[d.getDay()].replace('周', '')}
                </span>
                {e ? (
                  <span
                    className="h-[10px] w-[10px] rounded-full"
                    style={{ background: EMOTION_MAP[e.emotion].color }}
                  />
                ) : (
                  <span className="h-[10px] w-[10px] rounded-full border border-line2" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {latest ? (
        <AppCard className="mt-5 p-4" onClick={() => onTab('insight')}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-ink3">最近一次</span>
            <span className="text-[11px] text-ink3 tnum">
              {relativeDay(latest.at)} {formatTime(latest.at)}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <EmotionDot emotion={latest.emotion} size={8} />
            <span className="text-[14px] text-ink">{EMOTION_MAP[latest.emotion].label}</span>
            <span className="text-[11px] text-ink3">强度 {latest.intensity}/5</span>
          </div>
          {latest.note ? (
            <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-ink2">{latest.note}</p>
          ) : null}
        </AppCard>
      ) : null}

      <button
        type="button"
        onClick={() => onTab('insight')}
        className="mt-3 w-full rounded-[18px] border border-line bg-surface p-4 text-left"
      >
        <div className="flex items-center gap-1.5 text-[11px] text-ink3">
          <Sparkle size={13} />
          本周模式
        </div>
        <p className="mt-1.5 text-[14px] leading-snug text-ink">{patterns[0]?.title}</p>
      </button>

      {recs[0] ? (
        <div className="mt-3 rounded-[18px] border border-line bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-ink3">为此刻推荐</span>
            <span className="text-[11px] text-ink3">{recs[0].action.duration}</span>
          </div>
          <p className="mt-1.5 text-[14px] text-ink">{recs[0].action.title}</p>
          <button
            type="button"
            onClick={() => onPractice(recs[0].action)}
            className="mt-3 rounded-full bg-accent px-4 py-1.5 text-[12px] text-bg"
          >
            开始
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function InsightScreen({ entries, onPractice }: ScreenProps) {
  const [range, setRange] = useState<7 | 30>(30)
  const scoped = inLastDays(entries, range)
  const patterns = patternCards(scoped)
  const counts = emotionCounts(scoped)
  const triggers = tagRanking(scoped, 'what', 3)
  const calendar = daysAgoSeries(entries, 28)
  const startDow = (new Date(startOfDay(Date.now()) - 27 * DAY).getDay() + 6) % 7

  return (
    <div className="px-5 pb-6">
      <div className="flex items-start justify-between pt-3">
        <AppHeader title="洞察" sub={`${scoped.length} 条记录`} />
        <div className="mr-5 mt-4 flex rounded-full border border-line p-0.5">
          {([7, 30] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-full px-2.5 py-1 text-[11px] ${
                range === r ? 'bg-accent text-bg' : 'text-ink3'
              }`}
            >
              {r} 天
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="rounded-[18px] border border-line bg-surface p-4">
          <p className="mb-3 text-[12px] text-ink2">情绪日历</p>
          <div className="grid grid-cols-7 gap-1.5">
            {['一', '二', '三', '四', '五', '六', '日'].map((d) => (
              <span key={d} className="text-center text-[9px] text-ink3">
                {d}
              </span>
            ))}
            {Array.from({ length: startDow }).map((_, i) => (
              <span key={`pad-${i}`} />
            ))}
            {calendar.map((e, i) => {
              const d = new Date(startOfDay(Date.now()) - (27 - i) * DAY)
              const isToday = i === 27
              return (
                <span
                  key={i}
                  title={e ? `${d.getMonth() + 1}/${d.getDate()} ${EMOTION_MAP[e.emotion].label}` : ''}
                  className="aspect-square rounded-[6px]"
                  style={{
                    background: e ? EMOTION_MAP[e.emotion].color : 'var(--surface-2)',
                    boxShadow: isToday ? 'inset 0 0 0 1.5px var(--ink)' : 'inset 0 0 0 1px var(--line)',
                    opacity: e ? 0.9 : 1,
                  }}
                />
              )
            })}
          </div>
        </div>

        <div className="mt-3 rounded-[18px] border border-line bg-surface p-4">
          <p className="mb-3 text-[12px] text-ink2">情绪分布</p>
          <div className="space-y-2">
            {counts.slice(0, 4).map((c) => (
              <div key={c.key} className="flex items-center gap-2">
                <EmotionDot emotion={c.key} size={7} />
                <span className="w-8 shrink-0 text-[11px] text-ink2">
                  {EMOTION_MAP[c.key].label}
                </span>
                <div className="flex-1">
                  <MiniBar value={c.pct} color={EMOTION_MAP[c.key].color} />
                </div>
                <span className="w-8 text-right text-[10px] text-ink3 tnum">
                  {Math.round(c.pct * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-[18px] border border-line bg-surface p-4">
          <p className="mb-3 text-[12px] text-ink2">触发因素</p>
          {triggers.length ? (
            <div className="space-y-2.5">
              {triggers.map((t) => (
                <div key={t.label} className="flex items-center gap-2">
                  <span className="w-12 shrink-0 text-[11px] text-ink">{t.label}</span>
                  <div className="flex-1">
                    <MiniBar value={t.total / Math.max(1, triggers[0].total)} />
                  </div>
                  <span className="text-[10px] text-ink3 tnum">
                    {t.total} 次 · 负面 {Math.round(t.negRate * 100)}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-ink3">还没有足够的情境标签。</p>
          )}
        </div>

        <div className="mt-3 space-y-2">
          {patterns.map((p) => (
            <div
              key={p.id}
              className="rounded-[16px] border-l-2 bg-surface px-3.5 py-3"
              style={{
                borderLeftColor:
                  p.tone === 'warn'
                    ? 'var(--e-anger)'
                    : p.tone === 'good'
                      ? 'var(--e-calm)'
                      : 'var(--accent)',
              }}
            >
              <p className="text-[13px] text-ink">{p.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-ink2">{p.body}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPractice(CARE_MAP['breath-90'])}
          className="mt-3 flex w-full items-center justify-between rounded-[16px] bg-accent-soft px-4 py-3 text-left"
        >
          <span className="text-[12px] text-accent-ink">看完这些，先做一次 90 秒呼吸</span>
          <ArrowRight size={14} className="text-accent-ink" />
        </button>
      </div>
    </div>
  )
}

export function CareScreen({ entries, logs, onPractice }: ScreenProps) {
  const latest = entries[0]
  const recs = recommendCare(entries, logs, 3)
  const emergency = [
    { label: '现在很难受', id: 'breath-90' },
    { label: '睡不着', id: 'scan-5' },
    { label: '想哭', id: 'write-3' },
    { label: '很生气', id: 'walk-10' },
  ]

  return (
    <div className="px-5 pb-6">
      <AppHeader title="关怀" sub="按此刻的情绪和可用时长推荐" />

      {latest ? (
        <div className="rounded-[18px] border border-line bg-surface p-4">
          <p className="text-[11px] text-ink3">此刻</p>
          <div className="mt-1.5 flex items-center gap-2">
            <EmotionDot emotion={latest.emotion} size={8} />
            <span className="text-[15px] text-ink">{EMOTION_MAP[latest.emotion].label}</span>
            <span className="text-[11px] text-ink3">强度 {latest.intensity}/5</span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-ink3">
            先照顾身体，再处理事情。下面三条按耗时从短到长排列。
          </p>
        </div>
      ) : null}

      <div className="mt-3 space-y-2.5">
        {recs.map(({ action, note }) => (
          <div key={action.id} className="rounded-[18px] border border-line bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[14px] text-ink">{action.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink2">{action.desc}</p>
              </div>
              <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[10px] text-ink3">
                {action.duration}
              </span>
            </div>
            <p className="mt-2 text-[10.5px] text-ink3">{note}</p>
            <button
              type="button"
              onClick={() => onPractice(action)}
              className="mt-3 rounded-full bg-accent px-4 py-1.5 text-[12px] text-bg"
            >
              开始
            </button>
          </div>
        ))}
      </div>

      <p className="mb-2 mt-5 text-[11px] text-ink3">情绪急救包</p>
      <div className="grid grid-cols-2 gap-2">
        {emergency.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => onPractice(CARE_MAP[e.id])}
            className="rounded-[14px] border border-line bg-surface px-3 py-2.5 text-left text-[12px] text-ink hover:border-line2"
          >
            {e.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-[10px] leading-relaxed text-ink3">
        这些练习用于日常调节，不能替代专业帮助。如果持续两周以上影响生活，建议联系专业心理咨询。
      </p>
    </div>
  )
}

export function MeScreen({ entries, onReset, onClear }: ScreenProps) {
  const [remind, setRemind] = useState(true)
  const [safety, setSafety] = useState(false)
  const streak = new Set(entries.map((e) => startOfDay(e.at))).size

  const exportData = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mindisle-entries.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="px-5 pb-6">
      <AppHeader title="我的" />

      <div className="flex items-center gap-3 rounded-[18px] border border-line bg-surface p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-[15px] text-accent-ink">
          满
        </div>
        <div>
          <p className="text-[15px] text-ink">林小满</p>
          <p className="mt-0.5 text-[11px] text-ink3">记录过 {streak} 天</p>
        </div>
      </div>

      <div className="mt-3 rounded-[18px] border border-line bg-surface p-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-accent" />
          <p className="text-[13px] text-ink">数据只保存在这台设备</p>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-ink2">
          记录不会上传到服务器。清除浏览器数据会一并清除记录，建议定期导出备份。
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={exportData}
            className="rounded-full border border-line px-3 py-1.5 text-[11px] text-ink2 hover:border-line2"
          >
            导出 JSON
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-full border border-line px-3 py-1.5 text-[11px] text-danger hover:border-danger/40"
          >
            清空记录
          </button>
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-[18px] border border-line bg-surface">
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-[13px] text-ink">每晚提醒记录</span>
          <button
            type="button"
            role="switch"
            aria-checked={remind}
            onClick={() => setRemind((v) => !v)}
            className={`relative h-6 w-10 rounded-full transition-colors ${
              remind ? 'bg-accent' : 'bg-line2'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-surface transition-transform ${
                remind ? 'translate-x-[18px]' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
        <div className="border-t border-line px-4">
          <button
            type="button"
            onClick={() => setSafety((v) => !v)}
            className="flex w-full items-center justify-between py-3.5"
            aria-expanded={safety}
          >
            <span className="text-[13px] text-ink">安全计划</span>
            <CaretDown
              size={14}
              className={`text-ink3 transition-transform ${safety ? 'rotate-180' : ''}`}
            />
          </button>
          {safety ? (
            <div className="pb-4 text-[11px] leading-relaxed text-ink2">
              <p>如果情绪已经影响到吃饭、睡觉或工作：</p>
              <p className="mt-1.5">1. 先联系一个你信任的人，把感受说出来。</p>
              <p>2. 拨打当地心理援助热线，或前往医院精神心理科。</p>
              <p>3. 出现伤害自己的念头时，请立即联系急救服务。</p>
            </div>
          ) : null}
        </div>
        <div className="border-t border-line px-4">
          <button
            type="button"
            onClick={onReset}
            className="flex w-full items-center justify-between py-3.5 text-left"
          >
            <span className="text-[13px] text-ink">恢复演示数据</span>
            <span className="text-[11px] text-ink3">用于展示</span>
          </button>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[10px] text-ink3">
        <Heart size={11} />
        心屿演示版 · 数据保存在浏览器本地
        <ArrowUpRight size={10} />
      </p>
    </div>
  )
}
