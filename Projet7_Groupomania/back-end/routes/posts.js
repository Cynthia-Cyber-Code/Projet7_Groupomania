const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postsCtrl = require("../controller/posts");

router.post("/:id/like", auth, postsCtrl.likePost);
router.post("/add", auth, multer, postsCtrl.createPost);
router.get("/", auth, postsCtrl.getAllPosts);
router.get("/userId/:id", auth, postsCtrl.getAllPostsUser);
router.get("/:id", auth, postsCtrl.getOnePost);
router.put("/:id", auth, multer, postsCtrl.updatePost);
router.delete("/:id", auth, multer, postsCtrl.deletePost);


module.exports = router;