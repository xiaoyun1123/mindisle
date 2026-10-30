import { Reveal } from '../Reveal'

const PRINCIPLES = [
  {
    title: '三步之内完成记录',
    body: '情绪低落时，任何额外步骤都是流失。默认路径只有三件事：选情绪、定强度、保存。',
  },
  {
    title: '命名情绪，不评判情绪',
    body: '不设好坏分数，不鼓励「积极」。只帮用户把「说不清」变成「说得出」。',
  },
  {
    title: '先回应，再建议',
    body: '推荐之前，先让用户看到自己的记录被读懂了。没有回应的建议只是噪音。',
  },
  {
    title: '默认留在本地',
    body: '情绪数据不离开设备。导出与删除都做成一步操作，不需要账户。',
  },
  {
    title: '分级关怀，不越界',
    body: '自助、同伴、专业三层。产品提供支持，但不诊断，也不承诺治疗。',
  },
]

export function Principles() {
  return (
    <section id="principles" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Reveal>
              <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
                五条设计原则
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="pretty mt-5 max-w-[30ch] text-[14.5px] leading-[1.9] text-ink2">
                它们约束的不是视觉，而是每一个功能该不该存在。
              </p>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-8">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-7">
                <span className="tnum pt-0.5 text-[12px] text-ink3">0{i + 1}</span>
                <div>
                  <h3 className="text-[16px] font-medium text-ink">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.8] text-ink2">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  )
}
