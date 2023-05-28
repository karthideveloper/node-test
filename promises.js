const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("hhhh")
    reject(new Error("text"));
  }, 2000);
});

p.then((res) => {
  console.log("res", res);
}).catch((err) => {
  console.log("err", err.message);
});

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("getUserSetTimeout...");
      resolve({ id: id, name: "karthi" });
    }, 2000);
  }); 
};
const r = getUser(2);
r.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
console.log(r);
