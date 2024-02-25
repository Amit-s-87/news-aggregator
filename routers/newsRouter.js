const express = require('express');
const { fetchNews } = require('../controllers/newsController');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticate, fetchNews);

module.exports = router;
