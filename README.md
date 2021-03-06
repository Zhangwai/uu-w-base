# ๐ uu-w-base

w'first component libraryโจ

English | [็ฎไฝไธญๆ](./README.zh-CN.md)

## ๐ How to use?

Install component library

```
npm install uu-w-base -S
```

Download dependency

```
yarn |
npm install |
cnpm install |
```

Introduction component

```
import { Vertify } from 'uu-w-base'
```

## โจ Online preview

https://zhangwai.github.io/uu-w-base/

## ๐ Catalog Introduction

```
โโโ docs                   Component documentation
โ   โโโ index.md           Home page
โ   โโโ **.**              Site Directory Document
โโโ src                    Component home directory
โ   โโโ index.ts           Component registration
โ   โโโ Foo                Component development
โโโ .eslintrc.js           eslint config
โโโ .fatherrc.ts           father config
โโโ .umirc.ts              dumi config
โโโ tsconfig.json          typescript config
```

The rest of the documents can be consulted by yourself.

## ๐ค Command introduction

| Name                    | Description               | Remarks                                                                                                            |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm run start`         | Project begining          | Document usage [dumi](https://github.com/umijs/dumi), component development and documentation development together |
| `npm run test`          | Component test            | -                                                                                                                  |
| `npm run test:coverage` | Code coverage review      | -                                                                                                                  |
| `npm run prettier`      | Code prettier             | -                                                                                                                  |
| `npm run build`         | Component packaging       | Use [father](https://github.com/umijs/father)                                                                      |
| `npm run release`       | Component package release | -                                                                                                                  |
| `npm run docs:build`    | Document packaging        | -                                                                                                                  |
| `npm run docs:deploy`   | Document release          | The default is to use GitHub Pages                                                                                 |
| `npm run deploy`        | Document package release  | -                                                                                                                  |
