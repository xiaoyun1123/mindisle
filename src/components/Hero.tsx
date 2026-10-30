import { ArrowDownRight, ArrowRight } from '@phosphor-icons/react'
import { DiaryApp } from './prototype/DiaryApp'
import { PhoneFrame } from './prototype/PhoneFrame'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-32">
      <div className="pointer-events-none absolute -right-20 top-24 h-[420px] w-[420px] rounded-full bg-accent-soft/70 blur-[110px]" />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-6 pb-16 md:px-10 lg:grid-cols-12 lg:gap-6 lg:pb-24">
        <div className="lg:col-span-7">
          <Reveal>
            <h1 className="balance text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-ink">
              记下此刻的情绪，
              <br className="hidden sm:block" />
              看见它从哪里来。
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="pretty mt-6 max-w-[33ch] text-[16.5px] leading-[1.8] text-ink2 md:text-[17.5px]">
              30 秒完成一次记录，自动发现反复出现的触发因素，并给出此刻就能做的自我关怀。
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#prototype"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[14px] text-bg transition-colors hover:bg-accent-hover"
              >
                体验原型
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#problem"
                className="inline-flex items-center gap-2 rounded-full border border-line2 px-6 py-3 text-[14px] text-ink2 transition-colors hover:border-ink3 hover:text-ink"
              >
                阅读设计
                <ArrowDownRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="flex justify-center lg:col-span-5 lg:justify-end">
          <div className="pointer-events-none select-none">
            <PhoneFrame variant="preview">
              <DiaryApp mode="preview" />
            </PhoneFrame>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
