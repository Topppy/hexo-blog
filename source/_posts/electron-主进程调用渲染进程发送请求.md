---
title: electron 主进程调用渲染进程发送请求
tags: []
date: 2023-10-13 06:38:19
---

## 背景

1. 两个进程的cookie不共享，因此需要在渲染进程发送
2. 主进程通知渲染进程发送，并等待请求响应结果，再做下一步处理。

## 实现

由于IPC都是EventEmmiter模式的，因此我们需要用Promise包装一下 IPC的通知。 


### 主进程发送消息给渲染进程

单向通知，不关心接收方的响应

```js
/**
 * 主进程向渲染进程发送消息
 * @param channel 频道
 * @param msg 消息数据
 */

const sendToRenderer = (channel: string, msg: any) => {
// 封装webcontent的send方法
}
```

### 主进程发送消息给渲染进程，并等待渲染进程的响应

双向通信，等待响应数据好继续执行任务


```js
/**
 * 主进程向渲染进程发送消息，并等待渲染进程的响应
 * @param channel 频道
 * @param msg 消息
 * @return Pomise<any>
 */

export const callRenderer = (channel: string, msg: any) => new Promise((resolve, reject) => {
    const onData = (e: any, result: any) => {
      resolve(result)
    }

    const { sendChannel, dataChannel } = getIPCChannels(channel)

    // 监听渲染进程的响应
    ipcMain.once(dataChannel, onData)

    const mainWindow = BrowserWindow.getFocusedWindow()
    if (mainWindow && mainWindow.webContents) {
      // 发送消息
      mainWindow.webContents.send(sendChannel, msg)
    } else {
      // 取消监听
      ipcMain.removeListener(dataChannel, onData)
    }
  })
```

### 渲染进程响应主进程调用

与 callRenderer 配合使用


```js
/**
 * 响应Main进程调用并返回数据
 * @param channel 频道
 * @param callback 回调， (data:any) => Promise<any>
 */
export const answerMain = (
  channel: string,
  callback: (data: any) => Promise<any>
) => {
  const { sendChannel, dataChannel } = getIPCChannels(channel)
  const listener = async (event: any, data: any) => {
    try {
      log.info('answerMain params:', data)
      const res = await callback(data)
      log.info('answerMain data', res)
      ipcRenderer.send(dataChannel, res)
    } catch (error) {
      log.info('answerMain error:')
      log.error(error)
      ipcRenderer.send(dataChannel, null)
    }
  }

  ipcRenderer.on(sendChannel, listener)
}
```


使用 case： 主进程调用渲染进程发送请求

```js
// main
const data: any = await callRenderer('api-report', deviceInfo)

// render
answerMain('api-report',  aync () => {
  await doSomething()
  return data
})
```


参考：https://github.com/sindresorhus/electron-better-ipc