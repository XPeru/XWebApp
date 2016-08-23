var mysql = require("mysql");
var multer  = require('multer');

var dateGenerator = require("./dateGenerator.js");
var daoName = "articulosDAO";
//this path has to exist before running the server
var pathUpload = "./dev/media/articulos/";
var finalNameFile;
var completePathFile;
var baseFile = "articleImage";
function articulosDAO(router, connection, md5) {
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
var upload = multer({ storage : storage}).single(baseFile);

//si se trata de una sql request de update o de insert, la variable req.body contiene
//al JSON con la informacion enviada desde el servicio
//si se trata de una sql request get o delete, la informacion esta contenida en un solo
//argumento, el url, ver detalles mas abajo
articulosDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "ARTICULO";
	var urlBase = "/articulo";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
		var query = "SELECT ??, ??, ??, ??, ??, ??, ??, ??, ?? as CATEGORIA FROM ?? art INNER JOIN ?? cat ON ?? = ??";
		var table = ["art.ID_ARTICULO",
					"art.CODIGO",
					"art.DESCRIPCION",
					"art.UNIDAD",
					"art.PRECIO_UNITARIO",
					"art.IMAGEN",
					"art.VALOR_REPOSICION",
					"art.FK_CATEGORIA",
					"cat.DESCRIPCION",
					tableName,
					"CATEGORIA",
					"cat.ID_CATEGORIA",
					"art.FK_CATEGORIA"];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "Success",
					"Articulos": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase, " post");
		var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)";
		var table = [tableName,
						"CODIGO",
						"DESCRIPCION",
						"UNIDAD",
						"PRECIO_UNITARIO",
						"VALOR_REPOSICION",
						"FK_CATEGORIA",
						"IMAGEN",
						req.body.CODIGO,
						req.body.DESCRIPCION,
						req.body.UNIDAD,
						req.body.PRECIO_UNITARIO,
						req.body.VALOR_REPOSICION,
						req.body.FK_CATEGORIA,
						req.body.IMAGEN
					];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "Article Added !"
				});
			}
		});
	});

	router.get(urlBase + "/:id_articulo", function(req, res) {
		printRequest(urlBase + " :id_articulo" + " get");
		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = [tableName, "ID_ARTICULO", req.params.id_articulo];
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err, rows) {
			if (err) {
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				res.json({
					"Error": false,
					"Message": "Success",
					"Articulos": rows
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ??=? WHERE ?? = ?";
		var table = [tableName, 
						"CODIGO",
						req.body.CODIGO,
						"DESCRIPCION",
						req.body.DESCRIPCION,
						"UNIDAD",
						req.body.UNIDAD,
						"PRECIO_UNITARIO",
						req.body.PRECIO_UNITARIO,
						"VALOR_REPOSICION",
						req.body.VALOR_REPOSICION,
						"FK_CATEGORIA",
						req.body.FK_CATEGORIA,
						"IMAGEN",
						req.body.IMAGEN,
						"ID_ARTICULO",
						req.body.ID_ARTICULO
					];
		printRequest(table);
		query = mysql.format(query, table);
		printRequest(query);
		connection.query(query, function(err) {
			if (err) {
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

	router.post(urlBase + 'image', function(req, res) {
		printRequest(urlBase + "image", " post");
		printRequest(req);
		upload(req, res, function(err) {
			if(err) {
				return res.end("Error uploading file.");
			}
			res.end(completePathFile);
		});
	});
};

module.exports = articulosDAO;