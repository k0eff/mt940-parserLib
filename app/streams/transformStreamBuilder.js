'use strict';

const { Transform } = require('stream');

module.exports = (options) => {
	const { handler, objectMode, highWaterMark } = options;

	class TransformStream extends Transform {
		constructor(transformOptions) {
			super({ objectMode, highWaterMark, ...transformOptions });
		}


		async _transform(chunk, encoding, callback) {
			const processed = await handler(chunk);

			if (Array.isArray(processed))
				processed.forEach(each => this.push(each));
			else
				this.push(processed);
			callback();
		}
	}

	return new TransformStream(options);
};
