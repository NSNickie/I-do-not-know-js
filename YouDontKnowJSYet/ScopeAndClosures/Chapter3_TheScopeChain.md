# Chapter3: The Scope Chain

词法作用域（Lexical Scope），也叫**静态作用域**，是指**一个变量的作用域是在代码定义时就已经确定的，而不是在代码执行时才决定的**。

嵌套在其他作用域中的作用域之间的链接成为作用域链，它决定了可以反问变量的路径。该链是有向的，这意味着查找仅向上/向外的移动。

## Lookup Is (Mostly) Conceptual

在 JavaScript 中，“变量查找（lookup）”指的是运行时为了找到变量的声明位置而在嵌套的作用域链中逐层向上查找的过程。但实际上，这个查找过程**大多数情况下并不真的发生在运行时**。

由于 JS 使用 **词法作用域（Lexical Scope）**，即作用域在代码书写阶段就已经确定，所以在 **编译阶段**，JS 引擎就能分析出每个变量引用来自哪个作用域（可以类比为“给每个变量标颜色”），并把这些信息存储在 AST（抽象语法树）中。这样运行时就不需要再花时间去查找变量的来源，从而大幅优化性能。

但如果变量在当前文件中没有找到声明（比如它是从其他文件来的全局变量），那它的来源就必须等到运行时才能确定。这种变量在编译阶段被视为“无色弹珠”，一旦在运行时找到了对应声明，就“上色”，以后就不需要再次查找。

因此：

- **词法作用域让作用域静态化，从而支持了编译期优化。**
- **变量查找是 JS 引擎在编译时就尽可能解决的。**
- **运行时查找仅用于编译期无法确认的变量，且只需进行一次。**

## Shadowing 遮蔽

在JS中，**变量遮蔽**是指在内层作用域中声明了一个与外层作用域同名的变量，从而使得外层变量在内层作用域中“不可见”。

```javascript
var studentName = "Suzy"; // 全局变量

function printStudent(studentName) {
  studentName = studentName.toUpperCase();
  console.log(studentName);
}

```

上面中：

- 全局变量studentName是RED（1）
- 函数参数studentName是BLUE（2）
- 函数内部访问的都是BLUE（2），全局的RED（1）被遮蔽

JS的变量查找遵循 **词法作用域**规则，即： **从当前作用域向上查找，找到匹配的变量就停止。**

因此：

- **内部作用域声明的变量（shadowing variable）优先**，外层变量（shadowed variable）会被“遮蔽”
- 被遮蔽的变量**在该作用域及其所有内层作用域中都不可见**
- 即使函数内层继续嵌套作用域，也无法再访问全局的同名变量

**编译视角（弹珠隐喻）**：

- 每个变量在编译时会被标上“颜色”，表示它属于哪个作用域
- 被遮蔽的变量（比如全局的 RED(1)）在函数内部是“查不到的”，查找直接命中 BLUE(2)，不再继续向外
- 这有利于 JS 编译器进行优化：变量归属在**编译期**就已确定

**<u>*变量遮蔽 = 内部变量屏蔽了外部同名变量，是词法作用域的自然产物，也是编译优化的基础。*</u>**

## Global Unshadowing Trick

#### ⚠️ 注意：

**不是推荐实践，仅作了解！**

原理：

- 在浏览器中，全局作用域中通过 `var` 或 `function` 声明的变量，会自动挂载到 `window`（全局对象）上。
- 所以即使同名变量在函数作用域中被遮蔽，依然可以通过 `window.xxx` 访问到全局变量。

特点：

- `window.xxx` 是对全局变量的“另一种访问方式”，访问的是同一个值（不是副本）。
- 可以用来绕过shadowing，访问被遮蔽的全局变量。

### Illegal Shadowing

并不是所有的声明遮蔽组合都是合法的。let可以遮蔽var，但var不能遮蔽let。

```javascript
function something() {
    var special = "JavaScript";

    {
        let special = 42;   // totally fine shadowing

        // ..
    }
}

function another() {
    // ..

    {
        let special = "JavaScript";

        {
            var special = "JavaScript";
            // ^^^ Syntax Error

            // ..
        }
    }
}
```

注意，这个another的function，内层的var special声明是在试图声明一个函数作用域的special，实际上这个尝试的意图是没有错的，也就是说想达到这样的效果：

```javascript
function another(){
  var special="JavaScript"
  {
    let special="JavaScript"
  }
}
```

上面这段其实是没问题的，是合法而且允许的。

