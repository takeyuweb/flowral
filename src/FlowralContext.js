

import FlowralDispatcher from './FlowralDispatcher';



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

