const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((er) => {
    console.log("error while connecting");
  });

const AuthorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

const Author = mongoose.model("Author", AuthorSchema);
const Course = mongoose.model("Course", courseSchema);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  await author.save();
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });
  await course.save();
}

async function listCourse() {
  const course = await Course.find().populate('author','name -_id').select('author name');
  console.log("course", course);
}

// createAuthor("karthi","nodejs author","www.karthi.tech");
// createCourse("nodejs", "64776fc9a19b218f66a4d251");
listCourse();
