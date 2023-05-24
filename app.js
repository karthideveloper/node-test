
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const express = require("express");
const courses=require('./router/courses')
const home=require('./router/home')
const TestMiddileWare = require("./middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api/courses',courses)
app.use('/',home)
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

//config

console.log("Application", config.get("name"));
console.log("Application", config.get("mail.host"));

console.log(`NODE ENV ${process.env.NODE_ENV}`);
console.log(`app ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan Enabled12");
  // console.log("Morgan Enabled");
}

app.use(helmet());

app.use((req, res, next) => {
  console.log("Logging..");
  next();
});

app.use((req, res, next) => {
  console.log("Authenticate..");
  next();
});
app.use(TestMiddileWare);





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
