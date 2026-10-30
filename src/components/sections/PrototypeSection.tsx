import { Reveal } from '../Reveal'
import { DiaryApp } from '../prototype/DiaryApp'
import { PhoneFrame } from '../prototype/PhoneFrame'

const NOTES = [
  {
    title: '记录一次',
    body: '点「现在感觉怎么样」，选情绪、定强度、加标签。两屏就能完成。',
  },
  {
    title: '看一次模式',
    body: '切到「洞察」，日历、触发因素和模式卡都由你刚记下的内容计算。',
  },
  {
    title: '做一次关怀',
    body: '在「关怀」里开始 90 秒呼吸，完成后反馈感觉，推荐会随之调整。',
  },
  {
    title: '管一次数据',
    body: '在「我的」里导出或清空。记录只存在浏览器本地，不会上传。',
  },
]

export function PrototypeSection() {
  return (
    <section id="prototype" className="scroll-mt-24 border-t border-line bg-elev/60 py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
                  可以点开用的原型
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="pretty mt-5 max-w-[32ch] text-[14.5px] leading-[1.9] text-ink2">
                  不是截图。右边是一个能记录、能计算、能完成一次练习的真实界面。
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                {NOTES.map((n, i) => (
                  <Reveal key={n.title} delay={0.08 + i * 0.04}>
                    <div className="grid grid-cols-[1.6rem_1fr] gap-3">
                      <span className="tnum pt-0.5 text-[11px] text-ink3">0{i + 1}</span>
                      <div>
                        <p className="text-[13.5px] font-medium text-ink">{n.title}</p>
                        <p className="mt-1 text-[12.5px] leading-[1.75] text-ink2">{n.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <p className="mt-8 border-t border-line pt-4 text-[11.5px] leading-relaxed text-ink3">
                原型使用 28 天演示数据。你的操作会保存在本地浏览器，刷新不会丢失，也可以在「我的」里恢复演示数据。
              </p>
            </div>
          </div>

          <Reveal delay={0.1} className="flex justify-center lg:col-span-8">
            <PhoneFrame variant="live">
              <DiaryApp />
            </PhoneFrame>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
