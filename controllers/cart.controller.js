const Session = require('../models/session.model');

module.exports.addToCart = async function(req, res) {
	let sessId = req.signedCookies.sessionId;
	let productId = req.params.productId;
	let pageNumber = req.params.page;
	let session = await Session.findOne( {sessionId: sessId} );
	let doc;
	let count;

	count = !session.cart ? 0 : session.cart[productId] || 0;
	// Why not run??
	// if (!session.cart) {
	// 	session.cart= { [productId]: count + 1};
	// 	doc = await session.save();
	// } else {
	// 	session.cart[productId] = count + 1;
	//  doc = await session.save();
	// }

	doc = await Session.update( {sessionId: sessId}, {$set: {[`cart.${productId}`]: count + 1}} );

	res.redirect(`/products?page=${pageNumber}`);
};