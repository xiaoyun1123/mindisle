import { Reveal } from '../Reveal'

const IA = [
  { name: '今天', items: ['记录情绪', '今日状态', '最近记录'] },
  { name: '洞察', items: ['情绪日历', '触发因素', '模式卡', '每周复盘'] },
  { name: '关怀', items: ['此刻推荐', '情绪急救包', '练习库', '安全计划'] },
  { name: '我的', items: ['数据与隐私', '提醒设置', '导出记录', '专业资源'] },
]

export function Architecture() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
              四个入口，
              <br />
              一条主线。
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="pretty mt-5 max-w-[30ch] text-[14.5px] leading-[1.9] text-ink2">
              每个一级入口只回答一个问题：我现在怎么样，我为什么这样，我现在能做什么，我的数据在哪里。
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:col-span-8">
          <div className="rounded-[22px] border border-line bg-surface p-6 md:p-7">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="text-[13px] font-medium text-ink">心屿</span>
              <span className="text-[11px] text-ink3">四个一级入口</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {IA.map((t) => (
                <div key={t.name}>
                  <span className="text-[13px] font-medium text-ink">{t.name}</span>
                  <ul className="mt-3 space-y-2 border-l border-line pl-3">
                    {t.items.map((item) => (
                      <li key={item} className="text-[11.5px] leading-snug text-ink2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 text-[11px] text-ink3">
              <span>默认本地存储</span>
              <span>无需账户</span>
              <span>可导出与删除</span>
              <span>危机时转介专业资源</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
