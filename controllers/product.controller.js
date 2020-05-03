const Product = require('../models/product.model');

module.exports.index = async function(req, res) {

	let page = parseInt(req.query.page) || 1;
	let perPage = 4;
	let sumDoc = await Product.countDocuments();
	let pageLink = 'products';

	let start = (page - 1) * perPage;
	limitPage = Math.ceil(sumDoc / perPage);
	
	let products = await Product.find({}, null, { skip: start, limit: perPage});
	res.render('products/index', {
		products: products,
		pageLink,
		page,
		limitPage
	});
};