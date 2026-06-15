# 博客写作 Skills

这里保留最小版本。

目标只有一个：

- 让 AI 在任意 clone 下来的博客仓库里，按当前项目规则写出一篇可交付草稿

最小结构如下：

```text
skills/
  README.md
  blog-writing/
    CONFIG.json
    SKILL.md
    CONFIG.example.json
```

设计原则：

- 文章规则不重复写，统一直接读取项目根目录的 `AI_README.md`
- Skill 只负责流程，不重复维护规则细节
- 仓库根目录和默认命令通过配置提供，不要求用户每次重复输入
- 默认且统一产出到草稿目录，而不是正式文章目录

## 配置如何生效

生效顺序如下：

1. `skills/blog-writing/CONFIG.json`
2. `skills/blog-writing/CONFIG.example.json`
3. Skill 自己的默认推断

也就是说：

- `CONFIG.example.json` 只是模板
- 真正默认生效的是 `CONFIG.json`

## 推荐用法

平时把仓库自己的默认配置放在：

- `skills/blog-writing/CONFIG.json`

调用时不需要再手动传结构化参数。

用户只需要直接提出写作需求，例如：

- “写一篇关于并查集的算法博客”
- “整理一篇关于 Kruskal 和 Prim 区别的笔记”
- “写一篇博客总结这次博客仓库整理过程”

然后由 AI：

- 从配置里确定仓库根目录
- 从 `AI_README.md` 读取规则
- 自行推断标题、文章类型、分类、标签
- 统一保存到草稿目录

如果以后要扩展，也建议先在这套最小结构上加，而不是重新拆成很多层。
