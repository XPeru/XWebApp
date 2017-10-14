/* global mySqlPool, mysql */
var multer  =   require('multer');
var dateGenerator = require("./dateGenerator.js");
var dateGeneratorO = new dateGenerator("usuarioDAO");
// For hash encryption, used for passwords
const md5 = require('MD5');
//this path has to exist before running the server
var pathUpload = "./dev/media/usuarios/";
var finalNameFile;
var completePathFile;
var nameBase = "userPhoto";
var router = require("express").Router();

dateGeneratorO.printStart();
var storage = multer.diskStorage({

  destination: function (req, file, callback) {
	callback(null, pathUpload);
  },
  filename: function (req, file, callback) {
	finalNameFile = file.fieldname + '-' + Date.now();
	completePathFile = pathUpload + finalNameFile;
	callback(null, finalNameFile);
  }
});
var upload = multer({ storage : storage}).single(nameBase);

router.get("/list", cf( async(req) => {
	dateGeneratorO.printSelect("list");
	var query = "SELECT " + "\n" +
				"	us.ID_USUARIO, " + "\n" +
				"	us.NOMBRE, " + "\n" +
				"	us.APELLIDOS, " + "\n" +
				"	us.EMAIL, " + "\n" +
				"	us.FOTO, " + "\n" +
				"	us.FK_TIPO_USUARIO, " + "\n" +
				"	us.CREATE_TIME, " + "\n" +
				"	us.UPDATE_TIME, " + "\n" +
				"	us.IS_ACTIVE, " + "\n" +
				"	tipo.TIPO" + "\n" +
				"FROM" + "\n" +
				"	USUARIO us" + "\n" +
				"INNER JOIN" + "\n" +
				"	TIPO_USUARIO tipo ON" + "\n" +
				"		tipo.ID_TIPO_USUARIO = us.FK_TIPO_USUARIO" + "\n" +
				"WHERE" + "\n" +
				"	us.IS_ACTIVE = '1'";
	var table = [];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Usuarios: rows
	};
	connection.release();
	return result;
}));

router.post("/", cf( async(req) => {
	dateGeneratorO.printInsert("/");
	var query = "INSERT INTO " + "\n" +
				"	USUARIO (" + "\n" +
				"		NOMBRE," + "\n" +
				"		APELLIDOS," + "\n" +
				"		EMAIL," + "\n" +
				"		PASSWORD," + "\n" +
				"		FK_TIPO_USUARIO," + "\n" +
				"		FOTO" + "\n" +
				"	) VALUES (" + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?," + "\n" +
				"		?" + "\n" +
				"	)";
	var table = [req.body.NOMBRE,
				req.body.APELLIDOS,
				req.body.EMAIL,
				md5(req.body.PASSWORD),
				req.body.FK_TIPO_USUARIO,
				req.body.FOTO];
	query = mysql.format(query, table);
	dateGeneratorO.printInsert(query);
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Message: "OK"
	};
	connection.release();
	return result;
}));

router.get("/:id_usuario", cf( async(req) => {
	dateGeneratorO.printSelect(" :id_usuario");
	var query = "CALL SP_SEARCH('USUARIO','ID_USUARIO',?)";
	var table = [req.params.id_usuario];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Users: rows[0]
	};
	connection.release();
	return result;
}));

router.get("/authentication/:usuario_email/:usuario_password", cf( async(req) => {
	dateGeneratorO.printSelect("/authentication/:usuario_email/:usuario_password");
	var query = "SELECT " + "\n" +
				"	* " + "\n" +
				"FROM " + "\n" +
				"	USUARIO " + "\n" +
				"WHERE " + "\n" +
				"	EMAIL=? " + "\n" +
				"AND " + "\n" +
				"	PASSWORD=?";
	var table = [req.params.usuario_email,
				md5(req.params.usuario_password)];
	query = mysql.format(query, table);
	dateGeneratorO.printSelect(query);
	var connection = await mySqlPool.getConnection();
	var rows = await connection.query(query);
	var result = {
		Users: rows
	};
	connection.release();
	return result;
}));

router.put("/", cf( async(req) => {
	dateGeneratorO.printUpdate("/");
	var query = "UPDATE " + "\n" +
				"	USUARIO" + "\n" +
				"SET" + "\n" +
				"	PASSWORD = ?, " + "\n" +
				"	FK_TIPO_USUARIO = ?, " + "\n" +
				"	FOTO = ?, " + "\n" +
				"	UPDATE_TIME = CURRENT_TIMESTAMP" + "\n" +
				"WHERE" + "\n" +
				"	ID_USUARIO = ?";
	var table = [md5(req.body.PASSWORD),
				req.body.FK_TIPO_USUARIO,
				req.body.FOTO,
				req.body.ID_USUARIO];
	query = mysql.format(query, table);
	dateGeneratorO.printUpdate(query);
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Message: "OK"
	};
	connection.release();
	return result;
}));

router.put("/delete", cf( async(req) => {
	dateGeneratorO.printUpdate("delete");
	var query = "UPDATE" + "\n" +
				"	USUARIO" + "\n" +
				"SET" + "\n" +
				"	IS_ACTIVE = ?," + "\n" +
				"	UPDATE_TIME = CURRENT_TIMESTAMP" + "\n" +
				"WHERE" + "\n" +
				"	ID_USUARIO = ?";
	var table = [!req.body.IS_ACTIVE,
				req.body.ID_USUARIO];
	query = mysql.format(query, table);
	dateGeneratorO.printUpdate(query);
	var connection = await mySqlPool.getConnection();
	await connection.query(query);
	var result = {
		Message: "OK"
	};
	connection.release();
	return result;
}));

router.post("/photo", function (req, res) {
	dateGeneratorO.printInsert("photo");
	dateGeneratorO.printInsert(req);
	upload(req, res, function (error) {
		if (error) {
			dateGeneratorO.printError(req, error.message);
			return res.end("Error uploading file.");
		}
		res.end(completePathFile);
	});
});

exports.router = router;
