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

