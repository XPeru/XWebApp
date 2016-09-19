var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = "usuariosAccesoDAO";
function usuariosAccesoDAO(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
    dateGenerator.printInfo(daoName + " agregado correctamente");
}

function printRequest(data) {
    dateGenerator.printInfo(daoName + "\n" + data);
}


usuariosAccesoDAO.prototype.handleRoutes = function(router, connection) {
	var tableName = "ACCESO_USUARIO";
	var urlBase = "/accesousuario";

	router.get(urlBase + "list", function(req, res) {
		printRequest(urlBase + "list" + " get");
        var query = "SELECT " + "\n" +
                    "   * " + "\n" +
                    "FROM " + "\n" +
                    "   ACCESO_USUARIO";
        var table = [];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err, rows) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
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
        var query = "INSERT INTO " + "\n" +
                    "   ACCESO_USUARIO (" + "\n" +
                    "       DESCRIPCION" + "\n" +
                    "   ) VALUES (" + "\n" +
                    "       ?" + "\n" +
                    "   )";
        var table = [req.body.DESCRIPCION];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
                    "Message": "Acceso Usuario Agregado"
                });
            }
        });
    });

    router.put(urlBase, function(req, res) {
        printRequest(urlBase, " put");
        var query = "UPDATE " + "\n" +
                    "   ACCESO_USUARIO " + "\n" +
                    "SET " + "\n" +
                    "   DESCRIPCION = ? " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_ACCESO_USUARIO = ?";
        var table = [req.body.DESCRIPCION, req.body.ID_ACCESO_USUARIO];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
                    "Message": "Tipo Usuario modificado"
                });
            }
        });
    });

    router.get(urlBase + "/:id_acceso_usuario", function(req, res) {
		printRequest(urlBase + "/:id_acceso_usuario", " get");
        var query = "SELECT " + "\n" +
                    "   * " + "\n" +
                    "FROM " + "\n" +
                    "   ACCESO_USUARIO " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_ACCESO_USUARIO=?";
        var table = [req.params.id_acceso_usuario];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err, rows) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
                    "Message": "Success",
                    "AccesoUsuario": rows
                });
            }
        });
    });

	router.delete(urlBase + "/:id_acceso_usuario", function(req, res) {
		printRequest(urlBase + "/:id_acceso_usuario", " delete");
        var query = "DELETE FROM " + "\n" +
                    "   ACCESO_USUARIO " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_ACCESO_USUARIO=?";
        var table = [req.params.id_acceso_usuario];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err) {
            if (err) {
                console.info('Error executing MySQL query:' + query);
                console.info(err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				console.info('Success MySQL query');
				res.json({
					"Error": false,
                    "Message": "Deleted the user with id_acceso_usuario " + req.params.id_acceso_usuario
                });
            }
        });
    });

};


module.exports = usuariosAccesoDAO;