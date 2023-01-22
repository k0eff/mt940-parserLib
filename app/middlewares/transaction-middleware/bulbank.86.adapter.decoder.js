'use strict';

const { decode86 } = require('../../adapters/bulbank/bulbank.86.lib.decoder');

const mapper = (statement) => { // accepts mt940js statement object
	if (statement.transactions)
		statement.transactions.forEach((t) => {
			t.structuredDetails = decode86(t.details);
		});
	return statement;
};

const enricher = (transaction) => { // accepts mt940js statement object
	transaction.structuredDetails = decode86(transaction.details);
	return transaction;
};

module.exports = { mapper, enricher };
