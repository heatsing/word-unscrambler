# 🔍 Sitemap 无法抓取 - 完整诊断与修复方案

## ⚠️ 当前问题

Google Search Console 报告以下 sitemap 无法抓取：
- ✗ https://wordunscrambler.cc/robots.txt
- ✗ https://www.wordunscrambler.cc/sitemap.xml
- ✗ https://wordunscrambler.cc/sitemap.xml

## ✅ 本地验证（已通过）

构建检查：
```bash
✓ sitemap.xml 已生成
✓ robots.txt 已生成
✓ 包含 738 个 URL
```

## 🎯 问题诊断步骤

### 步骤 1: 验证网站是否已部署

```bash
# 测试域名是否可访问
curl -I https://wordunscrambler.cc

# 预期输出：HTTP/2 200
# 如果得到 404 或超时，说明网站未部署或 DNS 未生效
```

### 步骤 2: 验证 sitemap.xml 是否可访问

```bash
# 测试 sitemap.xml
curl https://wordunscrambler.cc/sitemap.xml

# 预期输出：XML 格式的 sitemap
# 如果得到 404，说明路由配置有问题
```

### 步骤 3: 验证 robots.txt 是否可访问

```bash
# 测试 robots.txt
curl https://wordunscrambler.cc/robots.txt

# 预期输出：
# User-Agent: *
# Allow: /
# Disallow: /private/
# Sitemap: https://wordunscrambler.cc/sitemap.xml
```

### 步骤 4: 检查 www 重定向

```bash
# 测试 www 域名
curl -I https://www.wordunscrambler.cc

# 应该返回 301 重定向到 https://wordunscrambler.cc
# 或者返回 200（如果两个都支持）
```

## 🔧 修复方案

### 方案 A: 网站未部署（最可能）

**问题**: 代码还在本地，未推送到生产环境

**解决步骤**:
1. 确认代码已提交到 Git
```bash
git status
git log -1
```

2. 推送到远程仓库
```bash
git push origin claude/modify-repository-code-0dtcZ
```

3. 部署到生产环境（根据您的部署平台）:
   - **Vercel**: `vercel --prod`
   - **Netlify**: `netlify deploy --prod`
   - **其他**: 触发 CI/CD 流程

4. 等待 2-5 分钟部署完成

5. 验证部署
```bash
curl https://wordunscrambler.cc/sitemap.xml
```

### 方案 B: DNS 未生效

**问题**: 域名指向错误或 DNS 未配置

**解决步骤**:
1. 检查 DNS 记录
```bash
dig wordunscrambler.cc
dig www.wordunscrambler.cc
```

2. 确保 A 记录或 CNAME 指向正确的服务器

3. DNS 生效需要 1-48 小时（通常 10-30 分钟）

### 方案 C: www vs 非 www 问题

**问题**: www 和非 www 域名未统一

**解决步骤**:

#### 选项 1: 重定向 www → 非 www（推荐）

在 `next.config.js` 添加：
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.wordunscrambler.cc',
          },
        ],
        destination: 'https://wordunscrambler.cc/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

#### 选项 2: 在托管平台配置重定向

**Vercel**:
在项目设置 → Domains 中：
- 添加 `www.wordunscrambler.cc` 并设置重定向到 `wordunscrambler.cc`

**Cloudflare**:
Page Rules → 创建规则：
- URL: `www.wordunscrambler.cc/*`
- Forwarding URL: `301 - Permanent Redirect`
- Destination: `https://wordunscrambler.cc/$1`

### 方案 D: 构建产物问题

**问题**: sitemap.xml 或 robots.txt 未包含在部署中

**解决步骤**:
1. 清理并重新构建
```bash
rm -rf .next
bun run build
```

2. 检查构建产物
```bash
ls -la .next/server/app/sitemap.xml
ls -la .next/server/app/robots.txt
```

3. 确认 `next.config.js` 没有排除这些文件

## 📋 Google Search Console 配置

### 1. 删除旧的 Sitemap 提交

在 GSC 中删除以下条目：
- ✗ https://wordunscrambler.cc/robots.txt （这不应该作为 sitemap 提交）
- ✗ https://www.wordunscrambler.cc/sitemap.xml （如果使用重定向）

### 2. 仅提交正确的 Sitemap

只提交一个：
```
https://wordunscrambler.cc/sitemap.xml
```

### 3. 验证 Property

确保在 GSC 中验证了正确的 property：
- 使用 `wordunscrambler.cc`（非 www）
- 或两者都验证但设置首选域

### 4. 请求索引

提交 sitemap 后：
1. 等待 24-48 小时让 Google 自动抓取
2. 或手动请求索引（URL Inspection → Request Indexing）

## 🚀 部署检查清单

部署后，依次验证：

