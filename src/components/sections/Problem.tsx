import { Reveal } from '../Reveal'

const PAINS = [
  {
    title: '记录成本高于情绪带宽',
    body: '情绪低落时，写满一页日记是额外的负担。主流日记产品往往要求写下一段完整的话，用户在第一步就放弃了。',
  },
  {
    title: '写完没有回音',
    body: '记录变成一条条流水账。用户仍然答不出「我为什么总在周日晚上难受」，也就没有理由第二天再来。',
  },
  {
    title: '记录与调节是两套产品',
    body: '日记应用不做干预，冥想应用不做归因。用户要自己判断此刻该打开哪一个，而情绪低落时最缺的就是判断力。',
  },
  {
    title: '隐私顾虑让表达变形',
    body: '情绪是最私密的数据。当记录默认同步到云端，用户在下笔前就会开始自我审查，写下的是「应该有的情绪」。',
  },
]

export function Problem() {
  return (
    <section id="problem" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal>
          <h2 className="balance max-w-[17ch] text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
            不是不想记，
            <br />
            是记了也没用。
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="pretty mt-5 max-w-[58ch] text-[15px] leading-[1.9] text-ink2">
            这不是一份用户研究报告。下面四个痛点来自公开社区讨论与主流情绪记录产品的用户评论，用来确定这个产品真正要解决的问题。
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-16 md:grid-cols-2">
          {PAINS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-7">
                <span className="tnum pt-0.5 text-[12px] text-ink3">0{i + 1}</span>
                <div>
                  <h3 className="text-[16px] font-medium text-ink">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.8] text-ink2">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
