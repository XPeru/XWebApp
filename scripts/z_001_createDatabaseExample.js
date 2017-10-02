var connection = require("../utils/standalone.js").connection();

connection.beginTransaction(function (err) {
	if (err) {
		throw err;
	}
	console.log('Transaction started');
	var db_name = 'new_schema';

	async function sendTxn() {
		var res1 = await new Promise((resolve, reject) => {
            resolve(connection.query('SELECT * FROM testdb.ALMACEN'));
        });
		// var res1 =await Promise.reject(new Error('test'));
		// let res1 = await connection.query('CREATE DATABASE IF NOT EXISTS ' + db_name);
		console.log(res1);
		var res2 = await connection.commit();
		console.log('Database ' + db_name + ' created');
		var res3 = await connection.end();
		console.log('Connection closed normally');
	};

	sendTxn();//.catch(() => {});
	// catch(function(e){
	// 	connection.rollback();
	// });
});
