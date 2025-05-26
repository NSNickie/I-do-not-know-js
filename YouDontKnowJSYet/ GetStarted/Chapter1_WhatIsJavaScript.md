# Chapter 1 : What Is JavaScript?

首先作者说明了我们会花一些时间建立前进的基础，并且首先覆盖各种重要的背景细节，澄清一些关于语言真正是什么（以及不是什么）的误解。

并且作者说这是开始这段**旅程**的第一步，耐心和坚持是迈出这几步的最好选择。

在背景章节之后，书的其余部分绘制了一张高层次地图。

特别是第四章确定了围绕js语言组织的三个主要支柱：作用域/闭包，原型/对象和类型/强制转换。***所有的js都是建立在这三个基础支柱之上的***。

## What's With That Name?

总体而言，javascript这个名字是一个市场策略，试图将这门语言定位为编写当时更重型且更知名的Java的一种可口替代品。

某种程度上，法律关系比语法更深刻。实际上Oracle仍然拥有并运营着Java，同时也拥有JavaScript这个名字的官方商标。

TC39指定并由ECMA标准组织正式化的语言官方名称为ECMAScript。

换句话说，在浏览器或Nodejs中运行的Javascript是ES2019标准的一个实现。

***不要用JS6或者ES8指代这种语言。应该坚持使用ES20XX或者JS。***

*"Java is to JavaScript as ham is to hamster." --Jeremy Keith, 2009*

## Language Specification

TC39是一个管理JS的技术指导委员会，主要任务是管理该语言的官方规范；它们定期召开会议，对任何达成一致的变更进行投票，然后将其提交给ECMA，即标准组织。

JS的语法和行为在ES规范中定义。

ES2019正好是1995年JS诞生以来的第10个主要编号规范/修订。

