---
title: react-hooks-came-out
date: 2019-02-13 14:04:56
tags:
  - react
  - hooks
---

# React Hooks 终于进稳定版本了！

React 终于在16.8版本加入了期待已久的hooks特性。

## 什么是Hooks？
Hooks的功能就是复用逻辑，甚至复用包括state的逻辑。

以往我们如果有跟state有关的逻辑，只能写在class组件中，纠缠在各个生命周期里，并且无法复用，样版代码很多。

有了hooks，你不在需要这样做了，你可以直接在fuction组件里复用写好的跟state相关的逻辑，代码量大大减少。每一次这个组件function被执行的时候，hooks都会被执行，这大概是它最像“钩子”的点吧。

### 你需要立刻学会并使用hooks吗？

不需要。class组件不会被废弃，这个新特性对你的已有的业务代码毫无影响。也不需要使用hooks来重写你的旧代码。

### 使用hooks需要什么条件？

react和react-dom 的版本要在16.8.0以上。

### 如何规范hooks代码？

eslint插件：[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

### hooks可以完全替换class吗？

如果涉及到 getSnapshotBeforeUpdate()和componentDidCatch()的话，那么不可以。也就是说其他的情况完全可以替换掉。


## 使用Hooks

### 安装

```bash
yarn add react@^16.8.0 react-dom@^16.8.0
```

eslint 插件

```
yarn add eslint-plugin-react-hooks@next --dev
```

eslintrc配置需要增加如下：

```js
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error"
  }
}

```

### get start

更多hooks的说明和使用可以看一下这个简单的DEMO，包括基础的hooks和hooks的规则，以及一个todo的例子。

[DEMO](https://topppy.github.io/react-hook-tutorial/)



