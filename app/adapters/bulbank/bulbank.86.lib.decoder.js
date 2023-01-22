'use strict';


/**
 * An example of mt940 :86: string
 *
 * 051?00Вътрешнобанков превод FC?20FOREIGN EXCHANGE?30UNCRBGSF?31BG\n64UNCR70001XYZXYZXYZ?32COMPANY_NAME
 */


const FORMAT_REGEX = /^(\w{3})(.{1})(.+)/i;
const DETAIL_REGEX = /^(\d{2})(.+)/i;

const ensureArray = require('../../../app/helpers/ensureArray.js');

const detailCodeMiddlewares = {
	Trim: (value = '') => value.trim(value),

	StringArray(value, filedName, current) {
		return [...(current[filedName] || []), value];
	},
	StringMulti: (separator = ' ') => (value, filedName, current) => {
		const currentValue = current[filedName];
		if (currentValue)
			return `${currentValue}${separator}${value}`;
		return value;
	},

	Integer: (value = '') => Number.parseInt(value, 10),

	__default__: v => v,
};

const def00and20 = {
	name: 'transactionInfo',
	middlewares: [
		detailCodeMiddlewares.Trim,
		detailCodeMiddlewares.StringArray,
	],
};

const def21to27 = {
	name: 'transactionDetails',
	middlewares: [
		detailCodeMiddlewares.StringArray,
	],
};

const correspondentDef = {
	name: 'correspondent',
	middlewares: [
		detailCodeMiddlewares.StringMulti(),
	],
};

const detailCodes = {
	'00': def00and20,
	20: def00and20,
	// 21-27 Детайли по плащането - 21 и 22*65 максимум, от 23 до 27*27 символа максимум
	21: def21to27,
	22: def21to27,
	23: def21to27,
	24: def21to27,
	25: def21to27,
	26: def21to27,
	27: def21to27,
	// 10 - Номер на batch
	10: {
		name: 'batchNumber',
	},
	30: {
		name: 'bankCode',
	},
	31: {
		name: 'accountNumber',
	},
	32: correspondentDef,
	33: correspondentDef,
};

const decode86 = (str = '') => {
	str = str.replace(/(\r\n|\n|\r)/gm, ''); // remove newlines
	const [, transactionType, separator, details] = str.match(FORMAT_REGEX);

	const res = {
		transactionType,
	};

	details.split(separator).forEach((detailString) => {
		// 00Получен превод от друга банка+21 Плащане на Фактура 1200000574 ОТ 26.06.08 и фактура 1200000681  +22ОТ 30.07.08+30UBBSBGSF+31BG56UBBS80021006757020\r\n+32РЕТ БАЛКАН ХОЛИДЕЙЗ ЕООД

		const [, code, value] = detailString.match(DETAIL_REGEX);
		const detailSchema = detailCodes[code] || {};

		const filedName = detailSchema.name ? detailSchema.name : `UNKNOWN_CODE_${code}`;
		const middlewares = ensureArray(detailSchema.middlewares, [detailCodeMiddlewares.__default__]);
		const processedValue = middlewares.reduce((val, middleware) => middleware(val, filedName, res), value);

		res[filedName] = processedValue;
	});
	return res;
};


module.exports = {
	decode86,
};
