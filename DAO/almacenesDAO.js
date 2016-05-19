var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
function almacenesDAO(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
	new dateGenerator("almacenesDAO agregado correctamente");
}

almacenesDAO.prototype.handleRoutes = function(router, connection) {
	router.get("/almacenesList", function(req, res) {
        console.info("almacenesDAO");
        console.info("http request get /almacenesList");
		var query = "SELECT * FROM ?? WHERE ACT_FLG = '1'";
		var table = ["TBL_ALM"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if (err) {
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
                    "Almacenes": rows
                });
            }
		});
	});

    router.post("/almacen", function(req, res) {
        console.info("almacenesDAO");
        console.info("http request post /almacen");
        var query = "INSERT INTO ??(??) VALUES (?)";
        var table = ["TBL_ALM", "ID_ALM", req.body.ID_ALM];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                console.info('Success MySQL query:' + query);
                res.json({
                    "Error": false,
                    "Message": "Articulo Added !"
                });
            }
        });
    });

    router.put("/almacen", function(req, res) {
        console.info("almacenesDAO");
        console.info("http request put /almacen");
        var query = "UPDATE ?? SET ?? = ?, UPD_TIM = CURRENT_TIMESTAMP WHERE ?? = ?";
        var table = ["TBL_ALM", "ID_ALM", req.body.ID_ALM, "ALM_SEQ", req.body.ALM_SEQ];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                console.info('Success MySQL query:' + query);
                res.json({
                    "Error": false,
                    "Message": "Almacen detalle updated !"
                });
            }
        });
    });

    router.delete("/deleteAlmacen/:alm_seq", function(req, res) {
        console.info("almacenesDAO");
        console.info("http request delete /deleteAlmacen");
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["TBL_ALM", "ACT_FLG", '0', "ALM_SEQ", req.params.alm_seq];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                console.info('Success MySQL query:' + query);
                res.json({
                    "Error": false,
                    "Message": "Almacen deleted: " + req.params.art_seq
                });
            }
        });
    });
};


module.exports = almacenesDAO;