***但为什么抛出了SyntaxError错误？***

原话：**The real reason it's raised as a `SyntaxError` is because the `var` is basically trying to "cross the boundary" of (or hop over) the `let` declaration of the same name, which is not allowed.**

翻译：<u>var基本上试图 **越过** ***同名的*** let声明，这是不允许的</u>

但这种越界禁止会在函数边界处停止，所以以下情况不会引发异常：

```javascript
function another() {
    // ..

    {
        let special = "JavaScript";

        ajax("https://some.url",function callback(){
            // totally fine shadowing
            var special = "JavaScript";

            // ..
        });
    }
}
```

## Function Name Scope 函数名称作用域

1. **函数声明（Function Declaration）**

   ```
   js
   
   
   复制编辑
   function askQuestion() { }
   ```

   - 函数名 `askQuestion` 会被提升（hoist）到**外围作用域**（如全局或函数作用域）。
   - 这是最传统、最常见的函数定义方式。

2. **匿名函数表达式（Anonymous Function Expression）**

   ```
   js
   
   
   复制编辑
   var askQuestion = function() { };
   ```

   - 函数被赋值给变量 `askQuestion`；
   - 由于函数本身没有名字，函数作用域中也没有额外创建任何标识符。

3. **命名函数表达式（Named Function Expression, NFE）**

   ```
   js
   
   
   复制编辑
   var askQuestion = function ofTheTeacher() {
       console.log(ofTheTeacher); // ✅ 可用
   };
   console.log(ofTheTeacher); // ❌ ReferenceError
   ```

   - 函数名 `ofTheTeacher` **不会出现在外围作用域中**；
   - 它只在函数体内部**自身作用域中可用**；
   - 该名字是一个**只读绑定**，不可被修改。

------

### ⚠️ 注意点（重点）

- **作用域**：NFE 的名字只在函数体内部有效，函数外无法访问；
- **不可修改性**：在严格模式（`"use strict"`）下，尝试修改 NFE 名字会抛出 `TypeError`，因为该绑定是只读的（类似 `const`）。
- **提升行为不同**：函数声明会被提升（hoisting），而函数表达式（包括命名和匿名）不会。

## Arrow Functions

#### 基本语法特点

- 使用 `=>` 替代 `function`，语法更简洁。
- 参数只有一个时可以省略括号：`x => x + 1`
- 函数体只有一个表达式时可以省略 `{}` 和 `return`：`() => 42`
- 若返回对象字面量，必须加括号：`() => ({ id: 1 })`

#### 📌 this 绑定行为

- 箭头函数**不会创建自己的 `this`**，而是从**定义时的外层作用域捕获 `this`（lexical this）**。
- 不适合用作构造函数或带 `this` 的方法（如类的方法）。

#### 📌 作用域相关

- 箭头函数**和普通函数一样**会创建新的**词法作用域（Lexical Environment）**。
- 所以箭头函数内部的 `let` / `const` 声明不会“泄漏”到外部作用域。
- **箭头函数作用域 ≠ 更扁平**，这是常见误解。

#### 📌 命名行为

- 箭头函数本身是匿名的，但在变量赋值场景下会**推断出 name**（如 `const f = () => {}`，则 `f.name === "f"`）。
- 但这种推断名不等价于函数声明的命名绑定（如 `function foo() {}` 中的 `foo`）。

#### 📌 可读性问题

- 虽然语法更短，但对初学者来说，**各种省略形式反而增加了认知成本**。
- 简洁 ≠ 可读。对于复杂逻辑，更建议使用传统 `function` 声明，清晰明了。

#### ✅ 适用场景

- 回调函数：`arr.map(x => x * 2)`
- 简单表达式或函数组合
- 需要继承外层 `this` 的闭包逻辑

#### ❌ 不适用场景

- 需要 `this` 的函数（类方法、构造器）
- 多行逻辑复杂函数（语法上可写，但可读性差）

## Backing Out

当一个函数（声明或表达式）被定义时，会创建一个新的作用域。嵌套在彼此内部的作用域的位置形成了一个自然的作用域层次结构，称为作用域链。作用域链控制变量的访问，方向上朝向上方和外部。

每个新的作用域提供了一个干净的起点，一个存放自己变量集的空间。当在作用域链的不同层级中重复使用变量名时，会发生遮蔽，这会阻止从该点向内访问外部变量。

当我们从这些细节中退回时，下一章将重点转向所有 JS 程序都包含的主要作用域：全局作用域。