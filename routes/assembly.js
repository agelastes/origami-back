const express = require('express');
const passport = require('passport');

const controller = require('../controllers/assembly');
const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), controller.create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);

module.exports = router;

