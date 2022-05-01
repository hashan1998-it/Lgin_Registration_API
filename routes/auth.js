const express = require("express");
const router = express.Router();
const { postHome, loginHome, page } = require("../controllers/controller");
const { auth } = require("../validation/validateToken");

router.post("/register", postHome);
router.post("/login", loginHome);
router.get("/page", auth, page);

//export this router to use in our app.js
module.exports = router;
