var mysql = require("mysql");

function ingresosDAO(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
	console.info("ingresosDAO agregado correctamente");
}

ingresosDAO.prototype.handleRoutes = function(router, connection, md5) {
	router.post("/ingresoArt", function(req, res) {
		console.info("ingresosDAO");
        console.info("http request post /ingresoArt");
		var query = "INSERT INTO ??(??) VALUES (?)";
		var table =["tbl_ing", "ID_ING", req.body.ID_ING];
		query = mysql.format(query, table);
		console.info(query);
		connection.query(query, function(err, rows) {
			if(err) {
				console.info('Error executing MySQL query:' + query);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
			} else {
				console.info('Success MySQL query:' + query);
                res.json({
                    "Error": false,
                    "Message": "Ingreso Added !"
                });
			}
		});
	});

	router.post("/ingresoArtDet", function(req, res) {
		console.info("ingresosDAO");
        console.info("http request post /ingresoArtDet");
		var query = "INSERT INTO ??(??, ?? , ?? , ??) VALUES (?, ? , ? , ? )";
		var table = ["tbl_ing_det", "ING_SEQ", "ID_ART", "ID_ALM", "CANT",
			req.body.ING_SEQ, req.body.ID_ART, req.body.ID_ALM, req.body.CANT];

		query = mysql.format(query, table);

		connection.query(query, function(err, rows) {
			if(err) {
				console.info('Error executing MySQL query:' + query);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
			} else {
				console.info('Success MySQL query:' + query);
                res.json({
                    "Error": false,
                    "Message": "Ingreso Added !"
                });
			}

		});
	});

	router.get("/ingresos", function(req, res) {
		console.info("ingresosDAO");
        console.info("http request get /ingresos");
		var query = "SELECT * FROM ?? WHERE ACT_FLG = '1'";
		var table = ["tbl_ing_det"];

		query = mysql.format(query, table);

		connection.query(query, function(err, rows) {
			if(err) {
				console.info('Error executing MySQL query:' + query);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
			} else {
				console.info('Success MySQL query:' + query);
                res.json({
                    "Error": false,
                    "Message": "Success",
                    "Ingresos": rows
                });
			}

		});
	});
};


module.exports = ingresosDAO;