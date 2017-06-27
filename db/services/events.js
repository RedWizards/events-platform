var db = require('../knex.js');
var events = db('event');

function allEvents(){
	return events
		.then(result => {
			console.log(result);
			return result;
		})
		.catch(err => {
			console.log(err);
			return err;
		});
}

function eventById(id){
	return events
		.where('id', id)
		.then(result => {
			return result;
		})
		.catch(err => {
			return err;
		});
}

function createEvent(data) {
	return events.insert(data, '*')
		.then(result => {
			return result[0];
		})
		.catch(err => {
			return err;
		});
}

function updateEvent(id, data){
	return events
		.where('id', id)
		.update(data, '*')
		.then(result => {
			return result[0];
		})
		.catch(err => {
			return err
		});
}

function deleteEvent(id){
	return events.
		.where('id', id)
		.del()
		.then(result => {
			return result;
		})
		.catch(err => {
			return err
		});
}

module.exports = {
	allEvents,
	eventById,
	createEvent,
	deleteEvent
	updateEvent,
}