// req.body.user = req.user._id;
//     req.body.userName = req.user.name;
//     req.body.userAvatar = req.user.avatar;
const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
  addComment,
  deleteOneComment,
  editComment,
  updateComment,
  addLike
};

async function addComment(req, res) {
  try {
    req.body.user = req.user._id;
    const post = await Post.findById(req.params.id);
    // we push an object with the data for the
    // review sub-doc into Mongoose arrays
    const comment = await Comment.create(req.body);
    // Not saving sub-doc, but the top level document.
    post.comments.push(comment._id);
    const updatedPost = await post.save();
    res.redirect(`/posts/${updatedPost._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function deleteOneComment(req, res, next) {
  try {
    if (!req.user) {
      res.redirect(`posts/${req.params.id}`);
    } else {
      comment = await Comment.findById(req.params.cid);
      console.log(comment.user.toString(), req.user._id.toString());
      if (!comment.user.toString() === req.user._id.toString) {
        res.redirect(`posts/${req.params.id}`);
      } else {
        const post = await Post.findById(req.params.id);
        if (!post) {
          return res.redirect("/posts/all")
        } else {
          console.log('cid', req.params.cid);
          await post.comments.remove(req.params.cid);
          await Comment.deleteOne(comment);
          await post.save();
          res.redirect(`/posts/${post._id}`);
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.redirect('');
    return next(err);
  }
}


async function editComment(req, res, next) {
  const currentUserId = req.user ? req.user._id : null;
  const post = await Post.findById(req.params.id).populate("comments");
  const postUser = await User.findById(post.user);
  const comments = post.comments;
  const usersFromComments = {};
  
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const user = await User.findById(comment.user);
    usersFromComments[user._id.toString()] = user;
  }

  res.render("posts/show", {
    title: `${post.title}`,
    post,
    editCommentId: req.params.cid,
    currentUserId,
    postUser,
    usersFromComments
  });
}

async function updateComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.cid);
    comment.contents = req.body.editedComment;
    await comment.save();
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/posts/${req.params.id}`);
  }
}

async function addLike(req, res) {
  if(!req.user){
    res.redirect('/auth/google');
  } else {
    const comment = await Comment.findById(req.params.cid);
    if (comment.likes.includes(req.user._id)) {
      const index = comment.likes.indexOf(req.user._id);
      comment.likes.splice(index, 1);
    } else {
      comment.likes.push(req.user._id);
    }
    await comment.save();
    res.redirect(`/posts/${req.params.id}`);
  }
}


