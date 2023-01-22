'use strict';


// const { enricher: bulbankEnricher } = require('./bulbank.86.adapter.decoder');
// const transactionDebitCreditEnricher = require('./transactionDebitCreditEnricher.js');

// const dummyReturn = require('../../helpers/dummyReturnAsync');


// const middlewareActions = [
// 	dummyReturn,
// 	bulbankEnricher,
// 	transactionDebitCreditEnricher,
// ];

const applyMiddleware = async (transactions, postProcessMiddleware) => Promise.all(transactions.map(s => postProcessMiddleware.reduce(async (r, a) => a(await r), s)));


const transactionMiddleware = async (statement, middlewareActions) => {
	const s = await statement;
	if (!s.transactions) throw new Error('No transactions');

	const enrichedTransactions = applyMiddleware(s.transactions, middlewareActions);
	return enrichedTransactions;
};

const transactionMiddlewareCreator = middlewareActions => (statement) => {
	let output;
	if (Array.isArray(statement))
		// statements maybe array depending how the function is called
		output = statement.map(each => transactionMiddleware(each, middlewareActions));
	else
		output = transactionMiddleware(statement, middlewareActions);

	return output;
};

module.exports = transactionMiddlewareCreator;
