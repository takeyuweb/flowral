'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _rxLite = require('rx-lite');

var _rxLite2 = _interopRequireDefault(_rxLite);

var DefaultKeyName = '__DEFAULT_KEY__';

var FlowralDispatcher = (function () {
	function FlowralDispatcher() {
		_classCallCheck(this, FlowralDispatcher);

		this.observers = {};
		this.observables = {};
		this.registerSubject(DefaultKeyName);
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
		value: function registerObserver(key, observer) {

			if (this.observers[key]) {
				throw new Error('observer key exists already. "' + key + '"');
			}
			if (!observer) {
				throw new Error('Must take an observer.');
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
		value: function registerObservable(key, observable) {

			if (this.observables[key]) {
				throw new Error('Observable key exists already. "' + key + '"');
			}
			if (!observable) {
				throw new Error('Must take an observable.');
			}

			this.observables[key] = observable;
		}

		/**
   * 登録されている Observer を取得する
   * @param key mixed Optional.
   * @returns Rx.Observer
   */
	}, {
		key: 'observer',
		value: function observer(key) {

			if (!key) {
				key = DefaultKeyName;
			}
			if (!this.observers[key]) {
				throw new Error('Observer key not found. ' + key);
			}

			return this.observers[key];
		}

		/**
   * 登録されている Observable を取得する
   * @param key mixed Optional.
   * @returns Rx.Observable
   */
	}, {
		key: 'observable',
		value: function observable(key) {

			if (!key) {
				key = DefaultKeyName;
			}
			if (!this.observables[key]) {
				throw new Error('Observable key not found. ' + key);
			}

			return this.observables[key];
		}

		/**
   * 登録されている Observable を購読する。
   * this.observable(key).subscribe(onNext, onError, onComplete) のショートカット
   *
   * @param key mixed Optional.
   * @param onNext
   * @param onError Optional.
   * @param onComplete Optional.
   * @returns Rx.Disposable Optional.
   */
	}, {
		key: 'subscribe',
		value: function subscribe(key, onNext, onError, onComplete) {

			if (typeof key instanceof Function) {
				onComplete = onError;
				onError = onNext;
				onNext = key;
				key = DefaultKeyName;
			}

			return this.observable(key).subscribe(onNext, onError, onComplete);
		}

		/**
   *
   * @param key Optional.
   * @param data Optional.
   */
	}, {
		key: 'dispatch',
		value: function dispatch(key, data) {

			if (arguments.length <= 1) {
				data = key;
				key = DefaultKeyName;
			}

			this.observer(key).onNext(data);
		}

		/**
   *
   * @param key Optional.
   * @param data Optional.
   */
	}, {
		key: 'dispatchError',
		value: function dispatchError(key, data) {

			if (arguments.length <= 1) {
				data = key;
				key = DefaultKeyName;
			}

			this.observer(key).onError(data);
		}

		/**
   *
   * @param key Optional.
   * @param data Optional.
   */
	}, {
		key: 'dispatchComplete',
		value: function dispatchComplete(key, data) {

			if (arguments.length <= 1) {
				data = key;
				key = DefaultKeyName;
			}

			this.observer(key).onComplete(data);
		}
	}]);

	return FlowralDispatcher;
})();

exports.FlowralDispatcher = FlowralDispatcher;
exports['default'] = FlowralDispatcher;