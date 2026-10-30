import { Reveal } from '../Reveal'

const METRICS = [
  { label: '北极星', value: '≥3 天', desc: '每周有效记录天数达标用户占比' },
  { label: '激活', value: '首次完成', desc: '第一次记录走完三步的比例' },
  { label: '留存', value: '第 7 天', desc: '七天后仍然回访的用户比例' },
  { label: '价值', value: '改善率', desc: '干预后选择「好一些」的比例' },
]

const BOUNDARIES = [
  '不做诊断，不承诺治疗效果。',
  '危机表达必须有识别与人工兜底，并给出转介路径。',
  '数据默认留在本地，导出与删除都做成一步操作。',
  '允许断签，不把记录变成新的压力源。',
]

export function Evaluation() {
  return (
    <section id="evaluation" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.03em] text-ink">
            怎么判断它有用。
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="pretty mt-5 max-w-[56ch] text-[15px] leading-[1.9] text-ink2">
            不看日活，看用户是否真的从「记了什么」走到了「做了什么」。北极星指标是每周有效记录的天数，而不是打开次数。
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-bg px-6 py-7">
                <p className="text-[11px] text-ink3">{m.label}</p>
                <p className="mt-3 text-[26px] font-medium tracking-tight text-ink">{m.value}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink2">{m.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <h3 className="text-[18px] font-medium tracking-tight text-ink">边界</h3>
              <p className="mt-2 max-w-[24ch] text-[13.5px] leading-[1.8] text-ink2">
                一个情绪产品最需要克制的，是替用户下结论的冲动。
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            {BOUNDARIES.map((b, i) => (
              <Reveal key={b} delay={i * 0.04}>
                <div className="grid grid-cols-[2rem_1fr] gap-3 border-t border-line py-4 last:border-b">
                  <span className="tnum text-[11px] text-ink3">0{i + 1}</span>
                  <p className="text-[14px] leading-[1.7] text-ink2">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
