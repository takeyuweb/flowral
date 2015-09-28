

import FlowralDispatcher from './FlowralDispatcher';


/**
 * デフォルトのコンテキスト名
 * @type {string}
 */
export const DefaultContextName = '__DEFAULT_CONTEXT__';


let __context_pool__ = {};



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
export function context(key, proc) {

	if (0 === arguments.length || key instanceof Function) {
		proc = key;
		key = void 0;
	}

	if (!key) {
		key = DefaultContextName;
	}

	if (!__context_pool__.hasOwnProperty(key)) {
		if (!proc) {
			throw new Error(`Context "${key}" not found.`);
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
export class FlowralContext
{
	constructor() {

		this.__actions__ = new FlowralDispatcher();
	}


	/**
	 * @returns {FlowralDispatcher|*}
	 */
	get actions() {

		return this.__actions__;
	}
}


export default FlowralContext;