- [ ] 1. 网站首页可访问
  ```bash
  curl -I https://wordunscrambler.cc
  ```

- [ ] 2. robots.txt 可访问
  ```bash
  curl https://wordunscrambler.cc/robots.txt
  ```

- [ ] 3. sitemap.xml 可访问并包含正确的 URL 数量
  ```bash
  curl https://wordunscrambler.cc/sitemap.xml | grep -o "<url>" | wc -l
  # 应该返回 738
  ```

- [ ] 4. www 重定向正常
  ```bash
  curl -I https://www.wordunscrambler.cc
  # 应该返回 301 或 308 重定向
  ```

- [ ] 5. sitemap 中的示例 URL 可访问
  ```bash
  curl -I https://wordunscrambler.cc/5-letter-words
  curl -I https://wordunscrambler.cc/word-unscrambler
  ```

## 📊 验证脚本

创建 `scripts/verify-deployment.sh`:

```bash
#!/bin/bash

echo "🔍 Verifying wordunscrambler.cc deployment..."

DOMAIN="https://wordunscrambler.cc"

# 1. Check homepage
echo -n "1. Homepage: "
if curl -s -o /dev/null -w "%{http_code}" $DOMAIN | grep -q "200"; then
  echo "✓ OK"
else
  echo "✗ FAILED"
fi

# 2. Check robots.txt
echo -n "2. robots.txt: "
if curl -s $DOMAIN/robots.txt | grep -q "Sitemap:"; then
  echo "✓ OK"
else
  echo "✗ FAILED"
fi

# 3. Check sitemap.xml
echo -n "3. sitemap.xml: "
SITEMAP_URLS=$(curl -s $DOMAIN/sitemap.xml | grep -o "<url>" | wc -l)
if [ $SITEMAP_URLS -gt 700 ]; then
  echo "✓ OK ($SITEMAP_URLS URLs)"
else
  echo "✗ FAILED (only $SITEMAP_URLS URLs)"
fi

# 4. Check www redirect
echo -n "4. www redirect: "
WWW_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://www.wordunscrambler.cc)
if [ "$WWW_CODE" = "301" ] || [ "$WWW_CODE" = "308" ]; then
  echo "✓ OK (redirects)"
elif [ "$WWW_CODE" = "200" ]; then
  echo "⚠ WARNING (no redirect, should add one)"
else
  echo "✗ FAILED (code: $WWW_CODE)"
fi

# 5. Check sample pages
echo -n "5. Sample pages: "
SAMPLE_OK=0
for url in "/word-unscrambler" "/5-letter-words" "/wordle-solver"; do
  if curl -s -o /dev/null -w "%{http_code}" $DOMAIN$url | grep -q "200"; then
    ((SAMPLE_OK++))
  fi
done
if [ $SAMPLE_OK -eq 3 ]; then
  echo "✓ OK (all 3 pages accessible)"
else
  echo "✗ FAILED ($SAMPLE_OK/3 pages accessible)"
fi

echo ""
echo "📊 Summary:"
echo "   Domain: $DOMAIN"
echo "   Status: Run checks above"
echo ""
echo "Next steps:"
echo "1. If all checks pass, submit sitemap to Google Search Console"
echo "2. Wait 24-48 hours for Google to crawl"
echo "3. Monitor in GSC → Sitemaps"
```

运行验证：
```bash
chmod +x scripts/verify-deployment.sh
./scripts/verify-deployment.sh
```

## ⏰ 时间线预期

- **部署后 5 分钟**: DNS 生效，网站可访问
- **提交 sitemap 后 1 小时**: Google 开始尝试抓取
- **24 小时内**: sitemap 状态更新为"成功"
- **3-7 天**: 开始看到索引页面增加

## 🆘 仍然失败？

如果完成所有步骤后仍然显示"无法抓取"：

1. **使用 Google 的 URL 检查工具**
   - 输入: `https://wordunscrambler.cc/sitemap.xml`
   - 点击"测试实际 URL"
   - 查看具体错误信息

2. **检查服务器日志**
   - 查找 Googlebot 的访问记录
   - 确认是否有 403/404/500 错误

3. **验证 SSL 证书**
   ```bash
   curl -vI https://wordunscrambler.cc 2>&1 | grep -i "ssl"
   ```

4. **测试 Googlebot 抓取**
   使用 [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
   输入: `https://wordunscrambler.cc`

## 📞 需要帮助？

如果问题持续，请提供：
1. 部署平台（Vercel/Netlify/其他）
2. `curl -I https://wordunscrambler.cc` 的输出
3. `curl https://wordunscrambler.cc/sitemap.xml` 的前 50 行
4. Google Search Console 的完整错误信息截图

---

**最后更新**: 2026-01-18
**问题**: sitemap 无法抓取
**状态**: 等待部署验证
