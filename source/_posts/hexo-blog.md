---
title: hexo-blog
date: 2018-11-05 20:20:50
tags:
  - hexo
  - blog
---

# hexo-blog 日志

#### 起因

原本旧的 blog 是 16 年开始学习前端的时候搭建的，纯 html，css，js 写的静态页面，当时这样选择是想多给自己一些手写基础代码的机会来逐渐熟悉前端基础。时过进迁，目前写 blog 的需求已经回归到写作本身了，这样旧的 blog 页带来的写作成本，导致我经常性在印象笔记、有道云笔记甚至本地 markdown 编辑器来码字，并且积攒在本地，难以及时更新到 git。综上所述，旧的 blog 不再适合当前的场景，因此决定迁移为 hexo 方式。

<!-- more -->

#### hexo

这部分，没什么难的，hexo 官方文档非常简单明了，清晰易懂。

- 配置文章的静态资源路径为独立的，在主题设置中设置好
  `post_asset_folder: true`

#### next 主题

这个也是按照 next 官方文档一套走起，可以根据自己的需求，对主题定制。

```bash
git clone https://github.com/iissnan/hexo-theme-next themes/next
```

#### 增加 about，tags 路由，

```bash
hexo new page "about"

hexo new page "tags
```

#### readMore

在文章中想要截断的位置手动增加

```bash
<!-- more -->
```

#### css js 404

[issue](https://github.com/iissnan/hexo-theme-next/issues/1214)

#### 添加 themes 到 git 保存

- 删除 `themes/next/.git`
- `git rm --cached ./themes/next`
- `git add .`
- 提交到 git

如果你需要[undo git rm](https://stackoverflow.com/questions/13698978/git-undoing-git-rm/13699072)

#### 旧的已有 blog 页面迁移

##### canvas pie

涉及如何加载script，我设置了`post_asset_folder: true`，因此会在posts文件夹下，新建post同名文件夹canvas-pie，并将pie.js放在这里，在post canvas-pie.md中

```html
<script src="pie.js" type="text/javascript"></script>
```

可以加载js，但是引发了另一个问题，`/posts/canvas-pie/pie.js`也被识别为一篇文章，乱码展示在首页，如何解决这个问题呢？
配置_config.yml

```yml
skip_render:
  - "**/*.js"
  - "*/*.js"
```

然后 hexo clean， hexo server 重新启动


#### TODO

- issue 的文字迁移
- 本地 markdown 迁移
- 其他云存储的笔记迁移
