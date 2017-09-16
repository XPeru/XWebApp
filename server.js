//Express is a minimalist web framework for node.js
const express = require("express");
// This allows our server to parse JSONs objects
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const colors = require('colors');
const path = require("path");
const fileSystem = require("graceful-fs");
const dotenv = require("dotenv");
const compression = require("compression");
const errorHandler = require("errorHandler");

const connectMysql = require("./connectMysql.js");

dotenv.config({ path: ".env.dev" });

var app = express();
app.use(favicon(path.join(__dirname, '/dev/media/favicon.ico')));
app.use(compression());
app.use(errorHandler());
app.use(bodyParser.urlencoded({ limit: "150mb", extended: true }));
app.use(bodyParser.json({ limit: "150mb" }));
var router = express.Router();
app.use('/api', router);
// express.static gaves access to a directory from the browser client
// the __dirname directory becames "public"
// __dirname is the current directory
app.use(express.static(__dirname));

const loadModule = function () {
	return function (file) {
		// avoiding IDE's files
				if (file.charAt(0) === ".") {
		    	return;
				}
        const format = file.slice(-6, -3);
        const mod = require("./DAO/" + file);
        // only DAO files for routes
        if (format === "DAO") {
            const path = file.slice(0, -6);
            app.use("/api/" + path, mod.router);
        }
    };
};
fileSystem.readdirSync("./DAO").forEach(loadModule());
connectMysql.createPoolMysql();


const MAX_DEPTH = 10;
// Delete keys starting by $ to avoid NoSQL injections
var sanitizeInput = function (body, depth = 0) {
    if (body instanceof Object) {
        Object.keys(body).forEach(key => {
            if (/^\$/.test(key) || depth > MAX_DEPTH) {
                delete body[key];
                throw new Error("Body with nested object detected");
            } else {
                sanitizeInput(body[key], depth + 1);
            }
        });
    }
};

app.use(function (req, res, next) {
    sanitizeInput(req.body);
    sanitizeInput(req.query);
    next();
});

app.listen(process.env.PORT, function () {
    console.log(colors.green("All right ! I am alive at Port " + process.env.PORT));
});
// var PDFDocument = require("pdfkit");
// var blobStream  = require("blob-stream");
// // create a document and pipe to a blob
// var doc = new PDFDocument();
// var stream = doc.pipe(blobStream());
