import { EMOTION_MAP } from '../../lib/data'
import type { EmotionKey } from '../../lib/types'
import { EmotionDot } from '../prototype/bits'
import { Reveal } from '../Reveal'

const STEPS = [
  {
    title: '记录',
    lead: '30 秒，三件事',
    body: '选情绪、定强度、写一句。情境标签可选，用来标记「和谁、在哪、什么事」，这是后面归因的原料。',
  },
  {
    title: '洞察',
    lead: '把重复出现的说出来',
    body: '情绪日历、触发因素排行、模式卡。每周一封复盘，只指出这一周最值得注意的一件事，不堆数据。',
  },
  {
    title: '关怀',
    lead: '现在就能做的动作',
    body: '按情绪、强度和可用时长推荐。从 90 秒呼吸到 10 分钟散步，做完再问一次感觉，反馈进入下一次排序。',
  },
]

const CHIPS: EmotionKey[] = ['joy', 'anxiety', 'tired', 'lonely']

export function Loop() {
  return (
    <section id="loop" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal>
          <h2 className="balance max-w-[22ch] text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.03em] text-ink">
            记录是为了看见，
            <br />
            看见是为了能做点什么。
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="pretty mt-5 max-w-[58ch] text-[15px] leading-[1.9] text-ink2">
            心屿把一次情绪记录拆成三段，每一段都对应一个用户能立刻感知的结果，而不是一个功能。
          </p>
        </Reveal>

        <div className="mt-12 grid border-t border-line lg:grid-cols-3 lg:divide-x lg:divide-line">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="py-8 lg:px-8 lg:py-10 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-baseline gap-3">
                  <span className="tnum text-[12px] text-ink3">0{i + 1}</span>
                  <h3 className="text-[19px] font-medium tracking-tight text-ink">{step.title}</h3>
                </div>
                <p className="mt-1.5 pl-[2.1rem] text-[12.5px] text-ink3">{step.lead}</p>
                <p className="mt-4 text-[14px] leading-[1.8] text-ink2">{step.body}</p>
                <div className="mt-6">
                  {i === 0 ? <RecordVisual /> : null}
                  {i === 1 ? <InsightVisual /> : null}
                  {i === 2 ? <CareVisual /> : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function RecordVisual() {
  return (
    <div className="rounded-[16px] border border-line bg-surface p-4">
      <p className="text-[11px] text-ink3">现在是什么感觉</p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {CHIPS.map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] text-ink2"
          >
            <EmotionDot emotion={k} size={6} />
            {EMOTION_MAP[k].label}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-end gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`w-full rounded-[3px] ${n === 4 ? 'bg-accent' : 'bg-line'}`}
            style={{ height: 8 + n * 5 }}
          />
        ))}
      </div>
    </div>
  )
}

function InsightVisual() {
  return (
    <div className="rounded-[16px] border border-line bg-surface px-4 py-3.5">
      <p className="text-[12px] text-ink">「工作」是你的高发情境</p>
      <p className="mt-1.5 text-[11px] leading-[1.7] text-ink2">
        最近 28 天里，与工作有关的记录中，负面情绪占比明显高于你的平均水平。
      </p>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="h-4 flex-1 rounded-[2px]"
            style={{
              background:
                i % 7 === 2 || i % 7 === 5
                  ? 'var(--e-anger)'
                  : i % 4 === 0
                    ? 'var(--line)'
                    : 'var(--e-tired)',
              opacity: i % 4 === 0 ? 1 : 0.75,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function CareVisual() {
  return (
    <div className="flex items-center gap-4 rounded-[16px] border border-line bg-surface p-4">
      <div className="relative h-12 w-12 shrink-0">
        <span className="absolute inset-0 rounded-full bg-accent-soft" />
        <span className="absolute inset-2 animate-breathe rounded-full bg-accent/25" />
      </div>
      <div>
        <p className="text-[13px] text-ink">90 秒长呼气</p>
        <p className="mt-0.5 text-[11px] text-ink3">吸气 4 秒，呼气 6 秒</p>
      </div>
    </div>
  )
}
