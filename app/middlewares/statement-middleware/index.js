'use strict';

const mt940decoder = require('./mt940.decoder.js')();

// const dummyReturn = require('../../helpers/dummyReturnAsync');


/**
 * @param middlewareActions - array containing the functions that should be reduced
 * @example:
 * const middlewareActions = [
 *	dummyReturn,
 * ];
 */
const statementMiddleware = middlewareActions => (mt940string) => {
	const decodedMt940 = mt940decoder.read(mt940string);
	const enrichedStatements = mt940decoder.applyMiddleware(decodedMt940, middlewareActions);
	return enrichedStatements;
};

module.exports = statementMiddleware;
