const express = require('express');
const router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const commentsCtrl = require('../controllers/comments')

//router.post('/movies/:id/reviews', postsCtrl.create)
router.post('/:id/comments', commentsCtrl.addComment);


module.exports = router;