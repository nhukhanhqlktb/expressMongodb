const Session = require('../models/session.model');
const shortid = require('shortid');

module.exports = async function(req, res, next) {
	let sessId = shortid.generate();
	let session;
	let countCart;

	if (!req.signedCookies.sessionId) {
		await Session.create( {sessionId: sessId} );
		res.cookie('sessionId', sessId, {
		signed: true});
		session = await Session.findOne( {sessionId: sessId} );
	} else {
		session = await Session.findOne( {sessionId: req.signedCookies.sessionId} );
	}
	
	if (session.cart) {
		countCart = Object.values(session.cart).reduce((result, cur) => {
			return result + cur;
		});
		res.locals.countCart = countCart;
	}

	next();
};