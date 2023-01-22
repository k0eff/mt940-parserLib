'use strict';

const mt940js = require('mt940js');


const parser = new mt940js.Parser();

const statementMiddlewareCreator = () => ({
	// generate statements
	read: file => parser.parse(file),

	// applyMiddleware
	applyMiddleware: (statements, postProcessMiddleware) => statements.map(s => postProcessMiddleware.reduce(async (r, a) => a(await r), s)),

	getInstance: () => parser,
});

module.exports = statementMiddlewareCreator;
