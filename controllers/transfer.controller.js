const shortid = require('shortid');

const db = require('../db.js');

module.exports.create = function(req, res) {
	res.render('transfer/create');
};

module.exports.postCreate = function (req, res) {
	const data = {
		id: shortid.generate(),
		accountId: req.body.accountId,
		amount: parseInt(req.body.amount),
		userId: req.signedCookies.userID
	};
	db.get('transfers').push(data).write();
	res.redirect('/transfer/create');
}