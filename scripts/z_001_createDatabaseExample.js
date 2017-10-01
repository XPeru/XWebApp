var connection = require("../utils/standalone.js").connection();

connection.beginTransaction(function (err) {
	if (err) {
		throw err;
	}
	console.log('Connection started normally');
	var db_name = 'new_schema';
	//returns a function that calls the generator with its own arguments
	//then returns a Promise that executes the coroutine 'generator' until its completion, or until an error in which case it calls 'reject' with this error
	cf = function (generator) {
	    return function () {
	        var that = this;
	        return new Promise((resolve, reject) => {
	            var it = generator.apply(that, arguments);
	            function onResolved(value) {
	                var yielded;
	                try {
	                    yielded = it.next(value);
	                } catch (e) {
	                    reject(e);
	                    return;
	                }
	                next(yielded);
	            }
	            function onRejected(err) {
	                var yielded;
	                try {
	                    yielded = it.throw(err); // throw async errors in the generator
	                } catch (e) {
	                    reject(e);
	                    return;
	                }
	                next(yielded); //they have been caught in a try/catch, continue normally
	            }
	            function next(yielded) {
	                if (yielded.done) {
	                    resolve(yielded.value);
	                    return;
	                }
	                if (! yielded.value.then) {
	                    reject(new Error("Generator yields something that is not a promise: " + generator));
	                    return;
	                }
	                yielded.value.then(onResolved, onRejected);
	            }
	            onResolved();
	        });
	    };
	};

	//returns an express route that executes the async function (or the generator) until its completion, or until an error in which case it calls 'next' with this error
	cr = function (asyncFunc) {
	    if (asyncFunc.constructor.name === "GeneratorFunction") {
	        asyncFunc = cf(asyncFunc);
	    }
	    return function (req, res, next) {
	        asyncFunc(req, res).then((val) => {
	            if (typeof val !== "undefined") {
	                res.json(val);
	            }
	        }).catch(next);
	    };
	};

	function *test(){
		var req1 = yield new Promise (function(resolve, reject) {
		connection.query('CREATE DATABASE IF NOT EXISTS ' + db_name);});
		var req2 = yield new Promise (function(resolve, reject) { connection.commit()});
		console.log('Database ' + db_name + ' created');
		var req3 = yield new Promise (function(resolve, reject) { connection.end()});
		console.log('Connection closed normally');
	};
	var it = test();
	it.next();
	it.next();
	it.next();
	it.next();
	// catch(function(e){
	// 	connection.rollback();
	// });
});
