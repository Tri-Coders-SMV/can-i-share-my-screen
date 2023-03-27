// req.body.user = req.user._id;
//     req.body.userName = req.user.name;
//     req.body.userAvatar = req.user.avatar;
const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports = {
    create
}

async function create(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      // we push an object with the data for the 
      // review sub-doc into Mongoose arrays
      post.comments.push(req.body);
      // Not saving sub-doc, but the top level document.
      const updatedPost = await post.save();
      res.redirect(`/Posts/${updatedPost._id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }