const router = require('express').Router();
const UserController = require('../controllers/UserController.js');


router.post('/singup', UserController.singup)
router.post('/singin', UserController.singin)

module.exports = router;