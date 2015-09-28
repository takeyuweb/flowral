'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _FlowralDispatcher2 = require('./FlowralDispatcher');

var _FlowralDispatcher3 = _interopRequireDefault(_FlowralDispatcher2);

var _FlowralContext = require('./FlowralContext');

var _FlowralContext2 = _interopRequireDefault(_FlowralContext);

var FlowralStore = (function (_FlowralDispatcher) {
	_inherits(FlowralStore, _FlowralDispatcher);

	function FlowralStore(context) {
		_classCallCheck(this, FlowralStore);

		_get(Object.getPrototypeOf(FlowralStore.prototype), 'constructor', this).call(this);

		if (!context) {
			throw new Error('Must be given context.');
		} else if (!(context instanceof _FlowralContext2['default'])) {
			console.error('Unexpected context. Expected FlowralContext object.', context);
			throw new Error('Unexpected context. Expected FlowralContext object.');
		}

		this.__context__ = context;
	}

	_createClass(FlowralStore, [{
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

	return FlowralStore;
})(_FlowralDispatcher3['default']);

exports.FlowralStore = FlowralStore;
exports['default'] = FlowralStore;