var bcrypt = require('bcrypt');

function loginRequired(req, res, next){
	if(!req.user)
		handleResponse(res, 400, 'Please Log In');
	return next();
}

function loginRedirect(req, res, next) {
	if(req.user) 
		handleResponse(res, 400, 'You are already logged in');
	return next();
}

function comparePass(userPassword, databasePassword){
	return bcrypt.compareSync(userPassword, databasePassword);
}

function handleResponse(res, code, statusMsg){
	res.status(code).json({
		status: statusMsg
	})
}

module.exports = {
	loginRequired,
	loginRedirect,
	comparePass
}