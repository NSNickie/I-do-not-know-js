## How **this** work in Javascript???

OK, first let's ask get-4o.

### Ask: 详细给我介绍一下js中this的问题

1. **this**是什么？

   **this**是函数运行时自动生成的一个上下文**对象**，它的值取决于函数是怎么被调用的（调用方式决定this指向）

2. 四种常见的绑定规则（**重点**）

   - **默认绑定（独立调用）**

     ```javascript
     function foo() {
       console.log(this);
     }
     foo(); // 非严格模式下是 window，严格模式下是 undefined
     ```

     **结论：函数独立调用时，this指向全局对象（浏览器下是window）。**

<u>*ok，先停一下，什么是非严格模式，什么是严格模式？*</u>

### Ask: 首先，什么是非严格模式，什么是严格模式？

javascript默认有很多“宽松”的设计，比如this指向，变量可以没声明就使用等等。

为了让代码更安全，更规范，ES5引入了“use strict”模式。

**开启方法：**

```javascript
'use strict'
function foo(){
  //严格模式代码
}
```

或者放在文件顶部，整个文件都生效：

```javascript
'use strict'

function foo(){
  //严格模式代码
}
```

在非严格模式下，如果你直接调用一个函数，this会自动指向全局对象window。

在严格模式下，函数内味绑定的this是undefined，而不是自动绑到window。<u>这是为了防止无意识地污染全局对象。</u>

#### 为啥我要关心？

1. 在浏览器中直接调用函数，你以为this是undefined，其实它是window，容易出bug。
2. 严格模式更接近模块化的，现代的js写法，不推荐写没‘use strict’的代码。
3. 在模块（ESM）或者class中，JS默认就是严格模式了。

<u>*好的，我懂了，继续关于this的问题。如果是这种默认绑定的情况下（就是直接调用，没有指定调用者的函数），js会把this默认绑定到全局对象windows（浏览器中）或者global（Node中）*</u>

- **隐式绑定（通过对象调用）**

  ```javascript
  const obj={
    name:'Tom',
    sayHi(){
      console.log(this.name)
    }
  }
  obj.sayHi()// 'Tom'
  ```

  通过obj.method（）形式调用时，this指向这个对象。

  **但是注意**，

  ```javascript
  const fn = obj.sayHi;
  fn(); // 默认绑定 => window.name（或 undefined）
  ```

  一旦脱离对象调用，就退化为默认绑定！

<u>*有个问题，为什么我自己试了一下，这不行？并不会输出Tom而是输出undefined！*</u>

### Ask：我在vscode里面跑这个代码，就是输出undefined啊

Vscode的debug功能-》Debug Console，不是直接跑整个文件，而是只eval了一段代码。在这种情况下，this的绑定是不确定的，可能是undefined，也可能是绑定到调试器上下文里的全局对象（不是浏览器的window）。

<u>*ok，我确实不清楚vscode的调试器会产生这样的问题。我试了一下node ImplicitBinding.js，确实可以输出Tom。虽然有点好奇为什么vscode调试会产生这样的问题而node不会，不过先放一放，把this的指向搞懂先。*</u>

- **显式绑定（call/apply/bind）**

  ```javascript
  function greet() {
    console.log(this.name);
  }
  const person = { name: 'Alice' };
  greet.call(person);  // 'Alice'
  greet.apply(person); // 'Alice'
  const boundFn = greet.bind(person);
  boundFn();           // 'Alice'
  
  ```

  call和apply：立即执行，并指定this

  bind：返回一个新函数，永久绑定了this

<u>*等等，所以js中函数就是一个对象？还有各种自己的方法？*</u>

### Ask：所以javascript的函数是一个对象？

没错，javascript的函数本质上就是一个对象，而且是非常特殊的一类对象。

在Javascript中，函数是对象（Function Object）。它们不仅可以“被调用”，还可以像普通对象一样拥有属性和方法。

1. 函数可以有属性
2. 函数可以赋值，可以作为参数传递
3. 函数其实是Function构造函数创建的对象
4. 函数对象还有自己的方法：call/appy/bind
5. 函数对象的隐藏属性：prototype

- new 绑定（构造函数）

  ```javascript
  function Person(name) {
    this.name = name;
  }
  const p = new Person('Bob');
  console.log(p.name); // 'Bob'
  
  ```

  new会创建一个新对象，把this指向这个对象。

**优先级总结：new>bind>call/apply>隐式绑定>默认绑定**