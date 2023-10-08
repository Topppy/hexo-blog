---
title: gitlabci在docker中执行yarn install 报错
tags: []
date: 2023-10-08 09:07:14
---

报错信息：
`chromedriver installation failed error with http(s) request: error: read econnreset`
有可能是wall的问题。试试替换yarn镜像源

```
yarn config set registry https://registry.npm.taobao.org
```

再试一次 ok了。
但是第二次之后就不行了。
怀疑是这个包有问题。于是删掉了这个包试一下。
https://github.com/yoowinsu/blog/issues/64