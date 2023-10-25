---
title: typescript的eslint自定义rule：校验type类型注释
tags: []
date: 2023-10-25 08:28:16
---

## 背景
dts文件or 一些ts的types声明缺少注释的情况下，不仅可读性差，也无法体验到vscode智能提示的优势。


考虑自己写一个eslint rule，大概思路是解析AST的一些节点前面没有comments就报错,。

具体执行步骤是先看看官方的eslint（ts的）开发文档，看一下别的comments相关的rules是怎么写的，有了基础的了解之后，评估是否有可行的方案，并设计方案 & 写代码实现。

## 学习准备

eslint插件开发文档：https://eslint.org/docs/latest/developer-guide/working-with-rules#contextoptions
typescript-eslint插件开发文档：https://typescript-eslint.io/docs/development/custom-rules
typescript的AST playground：https://typescript-eslint.io/play/#ts=4.7.2&sourceType=module&showAST=ts

## 开发项目

https://github.com/Topppy/require-dts-comment

