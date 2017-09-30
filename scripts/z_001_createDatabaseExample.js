var connection = require("../utils/standalone.js").connection();

connection.beginTransaction(function (err) {
	if (err) {
		throw err;
	}
	var db_name = 'new_schema';
	new Promise (function(resolve, reject) {
		connection.query('CREATE DATABASE IF NOT EXISTS ' + db_name);
	})
	.then(new Promise(function() {
		connection.commit();
	}))
	.then(new Promise(function() {
		console.log('Database ' + db_name + ' created');
		connection.end();
		console.log('Connection closed normally');
	}));
	// catch(function(e){
	// 	connection.rollback();
	// });
});
