// req.body.user = req.user._id;
//     req.body.userName = req.user.name;
//     req.body.userAvatar = req.user.avatar;
const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports = {
    addComment,
    deleteOneComment
}

async function addComment(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      // we push an object with the data for the 
      // review sub-doc into Mongoose arrays
      const comment = await Comment.create(req.body);
      // Not saving sub-doc, but the top level document.
      post.comments.push(comment._id)
      const updatedPost = await post.save();
      res.redirect(`/posts/${updatedPost._id}`);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
}

async function deleteOneComment(req, res, next) {
  Post.findById(req.params.id).then(function(post) {
    if (!post) return res.redirect('/posts/all');
    console.log(req.body, post.comments);
    post.comments.remove(req.body.commentId);
    console.log(post.comments);
    post.save().then(function() {
      res.redirect(`/posts/${post._id}`);
    }).catch(function(err) {
      // Let Express display an error
      console.log(err);
      return next(err);
    });
  })
}
