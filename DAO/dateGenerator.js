var colors = require("colors");

function todayF(text) {
	var objToday = new Date(),
				weekday = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
				dayOfWeek = weekday[objToday.getDay()],
				domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
				dayOfMonth = (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
				months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
				curMonth = months[objToday.getMonth()],
				curYear = objToday.getFullYear(),
				curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
				curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
				curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
				curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
	var todayR = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
	return todayR + " " + text;
}

function printText(text, color) {
	switch(color) {
		case "yellow":
			return console.info(colors.yellow(text));
		case "red":
			return console.info(colors.red(text));
		case "magenta":
			return console.info(colors.magenta(text));
		case "cyan":
			return console.info(colors.cyan(text));
		default:
			return console.info(colors.green(text));
	}
}

function dateGenerator(daoName) {
	this.daoName = daoName;
}


dateGenerator.prototype.printStart = function() {
	printText(todayF(this.daoName) + " has been added successfully");
};

dateGenerator.prototype.printGreen = function(text) {
	printText(todayF(this.daoName) + "\n" + text);
};

dateGenerator.prototype.printSuccess = function() {
	printText(todayF(this.daoName) + 'Success MySQL query');
};

dateGenerator.prototype.printError = function(query, message) {
	printText(todayF(this.daoName) + "\n" + 'Error executing MySQL query:' + query, "red");
	printText(todayF(this.daoName) + "\n" + message, "red");
};

dateGenerator.prototype.printDelete = function(text) {
	printText(todayF(this.daoName) + "\n" + text, "yellow");
};

dateGenerator.prototype.printUpdate = function(text) {
	printText(todayF(this.daoName) + "\n" + text, "magenta");
};

dateGenerator.prototype.printSelect = function(text) {
	printText(todayF(this.daoName) + "\n" + text, "cyan");
};

dateGenerator.prototype.printInsert = function(text) {
	printText(todayF(this.daoName) + "\n" + text, "magenta");
};

module.exports = dateGenerator;