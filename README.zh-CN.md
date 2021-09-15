# 🌟 uu-w-base

w 的第一个组件库 ✨

[English](./README.md) | 简体中文

## 🚀 如何使用？

安装组件库

```
npm install uu-w-base -S
```

下载依赖

```
yarn |
npm install |
cnpm install |
```

引入

```
import { Vertify } from 'uu-w-base'
```

## ✨ 在线预览

https://zhangwai.github.io/uu-w-base/

## 📒 目录介绍

```
├── docs                   文档存放路径
│   ├── index.md           首页展示
│   └── **.**              网站目录文档
├── src                    组件主目录
│   ├── index.ts           组件注册
│   └── Foo                组件开发
├── .eslintrc.js           eslint 配置
├── .fatherrc.ts           father 配置
├── .umirc.ts              dumi 配置
└── tsconfig.json          typescript 配置
```

其余文件可自行查阅了解。

## 🤖 命令介绍

| 名称                    | 描述           | 备注                                                                 |
| ----------------------- | -------------- | -------------------------------------------------------------------- |
| `npm run start`         | 项目启动       | 使用 [dumi](https://github.com/umijs/dumi)，组件开发和文档开发在一起 |
| `npm run test`          | 组件测试       | -                                                                    |
| `npm run test:coverage` | 代码覆盖率查看 | -                                                                    |
| `npm run prettier`      | 代码美化       | -                                                                    |
| `npm run build`         | 组件打包       | 使用 [father](https://github.com/umijs/father) 工具                  |
| `npm run release`       | 组件打包发布   | -                                                                    |
| `npm run docs:build`    | 文档打包       | -                                                                    |
| `npm run docs:deploy`   | 文档发布       | 这里默认是使用了 GitHub Pages                                        |
| `npm run deploy`        | 文档打包发布   | -                                                                    |
