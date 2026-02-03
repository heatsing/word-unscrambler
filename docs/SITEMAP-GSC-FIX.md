# Sitemap 无法抓取修复说明

## 问题根因诊断

1. **GSC 提交的是 `/sitemap.xml`**  
   站内实际由 `@astrojs/sitemap` 生成的是 **`/sitemap-index.xml`**（以及分片 `sitemap-0.xml` 等）。若在 GSC 中只提交 `sitemap.xml`，而线上未对该路径做重定向或别名，会报「无法抓取 / 已发现网页 0」。

2. **构建阶段 sitemap 可能未写入 dist**  
   `@astrojs/sitemap` 在 `astro:build:done` 钩子里写文件。若构建超时、失败或钩子未执行，`dist` 中可能没有 `sitemap-index.xml`，部署后该 URL 会 404。

3. **robots.txt 仅声明了 sitemap-index.xml**  
   未声明 `sitemap.xml`，且未对 `/sitemap.xml` 做重定向，导致提交 `sitemap.xml` 时失败。

## 修改的文件列表

| 文件 | 变更 |
|------|------|
| `vercel.json` | 增加 `/sitemap.xml` → `sitemap-index.xml` 的 301 重定向；为 `sitemap-0/1/2.xml` 增加 `Content-Type: application/xml` 等头 |
| `public/robots.txt` | 增加一行 `Sitemap: https://wordunscrambler.cc/sitemap.xml` |
| `package.json` | `build` 后增加 `node scripts/ensure-sitemap.mjs`；新增脚本 `validate:sitemap` |
| `scripts/ensure-sitemap.mjs` | 新增：若 dist 无 `sitemap-index.xml`，则根据 dist 内页面生成 sitemap 并写入 |
| `scripts/validate-sitemap.mjs` | 新增：对给定 baseUrl 请求 sitemap，校验状态码、Content-Type、XML、URL 数量等 |
| `docs/SITEMAP-GSC-FIX.md` | 本说明文档 |

## 关键代码

### 1. vercel.json：重定向 + 头

```json
"redirects": [
  {
    "source": "/sitemap.xml",
    "destination": "https://wordunscrambler.cc/sitemap-index.xml",
    "permanent": true
  }
],
"headers": [
  { "source": "/sitemap-index.xml", "headers": [ { "key": "Content-Type", "value": "application/xml; charset=utf-8" }, ... ] },
  { "source": "/sitemap-0.xml", ... },
  { "source": "/sitemap-1.xml", ... },
  { "source": "/sitemap-2.xml", ... },
  ...
]
```

### 2. robots.txt

```
User-agent: *
Allow: /
Disallow: /private/

Sitemap: https://wordunscrambler.cc/sitemap-index.xml
Sitemap: https://wordunscrambler.cc/sitemap.xml
```

### 3. 构建流程（package.json）

```json
"build": "npm run build:dict && astro build && node scripts/ensure-sitemap.mjs",
"validate:sitemap": "node scripts/validate-sitemap.mjs",
```

### 4. ensure-sitemap.mjs 逻辑概要

- 若 `dist/sitemap-index.xml` 已存在则直接退出。
- 否则扫描 `dist` 下所有含 `index.html` 的目录，得到路径列表。
- 生成符合 sitemaps.org 的 `sitemap-index.xml` 与分片 `sitemap-0.xml`（必要时更多），所有 `<loc>` 使用 `https://wordunscrambler.cc/...`。

### 5. validate-sitemap.mjs 用法

```bash
# 校验生产环境
npm run validate:sitemap
# 或
node scripts/validate-sitemap.mjs https://wordunscrambler.cc

# 本地先 npm run preview，再校验
node scripts/validate-sitemap.mjs http://localhost:4321
```

## 部署后验证步骤

1. **curl 检查 sitemap 与 robots**

   ```bash
   curl -sI https://wordunscrambler.cc/sitemap.xml
   # 期望: 301 → sitemap-index.xml，或 200（若直接提供 sitemap）

   curl -sI https://wordunscrambler.cc/sitemap-index.xml
   # 期望: 200，Content-Type: application/xml

   curl -sI https://wordunscrambler.cc/robots.txt
   # 期望: 200，Content-Type: text/plain
   ```

2. **运行校验脚本**

   ```bash
   node scripts/validate-sitemap.mjs https://wordunscrambler.cc
   # 期望输出: Validation passed. 以及 URL 数量
   ```

3. **GSC 操作**

   - 在 GSC 的「站点地图」中提交：`https://wordunscrambler.cc/sitemap-index.xml`（推荐）或 `https://wordunscrambler.cc/sitemap.xml`（会 301 到 index）。
   - 等待抓取；确认「已发现网址数」> 0，无「无法抓取」错误。

## Canonical / 404 / hreflang

- **Canonical**：各页通过 `BaseHead.astro` 的 `canonical` 传入，已输出 `<link rel="canonical">`。
- **404**：Astro 生成 `404.html`；Vercel 对未匹配路由会返回 404 状态并展示该页。
- **hreflang**：当前单语站未使用 hreflang；若后续加多语言，再在 `BaseHead` 或布局中增加对应标签即可。
