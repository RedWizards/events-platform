var express = require('express');
var router = express.Router();

var authUtil = require('../auth/_helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/login', authUtil.loginRedirect, function(req, res, next){
	res.render('client/log-in');
});

router.get('/logout', authUtil.loginRequired, function(req, res, next){
	req.logout();
	res.redirect('/');
});

router.get('/home', authUtil.loginRequired, function(req, res, next) {
	res.render('client/home');
});


module.exports = router;
