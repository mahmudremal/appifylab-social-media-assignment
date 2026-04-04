const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(auth);

router.post('/', upload.single('image'), postController.createPost);
router.get('/', postController.getPosts);
router.delete('/:id', postController.deletePost);

module.exports = router;
