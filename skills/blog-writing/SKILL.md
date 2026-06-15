# Blog Writing Skill

## 目标

根据给定主题，在指定博客仓库中产出一篇符合仓库规范的草稿文章。

## 输入方式

不要求用户提供结构化 JSON 参数。

用户只需要用自然语言提出写作任务，例如：

- “写一篇关于并查集及其典型应用的算法博客”
- “写一篇博客，介绍 Floyd 和 Dijkstra 的区别”
- “整理一篇这次博客部署清理流程的总结文章”

## 配置优先级

执行时按以下优先级取值：

1. `skills/blog-writing/CONFIG.json`
2. `skills/blog-writing/CONFIG.example.json`
3. Skill 默认值

`repo_root` 不要求用户手动传入，优先从配置中读取；如果配置未提供，再推断为“包含当前 `skills/` 目录的仓库根目录”。

## 建议配置项

可使用以下配置项：

```json
{
  "repo_root": ".",
  "writing_guide": "AI_README.md",
  "taxonomy_command": "npm run taxonomy",
  "draft_command_template": "hexo new draft \"{title}\"",
  "build_command": "hexo generate",
  "default_cover_strategy": "local-static"
}
```

## 先读什么

执行前，必须先读取以下文件：

1. `${repo_root}/${writing_guide}`
2. `${repo_root}/README.md`
3. `${repo_root}/_config.yml`
4. 如果存在，再读取 `${repo_root}/_config.fluid.yml`

其中：

- `AI_README.md` 是文章规则唯一权威来源
- 标题、文章类型、分类、标签、图片规则都应优先从 `AI_README.md` 推断
- Skill 不重复定义这些规则细节

## 标准流程

1. 读取项目规则与基础配置
2. 根据用户自然语言需求，结合 `AI_README.md` 推断文章标题和文章类型
3. 执行 taxonomy 命令，查看现有 `categories`、`tags`、相近文章
4. 选择最接近的现有分类和标签
5. 在草稿目录创建文章
6. 写入完整 front matter
7. 按仓库既有风格写正文
8. 处理封面与本地静态图片
9. 执行本地生成校验
10. 输出草稿路径、标题、分类、标签、封面、校验结果

## 建议命令

优先使用项目已有命令：

```text
npm run taxonomy
npm run taxonomy -- <keyword>
hexo new draft "文章标题"
hexo generate
```

如果配置中定义了对应命令，则优先使用配置值。

## 输出要求

最低要求：

- 文章生成在 `source/_drafts/`
- 不直接生成到 `source/_posts/`
- front matter 完整
- 分类和标签尽量复用现有体系
- 图片使用本地静态资源
- `hexo generate` 可通过

## 禁止

- 未读取 `AI_README.md` 就直接写文
- 直接写入 `source/_posts/`
- 自行发明大量新分类或新标签
- 使用外链失效图片
- 修改 `.deploy_git/` 或 `public/` 伪造结果
