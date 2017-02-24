'use strict';

const vm = require('vm');

let num = 99;

const fn = `
	arg => {
		console.log('runs in sandbox!: ', arg);
		num = 0;

		return new Promise(
			(resolve, reject) => {
				setTimeout(
					() => resolve('success'),
					4e3
				);
			}
		);
	};
`;

const script = new vm.Script(fn);

const sandbox = {
	console,
	setTimeout
};

const context = new vm.createContext(sandbox);

const opt = {
	timeout: 1e3
};

const compiledFn = script.runInContext(context, opt);

console.log('compiledFn: ', compiledFn);

compiledFn(2)
	.then(res => {
		console.log('Promise result: ', res);
		console.log('num: ', num);
	})
	.catch(err => {
		console.log('Promise error: ', err)
	});
