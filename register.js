const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/testDemo")
  .then((res) => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log("error on connection", err);
  });

const userRegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserRegister=mongoose.model("userData",userRegisterSchema);

async function userSignup(name,email,password){
  const user = new UserRegister({
    name,email,password
  });
  const result = await user.save();
  console.log(result);
}

userSignup("karthi","karthi.dev@gmail.com","karthi");

exports.User=UserRegister;