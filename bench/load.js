console.time('chalk');
const chalk = require('chalk');
console.timeEnd('chalk');

console.time('terminalstyle');
const terminalstyle = require('../index');
console.timeEnd('terminalstyle');

console.time('terminalstyle/colors');
const colors = require('../colors');
console.timeEnd('terminalstyle/colors');

console.time('ansi-colors');
const color = require('ansi-colors');
console.timeEnd('ansi-colors');
