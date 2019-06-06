---
title: learn-typescript-2
date: 2019-05-06 15:12:31
tags:
  - typescript
  - 接口
  - interfaces
---

# typescript 学习笔记二： 接口

接口用来定义复杂的类型（比如对象，函数），描述复杂类型应该是一个什么样子的“鸭子”。可以简单理解为期望获得一个具有什么样类型的对象（当然不止对象类型）。

<!-- more -->

## 对象类型接口

有一个对象可能长这样,统计了一个学生的信息，其中名字和年龄是一定会有的，身高可能没有数据，并且姓名数据不可以修改，是只读的。可能还有其他未知的数据。

```js
{
  name: 'Bob'
  age: 12,
  height: 150,
  ffja8efhwfbfkwnsalkdfjpiw: true,
}
```

那么我如何来描述这样的要求呢？

```js
interface StudentInfo {
  readonly name: string;
  age: number;
  height?: number;
  [propName: string]: any;
}
```

`readonly`表示**只读**，`?`表示**可选属性**, 其他未知的属性，使用**索引签名**来约束，`[propName: string]: any;` 值不确定就写成any，确定就写成某一基础类型比如 `boolean`.

## 函数类型接口

用**调用签名**来描述，描述函数的**参数列表**和**返回值类型**, 是的不需要关注函数名字。

```js
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```
