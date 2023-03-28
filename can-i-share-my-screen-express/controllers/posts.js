// req.body.user = req.user._id;
//     req.body.userName = req.user.name;
//     req.body.userAvatar = req.user.avatar;
const post = require('../models/post');
const Post = require('../models/post');

async function showAll (req, res) {
  const posts = await Post.find({});
  // await console.log(`HERE ARE OUR POSTS ${posts}`);
  res.render('posts/all', { title: 'All Posts', posts });
}

function newPost (req, res) {
  res.render('posts/new', { title: 'New Post'});
}

async function createPost (req, res) {
  try {
    const post = await Post.create(req.body);
    //redirect to the created post
    res.redirect('/posts/all');
  } catch (err) {
    console.log(err);
    res.render('posts/new', { errorMsg: err.message });
  }
}

function showMy (req, res) {

  const posts = Post.find({});
  res.render('posts/my', { title: 'My Posts', posts });
}

async function showOne (req, res) {
  const post = await Post.findById(req.params.id).populate('comments')
  //const performers = await Pe.find({_id: {$nin: movie.cast}})
  // console.log(performers)
  res.render('posts/show', { 
    title: `${post.title}`,
    post,
    editCommentId: null
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
  const post = await Post.findById(req.params.id);
  res.render('posts/edit', { title: post.title, post });
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

module.exports = {
  showAll,
  newPost,
  createPost,
  showOne,
  deleteOnePost,
  editPost,
  updatePost
}