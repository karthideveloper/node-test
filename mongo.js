const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/testDemo")
  .then((res) => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log("error on connection", err);
  });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (value, callback) {
        setTimeout(()=>{
          const result = value && value.length > 5;
          callback(result);
        },4000)
        
      },
      message: "course contain at least one tag ",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});
const Course = mongoose.model("course", courseSchema);
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
