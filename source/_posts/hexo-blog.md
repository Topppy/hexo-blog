---
title: hexo-blog
date: 2018-11-05 20:20:50
tags: 
  - hexo
  - blog
---


#### 起因

原本旧的blog是16年开始学习前端的时候搭建的，纯html，css，js写的静态页面，当时这样选择是想多给自己一些手写基础代码的机会来逐渐熟悉前端基础。时过进迁，目前写blog的需求已经回归到写作本身了，这样旧的blog页带来的写作成本，导致我经常性在印象笔记、有道云笔记甚至本地markdown编辑器来码字，并且积攒在本地，难以及时更新到git。综上所述，旧的blog不再适合当前的场景，因此决定迁移为hexo方式。

<!-- more -->

#### hexo

这部分，没什么难的，hexo官方文档非常简单明了，清晰易懂。

- 配置文章的静态资源路径为独立的，在主题设置中设置好
  `post_asset_folder: true`

#### next 主题
这个也是按照next官方文档一套走起，可以根据自己的需求，对主题定制。
```
git clone https://github.com/iissnan/hexo-theme-next themes/next
```

#### 增加about，tags路由，

```
hexo new page "about"

hexo new page "tags
```

#### readMore

在文章中想要截断的位置手动增加 
```
<!-- more -->
```

#### css js 404

[issue](https://github.com/iissnan/hexo-theme-next/issues/1214)

#### 添加themes到git保存

- 删除 `themes/next/.git`
- `git rm  --cached ./themes/next`
- `git add .`
- 提交到git

如果你需要[undo git rm](https://stackoverflow.com/questions/13698978/git-undoing-git-rm/13699072)

#### 旧的已有blog页面迁移

##### canvas pie
涉及到如何在hexo中写html、js

#### TODO

- issue的文字迁移
- 本地markdown迁移
- 其他云存储的笔记迁移 
