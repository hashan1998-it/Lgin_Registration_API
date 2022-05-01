const Joi = require("joi");


//Registration Verification
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(6).max(255),
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(8).max(1024),
  });

  return schema.validate(data);
};



//Login verification
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(8).max(1024),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
