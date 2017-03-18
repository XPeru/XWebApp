var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("usuariosAccesoDAO");
function usuariosAccesoDAO(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
    dateGeneratorO.printStart();
}

usuariosAccesoDAO.prototype.handleRoutes = function(router, connection) {
	var urlBase = "/accesousuario";

	router.get(urlBase + "list", function(req, res) {
		dateGeneratorO.printSelect(urlBase + "list");
        var query = "CALL SP_SEARCH_ALL('ACCESO_USUARIO')";
        var table = [];
        query = mysql.format(query, table);
        dateGeneratorO.printSelect(query);
        connection.query(query, function(err, rows) {
            if (err) {
               dateGeneratorO.printError(query, err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
                    "Message": "Success",
                    "AccesosUsuario": rows[0]
                });
            }
        });
    });

    router.post(urlBase, function(req, res) {
		dateGeneratorO.printInsert(urlBase);
        var query = "INSERT INTO " + "\n" +
                    "   ACCESO_USUARIO (" + "\n" +
                    "       DESCRIPCION" + "\n" +
                    "   ) VALUES (" + "\n" +
                    "       ?" + "\n" +
                    "   )";
        var table = [req.body.DESCRIPCION];
        query = mysql.format(query, table);
        dateGeneratorO.printInsert(query);
        connection.query(query, function(err) {
            if (err) {
               dateGeneratorO.printError(query, err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
                    "Message": "Acceso Usuario Agregado"
                });
            }
        });
    });

    router.put(urlBase, function(req, res) {
        dateGeneratorO.printUpdate(urlBase);
        var query = "UPDATE " + "\n" +
                    "   ACCESO_USUARIO " + "\n" +
                    "SET " + "\n" +
                    "   DESCRIPCION = ? " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_ACCESO_USUARIO = ?";
        var table = [req.body.DESCRIPCION, req.body.ID_ACCESO_USUARIO];
        query = mysql.format(query, table);
        dateGeneratorO.printUpdate(query);
        connection.query(query, function(err) {
            if (err) {
               dateGeneratorO.printError(query, err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
                    "Message": "Tipo Usuario modificado"
                });
            }
        });
    });

    router.get(urlBase + "/:id_acceso_usuario", function(req, res) {
		dateGeneratorO.printSelect(urlBase + "/:id_acceso_usuario");
        var query = "CALL SP_SEARCH('ACCESO_USUARIO','ID_ACCESO_USUARIO',?)";
        var table = [req.params.id_acceso_usuario];
        query = mysql.format(query, table);
        dateGeneratorO.printSelect(query);
        connection.query(query, function(err, rows) {
            if (err) {
               dateGeneratorO.printError(query, err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
                    "Message": "Success",
                    "AccesoUsuario": rows[0]
                });
            }
        });
    });

	router.delete(urlBase + "/:id_acceso_usuario", function(req, res) {
		dateGeneratorO.printDelete(urlBase + "/:id_acceso_usuario");
        var query = "DELETE FROM " + "\n" +
                    "   ACCESO_USUARIO " + "\n" +
                    "WHERE " + "\n" +
                    "   ID_ACCESO_USUARIO=?";
        var table = [req.params.id_acceso_usuario];
        query = mysql.format(query, table);
        dateGeneratorO.printDelete(query);
        connection.query(query, function(err) {
            if (err) {
               dateGeneratorO.printError(query, err.message);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else {
				dateGeneratorO.printSuccess();
				res.json({
					"Error": false,
                    "Message": "Deleted the user with id_acceso_usuario " + req.params.id_acceso_usuario
                });
            }
        });
    });

};


module.exports = usuariosAccesoDAO;