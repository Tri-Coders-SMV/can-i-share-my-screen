// req.body.user = req.user._id;
//     req.body.userName = req.user.name;
//     req.body.userAvatar = req.user.avatar;
const Post = require('../models/post');

async function showAll (req, res) {
  const posts = await Post.find({});
  await console.log(`HERE ARE OUR POSTS ${posts}`);
  res.render('posts/all', { title: 'All Posts', posts });
}

function newPost (req, res) {
  const posts = Post.find({});
  res.render('posts/new', { title: 'New Post', posts });
}

function showMy (req, res) {

  const posts = Post.find({});
  res.render('posts/my', { title: 'My Posts', posts });
}

module.exports = {
  showAll,
  newPost
}