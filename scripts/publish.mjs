// 通过 GitHub REST API 发布，绕过本机到 github.com:443 不稳定的 git 传输。
// 用法:
//   node scripts/publish.mjs          构建产物 -> gh-pages（线上站点）
//   node scripts/publish.mjs source   源码 -> main
import { readdir, readFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { execSync } from 'node:child_process'

const OWNER = 'xiaoyun1123'
const REPO = 'mindisle'
const mode = process.argv[2] === 'source' ? 'source' : 'site'

const token = execSync('gh auth token', { encoding: 'utf8' }).trim()
const api = `https://api.github.com/repos/${OWNER}/${REPO}`

async function call(path, options = {}) {
  const res = await fetch(`${api}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'mindisle-publish',
      ...(options.headers || {}),
    },
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} -> ${res.status} ${text.slice(0, 300)}`)
  return text ? JSON.parse(text) : null
}

const SKIP = new Set(['node_modules', 'dist', '.git', '.vscode', '.idea'])

async function walk(dir, base) {
  const out = []
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(item.name)) continue
    const full = join(dir, item.name)
    if (item.isDirectory()) out.push(...(await walk(full, base)))
    else out.push(relative(base, full).split(sep).join('/'))
  }
  return out
}

async function headSha(branch) {
  try {
    return (await call(`/git/ref/heads/${branch}`)).object.sha
  } catch {
    return null
  }
}

// 空仓库上 Git Data API 一律返回 409，需要先用 Contents API 建出第一个提交
async function bootstrapMain() {
  const readme = await readFile('README.md')
  const created = await call('/contents/README.md', {
    method: 'PUT',
    body: JSON.stringify({
      message: 'init: 心屿产品设计与原型\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>',
      content: readme.toString('base64'),
    }),
  })
  console.log('bootstrapped main', created.commit.sha.slice(0, 7))
  return created.commit.sha
}

async function push(branch, paths, message, extra = []) {
  const items = []
  for (const path of paths) {
    const content = await readFile(path)
    const blob = await call('/git/blobs', {
      method: 'POST',
      body: JSON.stringify({ content: content.toString('base64'), encoding: 'base64' }),
    })
    items.push({ path, mode: '100644', type: 'blob', sha: blob.sha })
  }
  items.push(...extra.map((e) => ({ mode: '100644', type: 'blob', ...e })))

  const tree = await call('/git/trees', { method: 'POST', body: JSON.stringify({ tree: items }) })
  const parent = await headSha(branch)
  const commit = await call('/git/commits', {
    method: 'POST',
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: parent ? [parent] : [(await headSha('main')) ?? (await bootstrapMain())],
    }),
  })

  if (parent) {
    await call(`/git/refs/heads/${branch}`, {
      method: 'PATCH',
      body: JSON.stringify({ sha: commit.sha, force: true }),
    })
  } else {
    await call('/git/refs', {
      method: 'POST',
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: commit.sha }),
    })
  }
  console.log(`pushed ${items.length} files to ${branch}:`, commit.sha.slice(0, 7))
}

const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ')
const tail = '\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>'

if (mode === 'source') {
  if (!(await headSha('main'))) await bootstrapMain()
  await push('main', await walk('.', '.'), `source: ${stamp}${tail}`)
} else {
  // .nojekyll 关掉 Jekyll，防止以后产物里出现 _ 开头目录被吞
  await push('gh-pages', await walk('dist', 'dist'), `deploy: ${stamp}${tail}`, [
    { path: '.nojekyll', content: '' },
    { path: 'BUILD.txt', content: new Date().toISOString() },
  ])
}
