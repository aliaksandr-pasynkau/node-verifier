'use strict';

var tester = require('./_lib/tester');

exports.examples = tester([
	{
		rules: 'not',
		value: 33,
		error: 'RNOT1'
	},
	{
		rules: 'not hello',
		value: 33,
		error: 'R8'
	},
	{
		rules: 'not format ^3$',
		value: 33,
		expect: true
	},
	{
		rules: 'not format ^3$',
		value: 3,
		verr: {
			rule: 'not',
			params: [ { format: '^3$' } ],
			index: null
		}
	},
	{
		rules: 'not type string',
		value: '',
		verr: {
			rule: 'not',
			params: [ { type: 'string' } ],
			index: null
		}
	},
	{
		rules: 'not type string',
		value: null,
		expect: true
	},
	{
		rules: 'not exact_length 3',
		value: '',
		expect: true
	},
	{
		rules: 'not exact_length 3',
		value: '111',
		verr: {
			rule: 'not',
			params: [ { exact_length: 3 } ],
			index: null
		}
	}
]);
