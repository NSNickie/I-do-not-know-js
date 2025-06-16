# Chapter5: The (Not So) Secret Lifecycle of Variables

## When Can I Use a Variable?

| 声明方式   | 提升？ | 作用域级别 | 提升后是否赋值？ |
| ---------- | ------ | ---------- | ---------------- |
| `var`      | ✅      | 函数作用域 | ❌（undefined）   |
| `function` | ✅      | 函数作用域 | ✅（函数体引用）  |
| `let`      | ✅      | 块作用域   | ❌（TDZ中，报错） |
| `const`    | ✅      | 块作用域   | ❌（TDZ中，报错） |



- 所有声明**都会**在作用域编译时注册（即提升），但行为不同。
- `function` 是唯一一个在作用域开始时**已经赋值完毕**的声明形式，所以能提前调用。
- `let` / `const` 提升了但“不可用”，从而构成了 TDZ。
- `var` 提升了但初值为 `undefined`。

## Hoisting: Declaration vs. Expression

#### ✅ 函数声明（Function Declaration）

```
js


复制编辑
function foo() { ... }
```

- **名称和函数体都会被提升**
- 在作用域开始阶段，**就已可用**
- 可以**在声明之前调用**

✅ 示例：

```
js


复制编辑
foo(); // ✅ 正常执行
function foo() {
    console.log("hello");
}
```

------

#### ❌ 函数表达式（Function Expression）

```
js


复制编辑
var foo = function() { ... };
```

- **变量名会被提升**（因为使用了 `var`）
- 但只会在作用域开始阶段初始化为 `undefined`
- **函数体赋值要等到运行时**
- 所以在赋值前调用会报错：`TypeError: foo is not a function`

❌ 示例：

```
js


复制编辑
foo(); // ❌ TypeError：foo 是 undefined，不是函数
var foo = function() {
    console.log("hello");
};
```

------

#### ⚠️ 错误类型区分

- `ReferenceError`: 变量根本没声明
- `TypeError`: 变量存在，但尝试以错误方式使用（如对 `undefined()` 调用）

```
js


复制编辑
console.log(a);     // undefined （var 声明，变量已提升）
a();                // ❌ TypeError: a is not a function
var a = function() {};
```

------

### ✅ 结论

| 对比点         | Function Declaration | Function Expression |
| -------------- | -------------------- | ------------------- |
| 是否会被提升？ | ✅ 是                 | ✅ 是（变量名）      |
| 是否可提前调用 | ✅ 可以               | ❌ 不行              |
| 初始值         | ✅ 函数本体           | ❌ undefined         |
| 错误类型       | 无                   | TypeError（非函数） |

## Variable Hoisting

看这段：

```javascript
greeting = "Hello!";
console.log(greeting);
// Hello!

var greeting = "Howdy!";
```

- 变量被提升
- 他会自动初始化为作用域顶部的值undefined

> [!NOTE]
>
> 但是不是应该避免所有的提升呢？

## Hoisting: Yet Another Metaphor

> **Hoisting 是编译阶段行为，而非运行阶段代码的“重排”。**

- JS 引擎在进入作用域前，会**在编译阶段**预先收集所有的变量声明（`var`）和函数声明（`function`）。
- 这一步叫作“注册标识符”：创建作用域记录时将它们放入作用域环境中。
- 执行阶段不会真的“把代码移动到顶部”。

| 声明类型            | 是否 Hoisting | 被赋初始值 | 初始值内容            |
| ------------------- | ------------- | ---------- | --------------------- |
| `function foo() {}` | ✅ 是          | ✅ 是       | 整个函数体            |
| `var foo`           | ✅ 是          | ✅ 是       | `undefined`           |
| `let` / `const`     | ❌ 否（有TDZ） | ❌ 否       | TDZ（暂时性死区）报错 |

