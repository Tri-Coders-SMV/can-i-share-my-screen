// req.body.user = req.user._id;
//     req.body.userName = req.user.name;
//     req.body.userAvatar = req.user.avatar;
const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports = {
    addComment,
    deleteOneComment,
    editComment,
    updateComment
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
    post.comments.remove(req.body.commentId);
    post.save().then(function() {
      res.redirect(`/posts/${post._id}`);
    }).catch(function(err) {
      // Let Express display an error
      console.log(err);
      return next(err);
    });
  })
}

async function editComment(req, res, next) {
  const post = await Post.findById(req.params.id).populate('comments');
  //const performers = await Pe.find({_id: {$nin: movie.cast}})
  // console.log(performers)
  res.render('posts/show', { 
    title: `${post.title}`,
    post,
    editCommentId: req.params.cid
  });
}

async function updateComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.cid);
    comment.contents = req.body.editedComment;
    await comment.save();
    res.redirect(`/posts/${req.params.id}`);
  } catch(err) {
    console.log(err);
    res.redirect(`/posts/${req.params.id}`);
  }
}