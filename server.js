
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port	   : 3306,
  user     : 'root',
  password : 'root',
  database : 'test'
});

connection.connect();

connection.query('SELECT * from ORDERS_APP', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();