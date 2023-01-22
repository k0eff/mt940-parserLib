'use strict';

const { Readable } = require('stream');

module.exports = (options) => {
	const { objectMode, data } = options;
	delete options.data;

	const str = new Readable({
		objectMode,
		...options,
		async read() {
			if (Array.isArray(data) && data.length > 0)
				data.forEach(each => this.push(each));
			else
				this.push(data);
			this.destroy();
		},
	});

	return str;
};
