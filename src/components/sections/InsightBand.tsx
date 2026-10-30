import { Reveal } from '../Reveal'

export function InsightBand() {
  return (
    <section className="border-y border-line bg-accent-soft/70">
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <p className="balance max-w-[30ch] text-[clamp(1.5rem,3vw,2.45rem)] font-medium leading-[1.45] tracking-[-0.02em] text-accent-ink">
            用户缺的不是一个记录工具，而是一条从「我感觉不好」到「我知道为什么，也知道现在能做什么」的路径。
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-3 text-[13px] text-accent-ink/75">
            <span>记录是入口</span>
            <span>归因是价值</span>
            <span>行动是留存</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
