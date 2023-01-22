'use strict';

module.exports = (t) => { // t = transaction
	if (t.amount < 0) t.operationType = 'debit';
	else t.operationType = 'credit';

	t.amount = Math.abs(t.amount);
	return t;
};
