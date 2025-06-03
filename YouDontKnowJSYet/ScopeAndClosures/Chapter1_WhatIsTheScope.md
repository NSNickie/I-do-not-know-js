# Chapter1: What's the Scope?

JS引擎用来组织和管理变量的底层机制是什么？JS是如何知道语句可以访问哪些变量的，以及它如何处理两个同名变量的？

这些问题的答案以称为范围（Scope）的明确定义的规则形式出现。

## About this book

我们的重点是JS语言中三大支柱的第一个：作用于系统及其函数闭包，以及模块设计模式的强大功能。

Our focus will be the first of three pillars in the JS language: the scope system and its function closures, as well as the power of the module design pattern.

在jS中，**<u>*闭包是指函数能够“记住”并访问它在定义时所处的作用域中的变量，即使该函数在另一个作用域中被调用。*</u>**

**<u>*模块是一种代码组织方式，它通过闭包让公共方法具有访问模块内部私有变量和函数的特权。*</u>**



