var mysql = require("mysql");

function almacenDAO(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
	console.info("almacenDAO added successfuly");
}

almacenDAO.prototype.handleRoutes = function(router, connection, md5) {
	router.put("/almacenDet", function(req, res) {
		var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?";
		var table =["tbl_alm_det", "CANT", req.body.CANT, "ALM_SEQ", req.body.ALM_SEQ, "ID_ART", req.body.ID_ART];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if (err) {
                console.info('ERROR');
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                console.info('no hay error');
                res.json({
                    "Error": false,
                    "Message": "Almacen detalle updated !"
                });
            }
		});
	});
	
	router.get("/almacen", function(req, res) {
		var query = "SELECT * FROM ??";
		var table =["tbl_alm"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if (err) {
                console.info('ERROR');
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                console.info('no hay error');
                res.json({
                    "Error": false,
                    "Message": "!"
                });
            }
		});
	});
};


module.exports = almacenDAO;