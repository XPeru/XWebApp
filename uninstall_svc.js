var Service = require('node-windows').Service;
 
// Create a new service object 
var svc = new Service({
  name:'XWebApp Service',
  description: 'XWebbApp web server',
  //script: 'C:\\test\\server.js'
  script: require('path').join(__dirname,'server.js')
});
 
// Listen for the "uninstall" event so we know when it's done. 
svc.on('uninstall',function(){
  console.log('XWebApp service uninstall complete.');
});

// Uninstall the service. 
svc.uninstall();