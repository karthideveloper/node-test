const Joi = require("joi");
const helmet=require("helmet")
const morgan=require("morgan")
const config=require("config")
const express = require("express");
const TestMiddileWare = require("./middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const startupDebugger=require("debug")("app:startup")
const dbDebugger=require("debug")("app:db")

//config

console.log("Application",config.get("name"));
console.log("Application",config.get("mail.host"));

console.log(`NODE ENV ${process.env.NODE_ENV}`);
console.log(`app ${app.get('env')}`);

if(app.get('env')==="development"){
    app.use(morgan('tiny'))
    startupDebugger("Morgan Enabled12")
    // console.log("Morgan Enabled");
}

app.use(helmet())


const courses = [
  {
    id: 1,
    name: "course1",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
  {
    id: 4,
    name: "course4",
  },
];


app.use((req, res, next) => {
    console.log("Logging..");
    next();
  });
  
  app.use((req, res, next) => {
    console.log("Authenticate..");
    next();
  });
  app.use(TestMiddileWare);
  
app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.send(404, "id not found");
  res.status(200).send(course);
});

app.post("/api/courses", (req, res) => {
  const error = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.send(404, "id not found");

  const error = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.send(404, "id not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
  });

  const Validation = schema.validate(course);
  return Validation.error;
};
