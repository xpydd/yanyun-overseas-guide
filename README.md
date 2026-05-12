# 燕云十六声海外版攻略站

一个本地静态攻略网站原型，面向《燕云十六声 / Where Winds Meet》海外版玩家。

## 打开方式

直接双击 `index.html`，或在终端运行：

```bash
cd /Users/peiyixing/Documents/yanyun-overseas-guide
python3 -m http.server 4173
```

然后访问：

```text
http://localhost:4173
```

## 项目结构

```text
index.html        首页总览
builds.html       武学流派 SEO 页面
map.html          地图探索 SEO 页面
updates.html      版本追踪 SEO 页面
faq.html          问题排查 SEO 页面
terminology.html  术语对照 SEO 页面
data.js           共享结构化数据
app.js            首页交互与本地数据工具
styles.css        共享视觉样式
sitemap.xml       搜索引擎站点地图
robots.txt        抓取规则
```

本项目不使用构建工具，直接托管静态文件即可。

## 线上地址

- GitHub 仓库：`https://github.com/xpydd/yanyun-overseas-guide`
- GitHub Pages：`https://xpydd.github.io/yanyun-overseas-guide/`

> 当前仓库为 public，用于支持免费 GitHub Pages 公开访问。

## 部署方式

### GitHub Pages

1. 仓库使用 `main` 分支保存静态文件。
2. 在仓库 `Settings -> Pages` 中选择 `Deploy from a branch`。
3. Branch 选择 `main`，目录选择 `/root`。
4. 保存后等待 Pages 构建完成，访问 `https://xpydd.github.io/yanyun-overseas-guide/`。

### 自有域名

1. 在 GitHub Pages 的 `Custom domain` 中填写域名，例如 `guide.example.com`。
2. 在 DNS 服务商处添加 CNAME 记录，指向 GitHub Pages 分配的域名。
3. 回到 GitHub Pages 开启 `Enforce HTTPS`。

### Cloudflare

1. 将域名接入 Cloudflare DNS。
2. 为 Pages 子域名配置 CNAME 记录。
3. SSL/TLS 建议使用 `Full` 或 `Full (strict)`。
4. 静态站点可以开启基础缓存；内容频繁更新时，发布后手动 Purge Cache。

## 后续可扩展

- 接入官方公告或手动 Markdown 更新流
- 增加武学构筑数据库
- 增加地图探索 checklist
- 增加海外版常见问题排查页
