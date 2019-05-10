const express = require('express');
const passport = require('passport');

const controller = require('../controllers/survey');
const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), controller.create);
router.post('/setAnswer', passport.authenticate('jwt', { session: false }), controller.setAnswer);
router.post('/getPageSurvey', passport.authenticate('jwt', { session: false }), controller.getPageSurvey);

module.exports = router;