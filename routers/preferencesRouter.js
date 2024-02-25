const express = require('express');
const { getPreferences, updatePreferences } = require('../controllers/preferencesController');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticate, getPreferences);
router.put('/', authenticate, updatePreferences);

module.exports = router;
