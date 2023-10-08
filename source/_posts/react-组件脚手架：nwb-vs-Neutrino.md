---
title: react 组件脚手架：nwb vs Neutrino
tags: []
date: 2023-10-08 10:01:06
---

## nwb

- 2年没更新
- 构建结果只babel，不webpack
- 配置项少，开箱即用，灵活度低

## Neutrino

- React 官方推荐最新
- 配置多 & 灵活
- 构建结果走webpack


##  HaveDone

- Neutrino 默认production构建会单拆css文件出来
- css Module的配置需要改动（个人需要）
- 如何加postcssLoader, 
    ```reactComponents({
      style: {
        // 这个默认配置是 /\.module.css$/, 导致无法识别.css后缀的为css module文件
        modulesTest: /\.css$/,
        // 这个默认在production下开启，会拆分出单独的css文件，导致样式失效
        extract: false,
        loaders: [
          // Define loaders as objects. Note: loaders must be specified in reverse order.
          // ie: for the loaders below the actual execution order would be:
          // input file -> sass-loader -> postcss-loader -> css-loader -> style-loader/mini-css-extract-plugin
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                require('postcss-normalize')(),
              ],
            },
          },
        ],
      },
    }),
    ```
- 使用自定义eslint，建立自定义的eslintrc.js文件，并配置
    ```
    useEslintrc: true,
    ```
