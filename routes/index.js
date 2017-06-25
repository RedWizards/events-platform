var express = require('express');
var router = express.Router();

var authHelpers = require('../auth/_helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/register', function(req, res, next){
	res.render('client/sign-up');
});

router.get('/login', function(req, res, next){
	res.render('client/log-in');
});

router.get('/logout', authHelpers.loginRequired, function(req, res, next){
	req.logout();
	res.status(200).json({
		status: 'success'
	});
});

router.get('/home', function(req, res, next) {
	res.render('client/home');
});


module.exports = router;
