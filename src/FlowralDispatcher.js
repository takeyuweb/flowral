
import Rx from 'rx-lite';

const DefaultKeyName = '__DEFAULT_KEY__';

export class FlowralDispatcher
{

	constructor() {
		this.observers = {};
		this.observables = {};
		this.registerSubject(DefaultKeyName);
	}

	/**
	 * Subject を追加登録します。
	 *
	 * @param key
	 * @param subject
	 */
	registerSubject(key, subject = void 0) {

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
			throw new Error(`observer key exists already. "${key}"`);
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
	 * 登録されている Observer を取得する
	 * @param key mixed Optional.
	 * @returns Rx.Observer
	 */
	observer(key) {

		if (!key) {
			key = DefaultKeyName;
		}
		if (!this.observers[key]) {
			throw new Error(`Observer key not found. ${key}`);
		}

		return this.observers[key];
	}

	/**
	 * 登録されている Observable を取得する
	 * @param key mixed Optional.
	 * @returns Rx.Observable
	 */
	observable(key) {

		if (!key) {
			key = DefaultKeyName;
		}
		if (!this.observables[key]) {
			throw new Error(`Observable key not found. ${key}`);
		}

		return this.observables[key];
	}

	/**
	 * 登録されている Observable を購読する。
	 * this.observable(key).subscribe(onNext, onError, onComplete) のショートカット
	 *
	 * @param key mixed Optional.
	 * @param onNext
	 * @param onError Optional.
	 * @param onComplete Optional.
	 * @returns Rx.Disposable Optional.
	 */
	subscribe(key, onNext, onError, onComplete) {

		if (typeof key instanceof Function) {
			onComplete = onError;
			onError = onNext;
			onNext = key;
			key = DefaultKeyName;
		}

		return this.observable(key).subscribe(onNext, onError, onComplete);
	}

	/**
	 *
	 * @param key Optional.
	 * @param data Optional.
	 */
	dispatch(key, data) {

		if (arguments.length <= 1) {
			data = key;
			key = DefaultKeyName;
		}

		this.observer(key).onNext(data);
	}

	/**
	 *
	 * @param key Optional.
	 * @param data Optional.
	 */
	dispatchError(key, data) {

		if (arguments.length <= 1) {
			data = key;
			key = DefaultKeyName;
		}

		this.observer(key).onError(data);
	}

	/**
	 *
	 * @param key Optional.
	 * @param data Optional.
	 */
	dispatchComplete(key, data) {

		if (arguments.length <= 1) {
			data = key;
			key = DefaultKeyName;
		}

		this.observer(key).onComplete(data);
	}

}


export default FlowralDispatcher;