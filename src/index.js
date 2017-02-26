'use strict';

const url = require('url');
const { sir, bodyParser } = require('sirver');
const debug = require('debug');
const sandbox = require('./sandbox');

const PORT = 7777;
const HOST = 'localhost';

const log = debug('funbox:index');

const server = sir(async (req, res) => {
	try {
		const { method } = req;
		const { pathname } = url.parse(req.url);

		if (method === 'POST' && pathname === '/run') {
			const { fn } = await bodyParser(req);

			if (!fn) {
				const error = new Error('Function payload is required');

				error.info = 'For example: `{ "fn": "() => 2 + 2" }`';
				error.code = 400;
			}

			const result = await sandbox(fn);

			return res.json({
				fn,
				result
			});
		}

		res.status(404).json({
			error: 'The requested route doesn\'t exist.'
		});
	} catch (err) {
		res.status(err.code || 500).json({
			error: err.toString(),
			info: err.info
		});
	}
});

server.listen(
	PORT,
	HOST,
	err => {
		if (err) {
			console.error('SERVER RUNTIME ERROR: ', err);
		}

		log(`listening on http://${HOST}:${PORT}`);
	}
);
