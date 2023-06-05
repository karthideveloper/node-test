const mongoose = require("mongoose");
const { User } = require("../register");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const _ = require("lodash");

router.post("/", async (req, res) => {
  const error = req.body.name.length > 0;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Email or Password");
  }

  const validatePwd = bcrypt.compare(req.body.password, user.password);
  if (!validatePwd) return res.status(400).send("Invalid Password");
  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  const salt = await bcrypt.genSalt(10);
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
});

module.exports = router;
