---
title: use-quicklink
date: 2019-02-12 20:11:18
tags:
  - prefetch
  - quicklink
  - 用户体验
---

# 使用quickLink来提升用户体验

## quickLink是什么

[quickLink](https://github.com/GoogleChromeLabs/quicklink)是谷歌实验室推出的一个库，这个库实现了在浏览器的空闲时间预先拉取页面内的链接，加速后序页面的加载速度的功能。

<!-- more -->

就是说，用了他们这个东西，可以提前拉取当前页面的链接，这些链接都是用户可能点击访问的，这样用户真正点击的时候，浏览器已经预先拉取了这个地址，速度就要比普通的加载要快。

### 什么时候让浏览器去拉取页面内的链接呢？

预先拉取链接能提升加载速度确实很好，但是这个行为也是需要耗费浏览器资源的，这里，有一个问题，什么时候去拉取。

#### 首先可以肯定的是，不能耽误当前页面的渲染和加载。

至少也要在我当前页完全渲染展示给用户，并且可以响应用户交互之后，再去干这些“锦上添花”的预拉取操作。聪明的你一定想到，在onload之后再去预拉取链接。如果链接很多，而此时，用户有了交互，当前页面内有动画等也要优先去响应，这时候怎么办？这就要注意下上文提到的关键点“在浏览器的空闲时间内”

#### 在浏览器空闲时间内预拉取

我如何知道浏览器什么时候处理完了交互动画等重要的事儿，空闲下来了呢？这就要提到一个浏览器的API，[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)，这个API实现的就是在浏览器空闲的时候，可以执行一些回调。

另一个问题，如果页面内的链接非常多，我都要一次性拉取么？页面底部的链接，用户可能根本不会去访问。这种情况可以参考我们经常使用的一种优化，滚动懒加载。也就是说，只有可能要用到的时候，才去预取链接。

### 检测视窗內的链接
quicklink使用[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)来实现这个功能.

这个API可以做什么呢？"如果两个元素发生的交集部分在N%左右，我需要做处理一些事情(执行回调)"，它接收一个回调函数，这个回调函数，会在满足条件的时候被执行，而条件就是目标元素（target）和设备视窗／其他指定的元素（root）的发生交集时。


## quickLink怎么用

### 安装

```bash
yarn add quicklink
```

### 用法

```js
import quicklink from "quicklink/dist/quicklink.mjs";
quicklink();
```
这是最简单的用法，当然quick也接收一些参数

#### API
主要的有这几个：

- el： 监测该元素进入视窗触发prefetch
- urls： 需要预取URL数组
- timeout：requestIdleCallback的回调有效期限
- priority： 预取请求的优先级，fetch() 或者<link rel=prefetch> 
......

更多使用例子见[官方git](https://github.com/GoogleChromeLabs/quicklink#recipes)

#### polyfill

这是一个实验性的库，并不是主流浏览器都支持的，它本身包含了一个小的requestIdleCallback的兼容，但是Intersection Observer API,就需要额外的手动添加polyfill

```bash
yarn install intersection-observer
```

```js
import 'intersection-observer';
import quicklink from 'quicklink/dist/quicklink.mjs';

```