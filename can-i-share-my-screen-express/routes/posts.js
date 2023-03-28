const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts')

/* GET home page. */
// Route starts from '/posts'
router.get('/all', postsCtrl.showAll);
router.get('/new', postsCtrl.newPost);
router.post('/all', postsCtrl.createPost);
router.get('/:id/edit', postsCtrl.editPost);
router.put('/:id', postsCtrl.updatePost);
router.get('/:id', postsCtrl.showOne);
router.delete('/:id', postsCtrl.deleteOnePost);

module.exports = router;