var express = require('express');
var router = express.Router();

var authUtil = ('../auth/_helpers.js');
var userUtil = ('../db/services/users');
var eventUtil = ('../db/services/events');

router.get('/events', (req, res, next) => {
	if(eventUtil.allEvents);
		
	res.status(200).json({
		status: 'success'
	});
});

router.post('/event', (req, res, next) => {
	return eventUtil.createEvent(req.body)
		.then(response => {
			if(response)
				res.status(200).json({
					status: 'success'
				});
		})
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

router.delete('/event', (req, res, next) => {
	return eventUtil.deleteEvent(req.body.id)
		.then(response => {
			res.status(200).json({
				status: 'success'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				status: 'error'
			});
		});
});

module.exports = router;