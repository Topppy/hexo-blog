---
title: gitlab-runner-mac-win
date: 2019-06-12 15:18:13
tags:
  - gitlab
  - runner
  - mac
  - windows
  - ci/cd
---

# gitlab 配置 mac/win 系统 runner，win 有问题【解决】

gitlab 的 runner 就是触发 ci/cd 之后，执行 gitlab-ci.yml 里的脚本的容器。一般呢，都是 docker。我最近有个 electron 的项目，想做 cicd 的自动打包，需要 mac 和 win 环境，于是先把自己的电脑配置为 runner 跑一次。

<!-- more -->

## mac

### 安装 runner

- 下载

  ```bash
  sudo curl --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-darwin-amd64
  ```

- 给权限

  ```bash
   sudo chmod +x /usr/local/bin/gitlab-runner
  ```

- 安装和启动 runner 服务

  ```bash
   cd ~
   gitlab-runner install
   gitlab-runner start
  ```

- 检验安装结果
  
  ```bash
  gitlab-runner -h
  ```

### 注册

- 获取 tocken
  - 在项目的 Setting > CI/CD 页
    - Runners settings > Specific Runners
    - 获取 URL 和 tocken
      ![image](https://note.youdao.com/yws/api/personal/file/WEB8e12e879cab34af525fcf198740e0471?method=download&shareKey=f6e3fd5c4ec3aa196c28d2d0cb2caa0e)
- 执行注册命令

  ```
   gitlab-runner register
  ```

  ```bash
  ➜  gitlab-runner register
  Runtime platform                                    arch=amd64 os=darwin pid=68127 revision=ac2a293c version=11.11.2
  WARNING: Running in user-mode.
  WARNING: Use sudo for system-mode:
  WARNING: $ sudo gitlab-runner...

  Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):
  # 输入获取的URL

  Please enter the gitlab-ci token for this runner:
  # 输入tocken

  Please enter the gitlab-ci description for this runner:
  [hostname]: my-runner

  Please enter the gitlab-ci tags for this runner (comma separated):
  mac

  Registering runner... succeeded                     runner=6sbhZbPi

  Registering runner... succeeded                     runner=6sbhZbPi

  Please enter the executor: docker, parallels, shell, docker-ssh+machine, kubernetes, docker-ssh, ssh, virtualbox, docker+machine:
  shell

  Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
  ```

- 进入项目的 Setting > CI/CD 页查看新注册的 runner
  - Runners settings > Specific Runners

### 使用这个 runner

### 参考

- https://docs.gitlab.com/runner/install/osx.html
- https://docs.gitlab.com/runner/register/index.html
- https://qii404.me/2018/06/21/gitlab-runner.html

## win

### 安装

- 创建一个文件夹，eg: C:\GitLab-Runner
- 下载二进制安装包（x86/amd64），（我用的 x86）放到我们创建的文件夹里，重命名二进制包为 gitlab-runner.exe

### 注册 runner

- 开一个 powershell 右键以管理员运行
- 进入刚刚创建的文件夹路径
- 执行注册命令,

  ```bash
  .\gitlab-runner.exe register

  ```

  跟 mac 下的 runner 注册流程一致，输入 gitlab 项目里的网址 URL 和 tocken，选择 executor 为 shell，tag 为 windows

### 安装 runner 服务并启动

- 执行

  ```bash
  .\gitlab-runner.exe install
  .\gitlab-runner.exe start
  ```

### 参考

- https://docs.gitlab.com/runner/install/windows.html
- https://my.oschina.net/u/3756690/blog/1839652
- 中文乱码，https://scfido.github.io/2018/07/11/GitLab-CI%E4%B8%AD%E6%96%87%E4%B9%B1%E7%A0%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html
- https://www.cnblogs.com/newP/p/5735366.html#_Toc458009356

### 问题

#### gitlab 报错乱码

参考中文乱码的解决方案，无效；另一个方案为改系统语言为英文，重启依旧有乱码。

#### gitlab 执行 git 报错乱码

执行 shell 为 powershell，报错信息看起来 git'clone 没有成功；但是环境变量已经配置好了。重启电脑之后好了。

### DEBUG_PROD=true yarn package 报错

![image](https://note.youdao.com/yws/api/personal/file/WEBd64bf2d2205c2cc6921f9146b86e3c1e?method=download&shareKey=3c5e8a856839fc8b03a359875be9bf67)

原因为，在 windows 中的执行环境为 powershell，设置 node 临时环境变量的语法跟 linux 系统不一样。

改为

```bash
$env:DEBUG_PROD=true; yarn package
```
