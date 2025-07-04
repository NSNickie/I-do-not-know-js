# Chapter1: What's the Scope?

JS引擎用来组织和管理变量的底层机制是什么？JS是如何知道语句可以访问哪些变量的，以及它如何处理两个同名变量的？

这些问题的答案以称为范围（Scope）的明确定义的规则形式出现。

## About this book

我们的重点是JS语言中三大支柱的第一个：作用于系统及其**函数闭包**，以及**模块设计模式**的强大功能。

Our focus will be the first of three pillars in the JS language: the scope system and its function closures, as well as the power of the module design pattern.

在jS中，**<u>*闭包是指函数能够“记住”并访问它在定义时所处的作用域中的变量，即使该函数在另一个作用域中被调用。*</u>**

**<u>*模块是一种代码组织方式，它通过闭包让公共方法具有访问模块内部私有变量和函数的特权。*</u>**

## Compiled vs. Interpreted

***编译：代码编译是一组处理代码文本的步骤，将其转化为计算机可以理解的一系列指令。***

通常，整个源代码是一次性转化的，生成的指令被保存为输出（通常在一个文件中），可以在后续执行。

解释与编译相似，它将你的程序转换为机器可理解的指令。但处理模型是不同的：***与一次性编译整个程序不同，解释执行是逐行转换源代码；每一行或语句在立即处理下一行源代码之前都会被执行***。

