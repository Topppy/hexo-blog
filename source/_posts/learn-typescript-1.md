---
title: learn-typescript-1
date: 2019-04-30 17:18:04
tags:
  - typescript
  - 类型注解
---

# typescript 学习笔记一： 类型

最近我新开了一个electron项目，考虑到可能会持续迭代，以及客户端线上bugfix是没有前端页面方便的，因此需要这个项目尽可能的是一个稳定可靠的项目，最终我决定采用typescript来约束开发者，短期会增加一些学习成本，长期来看维护成本是有所减少的。那么就从头学习一下typescript吧。

学习资源：

- [typescript 入门教程](https://ts.xcatliu.com/introduction/what-is-typescript.html)
- [typescript handbook（config部分）](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)

<!-- more -->

## 简单开始

全局安装ts，这个部分可以参考官方文档，typescript的文件后缀是 .ts, 相应的react的jsx文件的扩展名为 .tsx。 ts文件是需要编译成js 文件才能执行的，编译指令就是 tsc ，这个命令在你全局安装typescript的时候就安装好了。

### 编译

执行命令

```bash
tsc hello.ts
```

会生成js文件，ts在编译的时候就会进行检查，如果有错误，是不会编译成功的。

默认如果编译报错，仍旧会生成js文件，想要终止js生成，可以在`tsconfig.json`中配置 `noEmitOnError`。`tsconfig.json`就是ts的配置文件。

## 类型注解

### 原始数据类型

可以使用这些类型来定义变量的类型，这就是类型注解，表明的意义是，这个变量我期望是一个什么类型的，ts你帮我检查。

- boolean
- number
- string
- undefined
- void

例如：

```javascript
const name: string = 'Tom';
const age: number = 11;
const isMan: boolean = false;
const money: undefined = undefined;
const girlfriend: null = null;
function ouputName(): void {
  console.log('name:', name)
}
```

我们可以获取到的信息是：Tom是一个11岁的男生，没有钱也没有女朋友，执行outputName函数的时候没有返回。

需要特别注意的是 undefined 和 null 类型是说有类型的子类型，也就是说

```javascript
const u: undefined = undefined;
const n: null = null;

let name: string = undefined;
// or
let name: string = null;
// or
let name: string = u;
let name: string = n;

```

这样写是不会出问题的，但是如果把 void类型的变量赋值给name就会出问题。

### 任意类型 Any

Any类型允许通过赋值改变类型，它既可以注解 **属性** 也可以注解 **方法**。**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。**

```js
let anything:any = 1;

anything = 'Name';
anything.setName('Bob');
```

### 数组

两种方式定义。

- `let list: number[] = [1,2,4]`
- 第二种方式是使用数组泛型 Array<元素类型>， `let list:Array<number> = [1,2,4]`


### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

```js
let num = 1;
// num 被推断为number
num = 'str'
// 报错
```

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查。

```js
let anything;
// 被推断为any 类型
anything = 'name';
anything = 1;
// 没有问题
```

### 多个类型怎么办？联合类型

如果我有一个值 他就是可能又多种类型的值，那么我可以采用 **联合类型** ,就是同时注解多个类型，使用 `|` 分隔。
需注意的一点：当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候， **只能访问此联合类型的所有类型里共有的属性或方法**。 如果TS腿断出来了类型，那么就不会编译报错。

### 元组Tuple

如果数据的元素的类型不同，并已知元素数量，可以使用元组定义。

```js
let tmp: [string, number] = ['name', 12]

// 如果访问越界元素，也就是没有定义类型的元素，那么按照联合类型推断
tmp[2] = 'Jack'
// ok 联合类型(string|number)
tmp[3] = true
// wrong, boolean 不是联合类型(string|number)之一。
```

### object

除number string boolean sumblo null undefined 之外的非原始类型。

### 类型断言

类似类型转换，但是不进行检查。语法两种：

```ts
let some: any = 'str'
// 1 <>
let len: number = (<string>some).length
// 2 as
let len2: number= (some as string).length
```