
import Rx from 'rx-lite';
import FlowralContext from './FlowralContext.js';


export default class FlowralDispatcher
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

	observer(key) {
		return this.context.observer(key);
	}

	observable(key) {
		return this.context.observable(key);
	}

	subscribe(key, onNext, onError, onComplete) {
		return this.context.observable(key).subscribe(onNext, onError, onComplete);
	}

	dispatch(key, data) {
		this.context.observer(key).onNext(data);
	}

	dispatchError(key, data) {
		this.context.observer(key).onError(data);
	}

	dispatchComplete(key, data) {
		this.context.observer(key).onComplete(data);
	}

	registerSubject(key, subject = void 0) {

		return this.context.registerSubject(key, subject);
	}

	registerObserver(key, observer) {

		return this.context.registerObserver(key, observer);
	}

	registerObservable(key, observable) {

		return this.context.registerObservable(key, observable);
	}


}
