---
title: spiral-matrix-js
date: 2016-09-01 20:03:23
tags:
  - 算法
  - spiral matrix
---

# 螺旋矩阵算法 js 实现

#### 前言

腾讯的一道笔试题，自己用 js 来实现下。

<!-- more -->

#### 题目

输入矩阵阶数 n ，生成螺旋矩阵，从左到右遍历每一行输出一个字符串。

eg：n=3，矩阵为

```
1 2 3
8 9 4
7 6 5

输出为：

1 2 3 8 9 4 7 6 5
```

#### 套路是这样的

一言不合就上图

{% asset_img spiral.png This is an example image %}

1. 先确定要循环多少圈，代码最外层的循环数目即圈数。
2. 把每一圈分割好，分成四个方向的步骤，然后确定每个方向的循环数量，重点是确定循环的终止条件点
3. 要是矩形的阶是奇数，那么矩形的中心点就是阶数的平方。
4. j 将生成的矩阵输出成一行

一言不合就上代码

```js
function spiral(n) {
  //异常处理
  if (!n || typeof n !== "number" || n < 1) {
    return;
  }
  //特殊情况 n === 1 直接输出
  if (n === 1) {
    console.log("1");
    return;
  }
  //a为结果数组，m为循环圈数
  var a = [],
    m = Math.floor(n / 2);
  //i、j分别为横向、纵向循环变量，k为圈数循环变量，base为当前打印数
  var i = 0,
    j = 0,
    k = 0,
    base = 1;
  //初始化二维数组
  for (var i = 0; i < n; i++) {
    a[i] = [];
  }
  //套路开始
  for (var k = 0; k < m; k++) {
    //向右，i++; i = k, j=k 将起点置为该圈的左上角；每圈的每个方向有n-2*k-1个数
    for (i = k, j = k; i < n - k - 1; i++) {
      a[i][j] = base++;
    }
    //向下，j++
    for (j = k; j < n - k - 1; j++) {
      a[i][j] = base++;
    }
    //向左，i--
    for (i = n - k - 1; i > k; i--) {
      a[i][j] = base++;
    }
    //向上，j--
    for (j = n - k - 1; j > k; j--) {
      a[i][j] = base++;
    }
    //若n为奇数，赋值中心点
    if (n % 2) {
      a[m][m] = n * n;
    }
  }
  //打印数组
  //console.log(a);
  //将数组一行输出
  var str = "";
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      str += a[j][i];
      if (i === n - 1 && j === n - 1) {
        break;
      }
      str += " ";
    }
  }
  console.log(str);
}
//测试
spiral(4);
```


