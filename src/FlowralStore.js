

import FlowralDispatcher from './FlowralDispatcher';
import FlowralContext from './FlowralContext'

export class FlowralStore extends FlowralDispatcher
{
	constructor(context) {

		super();

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

}


export default FlowralStore;