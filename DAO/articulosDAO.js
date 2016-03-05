var mysql = require("mysql");

function ArticulosDAO(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

ArticulosDAO.prototype.handleRoutes = function(router, connection, md5) {

    router.get("/articulosList", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ACT_FLG = '1'";
        var table = ["TBL_ART"];
        query = mysql.format(query, table);
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

    router.post("/articulo", function(req, res) {
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        console.info("----------insert----------------------");
        console.info(req.body);
        var table = ["TBL_ART", "ID_ART", "DESC", "CANT_MED", "VAL_REP", "PR_UNIT",
                                req.body.ID_ART, req.body.DESC, req.body.CANT_MED, req.body.VAL_REP, req.body.PR_UNIT];
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

    router.put("/articulo", function(req, res) {
        var query = "UPDATE ?? SET ?? = ?, UPD_TIM = CURRENT_TIMESTAMP WHERE ?? = ?";
        var table = ["TBL_ART", "DESC", req.body.DESC, "ART_SEQ", req.body.ART_SEQ];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Updated the description for articulo " + req.body.ID_ART
                });
            }
        });
    });

    router.delete("/deleteArticulo/:art_seq", function(req, res) {
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["TBL_ART","ACT_FLG", '0', "ART_SEQ", req.params.art_seq];
        console.info("----------delete----------------------");
        console.info(req.params);
        console.info(table);
        query = mysql.format(query, table);
        console.info(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Deleted the articulo " + req.params.art_seq
                });
            }
        });
    });

};

module.exports = ArticulosDAO;