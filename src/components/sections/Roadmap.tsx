import { Reveal } from '../Reveal'

const PHASES = [
  {
    when: '现在',
    title: '跑通闭环',
    body: '记录、洞察、关怀三段串起来，本地可用，不依赖账户。',
  },
  {
    when: '下一步',
    title: '降低记录阻力',
    body: '语音记录、桌面小组件、每周复盘推送，让记录发生在情绪发生的当下。',
  },
  {
    when: '之后',
    title: '接住更重的情绪',
    body: '同伴支持小组、专业转介网络、安全计划联动，补上自助与治疗之间的空档。',
  },
]

export function Roadmap() {
  return (
    <section className="border-t border-line py-16 md:py-20">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-[18px] font-medium tracking-tight text-ink">接下来做什么</h2>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {PHASES.map((p, i) => (
            <Reveal key={p.when} delay={i * 0.05}>
              <div className="border-t border-line pt-5">
                <p className="text-[11px] text-ink3">{p.when}</p>
                <p className="mt-2 text-[15px] font-medium text-ink">{p.title}</p>
                <p className="mt-1.5 text-[13px] leading-[1.75] text-ink2">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
