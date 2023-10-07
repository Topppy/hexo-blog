---
title: webpack alias的vscode对应配置
tags: []
date: 2023-10-07 10:13:22
---

## 背景
webpack 配置了alias，这个优点是少写很多../../../的相对路径的代码。

## 问题
vscode 点击import的一个js文件的路径的时候，会跳转到对应文件并显示在编辑器里，配置了alias之后，vscode找不到例如`import a from ‘@/a’;`里面的路径 `@/a`。

## 解决办法
在根目录增加配置文件 `jsconfig.json`,增加如下配置

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

其中 paths里，跟你的webpack的alias配置一一对应。
