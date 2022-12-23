const Post = require("../models/post");
const Comment = require("../models/comment");
const fs = require("fs");

exports.createPost = (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    post.save()
        .then(() => res.status(201).json({ message: "Post ajoutée !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res) => {
    Post.find()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(404).json({ error })
        });
};
exports.getAllPostsUser = (req, res) => {
    Post.find({ userId: req.params.id })
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(404).json({ error })
        });
};
exports.getOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => res.status(404).json({ error }));
};

exports.updatePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then((post) => {
    const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
        if (post.userId === req.auth.userId || req.auth.isAdmin === true) {
            post.title = req.body.title;
            post.description = req.body.description;
            if (req.body.imageUrl) {
                post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            post.save()
        .then(() => res.status(201).json({ message: "Post modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
        } else {
            next();
            }
        })
    }) .catch((error) => res.status(400).json({ error }));
};


exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
        .then((post) => {
            if (post.userId === req.auth.userId ||req.auth.isAdmin === true) {
                const fileName = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${fileName}`, async() => {
                    await Comment.deleteMany({
                        postId: req.params.id
                    })
                    post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Post supprimée !" }))
                        .catch((error) => res.status(400).json({ error }));
                });
            } else {
                next();
            }
        })
        .catch((error) => res.status(400).json({ error }))
};

exports.likePost = (req, res) => {
    const userId = req.auth.userId;
    const postId = req.params.id;
        Post.findOne({ _id: postId })
            .then(post => {
                const action = (!post.usersLiked.includes(userId)) ? 1 : -1; 
                if (action === 1) {
                    post.usersLiked.push(userId)
                } else {
                    const index = post.usersLiked.findIndex(a => a == userId);
                    post.usersLiked.splice(index, 1);
                }
                post.likes = post.usersLiked.length;
                post.save()
            .then(() => res.status(200).json({ message: "Like modifiée", likes: post.likes }))
            .catch((error) => res.status(400).json({ error }));
        }).catch(error => res.status(400).json({ error }));
}