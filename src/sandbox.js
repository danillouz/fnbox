'use strict';

const vm = require('vm');

const SANDBOX_TIMEOUT = 1e3;

module.exports = function sandbox(fn) {
	if (typeof fn !== 'string') {
		throw new Error('Invalid sanbox data received');
	}

	try {
		console.time('sandbox');

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

		console.log('compiledFn: ', compiledFn);
		console.log('result: ', result);
		console.timeEnd('sandbox');

		return Promise.resolve(result);
	} catch (err) {
		return Promise.reject(err);
	}
};
