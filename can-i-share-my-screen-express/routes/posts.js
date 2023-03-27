const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts')

/* GET home page. */
// Route starts from '/posts'
router.get('/all', postsCtrl.showAll);

module.exports = router;