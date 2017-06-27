var express = require('express');
var router = express.Router();

var authHelpers = require('../auth/_helpers');

router.get('/', (req, res, next) => {
	res.send('This is the admin side');
});

router.get('/login', (req, res, next) => {
	res.send('This is the admin login page');
});



module.exports = router;