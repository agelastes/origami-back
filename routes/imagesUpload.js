const express = require('express');
const passport = require('passport');

const controller = require('../controllers/imagesUpload');
const upload = require('../middelware/upload');
const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.upload);

module.exports = router;