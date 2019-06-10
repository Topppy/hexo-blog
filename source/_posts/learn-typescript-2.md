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

## 可索引类型接口

索引签名： 描述对象索引（属性名）的类型，和相应索引返回值（属性值）的类型。
什么意思呢，我们一般给对象定义类型接口的时候，是指定了索引具体是'name'还是'age'。如果我们不确定索引可能是什么的时候，有需要这样去描述一个对象/数组，它是可以索引的，所以可以是string或者number。

比如在没有枚举的情况下，通常会使用对象来实现一个key是字符，值为数字的字典。我们可以这样描述：

```js
interface NumberDictionary {
  [index: string]: number
}
```

也可以描述数组

```js
interface NumberArray {
  [index: number]: number
}
```

TypeScript支持两种索引签名：字符串和数字.
需要注意的是，当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。

```js
let a = ['a'];
a[0] === a['0'] // true
```

因此,在ts中，需要保证使用数字索引的返回值必须是字符串索引返回值类型的子类型。

```js
// 父类型
interface Dog {
  name: string
}

// 子类型
interface Puppy extends Dog {
  sound: string
}

// 正确
interface Animals {
  [index: number]: Puppy;
  [index: string]: Dog;
}

// 错误，数字索引类型Dog不能赋值给字符串索引类型Puppy
interface ErrorAnimals {
  [index: number]: Dog;
  [index: string]: Puppy;
}

```

## 类类型

类似于面向对象语言的接口的作用，描述一个类公共的部分应该符合什么结构。比如你可以描述类拥有什么属性，需要实现什么样的方法。

```js
interface Dog {
  name: string;
  // 描述bark方法
  bark(sound: string);
}

class Puppy implements Dog {
  name: 'Puppy'
  // 实现bark方法
  bark(sound) {
    console.log(sound)
  }
}
```

## 继承接口

从一个接口复制成员到另一个接口。可以继承多个接口。

```js
// 父类型
interface Dog {
  name: string
}

// 子类型
interface Puppy extends Dog {
  sound: string
}
```

## 混合类型

函数也是对象，那接口可以同时作为对象和函数使用。

## 接口继承类

todo