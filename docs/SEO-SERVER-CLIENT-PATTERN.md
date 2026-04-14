# 整站 SEO：Server Component + Client 工具组件

## 目标

- **SEO 关键内容**（title、H1、描述、正文、FAQ）在服务端渲染，View Page Source 可见。
- **交互逻辑**（输入、按钮、实时结果）放在独立的 `"use client"` 组件中。
- 页面返回 HTTP 200，无 noindex / X-Robots-Tag，不依赖 useEffect 拉取 SEO 内容。

## 已按此模式调整的页面

| 页面 | Server 页面 | Client 工具组件 |
|------|-------------|------------------|
| `/word-cookies` | `app/word-cookies/page.tsx` | `components/word-cookies-tool.tsx` |
| `/word-unscrambler` | `app/word-unscrambler/page.tsx` | `components/word-unscrambler-tool.tsx` |
| `/anagram-solver` | `app/anagram-solver/page.tsx` | `components/anagram-solver-tool.tsx` |
| `/boggle-solver` | `app/boggle-solver/page.tsx` | `components/boggle-solver-tool.tsx` |
| `/wordle-solver` | `app/wordle-solver/page.tsx` | `components/wordle-solver-tool.tsx` |
| `/scrabble` | `app/scrabble/page.tsx` | `components/scrabble-tool.tsx` |
| `/words-with-friends` | `app/words-with-friends/page.tsx` | `components/words-with-friends-tool.tsx` |
| `/jumble-solver` | `app/jumble-solver/page.tsx` | `components/jumble-solver-tool.tsx` |
| `/descrambler` | `app/descrambler/page.tsx` | `components/descrambler-tool.tsx` |
| `/word-finder` | `app/word-finder/page.tsx` | `components/word-finder-tool.tsx` |
| `/unscramble` | `app/unscramble/page.tsx` | `components/unscramble-tool.tsx` |
| `/word-solver` | `app/word-solver/page.tsx` | `components/word-solver-tool.tsx` |
| `/word-scramble` | `app/word-scramble/page.tsx` | `components/word-scramble-tool.tsx` |
| `/wordscapes` | `app/wordscapes/page.tsx` | `components/wordscapes-tool.tsx` |
| `/wordfeud` | `app/wordfeud/page.tsx` | `components/wordfeud-tool.tsx` |
| `/scrabble-cheat` | `app/scrabble-cheat/page.tsx` | `components/scrabble-cheat-tool.tsx` |
| `/scrabble-go` | `app/scrabble-go/page.tsx` | `components/scrabble-go-tool.tsx` |
| `/text-twist` | `app/text-twist/page.tsx` | `components/text-twist-tool.tsx` |
| `/hangman-solver` | `app/hangman-solver/page.tsx` | `components/hangman-solver-tool.tsx` |
| `/word-generator` | `app/word-generator/page.tsx` | `components/word-generator-tool.tsx` |
| `/word-search-solver` | `app/word-search-solver/page.tsx` | `components/word-search-solver-tool.tsx` |
| `/letter-boxed-solver` | `app/letter-boxed-solver/page.tsx` | `components/letter-boxed-solver-tool.tsx` |

## 标准结构

### 1. 页面（Server Component，无 `"use client"`）

```tsx
// app/xxx/page.tsx
import Link from "next/link"
import { Icon } from "lucide-react"
import { XxxTool } from "@/components/xxx-tool"

export default function XxxPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* 1. Header：H1 + 描述，服务端渲染 */}
        <header className="text-center mb-12">
          <h1>...</h1>
          <p>...</p>
        </header>

        {/* 2. 交互工具：Client 组件 */}
        <XxxTool />

        {/* 3. 正文 / FAQ：服务端渲染 */}
        <article className="mt-12 space-y-10 text-muted-foreground max-w-3xl">
          <p>...</p>
          <section><h2>...</h2>...</section>
          <section aria-label="FAQ"><h2>FAQ</h2>...</section>
        </article>
      </div>
    </div>
  )
}
```

### 2. 工具组件（Client Component，`"use client"`）

- 仅包含：表单、状态、按钮、结果展示。
- 不包含：H1、正文、FAQ 等 SEO 内容。
- 表单控件使用唯一 id（如 `word-unscrambler-letters`）避免多工具同页冲突。

## 尚未拆分的工具页（可后续按同模式改）

以下页面目前仍是整页 `"use client"`，且依赖 `useSearchParams`、复杂布局或大量状态，可按需拆成 Server 页面 + 一大块 Client 组件（保留 header 在 Server）：

- `app/words-start-with/page.tsx`（约 500+ 行，useSearchParams、AdvancedWordSearch、Tabs）
- `app/words-ending-in/page.tsx`（约 500+ 行，同上）
- `app/words-with-letters/page.tsx`（约 300+ 行，useSearchParams、Tabs）

## 检查清单

- [ ] 页面文件无 `"use client"`，且默认导出为 Server Component。
- [ ] H1、首段描述、正文、FAQ 均在 page.tsx 中写死，不通过 useEffect 请求。
- [ ] 工具 UI 与状态全部在 `components/xxx-tool.tsx` 中，且文件顶有 `"use client"`。
- [ ] layout 未设置 `robots: 'noindex'` 或 X-Robots-Tag。
- [ ] 用「查看网页源代码」确认正文和标题在首屏 HTML 中可见。
