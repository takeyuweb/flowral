"use strict";

import { FlowralContext, DefaultContextName } from './FlowralContext';


export class FlowralAction
{
	constructor(context) {

		if (!context) {
			throw new Error('Must be given context.');
		} else if (!(context instanceof FlowralContext)) {
			console.error('Unexpected context. Expected FlowralContext object.', context);
			throw new Error('Unexpected context. Expected FlowralContext object.');
		}

		this.__context__ = context;
	}

	get context() {

		return this.__context__;
	}

	get actions() {

		return this.__context__.__actions__;
	}

	/**
	 *
	 * @param keyNameValueSet
	 */
	registerSubject(key) {
		this.__context__.__actions__.registerSubject(key);
	}

	dispatch(key, data) {

		this.__context__.__actions__.observer(key).onNext(data);
	}


}


export default FlowralAction;