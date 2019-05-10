const express = require('express');
const passport = require('passport');

const controller = require('../controllers/users');
const router = express.Router();

router.get('/self', passport.authenticate('jwt', { session: false }), controller.selfUser);
router.post('/usersList', passport.authenticate('jwt', { session: false }), controller.usersList);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);

module.exports = router;