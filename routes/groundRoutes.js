const express = require('express');
const groundController = require('../controllers/groundController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/grounds', groundController.getAllGrounds);
router.get('/grounds/:id', groundController.getGroundById);
router.post('/grounds/seed', authenticateToken, groundController.seedGrounds);

module.exports = router;