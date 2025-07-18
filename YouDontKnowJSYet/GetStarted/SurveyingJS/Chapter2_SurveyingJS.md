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

```javascript
var adult = true;

if (adult) {
    var myName = "Kyle";
    let age = 39;
    console.log("Shhh, this is a secret!");
}

console.log(myName);
// Kyle

console.log(age);
// Error!
```

**尝试在if语句外部访问age会导致错误，因为age的作用域被限制在if之内，而myName则没有。**

块级作用域对限制变量声明在我们程序中的广泛性非常有用，这有助于防止它们名称的意外重叠。

但是var仍然有用，因为它传达了“这个变量将在更广泛的范围内（整个函数）被看到”。在程序的任何部分，这两种生命形式都可以是合适的，具体取决于情况。

### Note

*<u>通常建议避免使用var，而选择let（或const），这主要是因为人们认为对var的作用域行为存在一些困惑，从JS的开始就是如此。作者认为这是过于限制的建议，最终也没有帮助。这是在假设你无法合理地学习和使用一个特性与其它特性结合。应当在适当的时候使用它们</u>*！



`const` 声明的变量并不是“不可变”的，它们只是**不能被重新赋值**。
 对于对象类型的值使用 `const` 是不太推荐的，因为这些对象的**内部值仍然可以被修改**，即使这个变量不能被重新赋值。

**但是chatgpt认为：在成熟团队中，只要共识清晰、文档到位，在对象和数组上使用 `const` 也是完全合理且常见的做法。关键是要理解它*限制的是变量绑定，而不是对象内容本身。***

## Functions

函数这个词在编程中有多种含义。例如，在函数式编程的世界中，“函数”有一个精确的数学定义，并暗示这一套严格的规则。

在JS中，我们应该考虑“函数”这个词的更广泛含义，即另一个相关术语：“过程”。**过程是一组可以被调用一次或多次的语句，可能会提供一些输入，并可能返回一个或多个输出**。

**在JS中，函数是可以被赋值和传递的值，这一点极为重要。实际上，JS函数是对象值类型的一种特殊类型。并不是所有语言都将函数视为值，但对于支持函数式编程模式的语言来说，这一点至关重要，正如JS所做的那样。**

函数有两种定义形式，**声明式和表达式**。作者没有特地指出这两者的优劣，而是概述了其区别：**<u>*标识符与函数值之间的关联的时机不同，前者是发生在代码的编译阶段，后者则是运行时*</u>**。chatGPT认为，现代团队通常偏好表达式，因为它**更可控，更安全，不容易被提升影响行为**。

## Comparisons

在程序中做出决策需要比较值以确定他们的身份和相互关系。JS有几种机制来实现值的比较。

### Equal...ish

出于易用性和历史原因，‘相等’的含义比表面上的精确匹配（exact identity）更复杂。**换句话说，我们必须意识到等式比较和等价比较之间的细微差别。**

“===”符号一定是严格，狭义而精确的吗？作者认为不完全是。当然大多数这样的比较都符合这种情况，比如：

```javascript
3 === 3.0;              // true
"yes" === "yes";        // true
null === null;          // true
false === false;        // true

42 === "42";            // false
"hello" === "Hello";    // false
true === 1;             // false
0 === null;             // false
"" === null;            // false
null === undefined;     // false
```

### Note

另一种描述“===”的相等比较方法是，“检查值和类型”。然而事情不仅仅如此。JS中的所有值比较都考虑被比较值的类型，而不仅仅是“===”运算符。**具体来说，“===”在比较中不允许任何类型转换（即“强制转换”），而其他JS比较则允许强制转换**。

但是“===”运算符确实有一些细微之处，许多JS开发者对此视而不见，这对他们是有害的。比如NaN和-0。考虑一下：

```javascript
NaN === NaN;            // false
0 === -0;               // true
```

这种现象可能令人困扰，因此最好避免使用“===”。可以使用Number.isNaN()来比较NaN，对于-0可以使用Object.is()，不会出问题。幽默地说，Object.is()x相当于四重等于“====”，真正严格的比较！

**当我们考虑对象值（非原始值）比较时，情况变得更加复杂**。考虑：

```javascript
[ 1, 2, 3 ] === [ 1, 2, 3 ];    // false
{ a: 42 } === { a: 42 }         // false
(x => x * 2) === (x => x * 2)   // false
```

发生了什么？

（这里的翻译有点烂，贴原文）

It may seem reasonable to assume that an equality check considers the nature or contents of the value; after all,  `42===42` considers the actual 42 value and compares it. But when it comes to objects, a content-aware comparison is generally referred to as "structural equality."

JS并不提供对象值的结构相等比较机制，仅提供引用身份比较。要进行结构相等比较，您需要自己实现检查。

但要小心，这比你想象的要复杂。*<u>例如，你如何判断两个函数是否“结构上等价”？即使将他们的源代码文本转换为字符串进行比较，也无法考虑闭包问题</u>*。**JS不提供结构相等比较，因为处理所有边缘情况几乎是不可行的！**

## Coercive Comparisons

- **类型强制是JS核心**

  类型强制指的是一种类型的值被转换为另一种类型的等价表示（在可能范围内）。这是JS的核心支柱，而不是一个可选功能，不能简单地避免使用

- **==和===的真正区别**

  <u>***==和===都会考虑比较值的类型。若类型一致，它们行为完全一样。但当类型不一致时，==会先进行类型转换，再做比较。***</u>

  ==并不是不考虑类型，而是先转换再比较，大多数困惑源于不了解这个规则。

- **如何避免误区？**

  了解==倾向于做“原始类型数字比较”，你就可以避免大多数坑。比如避免 `""==0` 或 `0==false`这种经典陷阱。

- **用===也没办法完全规避类型强制**

  比如<,>,<=,>=这些运算符也会在类型不同的时候进行强制转换。

## How We Organize in JS

在JS生态系统中，有两种主要的代码（数据和行为）组织模式被广泛使用：**类和模块**。这些模式并不是相互排斥的；许多程序可以并且确实同时使用这两种模式。

### Classes

类的定义：
A class in a program is a definition of a "type" of custom data structure that includes both data and behaviors that operate on that data. Classes define how such a data structure works, but classes are not themselves concrete values. To get a concrete value that you can use in the program, a class must be instantiated (with the `new` keyword) one or more times.

### Class Inheritance

传统“类导向”设计的另一个固有方面，尽管在JS中使用得较少，是“继承”和“多态”。

### The Rabbit Hole Deepens





