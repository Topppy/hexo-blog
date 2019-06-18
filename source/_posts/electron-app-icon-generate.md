---
title: electron-app-icon-generate
date: 2019-06-18 14:38:46
tags:
  - electron
  - mac
  - windows
  - icon
---

# electron客户端生成Mac和Win平台的App图标

mac的图标是需要.icns格式的，windows平台是.ico格式，这些格式，都可以通过命令行或者软件iConvert Icons生成。

<!-- more -->

## mac 图标

- 原材料，不同尺寸的png格式图片在一个文件夹内，这个需要UI来生产，尺寸从16x16到256x256。
- 文件夹重命名为icon.iconset
- 每个文件重命名为icon_16x16.png格式的名字
- 命令行打开到icon.iconset的上级目录，执行命令

    ```bash
    iconutil -c icns icon.iconset
    ```

    就会生成icns文件了。

## windows 图标，工具iConvert Icon

使用工具iConvert Icon，选择ico格式就可以。

- 下载安装iConvert Icon
- 打开 iConvert Icon，勾选ico选项
![image](https://note.youdao.com/yws/api/personal/file/WEBb85ffbc2e84f01fa6d4800b5c0474a82?method=download&shareKey=2d5063599f7ee1731b91ff6f9261beda)

- 把准备好的图片推到左边虚线方框内
- 保存生成的ico文件

## 遇到过的问题

mac在外接2k显示器上，使用列表模式显示图标，图标花掉，后来尝试丢掉1024和512大小的图标重新生成icns文件，好了。
