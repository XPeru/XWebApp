var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "usuariosAccesoDAO";
function usuariosAccesoDAO(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
    dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data, color) {
    dateGenerator.printInfo(daoName + "\n" + data, color);
}


usuariosAccesoDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/accesousuario";

	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get", "cyan");
        var query = "CALL SP_SEARCH_ALL('ACCESO_USUARIO')";
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
                    "AccesosUsuario": rows[0]
                });
            }
        });
    });

    router.post(urlBase, function(req, res) {
		printRequest(urlBase, " post", "magenta");
        var query = "INSERT INTO " + "\n" +
                    "   ACCESO_USUARIO (" + "\n" +
                    "       DESCRIPCION" + "\n" +
                    "   ) VALUES (" + "\n" +
                    "       ?" + "\n" +
                    "   )";
        var table = [req.body.DESCRIPCION];
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
                    "Message": "Acceso Usuario Agregado"
                });
            }
        });
    });

    router.put(urlBase, function(req, res) {
        printRequest(urlBase + " put", "magenta");
        var query = "UPDATE " + "\n" +
                    "   ACCESO_USUARIO " + "\n" +
                    "SET " + "\n" +
                    "   DESCRIPCION = ? " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_ACCESO_USUARIO = ?";
        var table = [req.body.DESCRIPCION, req.body.ID_ACCESO_USUARIO];
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
                    "Message": "Tipo Usuario modificado"
                });
            }
        });
    });

    router.get(urlBase + "/:id_acceso_usuario", function(req, res) {
		printRequest(urlBase + "/:id_acceso_usuario" + " get", "cyan");
        var query = "CALL SP_SEARCH('ACCESO_USUARIO','ID_ACCESO_USUARIO',?)";
        var table = [req.params.id_acceso_usuario];
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
                    "AccesoUsuario": rows[0]
                });
            }
        });
    });

	router.delete(urlBase + "/:id_acceso_usuario", function(req, res) {
		printRequest(urlBase + "/:id_acceso_usuario" + " delete", "yellow");
        var query = "DELETE FROM " + "\n" +
                    "   ACCESO_USUARIO " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_ACCESO_USUARIO=?";
        var table = [req.params.id_acceso_usuario];
        query = mysql.format(query, table);
        printRequest(query, "yellow");
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
                    "Message": "Deleted the user with id_acceso_usuario " + req.params.id_acceso_usuario
                });
            }
        });
    });

};


module.exports = usuariosAccesoDAO;