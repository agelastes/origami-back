const express = require('express');
const passport = require('passport');

const controller = require('../controllers/comments');
const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), controller.create);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete);

module.exports = router;