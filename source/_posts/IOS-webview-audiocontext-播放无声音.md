---
title: IOS webview audiocontext 播放无声音
tags: []
date: 2023-10-27 06:12:15
---

背景：
1.  The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page, 由于IOS的特殊性，audioContext的初始state='suspended', 不会播放声音；必须通过用户交互的回调中ctx.resume()来解锁ctx才能播放。
2.  某iphone11+IOS14.7.1手机，在客户端播放声音的同时打开webview自动播放audioContext会没有声音，检测ctx.state = 'interrupted'，同时客户端的声音也没有正常播放。

debug：
1. 取消客户端声音播放调用，webview正常播放
2. 修改客户端策略  独占 => 混合, 客户端和webview都正常播放


一些AI答疑：
在iOS 11及以上版本的Webview中，AudioContext的创建和启动必须在用户手势的上下文中进行。这是因为iOS 11引入了一种安全机制，以防止Web应用程序在没有用户交互的情况下自动播放音频。如果你尝试在没有用户交互的情况下创建或启动AudioContext，则会出现The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.错误。

需要注意的是，iOS 11及以上版本的Webview中，AudioContext的限制不仅限于decodeAudioData方法，而是适用于所有涉及音频播放的API，包括HTMLMediaElement和Web Audio API等。因此，如果你的Web应用程序需要在iOS 11及以上版本的Webview中播放音频，你需要在用户手势的上下文中创建和启动AudioContext。

在iOS的Webview中，如果音频上下文（AudioContext）被中断，它的state属性会返回interrupted。音频上下文可能会被中断，例如当用户接收电话或者切换到其他应用程序时。在这种情况下，音频上下文会暂停，直到用户返回到Web应用程序并重新激活音频上下文。

在iOS的Webview中，如果使用solo策略播放音频，可能会导致AudioContext被中断，从而导致AudioContext.state返回interrupted。solo策略是指在播放音频时，将其他正在播放的音频暂停，以确保当前音频的播放效果最佳。在iOS的Webview中，如果使用solo策略播放音频，可能会导致其他正在播放的音频被暂停，从而导致音频硬件资源被占用，进而导致AudioContext无法正常工作，进而导致AudioContext.state返回interrupted。

在iOS中，音频播放有两种策略：独占策略和混合策略。

独占策略是指在播放音频时，将其他正在播放的音频暂停，以确保当前音频的播放效果最佳。这种策略适用于需要保证音频播放效果的场景，例如游戏、音乐播放器等。在iOS中，如果使用独占策略播放音频，可能会导致其他正在播放的音频被暂停，从而影响用户体验。

混合策略是指在播放音频时，将当前音频与其他正在播放的音频混合在一起播放。这种策略适用于需要同时播放多个音频的场景，例如语音聊天、多人游戏等。在iOS中，如果使用混合策略播放音频，可以同时播放多个音频，从而提高用户体验。

在iOS中，如果想要使用独占策略播放音频，你可以使用AVAudioSession类来设置音频会话的模式为AVAudioSessionCategoryPlayback，例如：
```
let session = AVAudioSession.sharedInstance()
try session.setCategory(.playback, mode: .default, options: [])
try session.setActive(true)
```
)
这个代码会将音频会话的模式设置为AVAudioSessionCategoryPlayback，从而使用独占策略播放音频。注意，这个代码只是示例，你需要根据你的具体情况进行修改。

如果想要使用混合策略播放音频，你可以使用AVAudioSession类来设置音频会话的模式为AVAudioSessionCategoryAmbient，例如：
```
let session = AVAudioSession.sharedInstance()
try session.setCategory(.ambient, mode: .default, options: [])
try session.setActive(true)
```
)
这个代码会将音频会话的模式设置为AVAudioSessionCategoryAmbient，从而使用混合策略播放音频。注意，这个代码只是示例，你需要根据你的具体情况进行修改。
一些相关参考：
https://forum.gamemaker.io/index.php?threads/html5-web-audio-context-issues-on-ios.86787/
https://github.com/WebAudio/web-audio-api/issues/2392