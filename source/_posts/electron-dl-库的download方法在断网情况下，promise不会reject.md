---
title: electron-dl 库的download方法在断网情况下，promise不会reject
tags: []
date: 2023-10-09 06:16:41
---

这个问题是他们库的实现上缺少功能，目前只能自己再包一层promise，手动监听一下 downloadItem的updated事件，如果state是injected，就reject
 