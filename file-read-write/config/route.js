module.exports = (app, config) => {

	const services = new Map([
		[{method: 'post',  state: '/file/sendData'}, '/app/controllers/fileController'],
	]);

	services.forEach((value, key) => {
		app[key.method](key.state, require(config.root + value)(app, config));
	});
};
