---
title: electron-starter-guide
date: 2019-06-06 16:54:50
tags:
  - electron
  - typescript
  - react
  - starter
---

# Electron 入门笔记

## Electron简介

这个框架可以让你使用js开发Mac，Windows，Linux客户端。基本上可以理解为一个你自己的浏览器，访问本地的页面；而超出浏览器的部分是，你可以使用node拥有的能力。

官方文档：https://electronjs.org/docs
中文资料集合：https://github.com/amhoho/electron-cn-docs

<!-- more -->

### demo

- 快速开始demo：https://github.com/electron/electron-quick-start
- 官方的APIdemo：https://github.com/electron/electron-api-demos
- 官方typescript的demo： https://github.com/electron/electron-quick-start-typescript

由于我最终选择的架构是ts+react，因此，可以参考这两个模板：

- electron的react模板： https://github.com/electron-react-boilerplate/electron-react-boilerplate
- electron的react + ts样例：https://github.com/electron-react-boilerplate/examples/tree/master/examples/typescript

## 基本知识

### 主进程和渲染进程

这是跟web开发最大的不同点，electron的入口文件的进程是主进程, 在主进程中，你可以像在node环境一样开发，操作本地文件，主进程可以创建渲染进程，渲染进程就是展示我们看到的UI页面的的，可以理解为我们浏览器页面，因此我们使用React写的组件啊实际上实在渲染进程中运行的。

