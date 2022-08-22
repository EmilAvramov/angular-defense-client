const server = require('./config/express');
const db = require('./config/database');
const config = require('./config/settings');

try {
	db
		.authenticate()
		.then(() => console.log('Database connected...'))
		.then(() => {
			server.listen(config.development.port, () =>
				console.log(`Server is listening to port ${config.development.port}...`)
			);
		});
} catch (err) {
	console.log(err);
}
