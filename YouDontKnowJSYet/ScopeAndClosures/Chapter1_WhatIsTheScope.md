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