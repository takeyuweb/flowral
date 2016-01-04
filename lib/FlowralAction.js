"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _FlowralDispatcher = require('./FlowralDispatcher');

var _FlowralDispatcher2 = _interopRequireDefault(_FlowralDispatcher);

var FlowralAction = (function () {
	function FlowralAction(dispatcher) {
		_classCallCheck(this, FlowralAction);

		this._dispatcher = dispatcher || new _FlowralDispatcher2["default"]();
	}

	_createClass(FlowralAction, [{
		key: "registerSubject",
		value: function registerSubject(key) {
			var subject = arguments.length <= 1 || arguments[1] === undefined ? void 0 : arguments[1];

			return this.dispatcher.registerSubject(key, subject);
		}
	}, {
		key: "registerObserver",
		value: function registerObserver(key) {
			var observer = arguments.length <= 1 || arguments[1] === undefined ? void 0 : arguments[1];

			return this.dispatcher.registerObserver(key, observer);
		}
	}, {
		key: "registerObservable",
		value: function registerObservable(key) {
			var observable = arguments.length <= 1 || arguments[1] === undefined ? void 0 : arguments[1];

			return this.dispatcher.registerObservable(key, observable);
		}
	}, {
		key: "observer",
		value: function observer(key) {
			return this.dispatcher.observer(key);
		}
	}, {
		key: "observable",
		value: function observable(key) {
			return this.dispatcher.observable(key);
		}
	}, {
		key: "dispatch",
		value: function dispatch(key, data) {
			this.dispatcher.observer(key).onNext(data);
		}
	}, {
		key: "dispatchError",
		value: function dispatchError(key, data) {
			this.dispatcher.observer(key).onError(data);
		}
	}, {
		key: "dispatchComplete",
		value: function dispatchComplete(key, data) {
			this.dispatcher.observer(key).onComplete(data);
		}
	}, {
		key: "dispatcher",
		get: function get() {
			return this._dispatcher;
		}
	}]);

	return FlowralAction;
})();

exports["default"] = FlowralAction;
module.exports = exports["default"];