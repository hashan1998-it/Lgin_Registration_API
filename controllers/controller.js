const User = require("../models/models");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**/ /////////////////////////////////////////////////////////////////////////////// */
const postHome = async (req, res) => {
  // Validate before registration
  const { error } = registerValidation(req.body);
  if (error) {
    return res.json(
      error.details[0].message.substring(
        error.details[0].message.indexOf(" ") + 1
      )
    );
  }

  // Checking the errors if there exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email is already exists");
  }

  //hash the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  //Create the user in database
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  // Catching the errors
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.send(err);
  }

  // const errorMsg = error.details[0].message.substring(
  //   error.details[0].message.indexOf(" ") + 1
  // );
  // res.send(errorMsg);
};

/**/ /////////////////////////////////////////////////////////////////////////////// */

const loginHome = async (req, res) => {
  // Validate before registration
  const { error } = loginValidation(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }

  //Checking the errors if there exists
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    return res.status(400).send("Email not exists");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Password is incorrect");
  }

  //Create token and assign
  var token = jwt.sign({ _id: user._id }, process.env.SECRET_MSG);
  res.header("auth-token", token);
  res.send(`Log in :${token}`)
};

const page = (req, res) => {
  res.send("OK Bn");
};

/**/ /////////////////////////////////////////////////////////////////////////////// */
module.exports = { postHome, loginHome, page };
