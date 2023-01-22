/* eslint-disable global-require */

'use strict';

const fs = require('fs');

const transformStreamBuilder = require('./app/streams/transformStreamBuilder');
const readableStreamBuilder = require('./app/streams/readableStreamBuilder');
const writableStreamBuilder = require('./app/streams/writableStreamBuilder');

const fileScanner = require('./app/middlewares/fileScanner');

const config = require('./app/config');
const MongoStorage = require('./app/db/mongo')();

const mongoStorage = new MongoStorage({ ...config.mongo });


(async () => {
	try {
		await mongoStorage.connect();


		// load preprocess middleware functions and creator
		const preprocessFun = [];
		const preprocessMiddleware = require('./app/middlewares/preprocess-middleware')(preprocessFun);

		// load statement middleware functions and creator
		const copyAccountToTransaction = require('./app/middlewares/statement-middleware/copyAccountToTransaction.js');
		const statementFun = [
			copyAccountToTransaction,
		];
		const statementMiddleware = require('./app/middlewares/statement-middleware')(statementFun);

		// load transaction middleware functions and creator
		const { enricher: bulbankEnricher } = require('./app/middlewares/transaction-middleware/bulbank.86.adapter.decoder.js');
		const transactionDebitCreditEnricher = require('./app/middlewares/transaction-middleware/transactionDebitCreditEnricher.js');

		const transactionFun = [
			bulbankEnricher,
			transactionDebitCreditEnricher,
		];
		const transactionMiddleware = require('./app/middlewares/transaction-middleware')(transactionFun);


		const filesArray = await fileScanner({
			encoding: 'utf8',
			baseDir: './test/fixtures/mt940-example-messages',
			filter: arr => arr.filter((each) => {
				const a = each.substring(each.length - 4) === '.txt';
				return !!a;
			}),
		});


		// logic starts here


		// get the whole mt940 message
		const file = fs.readFileSync('test/fixtures/mt940-example-messages/bulbank-example-msg.txt', 'utf-8');


		// get the mt940 preprocessed (i.e. change encoding, etc.)


		// const preprocessed = await preprocessMiddleware(file);

		// const processedStatements = await Promise.all(statementMiddleware(preprocessed));

		const readStreamOptions = {
			objectMode: true,
			highWaterMark: 1,
			data: file,
		};


		const preprocessOptions = {
			objectMode: true,
			highWaterMark: 1,
			handler: data => ({ file: preprocessMiddleware(data) }),
		};


		const mt940StatementReaderOptions = {
			objectMode: true,
			highWaterMark: 1,
			handler: data => statementMiddleware(data.file),
		};


		const transactionDecoderStreamOptions = {
			objectMode: true,
			highWaterMark: 1,
			handler: transactionMiddleware,
		};


		const objectToJsonStreamOptions = {
			objectMode: true,
			highWaterMark: 1,
			handler: data => JSON.stringify(data),
		};

		const JsonStringToObjectStreamOptions = {
			objectMode: true,
			highWaterMark: 1,
			handler: data => ({ data }),
		};


		const writeStreamOptions = {
			objectMode: true,
			highWaterMark: 1,
			handler: mongoStorage.write.bind(mongoStorage),
		};


		const initialStream = readableStreamBuilder(readStreamOptions);
		const preprocessStream = transformStreamBuilder(preprocessOptions);
		const mt940StatementReaderStream = transformStreamBuilder(mt940StatementReaderOptions);
		const transactionDecoderStream = transformStreamBuilder(transactionDecoderStreamOptions);
		const objectToJsonStream = transformStreamBuilder(objectToJsonStreamOptions);
		const JsonStringToObjectStream = transformStreamBuilder(JsonStringToObjectStreamOptions);
		const dbWriterStream = writableStreamBuilder(writeStreamOptions);


		const a = initialStream
			.pipe(preprocessStream)
			.pipe(mt940StatementReaderStream)
			.pipe(transactionDecoderStream)
			.pipe(objectToJsonStream)
			.pipe(JsonStringToObjectStream)
			.pipe(dbWriterStream);


		console.log(a);

		// const processedTransactions = await Promise.all(transactionMiddleware(processedStatements));
		// console.log(processedTransactions);
	} catch (e) {
		console.log(e);
	}
})();
