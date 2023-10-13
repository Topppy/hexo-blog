---
title: electron内页面nav卡住
tags: []
date: 2023-10-13 07:07:37
---

现象：
无法使用location的api刷新 or 替换页面url。

原因：
第三方页面使用了beforeunload事件，正常浏览器会弹窗用户确认，并阻塞直到用户完成操作。electron内默认没有弹窗，但是正常阻塞了，所以需要额外处理。

参考：https://github.com/mrdulin/blog/issues/38
