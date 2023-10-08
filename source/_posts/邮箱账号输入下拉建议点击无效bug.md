---
title: 邮箱账号输入下拉建议点击无效bug
tags: []
date: 2023-10-08 09:40:17
---

# 需求
邮箱账号输入下拉建议列表的item上有click事件，我们期望是邮箱账号input在blur的时候隐藏下拉。点击下拉的item，输入框内的值变为item的值。

## 问题 1，如果直接隐藏，就无法点击下拉元素。

因此网上一个常见的解决方案是在blur的回调中延时隐藏下拉。(侧面证明blur事件是先于click事件触发的)

## 问题2， 在延迟隐藏下拉的条件下，部分浏览器依旧不触发item的click事件

浏览器触发blur事件和click事件的顺序是，先blur，后click。可能某些浏览器不再触发blur之后的事件。

我们需要在触发blur前知道item被点击了。mousedown事件可以办到，为什么呢？

去这个[codepen](https://codepen.io/mudassir0909/pen/eIHqB)体验一下点击事件和blur事件的触发顺序；

- button mousedown is fired. 
- input blur is fired. 
- button mouseup is fired. 
- button click is fired. 

[参考](https://blog.csdn.net/ligang2585116/article/details/51764828)
