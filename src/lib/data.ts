import type { CareAction, Emotion, EmotionKey, Entry } from './types'

export const EMOTIONS: Emotion[] = [
  { key: 'joy', label: '开心', en: 'Joy', color: 'var(--e-joy)', valence: 'positive' },
  { key: 'calm', label: '平静', en: 'Calm', color: 'var(--e-calm)', valence: 'neutral' },
  { key: 'hope', label: '期待', en: 'Hope', color: 'var(--e-hope)', valence: 'positive' },
  { key: 'anxiety', label: '焦虑', en: 'Anxiety', color: 'var(--e-anxiety)', valence: 'negative' },
  { key: 'sadness', label: '难过', en: 'Sadness', color: 'var(--e-sadness)', valence: 'negative' },
  { key: 'anger', label: '生气', en: 'Anger', color: 'var(--e-anger)', valence: 'negative' },
  { key: 'tired', label: '疲惫', en: 'Tired', color: 'var(--e-tired)', valence: 'negative' },
  { key: 'lonely', label: '孤独', en: 'Lonely', color: 'var(--e-lonely)', valence: 'negative' },
]

export const EMOTION_MAP: Record<EmotionKey, Emotion> = Object.fromEntries(
  EMOTIONS.map((e) => [e.key, e]),
) as Record<EmotionKey, Emotion>

export const WHO_OPTIONS = ['独自', '家人', '朋友', '同事', '伴侣']
export const WHERE_OPTIONS = ['家', '公司', '学校', '路上', '线上']
export const WHAT_OPTIONS = ['工作', '学习', '关系', '健康', '金钱', '说不清']

export const CARE_ACTIONS: CareAction[] = [
  {
    id: 'breath-90',
    title: '90 秒长呼气',
    duration: '90 秒',
    seconds: 90,
    desc: '吸气 4 秒，呼气 6 秒。让呼气比吸气长，是最快让神经系统降速的办法。',
    why: '焦虑时心率偏快，延长呼气能直接作用于迷走神经。',
    steps: ['找一个能坐稳的地方', '鼻子吸气 4 秒', '嘴巴呼气 6 秒', '重复 9 轮'],
    kind: 'breath',
    emotions: ['anxiety', 'anger', 'lonely', 'tired'],
  },
  {
    id: 'walk-10',
    title: '下楼走 10 分钟',
    duration: '10 分钟',
    seconds: 600,
    desc: '不设目标，不带耳机也可以。走到身体开始发热就回来。',
    why: '重复性动作加上空间变化，能让反复想的念头慢下来。',
    steps: ['穿上鞋，拿上钥匙', '走出楼门，选一个方向', '走 5 分钟后原路返回'],
    kind: 'move',
    emotions: ['anxiety', 'anger', 'tired', 'sadness'],
  },
  {
    id: 'scan-5',
    title: '5 分钟身体扫描',
    duration: '5 分钟',
    seconds: 300,
    desc: '从上到下，把注意力依次放在头顶、肩膀、胸口、腹部、双腿。',
    why: '把注意力从想法移回身体，是打断反刍最直接的方式。',
    steps: ['躺下或靠住椅背', '闭上眼，先感受头顶', '每到一个部位停 3 次呼吸', '最后感受整个身体'],
    kind: 'reset',
    emotions: ['tired', 'lonely', 'sadness', 'anxiety'],
  },
  {
    id: 'write-3',
    title: '写三句对自己说的话',
    duration: '3 分钟',
    seconds: 180,
    desc: '用对朋友说话的语气，写三句此刻你愿意对自己说的话。',
    why: '自我关怀书写能降低自我批评带来的二次伤害。',
    steps: ['写下「我现在感到……」', '写下「这很难，但我……」', '写下「我需要的是……」'],
    kind: 'write',
    emotions: ['sadness', 'lonely', 'anger'],
  },
  {
    id: 'song',
    title: '听一首熟悉的歌',
    duration: '4 分钟',
    seconds: 240,
    desc: '选一首你听过很多次的歌，从头听到尾，不做别的事。',
    why: '熟悉的旋律能提供可预期的情绪节奏，适合情绪过载时。',
    steps: ['戴上耳机或打开音箱', '选一首熟悉的歌', '从头听到尾，不看手机'],
    kind: 'listen',
    emotions: ['sadness', 'lonely', 'tired', 'joy'],
  },
  {
    id: 'water',
    title: '离开屏幕，喝一杯水',
    duration: '2 分钟',
    seconds: 120,
    desc: '站起来，去接一杯水，慢慢喝完，再回到这里。',
    why: '中断持续的屏幕刺激，是最低成本的切换。',
    steps: ['放下手机', '站起来走几步', '接一杯水，慢慢喝完'],
    kind: 'reset',
    emotions: ['tired', 'anxiety', 'anger'],
  },
  {
    id: 'message',
    title: '给一个人发条消息',
    duration: '2 分钟',
    seconds: 120,
    desc: '不用解释全部，只说一句「今天有点累，你在吗」。',
    why: '孤独感最怕的是把感受说出来，哪怕只说一句。',
    steps: ['想一个你信任的人', '发一句不需要回复也可以的话', '把手机放下'],
    kind: 'connect',
    emotions: ['lonely', 'sadness'],
  },
  {
    id: 'unload',
    title: '把脑子里的事倒出来',
    duration: '3 分钟',
    seconds: 180,
    desc: '不做整理，不排序，想到什么写什么，写完不必回看。',
    why: '把悬着的事写下来，会降低大脑反复提醒的频率。',
    steps: ['打开输入框', '连续写 3 分钟，不停顿', '写完关掉，不再修改'],
    kind: 'write',
    emotions: ['anxiety', 'tired', 'anger'],
  },
]

