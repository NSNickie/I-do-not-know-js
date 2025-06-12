# Chapter 4: Around the Global Scope

完全理解全局作用域对于掌握使用词法作用域来构建程序至关重要。

## Why Global Scope?

#### 背景

- JS 应用通常由多个文件组成，最终要**协同运行在同一个上下文中**。
- 这些文件之间需要一种机制来共享数据、调用方法。

------

#### ✅ 三种文件整合方式

1. **ES Modules（现代方式）**
   - 每个模块有独立作用域，通过 `import/export` 显式共享依赖。
   - 无需全局作用域协作。
   - 推荐使用。
2. **打包器（如 Webpack、Vite）**
   - 所有文件在构建阶段被合并成一个 JS 文件。
   - 通过闭包（例如 UMD）模拟应用级作用域。
   - 不污染全局作用域，但提供模块间互访的容器。
3. **传统 script 标签加载多个文件**
   - 每个 `.js` 文件都在**全局作用域中执行**。
   - 文件间的交互依赖 `window` 共享变量。
   - 易产生命名冲突，全局污染严重，不推荐。

------

#### ✅ Global Scope 的实际用途

- JavaScript 内建值都存在于全局作用域：
  - 例如：`undefined`, `NaN`, `Infinity`, `Object`, `Date`, `Math` 等。
- 浏览器/宿主环境提供的 API 也挂载在全局：
  - 例如：`console`, `setTimeout`, `document`, `navigator`, `window` 等。
- Node 环境下虽然有 `require`, `__dirname` 等全局使用的值，但它们**并不属于真正的 global scope**，是模块作用域注入的。

------

#### ❗ 总结观点

> 全局作用域不应被滥用，但它始终是 JS 应用中不可或缺的协作基础，尤其在非模块化或历史遗留代码中更为重要。

## Where Exactly is this Global Scope?

**全局作用域**位于文件的最外层部分，但事情没这么简单。不同的JS环境对作用域，特别是全局作用域的处理方式不同，JS开发者常常在没有意识到的情况下抱有误解。

### Browser “Window”

JS可以运行的最纯净环境是作为一个独立的.js文件，在浏览器的网页环境中加载。

比如：

```javascript
var studentName = "Kyle";

function hello() {
    console.log(`Hello, ${ studentName }!`);
}

hello();
// Hello, Kyle!
```

这段代码可以通过在网页环境中使用内联<script>标签，甚至是动态创建的script DOM元素来加载。在这三种情况下，studentName和hello标识符都在全局作用域中声明。

```javascript
var studentName = "Kyle";

function hello() {
    console.log(`Hello, ${ window.studentName }!`);
}

window.hello();
// Hello, Kyle!
```

这是JS规范中可预期的默认行为：外部作用域是全局作用域，studentName被合法地创建为全局变量。

这就是所谓***<u>纯粹</u>***。但不幸的是，这并不总是适用于你遇到的所有JS环境。

### Globals Shadowing Globals

在浏览器中，**全局变量（variable）** 和 **全局对象属性（如 `window.something`）** 虽然看起来一样，但它们**不是同一套机制**。

```
js


复制编辑
window.something = 42;   // 设置全局对象属性
let something = "Kyle";  // 声明全局变量（lexical binding）

console.log(something);        // "Kyle" - 来自作用域变量
console.log(window.something); // 42 - 来自全局对象属性
```

- `let something` 定义的是作用域中的变量（**不是** `window` 的属性）。
- 变量 `something` 会**遮蔽（shadow）** 了 `window.something`。
- 结果：即使两者名字相同，也无法互通。

------

### ❗ 风险与误区

- 在全局作用域中混用 `let/const` 和 `window.xxx` 会制造变量冲突和行为混淆。
- 容易导致开发者误判变量来源，增加维护成本。
- 极容易造成 bug，尤其是多人协作或大型项目中。

------

### ✅ 实用建议

> 在全局作用域下，应避免用 `let` / `const` 定义全局变量。

| 情况           | 推荐做法         | 原因                         |
| -------------- | ---------------- | ---------------------------- |
| 定义全局变量   | 使用 `var`       | 同时注册为 `window.xxx` 属性 |
| 局部作用域变量 | 使用 `let/const` | 避免污染全局，作用域清晰     |



示例：

```
js


复制编辑
// 正确：注册全局变量并可通过 window 访问
var globalVar = 123;
console.log(window.globalVar); // 123 ✅

// 错误：虽然定义了全局变量，但 window 无法访问
let globalLet = 456;
console.log(window.globalLet); // undefined ❌
```

------

### 🧠 总结一句话

> **避免在全局作用域中使用 `let/const` 定义变量**，因为它们不会成为全局对象属性，容易被误解和遮蔽，埋下潜在 bug。

### DOM Globals

之前说过浏览器托管的JS环境具有最纯粹的全局作用域行为，但并不尽然。

***<u>一个很让人惊讶的行为是：具有id属性的DOM元素会自动创建一个引用它的全局变量。</u>***

例如：

```html
<ul id="my-todo-list">
   <li id="first">Write a book</li>
   ..
</ul>
```

该页面的JS可能包括：

```javascript
first;
// <li id="first">..</li>

window["my-todo-list"];
// <ul id="my-todo-list">..</ul>
```

如果id值是一个有效的词法名称，例如first，则会创建词法变量。如果不是，访问该全局变量的唯一方法是通过全局对象（window[..]）。

这种id相关的DOM元素作为全局变量的自动注册是一个古老的浏览器行为，尽管如此必须保留它，因为许多老旧网站仍然依赖于此。建议永远不要使用全局变量，即使它们会始终被静默创建。