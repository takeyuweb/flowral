'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _rxLite = require('rx-lite');

var _rxLite2 = _interopRequireDefault(_rxLite);

var FlowralBase = (function () {
	function FlowralBase(context) {
		_classCallCheck(this, FlowralBase);

		if (!context) {
			throw new Error('Must be given context.');
		} else if (!(context instanceof FlowralContext)) {
			console.error('Unexpected context. Expected FlowralContext object.', context);
			throw new Error('Unexpected context. Expected FlowralContext object.');
		}

		this._context = context;
	}

	_createClass(FlowralBase, [{
		key: 'observer',
		value: function observer(key) {
			return this.context.observer(key);
		}
	}, {
		key: 'observable',
		value: function observable(key) {
			return this.context.observable(key);
		}
	}, {
		key: 'subscribe',
		value: function subscribe(key, onNext, onError, onComplete) {
			return this.context.observable(key).subscribe(onNext, onError, onComplete);
		}
	}, {
		key: 'dispatch',
		value: function dispatch(key, data) {
			this.context.observer(key).onNext(data);
		}
	}, {
		key: 'dispatchError',
		value: function dispatchError(key, data) {
			this.context.observer(key).onError(data);
		}
	}, {
		key: 'dispatchComplete',
		value: function dispatchComplete(key, data) {
			this.context.observer(key).onComplete(data);
		}
	}, {
		key: 'context',
		get: function get() {
			return this._context;
		}
	}]);

	return FlowralBase;
})();

exports['default'] = FlowralBase;
module.exports = exports['default'];