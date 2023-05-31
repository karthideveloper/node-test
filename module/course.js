const mongoose=require('mongoose')
const Joi=require("joi")
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
const validateCourse = (course) => {
    const schema = Joi.object({
      name: Joi.string().min(6).max(60).required(),
      phone: Joi.string().min(6).max(60).required(),
      isGold: Joi.boolean(),
    });
  
    const Validation = schema.validate(course);
    return Validation.error;
  };
  exports.validate=validateCourse;
  exports.Course=Course;
