/*The recommended way to install node-windows is with npm, using the global flag:
npm install -g node-windows
Then, in your project root, run:
npm link node-windows
Referencia:
https://www.npmjs.com/package/node-windows
*/
var Service = require('node-windows').Service;
 
// Create a new service object 
var svc = new Service({
  name:'XWebApp Service',
  description: 'XWebApp web server',
  //script: require('path').join('C:\\test\\', 'server.js')
  script: require('path').join(__dirname,'server.js')
});

// Message to be displayed after installation.
svc.on('install',function(){
  console.log('XWebApp service install complete.');
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  console.log('This service is already installed.');
});

svc.install();