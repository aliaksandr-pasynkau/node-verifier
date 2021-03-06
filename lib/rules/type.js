'use strict';

var _ = require('lodash');
var Rule = require('./base/rule');

module.exports = Rule.extend({
	check: function (value, params, done) {
		return Object.prototype.toString.call(value).toLowerCase() === params;
	},

	prepareParams: function (params) {
		if (params && _.isString(params)) {
			return '[object ' + params.trim().toLowerCase() + ']';
		}

		throw new Error('#RTYPE1: invalid params type, must be String');
	}
});
