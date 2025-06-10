// var greeting = "Hello";

// console.log(greeting);

// greeting = ."Hi";

// console.log("Howdy");

// saySomething("Hello", "Hi");
// // Uncaught SyntaxError: Duplicate parameter name not
// // allowed in this context

// function saySomething(greeting, greeting) {
//   "use strict";
//   console.log(greeting);
// }

// eval("console.log('eval test')");

function illegalShadowing() {
  let test;
  let test = 2;

  console.log(test);
}
illegalShadowing();
