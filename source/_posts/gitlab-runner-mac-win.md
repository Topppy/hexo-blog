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

# gitlab配置mac/win系统runner，win有问题没解决

gitlab的runner就是触发ci/cd之后，执行gitlab-ci.yml里的脚本的容器。一般呢，都是docker。我最近有个electron的项目，想做cicd的自动打包，需要mac和win环境，于是先把自己的电脑配置为runner跑一次。

<!-- more -->


# mac
## 安装runner

- 下载
    ```
    sudo curl --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-darwin-amd64
    ```

- 给权限
    ```
     sudo chmod +x /usr/local/bin/gitlab-runner
    ```
- 安装和启动runner服务
    ```
     cd ~
     gitlab-runner install
     gitlab-runner start
    ```
- 检验安装结果
    ```
    gitlab-runner -h
    ```
## 注册

- 获取tocken
    - 在项目的Setting > CI/CD 页
        - Runners settings > Specific Runners
        - 获取URL和tocken
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
- 进入项目的Setting > CI/CD 页查看新注册的runner
    - Runners settings > Specific Runners
    

## 使用这个runner



## 参考
- https://docs.gitlab.com/runner/install/osx.html
- https://docs.gitlab.com/runner/register/index.html
- https://qii404.me/2018/06/21/gitlab-runner.html


# win
## 安装

- 创建一个文件夹，eg: C:\GitLab-Runner
- 下载二进制安装包（x86/amd64），（我用的x86）放到我们创建的文件夹里，重命名二进制包为 gitlab-runner.exe

## 注册runner
- 开一个powershell右键以管理员运行
- 进入刚刚创建的文件夹路径
- 执行注册命令,
    ```
    .\gitlab-runner.exe register
    
    ```
    跟mac下的runner注册流程一致，输入gitlab项目里的网址URL和tocken，选择executor为shell，tag为windows

## 安装runner服务并启动
- 执行
    ```
    .\gitlab-runner.exe install
    .\gitlab-runner.exe start
    ```
## 参考
- https://docs.gitlab.com/runner/install/windows.html
- https://my.oschina.net/u/3756690/blog/1839652
- 中文乱码，https://scfido.github.io/2018/07/11/GitLab-CI%E4%B8%AD%E6%96%87%E4%B9%B1%E7%A0%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html
- https://www.cnblogs.com/newP/p/5735366.html#_Toc458009356

## 问题
win runner的job显示执行成功，但是实际上并没有打包成功，输出信息还是有乱码。未解决。


查看问题job： https://gitlab.corp.youdao.com/icode/icodeDesktop/-/jobs/39083
### gitlab 报错乱码
参考中文乱码的解决方案，无效，该系统语言为英文

### gitlab 执行git报错乱码
执行shell为powershell
