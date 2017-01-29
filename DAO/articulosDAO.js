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

function printRequest(data, color) {
	dateGenerator.printInfo(daoName + "\n" + data, color);
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
	var urlBase = "/articulo";
	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get", "cyan");
		var query = "SELECT " + "\n" +
					"	art.ID_ARTICULO," + "\n" +
					"	art.CODIGO," + "\n" +
					"	art.DESCRIPCION, " + "\n" +
					"	art.UNIDAD, " + "\n" +
					"	art.PRECIO_UNITARIO, " + "\n" +
					"	art.IMAGEN, " + "\n" +
					"	art.VALOR_REPOSICION, " + "\n" +
					"	art.FK_CATEGORIA, " + "\n" +
					"	cat.DESCRIPCION as CATEGORIA " + "\n" +
					"FROM " + "\n" +
					"	ARTICULO art " + "\n" +
					"INNER JOIN CATEGORIA cat ON" + "\n" +
					"	cat.ID_CATEGORIA = art.FK_CATEGORIA";
		var table = [];
		query = mysql.format(query, table);
		printRequest(query, "cyan");
		connection.query(query, function(err, rows) {
			if (err) {
				printRequest('Error executing MySQL query:' + query, "red");
				printRequest(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				printRequest('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Success",
					"Articulos": rows
				});
			}
		});
	});

	router.post(urlBase, function(req, res) {
		printRequest(urlBase + " post", "magenta");
		var query = "INSERT INTO" + "\n" +
					"	ARTICULO (" + "\n" +
					"		CODIGO," + "\n" +
					"		DESCRIPCION," + "\n" +
					"		UNIDAD," + "\n" +
					"		PRECIO_UNITARIO," + "\n" +
					"		VALOR_REPOSICION," + "\n" +
					"		FK_CATEGORIA," + "\n" +
					"		IMAGEN" + "\n" +
					"	)" + "\n" +
					"VALUES (" + "\n" +
					"	?, " + "\n" +
					"	?, " + "\n" +
					"	?, " + "\n" +
					"	?, " + "\n" +
					"	?, " + "\n" +
					"	?, " + "\n" +
					"	?" + "\n" +
					")";
		var table = [req.body.CODIGO,
					req.body.DESCRIPCION,
					req.body.UNIDAD,
					req.body.PRECIO_UNITARIO,
					req.body.VALOR_REPOSICION,
					req.body.FK_CATEGORIA,
					req.body.IMAGEN];
		query = mysql.format(query, table);
		printRequest(query, "magenta");
		connection.query(query, function(err) {
			if (err) {
				printRequest('Error executing MySQL query:' + query, "red");
				printRequest(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				printRequest('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Article Added !"
				});
			}
		});
	});

	router.get(urlBase + "/:id_articulo", function(req, res) {
		printRequest(urlBase + " :id_articulo" + " get", "cyan");
		var query = "CALL SP_SEARCH('ARTICULO','ID_ARTICULO',?)";
		var table = [req.params.id_articulo];
		query = mysql.format(query, table);
		printRequest(query, "cyan");
		connection.query(query, function(err, rows) {
			if (err) {
				printRequest('Error executing MySQL query:' + query, "red");
				printRequest(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				printRequest('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "Success",
					"Articulos": rows[0]
				});
			}
		});
	});

	router.put(urlBase, function(req, res) {
		printRequest(urlBase + " put", "magenta");
		var query = "UPDATE" + "\n" +
					"	ARTICULO" + "\n" +
					"SET " + "\n" +
					"	CODIGO = ?, " + "\n" +
					"	DESCRIPCION = ?, " + "\n" +
					"	UNIDAD = ?, " + "\n" +
					"	PRECIO_UNITARIO = ?, " + "\n" +
					"	VALOR_REPOSICION = ?, " + "\n" +
					"	FK_CATEGORIA = ?, " + "\n" +
					"	IMAGEN = ? " + "\n" +
					"WHERE" + "\n" +
					"	ID_ARTICULO = ?";
		var table = [req.body.CODIGO,
					req.body.DESCRIPCION,
					req.body.UNIDAD,
					req.body.PRECIO_UNITARIO,
					req.body.VALOR_REPOSICION,
					req.body.FK_CATEGORIA,
					req.body.IMAGEN,
					req.body.ID_ARTICULO];
		
		query = mysql.format(query, table);
		printRequest(query, "magenta");
		connection.query(query, function(err) {
			if (err) {
				printRequest('Error executing MySQL query:' + query, "red");
				printRequest(err.message, "red");
				res.json({
					"Error": true,
					"Message": "Error executing MySQL query"
				});
			} else {
				printRequest('Success MySQL query');
				res.json({
					"Error": false,
					"Message": "OK"
				});
			}
		});
	});

	router.post(urlBase + 'image', function(req, res) {
		printRequest(urlBase + "image" + " post", "magenta");
		printRequest(req, "magenta");
		upload(req, res, function(err) {
			if(err) {
				printRequest('Error executing MySQL query:' + req, "red");
				printRequest(err.message, "red");
				return res.end("Error uploading file.");
			}
			res.end(completePathFile);
		});
	});
};

module.exports = articulosDAO;