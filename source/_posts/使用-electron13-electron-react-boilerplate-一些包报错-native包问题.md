---
title: 使用 electron13 + electron-react-boilerplate 一些包报错+native包问题
tags: []
date: 2023-10-13 07:10:20
---


能run起来的最粗暴的方式就是
把nodeIntegration打开，把contextIsolation关掉。
```
const config: BrowserWindowConstructorOptions = {
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: preloadPath,
      enableRemoteModule: true,
    }
  }
```
如果装native包，务必在 app/release/下安装，并且要使用 npm 而不是yarn.

electron-react-boilerplate 使用的rebuild版本有问题，直接升级到最新版本。
未解决问题。 基于ffi-napi 多次调用win32的方法，QueryDisplayConfig，node进程会直接中断退出。
```
import log from 'electron-log'

const ffi = require('ffi-napi')
const ref = require('ref-napi') // 对接C++指针
const refStruct = require('ref-struct-napi') // 对接C++结构体
const refArray = require('ref-array-napi') // 对接C++数组

// 屏幕的四种模式

export const sdcApplay = 0x80 // 屏幕设置辅助参数

export enum DisplayMode {
  internal = 1, // 仅电脑屏
  clone = 2, // 复制
  extend = 4, // 扩展
  external = 8, // 仅第二屏幕
}

// 这两个结构体的内容太复杂，而且实际项目用不到，所以直接算一下结构体的大小填充个无用数据
const DISPLAYCONFIG_PATH_INFO = refStruct({
  unuse: refArray(ref.types.int, 72 / 4),
})
const DISPLAYCONFIG_MODE_INFO = refStruct({
  unuse: refArray(ref.types.int, 64 / 4),
})

const PathArrayType = refArray(ref.refType(DISPLAYCONFIG_PATH_INFO))
const ModeArrayType = refArray(ref.refType(DISPLAYCONFIG_MODE_INFO))

const libm = ffi.Library('user32', {
  SetDisplayConfig: ['long', ['int', 'pointer', 'int', 'pointer', 'int']],
  GetDisplayConfigBufferSizes: [
    'long',
    ['int', ref.refType(ref.types.int), ref.refType(ref.types.int)],
  ],
  QueryDisplayConfig: [
    'long',
    [
      'int',
      ref.refType(ref.types.int),
      PathArrayType,
      ref.refType(ref.types.int),
      ModeArrayType,
      ref.refType(ref.types.int),
    ],
  ],
})

export default {
  setDisplayMode: (mode: DisplayMode) => {
    log.info(
      '=====================================================================setDisplayMode',
      mode,
    )
    // eslint-disable-next-line no-bitwise
    const re = libm.SetDisplayConfig(0, null, 0, null, sdcApplay | mode)
    return re
  },
  getDisplayMode: () => {
    const requiredPaths = ref.alloc(ref.types.int)
    const requiredModes = ref.alloc(ref.types.int)
    // 获取QueryDisplayConfig的2-5参数，不用动
    const result2 = libm.GetDisplayConfigBufferSizes(
      2,
      requiredPaths,
      requiredModes,
    )
    log.info(result2, requiredPaths.deref(), requiredModes.deref())

    const PathArray = refArray(DISPLAYCONFIG_PATH_INFO, requiredPaths.deref())
    const ModeAyyay = refArray(DISPLAYCONFIG_MODE_INFO, requiredModes.deref())
    const paths = new PathArray()
    const modes = new ModeAyyay()

    // 查询结果存储在flags
    log.info('new flags')
    const flags1 = ref.alloc(ref.types.int)
    // 2到5参数没有用到，参数1是常量
    log.info('start get')
    libm.QueryDisplayConfig(
      4,
      requiredPaths,
      paths.ref(),
      requiredModes,
      modes.ref(),
      flags1,
    )
    // log.info('save re')
    // const re = flags1.deref()
    log.info(
      '=====================================================================getDisplayMode',
      flags1.deref(),
    )
    return flags1.deref()
  },
}

```
mac需要动态不引入win32的native包（会报错）
需要安装node-gyp构建环境（开发机 & 打包机）

> https://github.com/nodejs/node-gyp#on-windows
> python 3.9 安装 + 环境变量（要选给all users 安装）
>  npm config set python "C:\Programs\Python\Python39\python.exe"
> npm install windows-build-tools -g

卡住解决：https://www.jianshu.com/p/e2f12fab2b78
参考资料文档：

如何实现外界屏幕模式切换
https://blog.csdn.net/wangyunman/article/details/103080818
调用Windows API：SetDisplayConfig
调用displayswitch.exe 可以实现，但是会有一个切换的系统级UI变化，https://renenyffenegger.ch/notes/Windows/dirs/Windows/System32/DisplaySwitch_exe#:~:text=DisplaySwitch.exe%20can%20be%20used,the%20windows%2Bp%20keyboard%20shortcut.


在 Electron 下调用 Win32 API 的经历


node 如何执行 windows API
https://github.com/waitingsong/node-win32-api


外部函数接口 FFI —— 虚拟机中重要但不起眼的组件
https://zhuanlan.zhihu.com/p/32134367
node.js + Electron 调用 Windows API 踩坑日记
https://blog.csdn.net/qq_21487663/article/details/111099822
electron怎么调用windows的api？


问题：
1. electron 安装native包报错
2. win32-api没有这个方法


https://juejin.cn/post/6854573212341108749#heading-9

https://blog.csdn.net/YW_yang/article/details/117434122

https://blog.csdn.net/weixin_40450855/article/details/109318361?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link&utm_relevant_index=4

https://www.cnblogs.com/silenzio/p/11639960.html

锁版本， 统一 编译需要的C++版本，python版本