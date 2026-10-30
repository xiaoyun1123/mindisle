import { Reveal } from '../Reveal'

const HEADERS = ['传统日记 App', '冥想 App', '通用 AI 助手', '心屿']

const ROWS: Array<{ dim: string; values: string[] }> = [
  {
    dim: '记录成本',
    values: ['需要写完整一段', '不记录情绪', '需要先描述背景', '点选加一句话，30 秒'],
  },
  {
    dim: '触发因素归因',
    values: ['没有', '没有', '依赖用户自己追问', '按人、事、地点、时间自动归因'],
  },
  {
    dim: '即时干预',
    values: ['没有', '有，但不知道何时用', '建议偏泛化', '按情绪与时长给具体动作'],
  },
  {
    dim: '隐私默认',
    values: ['多为云端账号', '云端账号', '对话上传', '默认只存本地'],
  },
  {
    dim: '分级支持',
    values: ['没有', '没有', '有风险提示', '自助、同伴、专业三层'],
  },
]

export function Compare() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.03em] text-ink">
            记录、归因、干预，
            <br />
            本来不该是三个产品。
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="pretty mt-5 max-w-[56ch] text-[15px] leading-[1.9] text-ink2">
            心屿的差异不在功能更多，而在把原本分散在三类产品里的三段体验，放进同一次使用里。
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line2">
                  <th className="w-[18%] py-4 pr-6 text-[12px] font-normal text-ink3">维度</th>
                  {HEADERS.map((h, i) => (
                    <th
                      key={h}
                      className={`px-4 py-4 text-[13px] font-medium ${
                        i === HEADERS.length - 1
                          ? 'rounded-t-[12px] bg-accent-soft text-accent-ink'
                          : 'text-ink2'
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.dim} className="border-b border-line">
                    <th className="py-4 pr-6 text-[13px] font-normal text-ink">{row.dim}</th>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={`px-4 py-4 text-[13px] leading-relaxed ${
                          i === row.values.length - 1
                            ? 'bg-accent-soft text-accent-ink'
                            : 'text-ink2'
                        }`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
