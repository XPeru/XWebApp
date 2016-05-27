var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
function articulosDAO(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
    dateGenerator.printInfo("articulosDAO agregado correctamente");
}

articulosDAO.prototype.handleRoutes = function(router, connection) {

    router.get("/articulosList", function(req, res) {
        console.info("articulosDAO");
        console.info("http request get /articulosList");
        var query = "SELECT * FROM ?? WHERE ACT_FLG = '1'";
        var table = ["TBL_ART"];
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
                    "Articulos": rows
                });
            }
        });
    });

    router.post("/articulo", function(req, res) {
        console.info("articulosDAO");
        console.info("http request post /articulo");
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        var table = ["TBL_ART", "ID_ART", "DESC", "CANT_MED", "VAL_REP", "PR_UNIT",
                    req.body.ID_ART, req.body.DESC, req.body.CANT_MED, req.body.VAL_REP,
                    req.body.PR_UNIT];
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

    router.put("/articulo", function(req, res) {
        console.info("articulosDAO");
        console.info("http request put /articulo");
        var query = "UPDATE ?? SET ?? = ?, UPD_TIM = CURRENT_TIMESTAMP WHERE ?? = ?";
        var table = ["TBL_ART", "DESC", req.body.DESC, "ART_SEQ", req.body.ART_SEQ];
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
                    "Message": "Updated the description for articulo " + req.body.ID_ART
                });
            }
        });
    });

    router.delete("/deleteArticulo/:art_seq", function(req, res) {
        console.info("articulosDAO");
        console.info("http request delete /deleteArticulo");
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["TBL_ART","ACT_FLG", '0', "ART_SEQ", req.params.art_seq];
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
                    "Message": "Deleted the articulo " + req.params.art_seq
                });
            }
        });
    });

};

module.exports = articulosDAO;