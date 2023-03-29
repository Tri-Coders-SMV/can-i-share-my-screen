// req.body.user = req.user._id;
//     req.body.userName = req.user.name;
//     req.body.userAvatar = req.user.avatar;
const Post = require('../models/post');
const User = require('../models/user');

async function showAll(req, res) {
  const currentUserId = req.user ? req.user._id : null;
  const posts = await Post.find({});
  const usersFromPosts = {};

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const user = await User.findById(post.user);
    usersFromPosts[user._id.toString()] = user;
  }

  res.render('posts/all', {
    title: 'All Posts',
    posts,
    currentUserId,
    usersFromPosts
  });
}

function newPost (req, res) {
  const currentUserId = req.user ? req.user._id : null;
  if(!currentUserId) {
    res.redirect('/posts/all');
  } else {
    res.render('posts/new', { title: 'New Post', currentUserId });
  }
}

async function createPost (req, res) {
  try {
    req.body.user = req.user._id
    const post = await Post.create(req.body);
    //redirect to the created post
    res.redirect('/posts/all');
  } catch (err) {
    console.log(err);
    res.render('posts/new', { errorMsg: err.message });
  }
}

async function showMy (req, res) {
  const currentUserId = req.user ? req.user._id : null;
  const posts = await Post.find({user: currentUserId});
  const currentUser = req.user ? req.user: null;

  res.render('posts/my', { 
    title: 'My Posts', 
    posts, 
    currentUserId,
    currentUser 
  });
}

async function showOne (req, res) {
  const currentUser = req.user;
  const currentUserId = req.user ? req.user._id : null;
  const post = await Post.findById(req.params.id).populate('comments');
  const postUser = await User.findById(post.user);
  const comments = post.comments;
  const usersFromComments = {}
  
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const user = await User.findById(comment.user);
    usersFromComments[user._id.toString()] = user;
  }

  res.render('posts/show', { 
    title: `${post.title}`,
    post,
    editCommentId: null,
    currentUser,
    currentUserId,
    usersFromComments,
    postUser
  });
}

async function deleteOnePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    await Post.findOneAndDelete({_id: post._id});
    res.redirect('/posts/all');
  } catch(err) {
    console.error(err);
    res.redirect('/posts/all');
  }
}

async function editPost(req, res) {
  const currentUserId = req.user ? req.user._id : null;
  const post = await Post.findById(req.params.id);
  res.render('posts/edit', { title: post.title, post, currentUserId });
}

async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.contents = req.body.contents;
    await post.save();
    res.redirect('/posts/all');
  } catch(err) {
    console.log(err);
    res.redirect('/posts/all');
  }
}

async function addLike(req, res) {
 console.log(req.user)
 const userId = req.user._id;
 const post = await Post.findById(req.params.id);
 if (post.likes.includes(req.user._id)){
 const index =  post.likes.indexOf(req.user._id)
post.likes.splice(index, 1)
 } else {
  post.likes.push(req.user._id);
 }
 await post.save();
 console.log(req.url)
 const url = req.url.toString()
console.log(url);
 if (url.includes('all')) {
  res.redirect('/posts/all')
 } else {res.redirect(`/posts/${req.params.id}`)
}};

module.exports = {
  showAll,
  newPost,
  createPost,
  showOne,
  deleteOnePost,
  editPost,
  updatePost,
  addLike,
  showMy
}