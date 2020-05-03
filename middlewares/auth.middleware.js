const User = require('../models/user.model');

module.exports.requireAuth = async function(req, res, next){
	// let userID = req.cookies.userID;
	// let user = db.get('users').find( { id: userID} ).value();

	// if (!user){
	// 	res.redirect('/auth/login');
	// 	return;
	// }

	if (!req.signedCookies.userID){
		res.redirect('/auth/login');
		return;
	}

	let user = await User.find({ _id: req.signedCookies.userID });
	
	if (!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;
	next();
};