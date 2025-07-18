# Chapter 2: Illustrating Lexical Scope

本章将通过几个隐喻来说明作用域。这里的目标是思考程序是如何被JS引擎处理的。

## Marbles, and Buckets, and Bubbles... On My!

形象比喻：彩色弹珠与桶

***核心比喻***

- **变量=彩色弹珠**
- **作用域=彩色桶**
- 每个变量的颜色，取决于它声明时所处的作用域（即哪个作用域的桶装了这颗弹珠）

![Colored Scope Bubbles](https://github.com/getify/You-Dont-Know-JS/raw/2nd-ed/scope-closures/images/fig2.png)

**<u>规则总结</u>**

1. **作用域是嵌套的**
   - 全局作用域（红色）包含函数作用域（蓝色），函数作用域再包含块级作用域（绿色）
   - 内层作用域可以访问外层变量，反之不行
2. **变量在编译阶段就被“分桶”了**
   - JS引擎在编译时已经确定那个变量属于哪个作用域
   - 执行时变量查找不会从头搜索，而是直接查找对应的作用域链（提高性能）
3. **变量查找类似“查桶”**
   - 在当前作用域找不到变量，就沿着外层作用域继续查找，直到找到或报错
4. **非变量的属性不是弹珠**
   - 像student.id里的id是对象的属性，不属于作用域查找系统，不是“弹珠”

**<u>*注意事项*</u>**

- 参数虽然写在函数括号中，但我们可以临时把它看做函数作用域的变量
- 若内层作用域出现相同变量名，会“遮蔽”外层（称变量shadowing）
- 所有变量归属是编译时决定的，而不是运行时动态绑定

**<u>作用域就像嵌套的彩色桶，变脸是属于某个桶的彩色弹珠，查找变量就像沿着桶从内往外找相同颜色的弹珠。</u>**

## A Conversation Among Friends

1. *核心角色与职责*

   - **Engine（引擎）**

     负责整个程序从编译到执行的全过程

   - **Compiler（编译器）**

     负责代码的词法分析（分词），语法解析（生成AST）和生成可执行代码的阶段

   - **Scope Manager（作用域管理器）**

     维护当前作用域中所有声明的变量（标识符），负责变量查找和作用域规则的执行。

2. *编译与执行的两个阶段*

   **编译阶段**

   - Compiler遍历代码，遇到变量或函数声明，询问对应Scope Manager该变量是否已存在。
   - 如果变量不存在，则Scope Manager在当前作用域新建该变量的“槽”。
   - 编译时只处理声明，不执行赋值。

   **执行阶段**

   - Engine执行代码时，遇到变量使用或赋值，会向Scope Manager查询变量位置。
   - 变量先被初始化为undefined（对于var），然后执行赋值
   - 函数调用时，Engine会让Scope Manager创建新的函数作用域

3. 变量声明与赋值的区别（以var students=[...]为例）

   - **声明**（编译阶段）

     Compiler告诉Scope Manager创建students变量

   - **赋值**（执行阶段）

     Engine询问Scope Manager查找students变量，先初始化为undefined，再将数组引用赋值给它

4. 作用域管理的“对话模型”

   - Compiler 和 Scope Manager 的对话：
      “我发现了新变量/函数，需不需要新建？” → “不存在，创建它。”
   - Engine 和 Scope Manager 的对话：
      “我想使用/赋值这个变量，在哪里？” → “在这里，变量已声明。”

## Nested Scope

Javascript使用词法作用域机制，作用域可以任意嵌套。**当一个函数或块执行时，会创建一个对应的Scope Manager实例来管理变量**。

变量查找遵循“***<u>从当前作用域向外查找</u>***”的链式模型。如果某个变量在当前作用域找不到，就会沿着嵌套结构向外一层层查找，知道全局作用域或找不到为止。

在作用域开始时：

- function声明的变量会被初始化为对应函数体；
- var声明的变量被提升并初始化为undefined
- let，const生命的变量被提升但不初始化，处于暂时性死区（TDZ）。

## Lookup Failures

当一个变量查找失败（所有词法作用域中都没有找到声明）时，会出现ReferenceError。但是否抛出错误，以及错误的形式，取决于：

**变量用途+严格模式**：

| 模式       | 变量用途 | 结果                         |
| ---------- | -------- | ---------------------------- |
| 非严格模式 | `source` | ReferenceError               |
| 非严格模式 | `target` | 自动创建全局变量（非常危险） |
| 严格模式   | `source` | ReferenceError               |
| 严格模式   | `target` | ReferenceError               |

❓**“not defined” ≠ “undefined”**

- not defined：变量未声明（会抛错）
- undefined：变量已声明，但尚未赋值（合法值）

🧨 **typeof 的“误导”**

- typeof foo无论foo是否声明，都会返回“undefined”，开发者需要特别留意。

### Global...What!?

如果在非严格模式下对一个没有声明的目标变量进行赋值，会导致意外的全局变量被创建！这是非常糟糕而且危险的。这也是开启严格模式的好处之一。

**永远不要依赖意料之外的全局变量创建。总是使用严格模式，并且正式地声明你的变量**。由此如果你错误使用了一个没有声明的变量，你会获得一个很有用的ReferenceError。

### Building On Metaphors

可以看看这张图：

![Scope "Building"](https://github.com/getify/You-Dont-Know-JS/raw/2nd-ed/scope-closures/images/fig3.png)

这栋建筑相当于嵌套作用域集合。一楼代表现在在执行的作用域，顶楼代表全局作用域。

通过首先在当前楼层查找目标或源来解决问题，如果没找到，就坐电梯到下一层（外部作用域）。一旦到达顶层，要么找到，要么没有，但无论如何都必须停止。



