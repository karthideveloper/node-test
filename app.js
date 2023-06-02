const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const express = require("express");
const courses = require("./router/courses");
const home = require("./router/home");
const user = require("./router/user");
const TestMiddileWare = require("./middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/courses", courses);
app.use("/", home);
app.use("/api/user", user);
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

// const getUser = (id, callback) => {
//   setTimeout(() => {
//     console.log("timeout");
//     callback({ id: id, userName: "karthi" });
//   }, 2000);
// };

// const getRepo = (userName,callback) => {
//   setTimeout(() => {
//     console.log("getrepotimeout");
//     callback(["repo1", "repo2", "repo3"]);
//   }, 2000);
// };

// const getCommits = (reps,callback) => {
//   setTimeout(() => {
//     console.log("getrepotimeout");
//     callback(["repo1", "repo2", "repo3"]);
//   }, 2000);
// };
// function displayCommit(com){
//   console.log(com)
// }
// function displayUser(user){

//   getRepo(user.userName,displayRepo)
// }
// function displayRepo(reps){
//   getCommits(reps,displayCommit)
// }

// getUser(1, displayUser);

const getUser = (id, callback) => {
  setTimeout(() => {
    console.log("getUserSetTimeout...");
    callback({ id: id, name: "karthi" });
  }, 2000);
};

const getUserRepo = (name, callback) => {
  setTimeout(() => {
    console.log("getUserRepoSetTimeout...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
};

const getUserCommit = (name, callback) => {
  setTimeout(() => {
    console.log("getUserCommitSetTimeout...");
    callback(["commit1", "commit2", "commit3"]);
  }, 2000);
};

function displayUserCommit(commit) {
  console.log(commit);
}
function displayUserRepo(reps) {
  getUserCommit(reps, displayUserCommit);
}
function displayUserData(user) {
  getUserRepo(user.name, displayUserRepo);
}
getUser(1, displayUserData);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
