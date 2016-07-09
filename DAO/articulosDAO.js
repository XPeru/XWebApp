var mysql = require("mysql");
var dateGenerator = require("./dateGenerator.js");
var multer  =   require('multer');
var daoName = "articulosDAO";
function articulosDAO(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
    dateGenerator.printInfo(daoName +" agregado correctamente");
}

function printRequest(data) {
    dateGenerator.printInfo(daoName + " " + data);
}

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('articuloImage');

//si se trata de una sql request de update o de insert, la variable req.body contiene
//al JSON con la informacion enviada desde el servicio
//si se trata de una sql request get o delete, la informacion esta contenida en un solo
//argumento, el url, ver detalles mas abajo
articulosDAO.prototype.handleRoutes = function(router, connection) {
    var tableName = "ARTICULO";
    var urlBase = "/articulo";
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
                    "Articulos": rows
                });
            }
        });
    });

    router.post(urlBase, function(req, res) {
        printRequest(urlBase, " post");
        var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)";
        var table = [tableName,
                        "CODIGO",
                        "DESCRIPCION",
                        "UNIDAD",
                        "PRECIO_UNITARIO",
                        "VALOR_REPOSICION",
                        "FK_CATEGORIA",
                        "IMAGEN",
                        req.body.CODIGO,
                        req.body.DESCRIPCION,
                        req.body.UNIDAD,
                        req.body.PRECIO_UNITARIO,
                        req.body.VALOR_REPOSICION,
                        req.body.FK_CATEGORIA,
                        req.body.IMAGEN
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
                    "Message": "Article Added !"
                });
            }
        });
    });

    router.get(urlBase + "/:id_articulo", function(req, res) {
        printRequest(urlBase + " :id_articulo" + " get");
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = [tableName, "ID_USUARIO", req.params.id_articulo];
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
                    "Articulos": rows
                });
            }
        });
    });

    // router.put(urlBase, function(req, res) {
    //     var query = "UPDATE ?? SET ?? = ?, ??=?, ??=? WHERE ?? = ?";
    //     var table = [tableName, "PASSWORD", md5(req.body.PASSWORD), "FK_TIPO_USUARIO", req.body.FK_TIPO_USUARIO, "FOTO", req.body.FOTO,
    //                 "ID_USUARIO", req.body.ID_USUARIO];
    //     query = mysql.format(query, table);
    //     printRequest(query);
    //     connection.query(query, function(err) {
    //         if (err) {
    //             res.json({
    //                 "Error": true,
    //                 "Message": "Error executing MySQL query"
    //             });
    //         } else {
    //             res.json({
    //                 "Error": false,
    //                 "Message": "OK"
    //             });
    //         }
    //     });
    // });

    router.post(urlBase + '/image', function(req, res) {
        upload(req, res, function(err) {
            if(err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });
};

module.exports = articulosDAO;


// var mysql = require("mysql");
// var dateGenerator = require("./dateGenerator.js");
// function articulosDAO(router, connection) {
//     var self = this;
//     self.handleRoutes(router, connection);
//     dateGenerator.printInfo("articulosDAO agregado correctamente");
// }

// articulosDAO.prototype.handleRoutes = function(router, connection) {

//     router.get("/articulosList", function(req, res) {
//         console.info("articulosDAO");
//         console.info("http request get /articulosList");
//         var query = "SELECT * FROM ?? WHERE ACT_FLG = '1'";
//         var table = ["TBL_ART"];
//         query = mysql.format(query, table);
//         connection.query(query, function(err, rows) {
//             if (err) {
//                 console.info('Error executing MySQL query:' + query);
//                 res.json({
//                     "Error": true,
//                     "Message": "Error executing MySQL query"
//                 });
//             } else {
//                 console.info('Success MySQL query:' + query);
//                 res.json({
//                     "Error": false,
//                     "Message": "Success",
//                     "Articulos": rows
//                 });
//             }
//         });
//     });

//     router.post("/articulo", function(req, res) {
//         console.info("articulosDAO");
//         console.info("http request post /articulo");
//         var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
//         var table = ["TBL_ART", "ID_ART", "DESC", "CANT_MED", "VAL_REP", "PR_UNIT",
//                     req.body.ID_ART, req.body.DESC, req.body.CANT_MED, req.body.VAL_REP,
//                     req.body.PR_UNIT];
//         query = mysql.format(query, table);
//         connection.query(query, function(err, rows) {
//             if (err) {
//                 console.info('Error executing MySQL query:' + query);
//                 res.json({
//                     "Error": true,
//                     "Message": "Error executing MySQL query"
//                 });
//             } else {
//                 console.info('Success MySQL query:' + query);
//                 res.json({
//                     "Error": false,
//                     "Message": "Articulo Added !"
//                 });
//             }
//         });
//     });

//     router.put("/articulo", function(req, res) {
//         console.info("articulosDAO");
//         console.info("http request put /articulo");
//         var query = "UPDATE ?? SET ?? = ?, UPD_TIM = CURRENT_TIMESTAMP WHERE ?? = ?";
//         var table = ["TBL_ART", "DESC", req.body.DESC, "ART_SEQ", req.body.ART_SEQ];
//         query = mysql.format(query, table);
//         connection.query(query, function(err, rows) {
//             if (err) {
//                 console.info('Error executing MySQL query:' + query);
//                 res.json({
//                     "Error": true,
//                     "Message": "Error executing MySQL query"
//                 });
//             } else {
//                 console.info('Success MySQL query:' + query);
//                 res.json({
//                     "Error": false,
//                     "Message": "Updated the description for articulo " + req.body.ID_ART
//                 });
//             }
//         });
//     });

//     router.delete("/deleteArticulo/:art_seq", function(req, res) {
//         console.info("articulosDAO");
//         console.info("http request delete /deleteArticulo");
//         var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
//         var table = ["TBL_ART","ACT_FLG", '0', "ART_SEQ", req.params.art_seq];
//         query = mysql.format(query, table);
//         connection.query(query, function(err, rows) {
//             if (err) {
//                 console.info('Error executing MySQL query:' + query);
//                 res.json({
//                     "Error": true,
//                     "Message": "Error executing MySQL query"
//                 });
//             } else {
//                 console.info('Success MySQL query:' + query);
//                 res.json({
//                     "Error": false,
//                     "Message": "Deleted the articulo " + req.params.art_seq
//                 });
//             }
//         });
//     });

// };

// module.exports = articulosDAO;