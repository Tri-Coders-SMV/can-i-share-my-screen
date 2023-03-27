const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts')

/* GET home page. */
// Route starts from '/posts'
router.get('/all', postsCtrl.showAll);
router.get('/new', postsCtrl.newPost);
router.post('/all', postsCtrl.createPost);
router.get('/:id', postsCtrl.showOne);

module.exports = router;