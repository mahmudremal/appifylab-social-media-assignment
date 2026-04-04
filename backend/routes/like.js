const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/toggle', likeController.toggleLike);

module.exports = router;
