

import Rx from 'rx-lite';

/**
 * １つ以上の Rx.Disposable を target に関連付けて保存する。
 * target と Rx.Disposable を関連付けて、一度に破棄できる手段を提供するための
 * ユーティリティ関数
 *
 * @param target
 * @param disposables
 */
export function saveDisposable(target, ...disposables) {
	if (!target.hasOwnProperty('__flowralSavedDisposables__')) {
		target.__flowralSavedDisposables__ = [];
	}
	disposables.forEach((disposable) => {
		if (!Rx.Disposable.isDisposable(disposable)) {
			throw new Error('Not a Rx.Disposable.');
		}
		target.__flowralSavedDisposables__.push(disposable);
	});
}

/**
 * target に保存された Rx.Disposable を全て破棄する。
 * @param target
 */
export function disposeAllSavedDisposables(target) {
	if (target.hasOwnProperty('__flowralSavedDisposables__')) {
		target.__flowralSavedDisposables__.forEach((disposable) => {
			disposable.dispose();
		});
		target.__flowralSavedDisposables__.length = 0;
	}
	delete target.__flowralSavedDisposables__;
}


export function checkClearedDisposables(target) {
	if (target.__flowralSavedDisposables__) {
		throw new Error('__flowralSavedDisposables__ are not cleaned!!!');
	}
}