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

// function illegalShadowing() {
//   console.log(global);
// }
// illegalShadowing();
// askQuestion();
// // ReferenceError

// let studentName = "Suzy";

// function askQuestion() {
//   console.log(`${studentName}, do you know?`);
// }

var studentName = "Kyle";

{
  console.log(studentName);
  // ???

  // ..

  let studentName = "Suzy";

  console.log(studentName);
  // Suzy
}
