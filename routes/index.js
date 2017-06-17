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
	req.session.destroy(err => {
		if(err) {
			console.log(err);
			res.status(400).json({
				error: err
			});
	  	}
	  	else {
	    	res.redirect('/');
	  	}
	});
});

router.get('/home', function(req, res, next) {
	res.render('client/home');
});


module.exports = router;
