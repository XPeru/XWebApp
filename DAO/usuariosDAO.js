var mysql = require("mysql");
var multer  =   require('multer');

var dateGenerator = require("./dateGenerator.js");
var daoName = "usuariosDAO";
//this path has to exist before running the server
var pathUpload = "./dev/media/usuarios/";
var finalNameFile;
var completePathFile;
var nameBase = "userPhoto";
function usuariosDAO(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
	dateGenerator.printInfo(daoName +" agregado correctamente");
}

function printRequest(data) {
	dateGenerator.printInfo(daoName + " " + data);
}

var storage = multer.diskStorage({

  destination: function (req, file, callback) {
	callback(null, pathUpload);
  },
  filename: function (req, file, callback) {
	finalNameFile = file.fieldname + '-' + Date.now();
	completePathFile = pathUpload + finalNameFile;
	callback(null, finalNameFile);
  }
});
var upload = multer({ storage : storage}).single(nameBase);

//si se trata de una sql request de update o de insert, la variable req.body contiene
//al JSON con la informacion enviada desde el servicio
//si se trata de una sql request get o delete, la informacion esta contenida en un solo
//argumento, el url, ver detalles mas abajo
usuariosDAO.prototype.handleRoutes = function(router, connection, md5) {
	var tableName = "USUARIO";
	var tableTipo = "TIPO_USUARIO";
	var urlBase = "/usuario";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
		var query = "SELECT ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? FROM ?? us INNER JOIN ?? tipo ON ?? = ?? WHERE ??='1'";
		var table = ["us.ID_USUARIO",
						"us.NOMBRE", 
						"us.APELLIDOS",
						"us.EMAIL",
						"us.FOTO",
						"us.FK_TIPO_USUARIO",
						"us.CREATE_TIME",
						"us.UPDATE_TIME",
						"us.IS_ACTIVE",
						"tipo.TIPO",
						tableName,
						tableTipo,
						"tipo.ID_TIPO_USUARIO",
						"us.FK_TIPO_USUARIO",
						"us.IS_ACTIVE"];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "Success",
					"Usuarios": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase, " post");
		var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)";
		var table = [tableName,
						"NOMBRE",
						"APELLIDOS",
						"EMAIL",
						"PASSWORD",
						"FK_TIPO_USUARIO",
						"FOTO",
						req.body.NOMBRE,
						req.body.APELLIDOS,
						req.body.EMAIL,
						md5(req.body.PASSWORD),
						req.body.FK_TIPO_USUARIO,
						req.body.FOTO
					];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "User Added !"
				});
			}
		});
	});

	router.get(urlBase + "/:id_usuario", function(req, res) {
		printRequest(urlBase + " :id_usuario" + " get");
		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = [tableName, "ID_USUARIO", req.params.id_usuario];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "Success",
					"Users": rows
				});
			}
		});
	});

	/*router.get("/authentication/:usuario_email/:usuario_password", function(req, res) {
		printRequest("/authentication/:usuario_email/:usuario_password" + " get");
		var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
		var table = [tableName, "EMAIL", req.params.usuario_email,
					"usuario_password", md5(req.params.usuario_password)];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Message": "Success",
					"Users": rows
				});
			}
		});
	});*/

	router.put(urlBase, function(req, res) {
		printRequest(urlBase, " put");
		var query = "UPDATE ?? SET ?? = ?, ??=?, ??=?, ??=CURRENT_TIMESTAMP WHERE ?? = ?";
		var table = [tableName,
					"PASSWORD",
					md5(req.body.PASSWORD),
					"FK_TIPO_USUARIO",
					req.body.FK_TIPO_USUARIO,
					"FOTO",
					req.body.FOTO,
					"UPDATE_TIME",
					"ID_USUARIO",
					req.body.ID_USUARIO];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "OK"
				});
			}
		});
	});

	router.put(urlBase + "delete", function(req, res) {
		printRequest(urlBase + "delete", " put");
		var query = "UPDATE ?? SET ?? = ?, ??=CURRENT_TIMESTAMP WHERE ?? = ?";
		var table = [tableName,
					"IS_ACTIVE",
					!req.body.IS_ACTIVE,
					"UPDATE_TIME",
					"ID_USUARIO", 
					req.body.ID_USUARIO];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				console.info('Error executing MySQL query:' + query);
				console.info(err.message);
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "OK"
				});
			}
		});
	});

	router.post(urlBase + "photo", function(req, res) {
		printRequest(urlBase + "photo", " post");
		printRequest(req);
		upload(req, res, function(err) {
			if(err) {
				return res.end("Error uploading file.");
			}
			res.end(completePathFile);
		});
	});
};

module.exports = usuariosDAO;