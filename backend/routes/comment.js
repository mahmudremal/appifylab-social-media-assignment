const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', commentController.createComment);
router.get('/:postId', commentController.getComments);
router.post('/reply', commentController.createReply);

module.exports = router;
