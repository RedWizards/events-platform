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

router.get('/logout', authHelpers.loginRedirect, function(req, res, next){
	console.log(req.session);
	req.logout();
	console.log(req.session);
	res.status(200).json({
		status: 'Success'
	});
	// req.session.destroy(err => {
	// 	if(err) {
	// 		console.log(err);
	// 		res.status(400).json({
	// 			error: err
	// 		});
	//   	}
	//   	else {
	//   		console.log(req.session);
	//     	res.redirect('/');
	//   	}
	// });
});

router.get('/home', function(req, res, next) {
	res.render('client/home');
});


module.exports = router;
