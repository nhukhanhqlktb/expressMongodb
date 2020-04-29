require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET)); //each id, it generates a private hash is different

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index', {
		name: 'Everybody'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

app.listen(port, () => {
	console.log('Server is run on port ' + port);
});