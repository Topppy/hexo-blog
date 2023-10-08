---
title: react懒加载
tags: []
date: 2023-10-08 03:44:29
---

其实官方提供了非常简单的使用例子，配合suspense使用
```
const A = React.lazy(() => import( './a.js'));

...

return (
  <Suspense fallback={<Loader />}>
    <A/>
  </Suspense>
)
```

这样就可以实现懒加载A
如果我有很多组件需要懒加载，每个又很小只有几k，可以把他们打包到一个命名chunk中，比如async。
```
const A = React.lazy(() => import(/* webpackChunkName: "async" */ './a.js'));
const B = React.lazy(() => import(/* webpackChunkName: "async" */ './b.js'));

...

return (
  <Suspense fallback={<Loader />}>
    <A/>
    <B/>
  </Suspense>
)
```
如果我的组件B是需要用户点击交互之后才会加载，那么用户就会在一个loading的页面等待一段时间，但是实际上我可以在用户点击之前就主动去加载这个组件，这样用户用到的时候就可以直接看到B了

```
const A = React.lazy(() => import(/* webpackChunkName: "async" */ './a.js'));
const B = React.lazy(() => import(/* webpackChunkName: "async" */ './b.js'));

...

return (
  <Suspense fallback={<Loader />}>
    <A/>
    {BVisible ? (
       <B />
    ) : null}
  </Suspense>
)
```

参考：https://hackernoon.com/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d