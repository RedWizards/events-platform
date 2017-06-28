var express = require('express');
var router = express.Router();

var authUtil = require('../auth/_helpers.js');
var userUtil = require('../db/services/users');
var eventUtil = require('../db/services/events');

router.get('/events', (req, res, next) => {
	return eventUtil.allEvents(res)
		.catch(err => {
			res.status(500).json({
				status: 'err'
			});
		});
});

router.post('/events', (req, res, next) => {
	return eventUtil.createEvent(res, req.body)
		.catch(err => {
			console.log(err);
			res.status(500).json({
				status: 'error'
			});
		});
});

// router.update('/event', (req, res, next) => {
// 	return eventUtil.updateEvent(req.body.id, req.body)
// 		.then(response => {
// 			res.status(200).json({
// 				status: 'success'
// 			});
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({
// 				status: 'error'
// 			});
// 		});
// });

router.delete('/events', (req, res, next) => {
	return eventUtil.deleteEvent(res, req.query.id)
		.catch(err => {
			console.log(err);
			res.status(500).json({
				status: 'error'
			});
		});
});

module.exports = router;