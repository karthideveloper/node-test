const mongoose = require("mongoose");
const { User } = require("../register");
const express = require("express");
const router = express.Router();

const _ = require("lodash");

router.post("/", async (req, res) => {
  const error = req.body.name.length > 0;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered");
  }

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  await user.save();
  res.send(user);
});

module.exports = router;
