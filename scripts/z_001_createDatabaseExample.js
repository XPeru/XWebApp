var connection = require("../utils/standalone.js").connection();

connection.beginTransaction(function (err) {
	if (err) {
		throw err;
	}
	console.log('Connection started normally');
	var db_name = 'new_schema';

	async function sendTxn() {
		var req1 = await connection.query('CREATE DATABASE IF NOT EXISTS ' + db_name);
		var req2 = await connection.commit();
		console.log('Database ' + db_name + ' created');
		var req3 = await connection.end();
		console.log('Connection closed normally');
	};

	sendTxn();
	// catch(function(e){
	// 	connection.rollback();
	// });
});
