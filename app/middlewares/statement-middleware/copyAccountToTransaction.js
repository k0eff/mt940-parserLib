'use strict';

module.exports = (statement) => {
	const { transactions, accountIdentification } = statement;
	let newTransactions = [];
	if (transactions && Array.isArray(transactions)) newTransactions = transactions.map(t => ({ ...t, statementAccount: accountIdentification }));
	return {
		...statement,
		transactions: newTransactions,
	};
};
