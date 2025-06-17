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

## Re-declaration

### 一、`var` 的行为

- `var` 声明会被**提升（hoisting）**到作用域顶部。

- 在同一作用域中多次 `var` 声明是**合法的**，但只有**第一次声明会生效**，后面的都是**无效的重复声明（no-op）**。

- 例：

  ```javascript
  js
  
  
  复制编辑
  var name = "Frank";
  var name;
  console.log(name); // "Frank"
  ```

### 二、`var` 声明 ≠ `= undefined`

- `var name;` **只是声明，不是赋值**，不会覆盖已有的值。

- 而 `var name = undefined;` 才是显式赋值，会覆盖原来的值。

- 例：

  ```javascript
  js
  
  
  复制编辑
  var name = "Frank";
  var name;
  console.log(name); // "Frank"
  
  var name = undefined;
  console.log(name); // undefined
  ```

### 三、函数声明与 `var` 的冲突

- 函数声明在提升时**优先级更高**，会覆盖 `var` 的 `undefined` 初始化。

- 后续的 `var` 声明不会改变其值，只有显式赋值才会改变。

- 例：

  ```javascript
  js
  
  
  复制编辑
  var greet;
  function greet() { console.log("Hello"); }
  var greet;
  console.log(typeof greet); // "function"
  var greet = "Hi";
  console.log(typeof greet); // "string"
  ```

### 四、`let` 和 `const` 的限制

- 在同一作用域中，`let` 和 `const` **不允许重复声明**，会抛出 SyntaxError。

- 与 `var` 冲突时，只要有 `let` 或 `const` 出现，也会报错。

- 例：

  ```javascript
  js
  
  
  复制编辑
  let name = "Frank";
  let name = "Suzy"; // ❌ SyntaxError
  
  var name = "Frank";
  let name = "Suzy"; // ❌ SyntaxError
  
  let name = "Frank";
  var name = "Suzy"; // ❌ SyntaxError
  ```

### 五、设计初衷与风格倾向

- `var` 允许重复声明，是 JS 早期设计的产物，但容易出错。
- `let`/`const` 被设计为更**严格和安全**，用于鼓励良好的编程习惯。
- 这是语言层面的一种“社会工程”，旨在**约束不严谨的代码写法**。

## Constants

### `const`

- 同样 **禁止重复声明**，但理由不同；

- 技术上必须禁止，因为 `const` 要求：

  - **声明时必须初始化**；
  - **之后不可重新赋值**；

- 所以任何重复声明都等同于“重新赋值”，因此直接报 SyntaxError；

  ```
  js
  
  
  复制编辑
  const name = "Frank";
  const name = "Suzy"; // ❌ SyntaxError
  ```

------

### 🔎 错误类型小贴士：

- `SyntaxError`：**编译阶段**抛出，代码无法运行；
- `TypeError`：**运行阶段**抛出，例如对 `const` 变量尝试赋新值时。