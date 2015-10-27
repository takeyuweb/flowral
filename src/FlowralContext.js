
import Rx from 'rx-lite';


export default class FlowralContext {

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
	registerObserver(key, observer) {

		if (this.observers[key]) {
			this.registerSubject(key);
		}
		if (!observer) {
			throw new Error('Must take an observer.');
		}

		this.observers[key] = observer;
	}

	/**
	 * Observable を登録する。
	 * @param key
	 * @param observable
	 */
	registerObservable(key, observable) {

		if (this.observables[key]) {
			throw new Error(`Observable key exists already. "${key}"`);
		}
		if (!observable) {
			throw new Error('Must take an observable.');
		}

		this.observables[key] = observable;
	}


	/**
	 * key に対応する Observer を取得する。なければ Rx.Subject を用いて作成される。
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
	 * key に対応する Observable を取得する。なければ Rx.Subject を用いて作成される。
	 * @param key mixed
	 * @returns Rx.Observable
	 */
	observable(key) {

		if (!this.observables[key]) {
			this.registerSubject(key);
		}

		return this.observables[key];
	}

}


