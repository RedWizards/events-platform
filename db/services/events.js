var db = require('../knex.js');

var events = db('event');
var registration = db('registration')

//**checked
function allEvents(res){
	return events
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			handleResponse(res, 500, 'error');
		});
}

function eventById(res, id){
	return events
		.where('id', id)
		.then(result => {
			handleResponse(res, 200, 'success', result[0]);
		})
		.catch(err => {
			console.log(err);
			handleResponse(res, 500, 'error');
		});
}

//**checked
function createEvent(res, data) {
	return events.insert(data, '*')
		.then(result => {
			handleResponse(res, 200, 'success', result[0]);
		})
		.catch(err => {
			console.log(err);
			handleResponse(res, 500, 'error');
		});
}

function updateEvent(res, data){
	return events
		.where('id', id)
		.update(data, '*')
		.then(result => {
			handleResponse(res, 200, 'success', result);
		});
}

//**checked
function deleteEvent(res, id){
	return events
		.where({'id': id})
		.del()
		.then(result => {
			console.log(result);
			if(result == 1)
				handleResponse(res, 200, 'success');
			else
				handleResponse(res, 404, 'Event not found');
		})
		.catch(err => {
			console.log(err);
			handleResponse(res, 500, 'error');
		});
}

function register(res, data){
	return registration
		.insert(data, '*')
		.then(result => {
			handleResponse(res, 200, 'success', result);
		})
		.catch(err => {
			console.log(err);
			handleResponse(res, 500, 'error');
		});
}

function handleResponse(res, code, msg, data){
	res.status(code).json({
		status: msg,
		data: data
	});
}

module.exports = {
	allEvents,
	eventById,
	createEvent,
	deleteEvent,
	updateEvent,
	register
}