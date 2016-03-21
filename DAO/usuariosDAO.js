var mysql = require("mysql");

function usuariosDAO(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}
//si se trata de una sql request de update o de insert, la variable req.body contiene
//al JSON con la informacion enviada desde el servicio
//si se trata de una sql request get o delete, la informacion esta contenida en un solo
//argumento, el url, ver detalles mas abajo
usuariosDAO.prototype.handleRoutes = function(router, connection, md5) {
    router.get("/", function(req, res) {
        res.json({
            "Message": "Hello World !"
        });
    });
    //user_login -> nombre de la tabla
    router.post("/users", function(req, res) {
        //?? -> valor constante
        //? -> variable
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        //
        var table = ["user_login", "user_email", "user_password", req.body.user_email, md5(req.body.user_password)];
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
                    "Message": "User Added !"
                });
            }
        });
    });

    router.get("/userlist", function(req, res) {
        var query = "SELECT * FROM ??";
        var table = ["user_login"];
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
    //el servicio llama a esta funcion usando solo un argumento
    //aqui se define que parte del url sera user_email
    //req.params contiene la informacion de las variables definidas dentro del url
    router.get("/users/:user_email", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user_login", "user_email", req.params.user_email];
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

    router.get("/authentication/:user_email/:user_password", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        var table = ["user_login", "user_email", req.params.user_email,
                     "user_password", md5(req.params.user_password)];
        query = mysql.format(query, table);
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

    router.put("/users", function(req, res) {
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["user_login", "user_password", md5(req.body.user_password), "user_email", req.body.user_email];
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
                    "Message": "Updated the password for email " + req.body.email
                });
            }
        });
    });
    //
    router.delete("/deleteuser/:user_email", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user_login","user_email", req.params.user_email];
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
                    "Message": "Deleted the user with email " + req.body.user_email
                });
            }
        });
    });
};

module.exports = usuariosDAO;