'use strict';

const vm = require('vm');
const debug = require('debug');

const SANDBOX_TIMEOUT = 1e3;

const log = debug('funbox:sanbox');

module.exports = function sandbox(fn) {
	if (typeof fn !== 'string') {
		throw new Error('Invalid sanbox data received');
	}

	try {
		const script = new vm.Script(fn);

		const sandbox = {
			console,
			setTimeout
		};

		const context = new vm.createContext(sandbox);

		const opt = {
			timeout: SANDBOX_TIMEOUT
		};

		const compiledFn = script.runInContext(context, opt);
		const result = compiledFn();

		log('compiledFn: ', compiledFn);
		log('result: ', result);

		return Promise.resolve(result);
	} catch (err) {
		return Promise.reject(err);
	}
};
