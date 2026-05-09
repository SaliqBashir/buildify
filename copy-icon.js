const fs = require('fs');
fs.copyFileSync('icon.png', 'app/icon.png');
try {
  fs.unlinkSync('app/favicon.ico');
} catch (e) {}
console.log('done');
