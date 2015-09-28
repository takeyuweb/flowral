'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.context = context;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _FlowralDispatcher = require('./FlowralDispatcher');

var _FlowralDispatcher2 = _interopRequireDefault(_FlowralDispatcher);

/**
 * デフォルトのコンテキスト名
 * @type {string}
 */
var DefaultContextName = '__DEFAULT_CONTEXT__';

exports.DefaultContextName = DefaultContextName;
var __context_pool__ = {};

/**
 * コンテキストを取得または作成する。
 * コンテキストを作成するときは、必ず proc を指定し、初期化はその関数内で行う。
 * なお、key を指定しない時、デフォルトコンテキストが得られる。
 * 未作成のコンテキストを proc 無しにコールすると、例外がスローされる。
 *
 * コンテキストはグローバルにアクセスできるデータ空間として利用できます。
 * コンテキストを分離したい時には、key を指定してください。
 * コンテキストは単なるデータプールとしても利用できます。
 * そのため、初期化を必要とせずに key に一致するコンテキストを取得できます。
 *
 * @param key String|Function Optional.
 * @param proc Function Optional.
 * @returns FlowralContext
 */

function context(key, proc) {

	if (0 === arguments.length || key instanceof Function) {
		proc = key;
		key = void 0;
	}

	if (!key) {
		key = DefaultContextName;
	}

	if (!__context_pool__.hasOwnProperty(key)) {
		if (!proc) {
			throw new Error('Context "' + key + '" not found.');
		}
		__context_pool__[key] = new FlowralContext();
	}

	if (proc) {
		proc(__context_pool__[key]);
	}

	return __context_pool__[key];
}

/**
 * コンテキストオブジェクト
 */

var FlowralContext = (function () {
	function FlowralContext() {
		_classCallCheck(this, FlowralContext);

		this.__actions__ = new _FlowralDispatcher2['default']();
	}

	/**
  * @returns {FlowralDispatcher|*}
  */

	_createClass(FlowralContext, [{
		key: 'actions',
		get: function get() {

			return this.__actions__;
		}
	}]);

	return FlowralContext;
})();

exports.FlowralContext = FlowralContext;
exports['default'] = FlowralContext;