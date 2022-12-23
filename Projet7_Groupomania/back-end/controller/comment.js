const Comment = require("../models/comment");
const fs = require("fs");

exports.createComment = (req, res) => {
    const commentNew = new Comment({
        userId: req.auth.userId,
        postId: req.body.postId,
        date: req.body.date,
        title: req.body.title,
        comment: req.body.comment,
    });
    commentNew.save()
        .then(() => res.status(201).json({ message: "Commentaire ajoutée !", comment: commentNew }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllComments = (req, res) => {
    Comment.find({ postId: req.params.postId })
        .then(comment => {
            res.status(200).json(comment);
        })
        .catch(error => {
            res.status(404).json({ error })
        });
};

exports.updateComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then((comment) => {
            if (comment.userId === req.auth.userId || req.auth.isAdmin === true) {
                comment.title = req.body.title;
                comment.comment = req.body.comment;
                comment.save()
            .then(() => res.status(201).json({ message: "Commentaire modifiée !" }))
            .catch((error) => res.status(400).json({ error }));
            } else {
                next();
            }
    }) .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then((comment) => {
            if (comment.userId === req.auth.userId || req.auth.isAdmin === true) {
                comment.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Commentaire supprimée !" }))
                    .catch((error) => res.status(400).json({ error }));
            } else {
                next();
            }
        })
        .catch((error) => res.status(400).json({ error }))
};