![Code Compilation and Code Interpretation](https://github.com/getify/You-Dont-Know-JS/raw/2nd-ed/scope-closures/images/fig1.png)

这两种形式一般来说是互斥的，然而这个问题更微妙，因为解释执行实际上可以采取其他形式，而不是逐行处理源代码文本。

***现代的JS引擎在处理JS程序时实际上采用了多种编译和解释的变体。***

**<u>*结论：JS最准确的描述是编译语言。*</u>**

## Compiling Code

但是，JS是不是被编译的，这重要么？

***作用域主要在编译期间确定，因此理解编译和执行之间的关系是掌握作用域的关键。***

在传统的编译器理论中，一个程序通过编译器经历**三个基本阶段**：

1. **Tokenizing/Lexing**

   **词法分析/分词**：把代码变成一串有意义的“词（token）”。

2. **Parsing**

   **语法分析**：把这些token组成一棵**抽象语法树（AST）**，代表程序结构。

3. **Code Generation**

   **代码生成**：将一个AST转换为可执行代码，供计算机执行。

> [!NOTE]
>
> **JS引擎远比这三个阶段要复杂得多**。我们将重点关注程序的可观察行为，让JS引擎管理那些更深层次的系统级抽象。

JS引擎不像C++或Java那样能在运行前慢慢编译优化代码，它必须在代码要运行前的几微秒内就完成这些工作。为了在这种高压下还能保证性能，各大引擎使用了各种黑科技，比如：

- **JIT编译**：运行时发现热点再编译；
- **懒编译**：先不编译，等代码真的要跑再说；
- **热点重编译**：越跑越快，优化最常见路径。

### Required: Two Phases

我们首先可以观察到关于JS程序处理的重要事实是，**它至少发生两个阶段：*首先是解析/编译，然后是执行***。

这是一个可观察的事实，而不是理论或者观点。虽然JS规范并没有明确要求编译，但它要求的行为本质上只有在编译后执行的方法下才能实现。

**三个程序特征可以证明这一点：语法错误、早起错误和提升**

### Syntax Errors from the Start

考虑这个：

```javascript
var greeting = "Hello";

console.log(greeting);

greeting = ."Hi";
// SyntaxError: unexpected token .
```

> [!NOTE]
>
> 我试了一下，这是真的：Node直接报错了。

事实上，JS引擎在执行第一行和第二行之前，唯一知道第三行语法错误的方法是，JS引擎在执行第一行和第二行之前，唯一知道第三行语法错误的方法是，**JS引擎首先解析整个程序，然后再执行其中的任何部分**。

### Early Errors

考虑：

```javascript
console.log("Howdy");

saySomething("Hello","Hi");
// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context

function saySomething(greeting,greeting) {
    "use strict";
    console.log(greeting);
}
```

Howdy消息没有被打印，尽管它是一个格式正确的语句。

**<u>*唯一合理的解释是代码必须在任何执行发生之前首先被完全解析。*</u>**

### Hoisting

最后，考虑一下：

```javascript
function saySomething() {
    var greeting = "Hello";
    {
        greeting = "Howdy";  // error comes from here
        let greeting = "Hi";
        console.log(greeting);
    }
}

saySomething();
// ReferenceError: Cannot access 'greeting' before
// initialization
```

这里的referenceError是因为greeting=”howdy“过早地访问了greeting变量，这种冲突被称为**时间死区**（TDZ）。

你可能认为，greeting=”Howdy“应该是赋值给var greeting=”Hello“的那个变量。

但实际上，由于后面有一个let greeting=”hi“，这会创建一个块级作用域的新变量greeting，而这行赋值是在它 **初始化之前**使用它，因此触发ReferenceError。

***为什么会这样？***

推理过程：

- 在 `greeting="Howdy"`那一行，`let greeting`还没声明完（没初始化）
- 但JS引擎已经知道 **这个块里有个叫greeting的let声明**
- 也就是说，**引擎已经提前建立了作用域结构和变量映射**
- <u>***这必须是编译阶段完成的事情***</u>

**<u>*所以，JS一定是先解析（parse）+编译（compile），然后才执行*</u>**

### TDZ？

**在变量声明之前的那段时间里，虽然变量已经被“创建”，但不能访问，否则会抛出 `ReferenceError`，这段时间就叫TDZ。**

> [!NOTE]
>
> 可能你会认为这是因为let和const的声明不会被提升以解释刚刚的TDZ。但这并不准确。GPT的解释为：`let` 和 `const` **被 hoist 了**，但它们在实际执行声明语句之前处于 TDZ，无法访问。

### 所以到底是怎么回事？

所以JS在任何执行开始之前都会被解析。但这是否证明它是被编译的？

JS是不是先将代码转换为AST，然后通过解释AST中表示的操作来执行程序，而不先编译该程序？

**是的，这是可能的（理论可行）。但这又不太可能（实际不会这么做），因为这很低效。**

很难想象一个生产级的JS引擎会费尽心思地讲一个程序解析为AST，但不将该AST转换（编译）为引擎可以执行的最有效（二进制）表示。

**<u>*从精神和实践上看，引擎在处理JS程序时所做的事情更像是编译而不是其他。*</u>**

> [!NOTE]
>
> ChatGPT：**JS是先编译、后执行的语言，只不过编译过程在运行时自动快速完成。它与传统编译语言的差别只是：编译发生地很快、很隐蔽。**

## Compiler Speak

让我们关注JS引擎在编译程序时如何识别变量并确定作用域。

看：

```javascript
var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
];

function getStudentName(studentID) {
    for (let student of students) {
        if (student.id == studentID) {
            return student.name;
        }
    }
}

var nextStudent = getStudentName(73);

console.log(nextStudent);
// Suzy
```

Other than declarations, all occurrences of variables/identifiers in a program serve in **one of two "roles": either they're the target of an assignment or they're source of a value.**

引入变量在使用时的**两个角色：**

- **target：赋值目标（谁被赋值）**
- **source：取值来源（谁被读取）**

<u>你怎么知道一个变量是否是目标？检查是否有一个值被赋给它；如果有，那他就是一个目标。如果没有，那么这个变量就是一个源。</u>

**为了让JS引擎正确处理程序的变量，它必须首先将每个变量的出现标记为目标或源**。现在我们将深入探讨如何确定每个角色。

### Target

上面的代码有四个赋值操作。

1. **明显的赋值操作**

   ```javascript
   students = [ /*...*/ ]
   nextStudent = getStudentName(73)
   ```

2. **隐式的赋值操作一：for-of中的变量**

   ```javascript
   for (let student of students) { ... }
   ```

   - student是目标
   - students是来源

3. **隐式的赋值操作二：参数传递时的赋值**

   ```javascript
   getStudentName(73)
   ```

   studentId被赋值了73

4. **“最容易忽略”的赋值操作：函数声明**

   ```javascript
   function getStudentName(studentID) { ... }
   ```

   实际上这也看做是一个“赋值行为”，它在编译阶段就已经将getStudentName和其对应函数对象绑定起来了。

> [!NOTE]
>
> - 函数声明会被**提前hoist到作用域顶部**
> - 而且会在**编译阶段就建立绑定**，不像var那样只hoist声明不hoist值

### Sources

除了target，其他都是source。

| 变量引用语境                                             | 角色     | 说明                 |
| -------------------------------------------------------- | -------- | -------------------- |
| `students` in `for (let student of students)`            | ✅ source | 提供数组元素的来源   |
| `student`, `studentID` in `if (student.id == studentID)` | ✅ source | 读取值进行比较       |
| `student` in `return student.name`                       | ✅ source | 读取值并返回         |
| `getStudentName` in `getStudentName(73)`                 | ✅ source | 调用函数，查找绑定值 |
| `console`, `nextStudent` in `console.log(...)`           | ✅ source | 使用已有值进行输出   |

## Cheating: Runtime Scope Modifications

有两个作弊方法被禁止使用：

- **eval()**

  为什么危险？

  1. JS引擎在函数定义时就会为作用域分配内存结构，eval破坏了这一机制，强迫引擎重新解释当前作用域结构。
  2. 性能变差，代码变得不可预测，难以调试。
  3. 容易被滥用注入攻击

- **with()**

  其作用是扩展一个语句的作用域链。

  为什么危险？

  1. 作用域链变得不可预测
  2. 引擎很难优化这类代码，几乎所有的js引擎对with都优化无能
  3. 调试困难，代码可读性非常差

## Lexical Code

**Javascript的作用域是在编译阶段确定的。这种作用域规则就叫做词法作用域。**

**它完全由你写代码的位置决定——比如函数、代码块和变量声明彼此之间的嵌套关系。**

--It is controlled entirely by the placement of functions, blocks, and variable declarations, in relation to one another.

**当你引用一个变量，这个引用必须来自词法上能访问到的作用域。否则这个变量就叫做未声明变量。**

**注意，编译阶段并不会真正为作用域或变量分配内存，因为此时程序还没有开始执行。**

**换句话说，作用域虽然是在编译阶段识别的，但它们真正的创建和使用发生在运行时，每当代码进入一个作用域时，才会实际生成那个作用域。**

