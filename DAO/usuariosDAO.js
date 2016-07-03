var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var daoName = " usuariosDAO";
function usuariosDAO(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
    dateGenerator.printInfo(daoName +" agregado correctamente");
}

function printRequest(data) {
    dateGenerator.printInfo(daoName + " " + data);
}
//si se trata de una sql request de update o de insert, la variable req.body contiene
//al JSON con la informacion enviada desde el servicio
//si se trata de una sql request get o delete, la informacion esta contenida en un solo
//argumento, el url, ver detalles mas abajo
usuariosDAO.prototype.handleRoutes = function(router, connection, md5) {
    var tableName = "USUARIO";
    var urlBase = "/usuario";
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
                    "Usuarios": rows
                });
            }
        });
    });

    router.post(urlBase, function(req, res) {
        printRequest(urlBase, " post");
        var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)";
        var table = [tableName,
                        "NOMBRE",
                        "APELLIDOS",
                        "EMAIL",
                        "PASSWORD",
                        "FK_TIPO_USUARIO",
                        "FOTO",
                        req.body.NOMBRE,
                        req.body.APELLIDOS,
                        req.body.EMAIL,
                        md5(req.body.PASSWORD),
                        req.body.FK_TIPO_USUARIO,
                        req.body.FOTO
                    ];
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
                    "Message": "User Added !"
                });
            }
        });
    });

    router.get(urlBase + "/:id_usuario", function(req, res) {
        printRequest(urlBase + " :id_usuario" + " get");
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = [tableName, "ID_USUARIO", req.params.id_usuario];
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
                    "Users": rows
                });
            }
        });
    });

    router.get("/authentication/:usuario_email/:usuario_password", function(req, res) {
        printRequest("/authentication/:usuario_email/:usuario_password" + " get");
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        var table = [tableName, "EMAIL", req.params.usuario_email,
                     "usuario_password", md5(req.params.usuario_password)];
        query = mysql.format(query, table);
        printRequest(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({
                    "Message": "Error executing MySQL query"
                });
            } else {
                res.json({
                    "Message": "Success",
                    "Users": rows
                });
            }
        });
    });

    router.put(urlBase, function(req, res) {
        var query = "UPDATE ?? SET ?? = ?, ??=?, ??=? WHERE ?? = ?";
        var table = [tableName, "PASSWORD", md5(req.body.PASSWORD), "FK_TIPO_USUARIO", req.body.FK_TIPO_USUARIO, "FOTO", req.body.FOTO,
                    "ID_USUARIO", req.body.ID_USUARIO];
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
                    "Message": "OK"
                });
            }
        });
    });
    //
    /*
    router.delete("/deleteuser/:user_email", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user_login","user_email", req.params.user_email];
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
                    "Message": "Deleted the user with email " + req.body.user_email
                });
            }
        });
    });*/
};

module.exports = usuariosDAO;