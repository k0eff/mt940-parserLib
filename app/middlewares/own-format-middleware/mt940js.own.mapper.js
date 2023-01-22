'use strict';

module.exports = options => (transaction) => {
	const { country } = options;

	const {
		amount, statementAccount, structuredDetails,
		bankReference, extraDetails,
		transactionType, isReversal, entryDate,
		currency, date, operationType,
	} = transaction;

	return {
		type: ((operationType === 'debit') ? 'payout' : 'payment'), // TODO: test with real transactions
		psp: {
			type: 'wire_transfer',
			id: '5d2ec9630adbf9cd1b94b21d', // TODO: maybe populate this field after writing in the database
			source: {
				id: statementAccount, // IBAN of our own company account / subject account / where the transaction occured
			},
		},
		info: {
			reference: structuredDetails.transactionInfo,
			depositor: {
				name: structuredDetails.correspondent, // ?? TODO: test what if it is a payout?
				address: {
					address_lines: [],
					country, // TODO: change to parameter injected from config
				},
				iban: structuredDetails.accountNumber,
			},
			bank_reference: {
				MsgId: bankReference,
				AcctSvcrRef: '', // not provided by mt940
				PmtInfId: '', // not provided by mt940
				EndToEndId: '', // not provided by mt940

				// TODO: Figure out if bulbank details should be put in a separate entity
				extraDetails,
				transactionType,
				isReversal,
				bankCode: structuredDetails.bankCode ? structuredDetails.bankCode : '',
				localBankTransactionType: structuredDetails.transactionType ? structuredDetails.transactionType : 'NOTPROVIDED',
			},
			bookingDate: entryDate,
		},
		amount: {
			currency,
			value: amount,
		},
		value_date: date,
	};
};
