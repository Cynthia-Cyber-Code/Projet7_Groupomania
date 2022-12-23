const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const userCtrl = require("../controller/user");
const passwordCheck = require("../middleware/password");

router.post("/signup", passwordCheck, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", auth, userCtrl.getAllUsers);

module.exports = router;
