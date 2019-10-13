---
title: learn-typescript-3
date: 2019-06-12 15:23:32
tags:
  - typescript
  - 泛型
  - generics
---

## 泛型是什么

### 泛型解决什么问题

在ts中我们需要声明类型，之后在使用这个变量的时候要求一直是这个类型，如果我们不确定类型的时候，我们可以使用any，但是any并不能保证之后使用该变量的时候它依旧是同一个类型。这类适用于多种类型的声明的需求就是泛型要解决的。泛型使用一个变量来存储声明的类型，之后也都使用该变量指代的类型。

### 类型变量

类型变量有点像正则的\1, 捕获变量，代表上一个捕获的结果。

```js
function identity<T>(arg: T): T {
    return arg;
}
```

T就是一个类型变量，当我们给他一个具体的类型之后，T都代表该类型

```js
let output = identity<string>("myString");  // type of output will be 'string'
```

这里 T 为类型 string，或者利用**类型推论**

```js
let output = identity("myString");  // type of output will be 'string'
```

### 使用数组类型变量

假设我们知道 参数的类型是数组，但是数组的元素是什么都可以。在不声明是数组的情况下，直接使用length属性是会报错的。
所以我们必须声明是数组，但是我们不知道元是什么，这里就可以用类型变量来代替。

```js

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```

### 泛型函数 & 泛型接口


