const express = require('express');
const multer = require('multer');
const {
    createCharacter,
    updateCharacter,
    getMyCharacter,
    getCharacters,
    getHotCharacters,
    getFeaturedCharacters,
    getNewestCharacters,
    getTrendingCharacters
} = require('./controllers/characterController');

const upload = multer();
const router = express.Router();

router.post('/create', upload.none(), createCharacter);
router.post('/update', upload.none(), updateCharacter);
router.post('/get', getCharacters);
router.post('/my', getMyCharacter);
router.get('/hots', getHotCharacters);
router.get('/newest', getNewestCharacters);
router.get('/featured', getFeaturedCharacters);
router.post('/trending', getTrendingCharacters);

module.exports = router;