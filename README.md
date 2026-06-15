# 666xz666 的博客

这是一个基于 `Hexo 7` 和 `Fluid` 主题的个人博客项目。

## 技术栈

- `Hexo`
- `hexo-theme-fluid`
- `hexo-deployer-git`

## 目录说明

- `source/`：文章、页面、图片等站点源文件
- `scaffolds/`：`hexo new` 生成文章/页面时使用的模板
- `scripts/`：Hexo 自定义脚本
- `themes/fluid/`：本地主题目录
- `_config.yml`：Hexo 主配置
- `_config.fluid.yml`：Fluid 主题覆盖配置

## 环境要求

- `Node.js`
- `npm`
- 全局可用的 `hexo` 命令

建议先确认版本：

```powershell
node -v
npm -v
hexo -v
```

## 安装依赖

```powershell
npm install
```

## 本地开发

启动本地预览：

```powershell
hexo s
```

默认会启动 Hexo 本地服务。

## 常用命令

清理缓存和生成目录：

```powershell
hexo clean
```

生成静态文件：

```powershell
hexo g
```

新建文章：

```powershell
hexo new "文章标题"
```

说明：

- 标题参数只写文章标题本身，不要手动再加日期
- 文件名会自动生成成 `YYYY-MM-DD-文章标题.md`
- 例如执行 `hexo new "归并排序"`，会生成类似 `2026-06-16-归并排序.md`

新建草稿：

```powershell
hexo new draft "文章标题"
```

说明：

- 草稿会生成到 `source/_drafts/`
- 适合先写初稿、整理结构、补图片，再决定是否转正式文章
- 如果后续确认发布，再手动移动到 `source/_posts/`

新建页面：

```powershell
hexo new page "页面名"
```

## 部署说明

当前项目使用 `hexo-deployer-git` 部署到 GitHub。

部署依赖环境变量 `GITHUB_TOKEN`。项目根目录可创建本地 `.env` 文件：

```env
GITHUB_TOKEN=your_github_personal_access_token
```

仓库中提供了示例文件：

- `.env.example`

执行部署：

```powershell
npm run deploy
```

`npm run deploy` 会先读取当前项目 `.env`，再执行 `hexo deploy`。

## 配置说明

### Hexo 主配置

文件：

- `_config.yml`

主要负责：

- 站点标题、描述、作者、语言、时区
- 链接格式
- 主题选择
- 部署配置

### Fluid 主题配置

文件：

- `_config.fluid.yml`

主要负责：

- favicon
- 深色模式
- 自定义 `js/css`
- 首页文案
- 评论、数学公式、Mermaid 等主题功能

## 版本控制建议

以下内容不应提交：

- `.env`
- `node_modules/`
- `public/`
- `.deploy_git/`

## 注意事项

- 不要把真实的 `GITHUB_TOKEN` 提交到仓库
- 如果 token 曾经暴露过，应立即废弃并重新生成
- 如果后续改用 GitHub Actions 发布，可以进一步移除本地 deploy 依赖
