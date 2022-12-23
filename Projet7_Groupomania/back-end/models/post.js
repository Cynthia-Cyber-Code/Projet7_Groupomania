const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: { type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number },
    usersLiked: { type: [String] },
});

module.exports = mongoose.model("post", postSchema);