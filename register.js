const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
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
  const salt=await bcrypt.genSalt(10);

  const user = new UserRegister({
    name,email,password
  });

  user.password=await bcrypt.hash(user.password,salt)
  const result = await user.save();
  console.log(result);
}

userSignup("karthi","karthik1.dev@gmail.com","karthi");

exports.User=UserRegister;