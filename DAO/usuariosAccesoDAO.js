var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "usuariosAccesoDAO";
function usuariosAccesoDAO(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
    new dateGenerator(daoName + " agregado correctamente");
}

function printRequest(data) {
    new dateGenerator(daoName + " " + data);
}


usuariosAccesoDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "ACCESO_USUARIO";
	var urlBase = "/accesousuario";

	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
        var query = "SELECT * FROM ??";
        var table = [tableName];
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
                    "AccesosUsuario": rows
                });
            }
        });
    });

    router.post(urlBase, function(req, res) {
		printRequest(urlBase, " post");
        var query = "INSERT INTO ??(??) VALUES (?)";
        var table = [tableName, "DESCRIPCION",
                    req.body.DESCRIPCION];
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
                    "Message": "Acceso Usuario Agregado"
                });
            }
        });
    });

    router.put(urlBase, function(req, res) {
        printRequest(urlBase, " put");
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = [tableName, "DESCRIPCION",
                    req.body.DESCRIPCION, "ID_ACCESO_USUARIO", req.body.ID_ACCESO_USUARIO];
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
                    "Message": "Tipo Usuario modificado"
                });
            }
        });
    });

    router.get(urlBase + "/:id_acceso_usuario", function(req, res) {
		printRequest(urlBase + "/:id_acceso_usuario", " get");
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = [tableName, "ID_ACCESO_USUARIO", req.params.id_acceso_usuario];
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
                    "AccesoUsuario": rows
                });
            }
        });
    });

	router.delete("/tipousuario/:id_acceso_usuario", function(req, res) {
		printRequest(urlBase + "/:id_acceso_usuario", " delete");
        var query = "DELETE from ?? WHERE ??=?";
        var table = [tableName, "ID_ACCESO_USUARIO", req.params.id_acceso_usuario];
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
                    "Message": "Deleted the user with id_acceso_usuario " + req.params.id_acceso_usuario
                });
            }
        });
    });

};


module.exports = usuariosAccesoDAO;