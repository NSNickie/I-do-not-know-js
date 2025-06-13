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