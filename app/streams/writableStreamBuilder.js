'use strict';

const { Writable } = require('stream');

module.exports = (options) => {
	const { handler, highWaterMark, objectMode } = options;

	class WritableStream extends Writable {
		// eslint-disable-next-line class-methods-use-this
		async _write(chunk, encoding, done) {
			await handler(await chunk);
			done();
		}
	}

	return new WritableStream({ highWaterMark, objectMode });
};
