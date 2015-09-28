"use strict";

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _FlowralContext = require('./FlowralContext');

var FlowralAction = (function () {
	function FlowralAction(context) {
		_classCallCheck(this, FlowralAction);

		if (!context) {
			throw new Error('Must be given context.');
		} else if (!(context instanceof _FlowralContext.FlowralContext)) {
			console.error('Unexpected context. Expected FlowralContext object.', context);
			throw new Error('Unexpected context. Expected FlowralContext object.');
		}

		this.__context__ = context;
	}

	_createClass(FlowralAction, [{
		key: 'registerSubject',

		/**
   *
   * @param keyNameValueSet
   */
		value: function registerSubject(key) {
			this.__context__.__actions__.registerSubject(key);
		}
	}, {
		key: 'dispatch',
		value: function dispatch(key, data) {

			this.__context__.__actions__.observer(key).onNext(data);
		}
	}, {
		key: 'context',
		get: function get() {

			return this.__context__;
		}
	}, {
		key: 'actions',
		get: function get() {

			return this.__context__.__actions__;
		}
	}]);

	return FlowralAction;
})();

exports.FlowralAction = FlowralAction;
exports['default'] = FlowralAction;