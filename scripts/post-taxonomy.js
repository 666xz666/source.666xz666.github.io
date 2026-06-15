const fs = require('fs');
const path = require('path');

const root = process.cwd();
const sourceDirs = [
  { type: 'post', dir: path.join(root, 'source', '_posts') },
  { type: 'draft', dir: path.join(root, 'source', '_drafts') },
];

function readMarkdownFiles(dirInfo) {
  if (!fs.existsSync(dirInfo.dir)) return [];
  return fs
    .readdirSync(dirInfo.dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => {
      const fullPath = path.join(dirInfo.dir, entry.name);
      const raw = fs.readFileSync(fullPath, 'utf8');
      return {
        type: dirInfo.type,
        file: entry.name,
        fullPath,
        ...parseFrontMatter(raw),
      };
    });
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontMatter = match ? match[1] : '';
  const lines = frontMatter.split(/\r?\n/);
  const data = {
    title: '',
    date: '',
    categories: [],
    tags: [],
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const keyMatch = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!keyMatch) continue;

    const key = keyMatch[1];
    const rest = keyMatch[2].trim();

    if (key === 'title' || key === 'date') {
      data[key] = unquote(rest);
      continue;
    }

    if (key === 'categories' || key === 'tags') {
      const values = [];

      if (rest.startsWith('[') && rest.endsWith(']')) {
        const inner = rest.slice(1, -1).trim();
        if (inner) {
          for (const item of inner.split(',')) {
            const value = unquote(item.trim());
            if (value) values.push(value);
          }
        }
      } else if (rest) {
        values.push(unquote(rest));
      } else {
        for (let j = i + 1; j < lines.length; j += 1) {
          const child = lines[j];
          if (/^\s*-\s+/.test(child)) {
            values.push(unquote(child.replace(/^\s*-\s+/, '').trim()));
            i = j;
            continue;
          }
          if (/^\s*$/.test(child)) {
            i = j;
            continue;
          }
          break;
        }
      }

      data[key] = values.filter(Boolean);
    }
  }

  return data;
}

function unquote(value) {
  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('"') && value.endsWith('"'))
  ) {
    return value.slice(1, -1).trim();
  }
  return value.trim();
}

function addCount(map, key) {
  if (!key) return;
  map.set(key, (map.get(key) || 0) + 1);
}

function sortCountEntries(map) {
  return [...map.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return String(a[0]).localeCompare(String(b[0]), 'zh-CN');
  });
}

function printSection(title, rows) {
  console.log(`\n${title}`);
  if (!rows.length) {
    console.log('(none)');
    return;
  }
  for (const row of rows) {
    console.log(row);
  }
}

const keyword = process.argv.slice(2).join(' ').trim().toLowerCase();
const articles = sourceDirs.flatMap(readMarkdownFiles);

const categoryPaths = new Map();
const categoryNodes = new Map();
const tags = new Map();

for (const article of articles) {
  if (article.categories.length) {
    addCount(categoryPaths, article.categories.join(' / '));
    for (const category of article.categories) addCount(categoryNodes, category);
  }
  for (const tag of article.tags) addCount(tags, tag);
}

const matchedArticles = keyword
  ? articles.filter((article) => {
      const corpus = [
        article.file,
        article.title,
        article.date,
        ...article.categories,
        ...article.tags,
      ]
        .join(' ')
        .toLowerCase();
      return corpus.includes(keyword);
    })
  : articles;

const postsCount = articles.filter((item) => item.type === 'post').length;
const draftsCount = articles.filter((item) => item.type === 'draft').length;

console.log(`Posts: ${postsCount} | Drafts: ${draftsCount}`);
if (keyword) {
  console.log(`Keyword: ${keyword}`);
}

printSection(
  'Category Paths',
  sortCountEntries(categoryPaths).map(([name, count]) => `${count}\t${name}`)
);

printSection(
  'Category Nodes',
  sortCountEntries(categoryNodes).map(([name, count]) => `${count}\t${name}`)
);

printSection(
  'Tags',
  sortCountEntries(tags).map(([name, count]) => `${count}\t${name}`)
);

printSection(
  keyword ? 'Matched Articles' : 'Articles',
  matchedArticles
    .sort((a, b) => String(b.date).localeCompare(String(a.date), 'zh-CN'))
    .map((article) => {
      const categoryText = article.categories.join(' / ') || '-';
      const tagText = article.tags.join(', ') || '-';
      return `[${article.type}] ${article.file} | ${article.title || '-'} | ${categoryText} | ${tagText}`;
    })
);
