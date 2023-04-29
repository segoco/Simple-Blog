const mongoose = require('mongoose');

const postSchema = {
  Title: String,
  Content: String,
};

const Post = mongoose.model('post', postSchema);

module.exports = Post;
