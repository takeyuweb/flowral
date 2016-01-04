'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _rxLite = require('rx-lite');

var _rxLite2 = _interopRequireDefault(_rxLite);

var FlowralDispatcher = (function () {
	function FlowralDispatcher() {
		_classCallCheck(this, FlowralDispatcher);

		this.observers = {};
		this.observables = {};
	}

	/**
  * Subject を追加登録します。
  *
  * @param key
  * @param subject
  */

	_createClass(FlowralDispatcher, [{
		key: 'registerSubject',
		value: function registerSubject(key) {
			var subject = arguments.length <= 1 || arguments[1] === undefined ? void 0 : arguments[1];

			if (!key) {
				throw new Error('Subject key name not given.');
			}

			if (!subject) {
				subject = new _rxLite2['default'].Subject();
			}

			this.registerObserver(key, subject);
			this.registerObservable(key, subject);

			return subject;
		}

		/**
   * Observer を登録する。
   * @param key
   * @param observer
   */
	}, {
		key: 'registerObserver',
		value: function registerObserver(key) {
			var observer = arguments.length <= 1 || arguments[1] === undefined ? void 0 : arguments[1];

			if (!observer) {
				observer = new _rxLite2['default'].Subject();
			}

			this.observers[key] = observer;
		}

		/**
   * Observable を登録する。
   * @param key
   * @param observable
   */
	}, {
		key: 'registerObservable',
		value: function registerObservable(key) {
			var observable = arguments.length <= 1 || arguments[1] === undefined ? void 0 : arguments[1];

			if (!observable) {
				observable = new _rxLite2['default'].Subject();
			}

			this.observables[key] = observable;
		}

		/**
   * key に対応する Observer を取得する。
   * @param key mixed
   * @returns Rx.Observer
   */
	}, {
		key: 'observer',
		value: function observer(key) {

			if (!this.observers[key]) {
				this.registerSubject(key);
			}

			return this.observers[key];
		}

		/**
   * key に対応する Observable を取得する。
   * @param key mixed
   * @returns Rx.Observable
   */
	}, {
		key: 'observable',
		value: function observable(key) {

			if (!this.observables[key]) {
				this.registerSubject(key);
			}

			return this.observables[key];
		}
	}, {
		key: 'subscribe',
		value: function subscribe(key, onNext, onError, onComplete) {
			return this.observable(key).subscribe(onNext, onError, onComplete);
		}
	}, {
		key: 'dispatch',
		value: function dispatch(key, data) {
			this.observer(key).onNext(data);
		}
	}, {
		key: 'dispatchError',
		value: function dispatchError(key, data) {
			this.observer(key).onError(data);
		}
	}, {
		key: 'dispatchComplete',
		value: function dispatchComplete(key, data) {
			this.observer(key).onComplete(data);
		}
	}]);

	return FlowralDispatcher;
})();

exports['default'] = FlowralDispatcher;
module.exports = exports['default'];