var express = require('express');
var router = express.Router();

var authUtil = require('../auth/_helpers');
var usersUtil = require('../db/services/users');
var eventsUtil = require('../db/services/events');

router.get('/user', (req, res, next) => {
	handleResponse(res, 200, 'success');
});

router.get('/events', (req, res, next) => {
	return eventsUtil.allEvents(res)
		.catch(err => {
			res.status(500).json({
				status: 'err'
			});
		});
})

router.post('/events', (req, res, next) => {
	//registration
	return eventsUtil.register(res, req.body)
		.catch(err => {
			res.status(500).json({
				status: 'err'
			});
		});
});

function handleResponse(res, code, statusMsg){
	res.status(code).json({
		status: statusMsg
	});
}

module.exports = router;