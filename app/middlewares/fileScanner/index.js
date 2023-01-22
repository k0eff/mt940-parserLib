'use strict';

const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);


module.exports = async (options) => {
	// TODO: convert to async / await syntax
	try {
		const { baseDir, encoding, filter } = options;

		let dir;
		fs.readdir(baseDir, { encoding }, (err, dir) => {
			if (err) throw new Error(err);

			// return only files, not directories
			const onlyFiles = dir.filter(e => fs.lstatSync(`${baseDir}${e}`).isDirectory());

			// apply filter
			if (filter) dir = filter(dir);
		});
		return dir;
	} catch (e) {
		process.exit(1);
	}
};
