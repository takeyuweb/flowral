
import Rx from 'rx-lite';


export default class FlowralDispatcher
{

	constructor() {

		this.observers = {};
		this.observables = {};
	}

	/**
	 * Subject を追加登録します。
	 *
	 * @param key
	 * @param subject
	 */
	registerSubject(key, subject = void 0) {

		if (!key) {
			throw new Error('Subject key name not given.');
		}

		if (!subject) {
			subject = new Rx.Subject();
		}

		this.registerObserver(key, subject);
		this.registerObservable(key, subject);

		return subject;
	}

	/**
	 * Observer を登録する。
	 * @param key
	 * @param observer
	 */
	registerObserver(key, observer = void 0) {

		if (!observer) {
			observer = new Rx.Subject();
		}

		this.observers[key] = observer;
	}

	/**
	 * Observable を登録する。
	 * @param key
	 * @param observable
	 */
	registerObservable(key, observable = void 0) {

		if (!observable) {
			observable = new Rx.Subject();
		}

		this.observables[key] = observable;
	}


	/**
	 * key に対応する Observer を取得する。
	 * @param key mixed
	 * @returns Rx.Observer
	 */
	observer(key) {

		if (!this.observers[key]) {
			this.registerSubject(key);
		}

		return this.observers[key];
	}

	/**
	 * key に対応する Observable を取得する。
	 * @param key mixed
	 * @returns Rx.Observable
	 */
	observable(key) {

		if (!this.observables[key]) {
			this.registerSubject(key);
		}

		return this.observables[key];
	}


	subscribe(key, onNext, onError, onComplete) {
		return this.observable(key).subscribe(onNext, onError, onComplete);
	}

	dispatch(key, data) {
		this.observer(key).onNext(data);
	}

	dispatchError(key, data) {
		this.observer(key).onError(data);
	}

	dispatchComplete(key, data) {
		this.observer(key).onComplete(data);
	}




}
