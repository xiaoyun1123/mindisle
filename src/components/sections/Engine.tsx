import { ArrowRight } from '@phosphor-icons/react'
import { Reveal } from '../Reveal'

export function Engine() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-[clamp(1.6rem,2.6vw,2.1rem)] font-medium tracking-[-0.03em] text-ink">
            推荐不是猜，是排序。
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="pretty mt-3 max-w-[54ch] text-[14.5px] leading-[1.85] text-ink2">
            同一个情绪，在不同时间需要不同的照顾。心屿用四个输入把「建议」缩小到三个可执行的动作。
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 rounded-[24px] border border-line bg-elev px-6 py-8 md:px-10 md:py-9">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-4">
              <div className="flex-1">
                <p className="text-[11px] tracking-wide text-ink3">输入</p>
                <div className="mt-3 space-y-2">
                  <Row label="情绪" value="焦虑" />
                  <Row label="强度" value="4 / 5" />
                  <Row label="可用时长" value="5 分钟" />
                  <Row label="历史反馈" value="呼吸类更有效" />
                </div>
              </div>

              <ArrowRight size={16} className="hidden shrink-0 text-ink3 lg:block" />

              <div className="flex-1">
                <p className="text-[11px] tracking-wide text-ink3">规则</p>
                <ol className="mt-3 space-y-2 text-[13px] text-ink2">
                  <li className="flex gap-2.5">
                    <span className="tnum text-[11px] text-ink3">01</span>
                    情绪匹配，先筛出适合当前情绪的练习
                  </li>
                  <li className="flex gap-2.5">
                    <span className="tnum text-[11px] text-ink3">02</span>
                    时长过滤，只保留用户此刻做得到的
                  </li>
                  <li className="flex gap-2.5">
                    <span className="tnum text-[11px] text-ink3">03</span>
                    历史加权，把曾经有效的往前放
                  </li>
                </ol>
              </div>

              <ArrowRight size={16} className="hidden shrink-0 text-ink3 lg:block" />

              <div className="flex-1">
                <p className="text-[11px] tracking-wide text-ink3">输出</p>
                <div className="mt-3 space-y-2">
                  {[
                    ['90 秒长呼气', '90 秒'],
                    ['5 分钟身体扫描', '5 分钟'],
                    ['听一首熟悉的歌', '4 分钟'],
                  ].map(([title, time]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-[12px] border border-line bg-surface px-3.5 py-2.5"
                    >
                      <span className="text-[12.5px] text-ink">{title}</span>
                      <span className="text-[10.5px] text-ink3">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-8 border-t border-line pt-5 text-[13px] leading-relaxed text-ink2">
              完成练习后回访一次感觉，反馈进入下一次排序。推荐会随着使用变准，而不是永远给同一套。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/70 pb-1.5 text-[12.5px]">
      <span className="text-ink3">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  )
}
