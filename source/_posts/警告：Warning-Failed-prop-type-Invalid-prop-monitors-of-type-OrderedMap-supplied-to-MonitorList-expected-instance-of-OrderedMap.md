---
title: >-
  警告：Warning: Failed prop type: Invalid prop `monitors` of type `OrderedMap`
  supplied to `MonitorList`, expected instance of `OrderedMap`.
tags: []
date: 2023-10-08 06:01:55
---

最近在搞scratch-gui，遇到了这样一个warning，报警的是下面这行代码
```
 monitors: PropTypes.instanceOf(OrderedMap),
```
检查了下，monitors 确实是一个OrderedMap实例，构造函数和原型看起来跟a完全一样。
```
var  a = new OrderedMap()
// monitors.__proto__.constructor 和 a.__proto__.constructor 都是OrderedMap。。。
Object.getPrototypeOf(monitors) == Object.getPrototypeOf(a) 
// false

```
那么可能是什么原因呢？
他们俩的原型不是同一个引用。
然而OrderedMap又都是从immutable import的，按理说应该是同一个OrderedMap啊，
```
import {OrderedMap} from 'immutable';
```
除非，monitors构造的时候使用的不是项目的当前项目全局的immutable。它有一个闭包，是用了在自己的作用域内 的OrderedMap生成的。
于是去查找 生成monitors的代码的位置，发现使用的是 scratch-vm包的方法，那继续去看npm 包scratch-vm， 结果发现， scratch-vm的package.json依赖的immutable是 3.8.1版本，而依赖于 scratch-vm的scratch-gui 也同时依赖了immutable ，只不过版本不同是 3.8.2.

那么根据npm的规则，项目依赖a和b(v1)两个包，a也依赖了b(v2)，那么b的两个版本的代码都会被下载和使用，并且a依赖的b(v2)应当只在a自己的作用域内使用的，全局使用的是b(v1)的代码，这样就能解释报警的现象了。
在次基础上如何干掉这个warning呢？只要保持主项目依赖的b包和朱项目依赖的a依赖的b包版本一致。
改 scratch-gui的package.json

```
"immutable": "3.8.1",
```