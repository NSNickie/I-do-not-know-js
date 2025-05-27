# Chapter2: Surveying JS

<u>*The best way to learn JS is to start writing JS.*</u>

我们将对语言的一些主要主题领域进行概述。我们的目标是更好地理解它，<u>*以便能够更自信地编写自己的程序*</u>。在你阅读本书的其余部分以及整个系列时，我们将以更详细的方式重新审视许多这些主题。

## Each File is a Program

几乎每个你使用的网站（网络应用程序）都由许多不同的JS文件组成（通常以.js文件扩展名结尾）。很容易将整个应用程序视为一个程序。但是JS并不是这样看的。

在Javascript中，每个独立的文件都是一个单独的程序。

**关键在于：某个JS文件报错，并不会中断整个页面的执行流程。**确保每个文件正常工作，并且在可能的情况下以尽可能优雅的方式处理其他文件中的故障是很重要的。

### Note

许多项目使用构建过程工具，最终将项目中的独立文件合并为一个文件，已交付给网页。当发生这种情况是，JavaScript将这个单一合并文件视为整个程序。

<u>***无论对于一个文件使用何种代码组织模式（和加载机制）（独立或模块），你仍然应该将每个文件视为自己的（微型）程序，这样它们可以与其他（微型）程序写作，以执行你整个应用程序的功能。***</u>

## Values

**程序中最基本的信息单位是值。值就是数据。他们是程序维护状态的方式，值在JS中有两种形式：原始值（primitive）和对象值（object）。**

作者提到了双引号，单引号和反引号的概念和区别，表示反引号应仅在需要插值的时候使用。

除了字符串、数字和布尔值，JS程序中还有两个其他原始值是null和undefined。最安全和最好的做法是仅适用undefined作为唯一的空值，尽管null看起来更具吸引力，因为它更短！

## Arrays And Objects

作者介绍了一下对象的概念，并表示数组是一种特殊类型的对象。

### Note

***函数与数组一样，是一种特殊类型（即子类型）的对象。***

```javascript
typeof 42;                  // "number"
typeof "abc";               // "string"
typeof true;                // "boolean"
typeof undefined;           // "undefined"
typeof null;                // "object" -- oops, bug!
typeof { "a": 1 };          // "object"
typeof [1,2,3];             // "object"
typeof function hello(){};  // "function"
```

## Declaring and Using Variables

**在JS程序中，值可以作为字面量出现，或者他们可以存储在变量中；可以将变量视为值的容器。**

let关键字与var有些不同，最明显的是let对变量的访问比var更有限。这被称为“块级作用域”，与常规或函数作用域相对。



