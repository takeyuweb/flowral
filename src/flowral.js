
import FlowralContext_ from './FlowralContext';
import FlowralAction_ from './FlowralAction';
import FlowralStore_ from './FlowralStore';
import * as utils_ from './utils';


export let FlowralContext = FlowralContext_;
export let FlowralAction = FlowralAction_;
export let FlowralStore = FlowralStore_;
export let utils = utils_;



let __pool__ = {};



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
export function context(key, proc) {

	if (!key) {
		throw new Error('Must be st key.');
	}

	if (!__pool__.hasOwnProperty(key)) {
		if (!proc) {
			throw new Error(`Context "${key}" not found.`);
		}
		__pool__[key] = new FlowralContext();
	}

	if (proc) {
		proc(__pool__[key]);
	}

	return __pool__[key];
}