export const CARE_MAP: Record<string, CareAction> = Object.fromEntries(
  CARE_ACTIONS.map((a) => [a.id, a]),
)

/** 演示数据：28 天，围绕一个刚工作两年的年轻人。真实数据由用户本地记录产生。 */
export function seedEntries(): Entry[] {
  const rows: Array<
    [number, number, EmotionKey, 1 | 2 | 3 | 4 | 5, string, string, string, string?]
  > = [
    [0, 21, 'anxiety', 3, '独自', '公司', '工作', '评审的稿子还差两页，越改越乱。'],
    [1, 23, 'tired', 4, '独自', '家', '工作'],
    [2, 13, 'calm', 2, '朋友', '线上', '关系'],
    [3, 22, 'anxiety', 4, '同事', '公司', '工作', '会上被问住了，回来一直在想那句话。'],
    [4, 20, 'joy', 3, '朋友', '家', '关系'],
    [5, 23, 'lonely', 3, '独自', '家', '说不清'],
    [6, 22, 'anxiety', 5, '独自', '家', '工作', '周日晚上，一想到明天就睡不着。'],
    [7, 21, 'tired', 3, '独自', '公司', '工作'],
    [8, 19, 'sadness', 3, '家人', '家', '关系'],
    [9, 10, 'calm', 3, '独自', '家', '学习'],
    [10, 22, 'anxiety', 4, '同事', '公司', '工作'],
    [11, 12, 'hope', 3, '朋友', '线上', '关系'],
    [12, 23, 'tired', 2, '独自', '家', '工作'],
    [13, 22, 'lonely', 4, '独自', '家', '说不清'],
    [14, 18, 'calm', 2, '家人', '家', '健康'],
    [15, 21, 'anger', 3, '同事', '公司', '工作'],
    [16, 20, 'anxiety', 3, '独自', '公司', '学习'],
    [17, 15, 'joy', 4, '朋友', '家', '关系'],
    [18, 23, 'tired', 3, '独自', '家', '工作'],
    [19, 22, 'sadness', 2, '独自', '家', '说不清'],
    [20, 21, 'anxiety', 4, '同事', '公司', '工作'],
    [21, 9, 'calm', 3, '独自', '线上', '学习'],
    [22, 23, 'lonely', 3, '独自', '家', '说不清'],
    [23, 14, 'joy', 4, '朋友', '家', '关系'],
    [24, 22, 'tired', 4, '独自', '公司', '工作'],
    [25, 23, 'anxiety', 5, '独自', '家', '工作'],
    [26, 20, 'anger', 2, '家人', '家', '关系'],
    [27, 8, 'calm', 3, '独自', '家', '健康'],
  ]

  return rows.map(([offset, hour, emotion, intensity, who, where, what, note], i) => {
    const d = new Date()
    d.setDate(d.getDate() - offset)
    d.setHours(hour, 12 + (i % 40), 0, 0)
    return {
      id: `seed-${i}`,
      at: d.getTime(),
      emotion,
      intensity,
      who,
      where,
      what,
      note,
    }
  })
}
