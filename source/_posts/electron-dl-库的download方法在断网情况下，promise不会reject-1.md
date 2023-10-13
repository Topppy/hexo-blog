---
title: electron-dl 库的download方法在断网情况下，promise不会reject
tags: []
date: 2023-10-13 06:40:18
---

这个问题是他们库的实现上缺少功能，目前只能自己再包一层promise，手动监听一下 downloadItem的updated事件，如果state是injected，就reject
 
```
item.on('updated', (event, state) => {
      if (state === 'interrupted') {
             reject(new Error('download failed'))
      }
})
```