## 问题背景

在了解完javascript的this的问题之后，我在想为什么js有这么奇怪的设计。我想起来貌似js有一段不太平常的历史，于是我觉得去了解一下是有必要的。

## Javascript背景概要

### 1995 javascript诞生 （原名Mocha）

- 创造者：Brendan Eich，在Netscape（网景公司）工作
- 开发时间：**10天！**
- 初衷：为Netscape Navigator浏览器快速加上“网页脚本功能”
- 语言定位：面向网页开发的轻量脚本语言，类似于“***网页上的玩具***”，主要做按钮点击，表单验证这种简单任务。

### 1996年 微软跟风推出JScript

可以理解为为自己的浏览器单独加入了不同的实现，**导致了不同浏览器之间的兼容性地狱。**这也是为什么至今前端开发者都要面对浏览器兼容性问题，根源在这里。

### 1997年：ECMA标准化

### 2009年：Nodejs出现，JS进军后端

- Ryan Dahl发布了Nodejs，让JavaScript可以运行在服务器端。
- 这是JS从“网页脚本语言”晋升为“全栈开发语言”的关键时刻
- JS社区爆炸性成长

### 2015年：ES6（ECMAScript 2015）发布

**历史上最重要的升级之一！**

- let,const
- class
- arrow function
- Promise
- module
- Map, Set, Symbol

**可以说ES6才真正让JS变成了“现代语言”**

