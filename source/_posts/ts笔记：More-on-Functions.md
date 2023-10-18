---
title: ts笔记：More on Functions
tags: []
date: 2023-10-18 06:28:00
---

> https://www.typescriptlang.org/docs/handbook/2/functions.html

## 函数声明

两种：
1. 箭头函数式
```
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
```

2. 对象式
```
type DescribableFunction = {
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log( fn(6));
}
```
这种允许声明函数属性:
```
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```
允许重载声明
```
type DescribableFunction = {
  (someArg: number): boolean;
  (someArg: string): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log( fn(6));
}
```
允许声明构造函数
```
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```
那么既支持new操作符也支持直接调用的函数，可以利用重载+new声明：
```
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```




## 泛型
为了解决支持不同类型参数的通用函数的声明问题。我们声明一个类型的变量：泛型，用来指代未知的类型。可以理解为一元一次数学方程中的x变量： 2x+1=5， 只要x能满足函数方程就可以，x可以是任何类型。

```
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```
> 上例中，泛型Type的具体类型是ts推断出来的，我们没有明确的手动告诉ts。

也可以约束泛型坍塌为具有某些特性的类型。
```
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
```
更严谨的可以手动指定类型（有时候ts没那么“聪明”可以自己推断出正确的类型）

```
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```



## 泛型的实践指南

#### 类型参数下移(泛型尽可能下沉到类型的叶子结点， 别太“泛”了)

```
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
 
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
 
// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```
这里 第二种写法跟any一样，泛型白用

#### 尽可能减少泛型的数量（能用一个 就不要用两个0

```
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
 
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
```

这里Func就是一个没啥用的泛型

#### 泛型变量应该出现2次（如果这个变量不会用到第二次，那为啥要声明这个泛型呢？）

反例：Str 不如直接用string
```
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
 
greet("world");
```







## 在函数中声明this

大部分时候ts通过推断来判断this指向谁，但是js里this的指向的判定规则还蛮复杂的，ts支持我们告诉他this应该是谁

```
const user = {
  id: 123,
 
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
// 这里我们声明，this的类型应该是User
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```
这种技巧非常适合在回调函数的类型声明中使用，

