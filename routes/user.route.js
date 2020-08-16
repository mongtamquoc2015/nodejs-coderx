const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// USER
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.post('/create', controller.store);

module.exports = router;