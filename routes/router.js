//imports
const express = require('express');
const {signupUser, loginUser, order} = require('../controller/controller');

//setup
const router = express.Router();

//login route
router.post('/login', loginUser)

//sign up route
router.post('/signup', signupUser)

//order route
router.post('/order', order)

module.exports = router;