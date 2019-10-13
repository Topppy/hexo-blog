---
title: electron-starter-guide
date: 2019-06-06 16:54:50
tags:
  - electron
  - react
  - starter
---

# Electron 入门笔记

## Electron简介

这个框架可以让你使用javascript开发Mac，Windows，Linux客户端。基本上可以理解为一个你自己的浏览器，访问本地的页面；而超出浏览器的部分是，你可以使用node拥有的能力。

### Runtime 运行时

Electron凭什么可以让js拥有开发客户端的能力？这就要从js的运行时说起，什么是运行时呢？

> Js runtime就是用来执行JavaScript代码用的，为其提供了一个运行时环境，提供解释/编译、自动内存管理（GC）、对象模型、核心库API等功能。

我们熟悉的两个运行时分别是浏览器和Node

#### 浏览器运行时

![image](https://note.youdao.com/yws/api/personal/file/WEB60e1ec058d34cc2a9828a6846695eb63?method=download&shareKey=66db5604d56f2602a7a431b5ed92b9e3)

前端开发最基本的就是运行在浏览器中的html、js，简单的提供可视化的UI和交互给用户，但是所有的一切，都是局限于浏览器内的，换句话说你最多只能做浏览器允许你做的事情，前端页面无法绕过浏览器直接在你的电脑里搞事情。而浏览器是一个沙盒环境。

#### Node 运行时



## 开始开发需要什么

### 文档
官方文档：https://electronjs.org/docs
中文资料集合：https://github.com/amhoho/electron-cn-docs
electron英文资料大集合： https://github.com/sindresorhus/awesome-electron

<!-- more -->

### demo

- 快速开始demo：https://github.com/electron/electron-quick-start
- 官方的APIdemo：https://github.com/electron/electron-api-demos
- 官方typescript的demo： https://github.com/electron/electron-quick-start-typescript

由于我最终选择的架构是ts+react，因此，可以参考这两个模板：

- electron的react模板： https://github.com/electron-react-boilerplate/electron-react-boilerplate
- electron的react + ts样例：https://github.com/electron-react-boilerplate/examples/tree/master/examples/typescript


### 主进程和渲染进程

这是跟web开发最大的不同点，electron的入口文件的进程是主进程, 在主进程中，你可以像在node环境一样开发，操作本地文件，主进程可以创建渲染进程，渲染进程就是展示我们看到的UI页面的的，可以理解为我们浏览器页面，因此我们使用React写的组件啊实际上实在渲染进程中运行的。

## 知识点



### 拦截electron渲染进程中网页的伪协议请求

我们知道在传统的ios和android的客户端hybrid开发中，是可以跟客户端约定伪协议进行单方向通信的。那么在electron中，如何做到这一点呢，可以让外部网页与electron主进程通信。那就要使用electron的protocol模块。在主进程中，注册协议

```js
// 拦截协议
protocol.registerHttpProtocol('gayhub', (request, callback) => {
  console.log('protocol url:', url)
  // 打开electron的默认render之类的
  mainWindow.loadURL(`file://${__dirname}/app.html`);
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```

这样我们在render进程渲染的网页如果有一个a标签

```html
<a href="gayhub://home">去往electron客户端的首页</a>
```

### 在electron外的浏览器使用deeplink唤起electron客户端

就比如我们在网页版的百度网盘，点击下载的时候，浏览器会弹窗提示要打开百度网盘的客户端吗？electron也可以实现这样的效果。
在主进程中，

```js
// 注册deeplink唤起
// https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args
app.setAsDefaultProtocolClient('gayhub')
```

如果使用的是electron-builder打包的情况，在package.json中增加，

```json
  "build": {
    // ...
    "protocols": {
      "name": "gayhub",
      "schemes": [
        "gayhub"
      ]
    }
  }
```

这样，安装了我们打包的App之后，我们在浏览器的地址栏中输入 `gayhub://`, 就会有弹窗询问是否打开本地的客户端。

### 在electron中使用devTools

既然electron这么像一个浏览器，那么我们能不能也像浏览器一样开启devTools呢？可以的。
参考[文档](https://electronjs.org/docs/tutorial/devtools-extension),使用 `electron-devtools-installer`

在app的ready事件回调中，安装devTool扩展程序，比如react，redux。

```js
// 扩展程序安装函数
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  // react 和 redux 扩展
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

// 主进程app ready事件
app.on('ready', async () => {
    if (
      // 仅在开发模式和debug生产模式安装扩展程序
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      // 同步安装扩展程序
      await installExtensions();
      // 注册快捷键
      globalShortcut.register('Alt+CommandOrControl+I', () => {
        // 跟Chrome一样 Command Option I 打开devtool
        BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
      });
      globalShortcut.register('CommandOrControl+R', () => {
         // 跟Chrome一样 Command R 刷新页面
        BrowserWindow.getFocusedWindow().webContents.reload();
      });
    }

    // ...
}
```

### 开启webview的devTools

electron是允许使用`<webview/>`标签来加载网页的，那么如果webview的网页出了问题，我们当然是想debug一下的。webview也可以使用devTools来debug，那么如何开启呢？很简单，只需要执行webview对象的openDevTool()方法就可以了。

```js
$('webview').openDevTools()
```

### webview如何安全执行nodeApi

ELectron给我们提供了使用Node的权限，同时也增加了风险，网页被攻击不仅可以影响浏览器的数据，也可以通过node访问文件系统shell等。官方处于安全性考虑，是不建议开启webview的nodeApi的访问权限的，但是我们可以通过preload给webview注入脚本，在脚本中我们可以暴露一些包装好的使用nodeApi的方法给webview使用。

```js
// 关闭node访问权限
nodeIntegration = false
// 不要开启上下文隔离，开启后webiew作用域无法访问preload定义的变量
contextIsolation = false
```

这样在preload的js中，我们可以这样来跟electron通信

```js
const { ipcRenderer, shell } = require('electron');

const EDK = {
  // 通过webview元素与render进程通信
  back() {
    ipcRenderer.sendToHost('history:back');
  },
  // 在默认浏览器中打开链接
  openInBrowser(url) {
    shell.openExternal(url);
  }
};

global.EDK = EDK;
```

### 打开客户端默认全屏显示和控制

#### 全屏显示

在`new BrowserWindow` 的时候，设置全屏参数
> fullscreen

```js
// 全屏打开
mainWindow = new BrowserWindow({
  width: 1024,
  height: 728,
  resizable: false,
  fullscreen: true,
})
```

注意到文档中还有另外一个参数
> simpleFullscreen

有什么区别呢？

- fullscreen 在 mac下是一般意义上的全屏，会新开一个mac的全屏窗口，没有dock，鼠标移动到顶部，系统的菜单栏会显示出来，同时带有绿色toggle全屏按钮的标题栏也会显示出来。
- simpleFullscreen在mac中表现，更类似于最大化，他是在当前的主窗口最大化，本屏幕窗口打开的app都还在这个窗口，dock是可见的，鼠标移动到顶部，系统的菜单栏会显示出来，但是没有标题栏。

对比之下，fullscreen是我们想要的效果

#### 禁止退出全屏

new BrowserWindow 有另一个参数
> fullscreenable
> 它的官方说明是： 窗口是否可以进入全屏状态. 在 macOS上, 最大化/缩放按钮是否可用 。

于是我在设置了fullscreen=true的条件下，设置fullscreenable为false。

结果： 窗口是禁止最大化toggle按钮了，但是打开也不是默认最大化的。这显然不是我需要的，看起来这两个参数同时设置有冲突。

##### 先全屏，再禁止最大化

```js
// 全屏打开
mainWindow = new BrowserWindow({
  width: 1024,
  height: 728,
  resizable: false,
  fullscreen: true,
})
// 禁用最大化/缩放按钮
mainWindow.setFullScreenable(false)
```

但是这个方案的缺点是，Mac系统有一个边框，上面有红色关闭按钮、绿色全屏toggle按钮，只不过点击绿色按钮没有反应。

##### 隐藏绿色按钮

new BrowserWindo参数
> frame

设置为false可以隐藏标题栏和窗口控制按钮。

```js
mainWindow = new BrowserWindow({
  width: 1024,
  height: 728,
  resizable: false,
  fullscreen: true,
  frame: false,
})
```

## 打包和发布

对我们前端来说，开发其实是相对来说最容易的一步，因为基本上还是在写js/nodejs。electron开发，最终是要发布一个安装包给用户，因此关键并且陌生的部分是如何正确的构建和发布。

对于构建，有三种方式可以选择
- electron-force
- electron-builder
- electron-package

