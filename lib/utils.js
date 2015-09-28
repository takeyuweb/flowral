'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.saveDisposable = saveDisposable;
exports.disposeAllSavedDisposables = disposeAllSavedDisposables;
exports.checkClearedDisposables = checkClearedDisposables;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rxLite = require('rx-lite');

var _rxLite2 = _interopRequireDefault(_rxLite);

/**
 * １つ以上の Rx.Disposable を target に関連付けて保存する。
 * target と Rx.Disposable を関連付けて、一度に破棄できる手段を提供するための
 * ユーティリティ関数
 *
 * @param target
 * @param disposables
 */

function saveDisposable(target) {
	if (!target.hasOwnProperty('__flowralSavedDisposables__')) {
		target.__flowralSavedDisposables__ = [];
	}

	for (var _len = arguments.length, disposables = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		disposables[_key - 1] = arguments[_key];
	}

	disposables.forEach(function (disposable) {
		if (!_rxLite2['default'].Disposable.isDisposable(disposable)) {
			throw new Error('Not a Rx.Disposable.');
		}
		target.__flowralSavedDisposables__.push(disposable);
	});
}

/**
 * target に保存された Rx.Disposable を全て破棄する。
 * @param target
 */

function disposeAllSavedDisposables(target) {
	if (target.hasOwnProperty('__flowralSavedDisposables__')) {
		target.__flowralSavedDisposables__.forEach(function (disposable) {
			disposable.dispose();
		});
		target.__flowralSavedDisposables__.length = 0;
	}
	delete target.__flowralSavedDisposables__;
}

function checkClearedDisposables(target) {
	if (target.__flowralSavedDisposables__) {
		throw new Error('__flowralSavedDisposables__ are not cleaned!!!');
	}
}