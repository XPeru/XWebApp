var mysql = require("mysql");

function usuariosTipoDAO(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
}

function printRequest(url, typeRequest) {
	console.info("usuariosTipoDAO");
	console.info(typeRequest + " http request " + url);
}


usuariosTipoDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "TIPO_USUARIO";
	var urlBase = "/tipousuario";

	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list", "get");
        var query = "SELECT * FROM ??";
        var table = [tableName];
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
                    "Message": "Success",
                    "TiposUsuario": rows
                });
            }
        });
    });

    router.post(urlBase, function(req, res) {
		printRequest(urlBase, "post");
        var query = "INSERT INTO ??(??) VALUES (?)";
        var table = [tableName, "TIPO",
                    req.body.TIPO];
        query = mysql.format(query, table);
        console.info(query);
        connection.query(query, function(err) {
            if (err) {
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

    router.get(urlBase + "/:id_tipo_usuario", function(req, res) {
		printRequest(urlBase + "/:id_tipo_usuario", "get");
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = [tableName, "ID_TIPO_USUARIO", req.params.id_tipo_usuario];
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
                    "Users": rows
                });
            }
        });
    });

	router.delete("/tipousuario/:id_tipo_usuario", function(req, res) {
		printRequest(urlBase + "/:id_tipo_usuario", "delete");
        var query = "DELETE from ?? WHERE ??=?";
        var table = [tableName,"id_tipo_usuario", req.params.id_tipo_usuario];
        query = mysql.format(query, table);
        console.info(query);
        connection.query(query, function(err) {
            if (err) {
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "Deleted the user with id_tipo_usuario " + req.body.id_tipo_usuario
                });
            }
        });
    });

};


module.exports = usuariosTipoDAO;