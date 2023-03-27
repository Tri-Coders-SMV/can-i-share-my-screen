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
    post
  });
}

async function deleteOnePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    await Post.findOneAndDelete({_id: post._id});
    console.log(res);
    // ***************** ASK KEN WHY ITS WORKING WITHOUT A REDIRECT
  } catch(err) {
    console.error(err);
    res.redirect('/posts/all');
  }


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

module.exports = {
  showAll,
  newPost,
  createPost,
  showOne,
  deleteOnePost
}