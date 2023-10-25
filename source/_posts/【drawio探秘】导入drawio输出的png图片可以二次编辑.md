---
title: 【drawio探秘】导入drawio输出的png图片可以二次编辑
tags: []
date: 2023-10-25 08:29:34
---

## 猜测思路：

1. drawio保存时：png图片中额外保存了xml格式的图表信息，
2. drawio导入自己导出的png图片的时候，解析xml数据并替换png绘制图表到工作区

在阅读到这篇文章后由了验证的方法

[[PNG文件格式详解](https://blog.mythsman.com/post/5d2d62b4a2005d74040ef7eb/)](https://blog.mythsman.com/post/5d2d62b4a2005d74040ef7eb/)

![image](https://user-images.githubusercontent.com/9689442/210044015-88cfbe05-92dd-4ace-8046-063bd266e43e.png)


首先使用工具[https://www.nayuki.io/page/png-file-chunk-inspector](https://www.nayuki.io/page/png-file-chunk-inspector) 解码分析png的数据

![image](https://user-images.githubusercontent.com/9689442/210044042-27dc98fb-b257-4a48-a39a-b157a8483df7.png)


可以看到文本信息数据块tEXt(textual data)内有xml数据，

我们复制出来Text string的值，经过decodeURIComponent处理后的到

![image](https://user-images.githubusercontent.com/9689442/210044054-21553522-e0a4-415b-abfc-820cd92fe8da.png)



这段应该就是drawio保存的图表信息

## 如何实现读取和写入

> 如果需要使用 nodejs 对指定区进行修改和提取，则可以利用 [[png-chunks-encode](https://www.npmjs.com/package/png-chunks-encode)](https://www.npmjs.com/package/png-chunks-encode)
 和 [[png-chunks-extract](https://www.npmjs.com/package/png-chunks-encode)](https://www.npmjs.com/package/png-chunks-encode)
> 

- 读取本地文件
- 提取tEXtchunk内容
- 修改并写入png
- 保存为png图片

## DEMO

[https://codesandbox.io/s/magicpng-y27un0](https://codesandbox.io/s/magicpng-y27un0?file=/src/App.js)

## 附录

xml在线format：[https://jsonformatter.org/xml-editor](https://jsonformatter.org/xml-editor)

pngchunk分析：[https://www.nayuki.io/page/png-file-chunk-inspector](https://www.nayuki.io/page/png-file-chunk-inspector)

pngcheck：

[[pngcheck Home Page](http://www.libpng.org/pub/png/apps/pngcheck.html)](http://www.libpng.org/pub/png/apps/pngcheck.html)

png文件格式详解：[https://blog.mythsman.com/post/5d2d62b4a2005d74040ef7eb/](https://blog.mythsman.com/post/5d2d62b4a2005d74040ef7eb/)
