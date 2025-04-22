

const obj = {
  name: "Tom",
  sayHi() {
    console.log(this.name);
  },
};

obj.sayHi();
