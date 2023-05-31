const mongoose = require("mongoose");
const {validate,Course}=require('./module/course')
mongoose
  .connect("mongodb://localhost/testDemo")
  .then((res) => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log("error on connection", err);
  });


async function createCourse() {
  const course = new Course({
    name: "Angular js Course",
    author: "Karthi",
    // tags: ["Angular", "frontEnd"],
    isPublished: true,
    price:12000
  });
  const result = await course.save();
  console.log(result);
}
createCourse();

async function getCourse() {
  const course = await Course.find({ author: "karthi" })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .find({price:{$gte:10,$lte:20}})
  // .find({price:{$in:[10,20,30]}})
  // .find()
  // .or([{name:"karthi"},{price:"10"}])
  // .and([{name:"karthi"},{price:"10"}])
  console.log(course);
}

// getCourse();
