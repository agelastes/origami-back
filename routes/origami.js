const express = require('express');
const passport = require('passport');

const controller = require('../controllers/origami');
const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), controller.create);
router.post('/list', controller.list);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.post('/origamiInfo', controller.origamiInfo);

module.exports = router;