"use strict";

import FlowralDispatcher from './FlowralDispatcher';


export default class FlowralAction
{
	constructor(dispatcher) {

		this._dispatcher = dispatcher ||  new FlowralDispatcher();
	}

	get dispatcher() {
		return this._dispatcher;
	}

	registerSubject(key, subject = void 0) {
		return this.dispatcher.registerSubject(key, subject);
	}

	registerObserver(key, observer = void 0) {
		return this.dispatcher.registerObserver(key, observer);
	}

	registerObservable(key, observable = void 0) {
		return this.dispatcher.registerObservable(key, observable);
	}

	observer(key) {
		return this.dispatcher.observer(key);
	}

	observable(key) {
		return this.dispatcher.observable(key);
	}

	dispatch(key, data) {
		this.dispatcher.observer(key).onNext(data);
	}

	dispatchError(key, data) {
		this.dispatcher.observer(key).onError(data);
	}

	dispatchComplete(key, data) {
		this.dispatcher.observer(key).onComplete(data);
	}

}


