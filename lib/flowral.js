'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.context = context;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _FlowralContext = require('./FlowralContext');

var _FlowralContext2 = _interopRequireDefault(_FlowralContext);

var _FlowralAction = require('./FlowralAction');

var _FlowralAction2 = _interopRequireDefault(_FlowralAction);

var _FlowralStore = require('./FlowralStore');

var _FlowralStore2 = _interopRequireDefault(_FlowralStore);

var _utils = require('./utils');

var utils_ = _interopRequireWildcard(_utils);

var FlowralContext = _FlowralContext2['default'];
exports.FlowralContext = FlowralContext;
var FlowralAction = _FlowralAction2['default'];
exports.FlowralAction = FlowralAction;
var FlowralStore = _FlowralStore2['default'];
exports.FlowralStore = FlowralStore;
var utils = utils_;

exports.utils = utils;
var __pool__ = {};

/**
 * コンテキストを取得または作成する。
 * コンテキストを作成するときは、必ず proc を指定し、初期化はその関数内で行う。
 * なお、key を指定しない時、デフォルトコンテキストが得られる。
 * 未作成のコンテキストを proc 無しにコールすると、例外がスローされる。
 *
 * コンテキストはグローバルにアクセスできるデータ空間として利用できます。
 * コンテキストは単なるデータプールとしても利用できます。
 * そのため、初期化を必要とせずに key に一致するコンテキストを取得できます。
 *
 * @param key String
 * @param proc Function Optional.
 * @returns FlowralContext
 */

function context(key, proc) {

  if (!key) {
    throw new Error('Must be st key.');
  }

  if (!__pool__.hasOwnProperty(key)) {
    if (!proc) {
      throw new Error('Context "' + key + '" not found.');
    }
    __pool__[key] = new FlowralContext();
  }

  if (proc) {
    proc(__pool__[key]);
  }

  return __pool__[key];
}