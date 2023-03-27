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
router.delete('/:id/comments', commentsCtrl.deleteOneComment);


module.exports = router;