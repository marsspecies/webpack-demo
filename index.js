const show = require('./show.js');
const b = require('./b.js');
const path = require('path');
require('./style/a.css');
require('./style/b.css');
console.log(path.resolve(__dirname, 'dist'), __dirname);
show();
b();