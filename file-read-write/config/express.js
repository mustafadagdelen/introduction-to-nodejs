const express = require('express');
const glob = require('glob');
const route = require('./route');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');

module.exports = function(app, config) {
	const env = process.env.NODE_ENV || 'development';
	app.locals.ENV = env;
	app.locals.ENV_DEVELOPMENT = env == 'development';

	// app.use(favicon(config.root + '/public/img/favicon.ico'));
	if (app.get('env') === 'development'){
		app.use(cors());
	}

	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.text());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(cookieParser());
	app.use(compress());
	app.use(express.static(config.root + '/public'));
	app.use(methodOverride());

	route(app, config);

	app.use((req, res, next) => {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	if(app.get('env') === 'development'){
		app.use(function (err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err,
				title: 'error'
			});
		});
	}

	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: {},
				title: 'error'
			});
	});
};