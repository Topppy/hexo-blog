---
title: 'ts笔记: Everyday Types'
tags: []
date: 2023-10-16 07:24:41
---

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

## 字面量类型推断

数字和字符串的字面量会被推断为 number 和string类型，所以常见的报错：
```
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);

> Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```
的解决方法
```
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```

## 类型断言

ts 不允许 ‘不可能’的类型断言。比如 
```
const x = "hello" as number;

> Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

这种情况下的解决方法就是断言2次，先转化为any/unknown， 再断言为其他类型
```
const a = (expr as any) as T;
```


## Type 和 Interface的区别

Type 创建后不可二次修改， Interface 始终可扩展编辑的
![image](https://user-images.githubusercontent.com/9689442/167623878-47bc3bcc-b4da-4eae-a749-29ebe6c7b591.png)





## 联合类型使用

type U= A｜B

如果使用的是A 跟B都有的属性，那么ts不会报错，
如果使用的是A或者 B 独有的属性，那么使用前需要先判断具体是哪一个类型，ts才不会报错。
```
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

https://jkchao.github.io/typescript-book-chinese/typings/discrominatedUnion.html#%E8%AF%A6%E7%BB%86%E7%9A%84%E6%A3%80%E6%9F%A5
## Null 和 Undefined

项目建议开启 strictNullChecks

如果你知道变量一定存在，则可以使用：非空断言操作符 
```
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```
