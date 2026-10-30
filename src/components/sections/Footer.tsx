export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[30px] font-medium tracking-[-0.03em] text-ink">心屿</p>
            <p className="mt-2 text-[13px] text-ink2">一个情绪记录与自我关怀的产品设计练习。</p>
          </div>
          <a href="#top" className="text-[12px] text-ink3 transition-colors hover:text-ink">
            回到顶部
          </a>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[11px] text-ink3 sm:flex-row sm:justify-between">
          <span>页面内原型使用演示数据，保存在浏览器本地。</span>
          <span>2026</span>
        </div>
      </div>
    </footer>
  )
}
