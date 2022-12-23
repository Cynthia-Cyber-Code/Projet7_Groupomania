const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const commentsCtrl = require("../controller/comment");

router.post("/add", auth, multer, commentsCtrl.createComment);
router.get("/:postId", auth, commentsCtrl.getAllComments);
router.put("/:id", auth, commentsCtrl.updateComment);
router.delete("/:id", auth, commentsCtrl.deleteComment);

module.exports = router;