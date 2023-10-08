---
title: >-
  brew install graphviz 报错 The `brew link` step did not complete successfully
  The formula built, but is not symlinked into /usr/local Could not symlink
  include/graphviz /usr/local/include is not writable.
tags: []
date: 2023-10-08 09:05:26
---

权限问题, and没有include文件夹。
```
sudo mkdir include
sudo chown -R `whoami`:admin /usr/local/include
brew link graphviz
```