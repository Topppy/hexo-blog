---
title: wx-mini-program-share
date: 2018-12-19 20:00:35
tags:
  - wx
  - 小程序
---

# 微信小程序右上角···转发

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html)

这个转发功能是页面独立的，什么意思，就是微信小程序每一个页面的右上角的转发功能都是需要你配置才会出现。如果你有3个页，每个页都需要转发功能，那么你每个页面都需要配置下。

<!-- more -->

配置转发功能很简单，只需要在Page中增加事件处理函数onShareAppMessage, 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮. onShareAppMessage需要 return 一个 Object，用于自定义转发内容，包括标题，页面路径，转发图片。

``` javascript

Page({
  // ...

  onShareAppMessage() {
    return {
      title: '转发标题',
      // default: 当前小程序名称
      path: '转发路径，必须是以 / 开头的完整路径',
      // default: 当前页面 path ，
      imageUrl: '自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。'
      // default: 使用默认截图, 这个截图实测在部分手机上会出现黑色背景
    }
  }

  // ...

})

```

