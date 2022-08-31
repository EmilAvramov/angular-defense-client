import sequelize from './config/database';
import app from './config/express';
import { port } from './config/settings';

try {
	sequelize
		.authenticate()
		.then(() => console.log('Database connected...'))
		.then(() => {
			app.listen(port, () =>
				console.log(`Server is listening to port ${port}...`)
			);
		});
} catch (err) {
	console.log(err);
}
