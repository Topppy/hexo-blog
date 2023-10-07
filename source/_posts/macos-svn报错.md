---
title: macos svn报错
tags: []
date: 2023-10-07 10:29:21
---

报错
```
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```
解决办法：安装xcode
```
xcode-select --install
```