'use strict';

const ensureArray = (t = [], defaultValue = []) => {
	if (!t)
		return defaultValue;
	if (Array.isArray(t))
		return t;
	return [t];
};

module.exports = ensureArray;
