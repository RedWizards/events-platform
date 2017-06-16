var express = require('express');
var router = express.Router();

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

router.get('/logout', function(req, res, next){
	
})


module.exports = router;
