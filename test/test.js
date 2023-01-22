'use strict';

const fs = require('fs');
console.log(__filename)

const bulBank86Middleware = require('../app/adapters/bulbank/bulbank.86.mapper');
const parser = require('../index');


const a = parser.read(fs.readFileSync('test/fixtures/mt940-example-messages/73700181120190702100120_448e3f8ff5f844d481fe01f0a85fdbea.txt', 'utf-8'),
	bulBank86Middleware);

console.log(JSON.stringify(a, null, '\t'));
