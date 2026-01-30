# Astro 主站检查清单

## 已检查并修复

- **构建**：根目录 `package.json` 使用 Astro 脚本；`npm run build` 成功（42 页）。
- **脚本**：`scripts/build-dict.ts` 存在，生成 `public/data/words_*.json`；无 `words.txt` 时使用示例词表。
- **PostCSS**：根目录 `postcss.config.mjs` 已去掉 `@tailwindcss/postcss`，避免 Astro 构建报错。
- **动态路由**：`[...slug].astro` 的 `slug` 为字符串，符合 Astro 要求。
- **404**：`src/pages/404.astro` 已添加，带 `noindex`，避免 404 被收录。
- **SEO**：`BaseHead` 增加 favicon（`/icon.svg`）和 apple-touch-icon（`/apple-icon.png`）；`PageMeta` 支持 `noindex`，404 使用。
- **Sitemap**：`public/robots.txt` 指向 `sitemap-index.xml`；Astro 构建生成 `dist/sitemap-index.xml`。
- **Vercel**：`vercel.json` 增加 `buildCommand: "npm run build"`、`outputDirectory: "dist"`，sitemap 头改为 `/sitemap-index.xml`，确保部署用 Astro 输出。
- **PWA**：`public/manifest.json` 图标改为现有资源（`/icon.svg`、`/apple-icon.png`），去掉不存在的 `icon-192.png`、`icon-512.png`、`screenshot-1.png`。
- **文档**：`README.md` 标明主站为 Astro，并说明本地运行与 `words.txt` 用法。

## 可选后续（未迁移的 Next 路由）

以下为原 Next.js 中的动态子路由，Astro 当前仅提供对应「索引页」，无子路径：

| Next 路由 | Astro 现状 | 说明 |
|-----------|------------|------|
| `[length]-letter-words-ending-with/[letter]` | 无 | 如 `/3-letter-words-ending-with/s` |
| `[length]-letter-words-starting-with/[letter]` | 无 | 如 `/3-letter-words-starting-with/b` |
| `[length]-letter-words-with-[letter]` | 无 | 按字母筛选的中间页 |
| `words-ending-in/[letter]` | 仅有 `/words-ending-in` | 如 `/words-ending-in/s` 无单独页 |

需要时可在 Astro 中新增对应动态页（如 `[length]-letter-words-ending-with/[letter].astro` 等）并补全 `getStaticPaths`。

## 其他说明

- **词库**：根目录放置 `words.txt`（每行一词）后执行 `npm run build:dict` 可生成完整 `public/data/`；否则使用脚本内示例词表。
- **旧代码**：`app/`、`components/`（部分）、`lib/`（部分）等 Next 相关代码仍保留，不参与当前 Astro 构建；可按需清理或归档。
