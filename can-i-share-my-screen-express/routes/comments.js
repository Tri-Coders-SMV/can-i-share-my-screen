const express = require('express');
const router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const commentsCtrl = require('../controllers/comments')

// Every url below starts with /posts
router.post('/:id/comments', commentsCtrl.addComment);
router.get('/:id/:cid', commentsCtrl.editComment);
router.put('/:id/:cid', commentsCtrl.updateComment);
router.delete('/:id/comments', commentsCtrl.deleteOneComment);
router.post('/:id/:cid/likes', commentsCtrl.addLike);

module.exports = router;