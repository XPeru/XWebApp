var mysql = require("mysql");

function almacenesDAO(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
	console.info("almacenesDAO added successfuly");
}

almacenesDAO.prototype.handleRoutes = function(router, connection, md5) {
	router.get("/almacenesList", function(req, res) {
		var query = "SELECT * FROM ?? WHERE ACT_FLG = '1'";
		var table = ["TBL_ALM"];
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
                    "Message": "Success",
                    "Almacenes": rows
                });
            }
		});
	});

    router.post("/almacen", function(req, res) {
        var query = "INSERT INTO ??(??) VALUES (?)";
        console.info("----------insert----------------------");
        console.info(req.body);
        var table = ["TBL_ALM", "ID_ALM", req.body.ID_ALM];
        query = mysql.format(query, table);
        console.info(query);
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
                    "Message": "Articulo Added !"
                });
            }
        });
    });

    router.put("/almacen", function(req, res) {
     var query = "UPDATE ?? SET ?? = ?, UPD_TIM = CURRENT_TIMESTAMP WHERE ?? = ?";
     var table =["TBL_ALM", "ID_ALM", req.body.ID_ALM, "ALM_SEQ", req.body.ALM_SEQ];
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

    router.delete("/deleteAlmacen/:alm_seq", function(req, res) {
     var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
     var table = ["TBL_ALM","ACT_FLG", '0', "ALM_SEQ", req.params.alm_seq];
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
                    "Message": "Almacen deleted: " + req.params.art_seq
                });
            }
     });
    });
};


module.exports = almacenesDAO;