function greet() {
  console.log(this.name);
}
const person = { name: "Alice" };
greet.call(person); // 'Alice'
greet.apply(person); // 'Alice'
const boundFn = greet.bind(person);
boundFn(); // 'Alice'
