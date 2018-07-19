# react-ghpages-blog

[![Build Status](https://travis-ci.org/zowiegong/react-ghpages-blog.svg?branch=dev)](https://travis-ci.org/zowiegong/react-ghpages-blog)

灵感来源于 [vue-ghpages-blog](https://github.com/viko16/vue-ghpages-blog)

一个基于 GitHub Pages , 使用 GitHub API 的 Blog.

React + Redux + webpack

## Usage

```shell
git clone https://github.com/zowiegong/react-ghpages-blog.git

cd react-ghpages-blog

npm install
# or
yarn install
```

配置 `src/config.js`

```shell
npm run build
# or
yarn build
```

## Features

- 使用 GitHub API 无需后台
- 托管于 GitHub pages
- 无需本地生成静态页面
- 使用 Markdown 语法，由 GitHub 生成
- 根据目录分类
- LocalStorage 缓存
- 基于 Issues 的评论(基本功能)
- ~~Tag 标签~~
- ~~处理 GitHub API 请求限制~~

## License

MIT