'use strict';
/*eslint no-unused-vars:0, no-undefined:0, new-cap:0 */

var _ = require('lodash');
var tester = require('./_lib/tester');
var Verifier = require('./_lib/lib');

exports.flow = {
	standard_call: tester([
		{ rules: 'type string', value: 4, verr: { rule: 'type', params: 'string', index: null } },
		{ rules: 'type string', value: '', expect: true },
		{ rules: [ 'type string' ], value: 4, verr: { rule: 'type', params: 'string', index: null } },
		{ rules: [ 'type string' ], value: '', expect: true },
		{ rules: { type: 'string' }, value: 4, verr: { rule: 'type', params: 'string', index: null } },
		{ rules: { type: 'string' }, value: '', expect: true },
		{ rules: [ { type: 'string' } ], value: 4, verr: { rule: 'type', params: 'string', index: null } },
		{ rules: [ { type: 'string' } ], value: '', expect: true },
		{ rules: [ 'type string', 'max_length 2' ], value: 4, verr: { rule: 'type', params: 'string', index: null } },
		{ rules: [ 'type string', 'max_length 2' ], value: '1', expect: true },
		{ rules: [ { type: 'string' }, { max_length: 2 } ], value: 4, verr: { rule: 'type', params: 'string', index: null } },
		{ rules: [ { type: 'string' }, { max_length: 2 } ], value: '1', expect: true }
	]),

	'create by function': function (test) {
		var verifier1 = new Verifier('type string');
		var verifier2 = Verifier('type string');

		test.ok(_.isEqual(verifier1, verifier2));
		test.done();
	},

	'throws error if rules is incorrect': function (test) {

		test.throws(function () {
			var verifier = new Verifier();

		});

		test.throws(function () {
			var verifier = new Verifier(123);

		});

		test.throws(function () {
			var verifier = new Verifier('');

		});

		test.doesNotThrow(function () {
			var verifier = Verifier([]); // jshint ignore : line

		});

		test.throws(function () {
			var CustomRule = Verifier.Rule.extend({});

		});

		test.throws(function () {
			var CustomRule = Verifier.Rule.extend({ name: 'some' });

		});

		var error = new Error('hello');
		var CustomRule = Verifier.Rule.extend({
			check: function (value, params, done) {
				return error;
			}
		});

		Verifier.Rule.add('some', CustomRule);

		test.throws(function () {
			Verifier.Rule.add();
		});

		test.throws(function () {
			Verifier.Rule.add(123);
		});

		test.doesNotThrow(function () {
			Verifier.Rule.add('some', CustomRule, false);
		});

		test.throws(function () {
			Verifier.Rule.add('some');
		});

		test.throws(function () {
			Verifier.Rule.add('some1', 123);
		});

		test.throws(function () {
			Verifier.Rule.add('some1', function () {});
		});

		test.throws(function () {
			var func = function () {};

			func.prototype = { check: function () {} };
			Verifier.Rule.add('some1', function () {});
		});

		test.throws(function () {
			Verifier.Rule.get('some2');
		});

		test.doesNotThrow(function () {
			Verifier.Rule.get('some2', false);
		});

		var rule = new CustomRule();

		var MyCustomRule = CustomRule.extend({
			check: function (aaaa) {
				throw error;
			}
		});

		var myRule = new MyCustomRule();

		rule.verify(123, function (err) {
			test.ok(err === error);

			myRule.verify(234, function (err) {
				test.ok(err === error);

				var MyRule2 = Verifier.Rule.extend({
					check: function (value, params, done) {
						done();
						done();
						done();
						done();
					}
				});

				var myRule2 = new MyRule2(123);

				myRule2.verify(123, function () {
					test.done();
				});
			});
		});
	}
};
