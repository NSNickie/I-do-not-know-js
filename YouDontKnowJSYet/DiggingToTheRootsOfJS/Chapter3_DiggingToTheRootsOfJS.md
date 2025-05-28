# Chapter3: Digging to the Roots of JS

这一章会深入探讨一些关于编程语言的内容，这可能超出了你习惯思考的深度。

## Iteration

#### 迭代器模式：

- **作用**：提供一种统一的方式来逐个访问集合元素，而不暴露集合的内部结构。
- **使用场景**：适用于大量数据的逐步处理，比如数据库查询结果、文件流、长列表等。
- **典型方法**：
  - `next()`：返回一个对象 `{ value, done }`，其中：
    - `value`：当前项；
    - `done`：是否已到结尾（`true` 表示没有更多数据了）。
- **优势**：
  - 标准化数据访问方式；
  - 提高代码可读性与可维护性；
  - 支持惰性加载与逐步处理，节省内存；
- **ES6 标准迭代器协议**：
  - 一个对象若可被 `for...of` 使用，需实现 `[Symbol.iterator]()` 方法；
  - `[Symbol.iterator]()` 返回一个迭代器对象，需实现 `next()` 方法；
  - `next()` 返回 `{ value, done }` 格式的对象。

### Consuming Iterators

ES6包含了几种机制（语法和api）来标准化这些迭代器的使用：

- **for...of**循环
- **...**操作符

### Iterables

**<u>*迭代器协议在技术上是为了使用可迭代对象而定义的；可迭代对象是可以被迭代的值。*</u>**

ES6将基本数据结构/集合类型在JS中定义为可迭代对象，包括字符串，数组，映射，集合等。

作者介绍了以上几种对象的迭代方式。

**在大多数情况下，JS中的所有内置可迭代对象都有三种可用的迭代器形式：仅键（keys()），仅值(values())，条目(entries())。**

除了使用内置可迭代对象外，还可以确保自己跌数据结构遵循迭代协议；这样做意味着你可以使用for...of循环和...。

## Closure

*<u>**Closure is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.**</u>*

*<u>**闭包是指一个函数记住并继续访问起作用域外的变量，即使该函数在不同的作用域中执行。**</u>*

首先，闭包是函数本质的一部分。对象没有闭包，函数有。其次，要观察闭包，必须在与该函数最初定义的作用于不同的作用域中执行该函数。

```javascript
function greeting(msg) {
    return function who(name) {
        console.log(`${ msg }, ${ name }!`);
    };
}

var hello = greeting("Hello");
var howdy = greeting("Howdy");

hello("Kyle");
// Hello, Kyle!

hello("Sarah");
// Hello, Sarah!

howdy("Grant");
// Howdy, Grant!
```

GPT认为闭包的本质：
**函数可以访问它定义时所处作用域中的变量，即使这个函数被“带出”那个作用域也一样。**

闭包实现依赖JS的作用域链：
**当你定义一个函数时，JS引擎会把它的词法作用域上下文绑定到函数内部，并在后续调用中继续沿这条作用域链查找变量。**

GPT总结的闭包常见坑：

1. **闭包中的变量是共享的**

   ***<u>多个闭包访问的是同一份变量，不是复制</u>***：

   ```javascript
   function createFuncs() {
     const funcs = [];
     for (var i = 0; i < 3; i++) {
       funcs.push(() => console.log(i));
     }
     return funcs;
   }
   
   const fs = createFuncs();
   fs[0](); // 3
   fs[1](); // 3
   fs[2](); // 3
   
   ```

   可以用let而不是用var，就可以解决这个问题了。

GPT总结：
**闭包是JS函数的一种能力，能访问其外部函数作用域中的变量，即使外部函数早已返回。它是作用域链的实际应用，常用于封装、持久化变量等场景。**

## `This` keyword

JS最强大的机制之一也是最被误解的极致之一: this 关键字。一个常见的误解是，一个函数的 `this`指的是函数本身。由于 this 在其他语言中的工作方式，另一个误解是 this 指向方法所属的实例。**这两者都是不正确的**。

GPT总结：**this 代表当前执行上下文中调用者对象，即“谁调用了这个函数”**。

GPT总结：**this的五种典型绑定规则**：

1. 默认绑定
2. 隐式绑定
3. 显式绑定
4. new绑定
5. 箭头函数

具体可看此git项目的KnowAboutThis。



