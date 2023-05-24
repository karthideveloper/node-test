const express=require('express')
const courses=require('../constant')
const router=express.Router();

const Joi = require("joi");

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.send(404, "id not found");
  res.status(200).send(course);
});
router.get("/", (req, res) => {
    res.send(courses);
  });
  router.post("/", (req, res) => {
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


router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports=router;