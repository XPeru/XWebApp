var colors = require("colors");

function today() {
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
	return todayR;
}
function dateGenerator(daoName) {
	this.daoName = daoName;
	this.today = today;
}



dateGenerator.prototype.printInfo = function(text, color) {
	var today = this.today();
	var res = today + " " + this.daoName + "\n" + text;
	switch(color) {
		case "yellow":
			return console.info(colors.yellow(res));
		case "red":
			return console.info(colors.red(res));
		case "magenta":
			return console.info(colors.magenta(res));
		case "cyan":
			return console.info(colors.cyan(res));
		default:
			return console.info(colors.green(res));
	}

};

dateGenerator.prototype.printStart = function() {
	var today = this.today();
	return console.info(colors.green(today + " " + this.daoName + " has been added successfully"));
};

module.exports = dateGenerator;