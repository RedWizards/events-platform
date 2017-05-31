var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/create-event/:type', function(req, res, next){
	if(req.params.type == 1){
		res.render('index');
	}
});

module.exports = router;
