const mongoose = require('mongoose');
require('dotenv').config();
//const config = require('config');
//const db = config.get('mongoURI');

const db =
	'mongodb+srv://' +
	process.env.MONGOURI_NAME +
	':' +
	process.env.MONGOURI_PASSWORD +
	'@flex.74psh.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const connectDB = async () => {
	try {
		await mongoose.connect(db);

		console.log('MongoDB Connected...');
	} catch (error) {
		console.error(error.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
