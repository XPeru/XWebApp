"use strict";
angular.module('Home', [])

	.controller('homeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
			$scope.comment ="this is usless";
		$rootScope.comment ="this is usless";

		// Landscape export, 2×4 inches
		// var doc = new jsPDF({
		//   orientation: 'landscape',
		//   unit: 'in',
		//   format: [4, 2]
		// });
		// var doc = new jsPDF();

		// // doc.text('Hello world!', 1000, 1000);
		// doc.setFontSize(40);
		// doc.text(35, 25, "Octonyan loves jsPDF");
		// // ("<ul><li>En algun momento vamos a necesitar progress bar?</li><li>En la pag de bootstrap hay un ejemplo de "cover", deberiamos implementar un modulo q forme parte del framework</li>");
		// // doc.save('two-by-four.pdf');
		// 	var source = "<ul><li>En algun momento vamos a necesitar progress bar?</li><li>En la pag de bootstrap hay un ejemplo, deberiamos implementar un modulo q forme parte del framework</li>";
		// 	source = source + "<table><tr><td>Animales</td><td>IQ</td></tr><tr><td>Perro</td><td>30</td></tr><tr><td>Oscar</td><td>0.5</td></tr></table>";
		// 	specialElementHandlers = {
		//         // element with id of "bypass" - jQuery style selector
		//         '#bypassme': function (element, renderer) {
		//             // true = "handled elsewhere, bypass text extraction"
		//             return true
		//         }
		//     };
		//     margins = {
		//         top: 80,
		//         bottom: 60,
		//         left: 40,
		//         width: 522
		//     };
		//     // all coords and widths are in jsPDF instance's declared units
		//     // 'inches' in this case
		//     doc.fromHTML(
		//     source, // HTML string or DOM elem ref.
		//     margins.left, // x coord
		//     margins.top, { // y coord
		//         'width': margins.width, // max width of content on doc
		//         'elementHandlers': specialElementHandlers
		//     },

		//     function (dispose) {
		//         // dispose: object with X, Y of the last line add to the doc 
		//         //          this allow the insertion of new lines after html
		//         doc1.save('Test.pdf');
		//     }, margins);

	}]);