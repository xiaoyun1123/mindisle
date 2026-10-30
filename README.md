# 心屿 · 情绪日记与自我关怀

一个面向年轻人的情绪记录工具设计：把一次情绪记录拆成「记录 → 洞察 → 关怀」三段，每一段都给用户一个能立刻感知的结果。

在线地址：https://xiaoyun1123.github.io/mindisle/

## 内容

- **产品设计**：用户痛点、设计原则、信息架构、推荐引擎规则、竞品对照、评估指标与边界、三阶段路线图。
- **可交互原型**：页面内嵌的真实界面，可记录情绪、查看 28 天情绪日历与触发因素分析、完成一次 90 秒呼吸练习并反馈效果。数据存在浏览器 localStorage，刷新不丢。

## 本地运行

```bash
npm install
npm run dev      # http://localhost:5173/mindisle/
npm run build    # 产物在 dist/
```

## 发布

```bash
npm run build
node scripts/publish.mjs   # 通过 GitHub API 把 dist 推到 gh-pages 分支
```

需要本机 `gh` 已登录且账号对仓库有写权限。发布走 API 而非 `git push`，是因为到 github.com:443 的连接不稳定，而 api.github.com 稳定。

## 技术栈

Vite · React · TypeScript · Tailwind CSS v4 · Motion · Phosphor Icons
