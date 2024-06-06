const express = require('express');
const {
    getAll,
    getChat,
    startChat
} = require('./controllers/chatController');

const router = express.Router();

router.post('/all', getAll);
router.post('/get', getChat);
router.post('/start', startChat);

module.exports = router;