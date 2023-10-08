---
title: 同地址，使用https和http交替请求跨域
tags: []
date: 2023-10-08 04:15:16
---

这是因为，重复写了两个同样的cookie。
参考[掘金](https://juejin.im/post/5c257ab0e51d4550442a66d9)。
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin#CORS_and_caching)

解决办法： 服务器改下配置，Vary：Origin。or 浏览器清除缓存cookie。