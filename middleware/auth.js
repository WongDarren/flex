const jwt = require('jsonwebtoken');
const config = require('config');

// a middleware function takes in request and response objects
// and next is a callback that we have to run so it can move
// to next piece of middleware
module.exports = function (req, res, next) {
	// get token from header
	const token = req.header('x-auth-token');

	// check if no token
	if (!token) {
		// 401 - not authorized
		return res.status(401).json({ msg: 'No token. Authorization denied.' });
	}

	// Verify token
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
