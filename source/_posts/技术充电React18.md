---
title: 技术充电React18
tags: []
date: 2023-10-13 07:11:37
---

## React18

[React 18 超全升级指南](https://juejin.cn/post/7078511027091931167)

- ReactDOM.render替换为createRoot，影响范围：第三方组件库。
- setState的同步异步breakChange
- useSyncExternalStore：订阅外部数据 & 解决tear问题
- 想深入理解的话：https://www.zhihu.com/question/502917860
- 什么是tear（撕裂）：https://github.com/reactwg/react-18/discussions/69，
- 简言之：在fiber的分块更新时域不连续性前提下，并发存在多源修改数据的可能性，等你第二次接着渲染的时候，数据可能被人改了，同一render内两块渲染的数据不一致。

[如何升级到react18](https://zhuanlan.zhihu.com/p/486902510)

- 关于strictMode的变化
- 不再支持IE

配合[React Conf 2021](https://www.youtube.com/watch?v=8dUpL8SCO1w)食用
[Concurrent React for Library Maintainers](https://github.com/reactwg/react-18/discussions/70)

hooks：
- [useEffect 与componentDidMount的差异](https://cooperhu.com/2020/09/03/useEffect-componentDidMount/)
- [useEfffect与useLayoutEffect的差异](https://zhuanlan.zhihu.com/p/348701319)
- [React Concurrent Mode三连：是什么/为什么/怎么做](https://zhuanlan.zhihu.com/p/275776067)
- [React 18 Concurrent 之 useDeferredValue <译>](https://zhuanlan.zhihu.com/p/425009300)

## 文章&工具

- 手势库 https://use-gesture.netlify.app/，移动端拖拽滚动等的手势的hook库，更新频繁文档demo完善。
- 常用hook库，https://ahooks.js.org/zh-CN，有非常多设计优秀的hook，可以看源码实现思路 or 自己练习实现一下。配套的blog文档含金量也很高，例如：[ahooks 函数处理规范（函数引用不变的原理）](https://github.com/alibaba/hooks/blob/master/docs/guide/blog/function.zh-CN.md)
- react测试库，目前支持react 18还在WIP
  - 组件，https://github.com/testing-library/react-testing-library
  - hook，https://github.com/testing-library/react-hooks-testing-library
- [去年D2的ppt资料](https://github.com/d2forum/16th)


## 感想
从新的hook可以窥探到，react的发展越来越不像一个 UI 库了，有了更复杂&难以理解的设计理念，甚至明明白白的告诉你：“哪些特性普通开发者不用关心，只需要使用react给你的一般API就可以，复杂的事情我们我们已经帮你处理好了”。

React的用户被分层了。一部分普通用户学会 how to use， 一部分库开发者要学会 why and how to make it right and fast。

不变的是react那个核心的设计思想（仅本人感受到的）：用技术抹平人的差异性，让更多的人可以低成本的 产出 高性能的结果。这或许是一种研发的工业化？

工人分化为：点点点机器的工人和研发机器的工人。