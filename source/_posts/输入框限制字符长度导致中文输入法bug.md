---
title: 输入框限制字符长度导致中文输入法bug
tags: []
date: 2023-10-08 09:38:28
---

我在别的网站也遇到过这种现象，就是一个限制了比如10长度的input标签，假设我想输入“中文输入法”，才5个字符是啊，然而当我使用拼音> zhongwensh就再也无法输入下一个字符了。

我在使用react来写受控input组件也会出现这种现象，这显然不是我们想要的。那么如何才可以只让中文输入法最后空格确认中文的时候才判断字符长度是否符合要求呢？

那就是

不要用onchange方法！
不要用onchange方法！
不要用onchange方法！

用

input的maxlength属性！
input的maxlength属性！
input的maxlength属性！

直接在input的元素上设置maxlength=。10, 就可以实现限制长度的功能，并且不会干扰中文输入法的拼音字符长度