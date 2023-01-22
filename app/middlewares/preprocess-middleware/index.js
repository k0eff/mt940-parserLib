'use strict';


const createReducer = reducerActionsArray => initialValue => reducerActionsArray
	.reduce(
		async (val, fn) => fn(await val),
		initialValue,
	);


/* example module implementation
const reducer = require(this module);
const file = fs.readFileSync('test/fixtures/mt940-example-messages/73700181120190629100227_e54cba80c931487383d3fa663c1b8864.txt', 'utf-8');
const processed = reducer(file);
*/

module.exports = createReducer;