TC39提案都经过五个阶段的过程（由于是程序员所以是阶段0到阶段4）。[https://tc39.es/process-document/](https://tc39.es/process-document/)

提案是开源的，github仓库：[https://github.com/tc39/proposals](https://github.com/tc39/proposals)

与一些根深蒂固的谎言和传说相反，实际上并不存在多种JavaScript版本。只有一种JS，即由TC39和ECMA维持的官方标准。

**所有主要浏览器和设备制造商已承诺将他们的JS实现与这一中央规范保持一致**。当然不同引擎的实现时间可以不一样，例如Chrome的V8和Mozilla的SpiderMonkey对一些功能有时间先后上的差异，但是不能自己乱改或者加私货，必须按照ECMA的标准来实现，以避免网页在不同浏览器上的表现不同。

<u>***这意味着可以只学习一种JavaScript，并在所有地方依赖于这种JavaScript。***</u>

## The Web Rules Everything About (JS)

虽然运行JavaScript的环境阵列正在不断扩展（从浏览器，到服务器，到机器人，到灯泡，等的），但统治Javascript的一个环境就是web。***JavaScript在Web浏览器中的实现，是在所有实际意义上唯一重要的现实。***

大多数情况下，规范中定义的JavaScript和在基于浏览器的JavaScript引擎中运行的JavaScript是相通的——**但有一些差异必须考虑**。

有时候出于历史包袱原因，TC39会被现实倒逼更改决策。其中比较著名的事件有contains改名为includes，smooshgate。

**那怎么办？规范和实现总不能老冲突吧？**

TC39的解决方案是加了一个妥协章节：***附录B（Appendix B）：专为浏览器JS而设的“例外清单”***，可以理解为这个东西是设计上的 **特殊情况**

 [https://262.ecma-international.org/10.0/#sec-additional-ecmascript-features-for-web-browsers](https://262.ecma-international.org/10.0/#sec-additional-ecmascript-features-for-web-browsers)

附录B中的陷阱并不常见，但避免这些构造仍然是一个好主意，以确保未来的安全。**尽可能遵循JS规范，不要依赖于仅适用于某些JS引擎环境的行为。**

## Not All (Web) JS...

这段代码是JS程序吗？
```javascript
alert("Hello, JS!")
```

 各种JS环境将API添加到JS程序的全局范围内，这些API会给一些特定的功能，例如alert啥的。

类似的还有console.log, fetch , fs.write之类

***很多JS不兼容的问题，其实不是JS语言问题，而是各个环境提供的API不一致导致的。***

## It's Not Always JS

在浏览器的开发者工具（或Node）使用控制台或者REPL（Read-Evaluate-Print-Loop）乍一看似乎是一个相当简单的js环境，但实际上并不是这样。

开发者工具是为开发者准备的工具，并不以准确，纯粹地反映严格规范的JS行为为目标。因此，存在很多可能会成为陷阱的怪癖，如果把控制台视作一个纯粹的js环境的话。

***不要相信你在开发者控制台中看到的行为代表准确的JS语义；想要了解确切的语义，请阅读规范。相反，把控制台想象成一个友好的JS环境。***

## Many Faces

**在编程语言的上下文中，“范式”这个术语指的是一种广泛（几乎是普遍的）心态和结构化代码的方法。**

典型的范式级代码类别包括： ***过程式，面向对象和函数式***。

- 过程式风格通过预先确定的一组操作，在一个自上而下的线性推进中组织代码，这些操作通常被收集在一起，称为过程。
- 面向对象风格通过将逻辑和数据收集在一起形成称为类的单元来组织代码。
- **函数式风格将代码组织为函数（作为纯计算而非过程），以及这些函数作为值的适配。**

***JavaScript绝对是多范式语言。你可以编写过程式，面向类或者函数式风格的代码，且可以在逐行基础上做出这些决策，而不必被迫选择全有或全无。***

## Backwards & Forwards

指导JavaScript的最基础原则之一是保持向后兼容性。

### 向后兼容性

向后兼容性是指，当某段代码在早期版本的Javascript中有效时，未来的Javascript版本不会做出更改导致这些代码变的无效。换句话说，1995年写的代码应该在今天的浏览器中仍然可以运行。

*这个规则有些小例外。但是TC39在这方面很谨慎。*

### 向前兼容性

向前兼容意味着在一个程序中包含对语言的新添加不会导致该程序在旧的JS引擎上运行时崩溃。尽管许多人希望这样，甚至错误地相信这是一个神话，**但JS并不是向前兼容的**。

与此相比，HTML和CSS向前兼容但不向后兼容。如果你挖掘出一些老HTML和CSS代码，它完全可能在今天不能工作（或工作方式不同）。但是，***如果你在老环境中用新特性，页面并不会崩溃——未识别的CSS/HTML会被跳过，其余的CSS/HTML会被相应地处理***。

***虽然JS不是并且不可能是向前兼容的，但认识到JS的向后兼容性是至关重要的，包括它对网络的持久益处以及因此对JS施加的约束和困难。***

*<u>We don't break the web!</u>*

## Jumping the Gaps

由于JS不向前兼容，在老引擎跑新代码可能会导致崩溃。对于新的和不兼容的语法，解决方案是**转译**。***<u>转译是一个人为创造的社区术语，用于描述实用工具将程序的源代码从一种形式转换为另一种形式。</u>***通常与语法相关的向前兼容性问题是通过使用转译器将较新的JS语法版本转换为等效的较旧语法来解决的（最常见的是Babel）。

还以一种情况是**填充**(**polyfill**)。比如说finally是es2019的特性，如果需要填充这个方法，补丁可能类似这样：

```javascript
if (!Promise.prototype.finally) {
    Promise.prototype.finally = function f(fn){
        return this.then(
            function t(v){
                return Promise.resolve( fn() )
                    .then(function t(){
                        return v;
                    });
            },
            function c(e){
                return Promise.resolve( fn() )
                    .then(function t(){
                        throw e;
                    });
            }
        );
    };
}
```

<u>***转译和填充是解决使用语言中最新稳定特性与网站或应用程序仍需支持的旧环境之间差距的两种非常有效的技术。由于 JS 不会停止改进，这个差距将永远存在。未来，应该将这两种技术作为每个 JS 项目生产链的标准部分。***</u>

## What's in an interpretation?

著名争论：***JS编写的代码是解释型脚本还是编译型程序***？大多数人的观点似乎是JS是一种解释型（脚本）语言，但事实比这更复杂。

*<u>真正重要的是，明确了解JS是被解释还是编译，关系到错误处理的本质</u>*。

JS源代码在执行之前会被解析。规范要求如此，因为它要求“早期错误”——在代码中静态确定的错误，例如重复的参数名称——在代码开始执行之前被报告。这些错误在代码未被解析之前无法被识别。

**所以JS是一种解析语言**。**但它是编译的吗**？

**The anser is closer to yes than no.** **答案更接近于“是”，而不是“不是”。**

解析后的JS被转换为优化的（二进制）形式，然后执行该“代码”；引擎在完成所有繁重的解析工作后通常不会回到逐行执行模式——大多数语言/引擎不会这样做，因为那样会非常低效。

具体来说，这个“编译”产生另一种二进制字节码，然后交给“JS虚拟机”去执行。有些人喜欢说这个虚拟机是在“解释”字节码。但这意味着Java和其他十几种由JVM驱动的语言其实是被解释的，而不是编译的。显然，这与一般对Java等语言的编译语言的常规说法是矛盾的。

另一个复杂之处在于，JS引擎可以对生成的代码（解析后）进行多次JIT（即时）处理/优化，这又可以根据不同的视角合理地成为“编译”或“解释”。实际上，这在JS引擎内部是一个非常复杂的情况。

**考虑一下整个JS源程序的流程：**

1. 程序离开开发者的编辑器之后，他会被Babel转换，然后由Webpack打包（可能还有其他半打构建过程），最后以这种截然不同的形式交付给JS引擎。
2. JS引擎将代码解析为抽象语法树（AST）。
3. 然后引擎将该抽象语法树（AST）转换为一种字节码，一种二进制中间表示（IR），接着通过优化的JIT编译器进一步优化/转换。
4. 最后JS虚拟机执行该程序。

***<u>作者认为，虽然形式上JS不是传统编译型语言，但实质上，它的执行机制已经非常像编译型语言了。</u>***

## Web Assembly (WASM)

**影响JS演变的一个主要Concern是性能，包括JS的解析/编译速度以及编译代码的执行速度**。

WASM与ASM.js相似，其最初目的是为非JS程序（如C等）提供一种转换为可以在JS引擎中运行的形式。与ASM.js不同，WASM选择通过以一种完全不同于JS的形式表示程序，来绕过JS解析/编译中固有的一些延迟，从而使程序能够更快地执行。

有些人提出WASM指向一个未来，那时JS将被从网络中去除或减少。这些人通常对JS抱有不满，希望能用其他语言——任何其他语言！——来取代它。由于WASM允许其他语言在JS引擎中运行，表面上这并不是完全不切实际的幻想故事。

但作者认为：***<u>WASM不会取代JS</u>***。WASM显著增强了Web（包括JS）的能力。这是一件好事，WASM 的强大与否，和人们是否拿它当逃避写 JS 的工具是两码事。

## Strictly Speaking

**综合来看，严格模式在很大程度上实际上是默认的，尽管从技术上讲，它并不是真正的默认设置。**

## Defined

- JS is an implementation of the ECMAScript standard (version ES2019 as of this writing), which is guided by the TC39 committee and hosted by ECMA. It runs in browsers and other JS environments such as Node.js.
- JS is a multi-paradigm language, meaning the syntax and capabilities allow a developer to mix and match (and bend and reshape!) concepts from various major paradigms, such as procedural, object-oriented (OO/classes), and functional (FP).
- JS is a compiled language, meaning the tools (including the JS engine) process and verify a program (reporting any errors!) before it executes.





