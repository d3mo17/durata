
const Durata = require('../src/Durata');

global.requestAnimationFrame = cb => setImmediate(()=>cb(Date.now()));

describe('Durata.js', () => {
    it('throws an error, cause of wrong parameter passing', () => {
		expect(() => {
			Durata.create(1, [3], 500);
		}).toThrow(RangeError);
	});

	it('Returns correct complete-state and calls complete-event', () => {
		var deferredComplete = { resolve: null, reject: null };
		deferredComplete.promise = new Promise((resolve, reject) => {
			deferredComplete.resolve = resolve;
			deferredComplete.reject = reject;
		});
		var anim = Durata.create(1, 3, 500);
		anim.on('complete', () => {
			deferredComplete.resolve('completed');
			expect(anim.isComplete()).toBeTruthy();
		})
		expect(anim.isComplete()).toBeFalsy();
		expect(deferredComplete.promise).resolves.toEqual('completed');
	});

	it('Returns correct pause-state and calls resume- and pause-event', () => {
		var deferredPause = { resolve: null, reject: null };
		deferredPause.promise = new Promise((resolve, reject) => {
			deferredPause.resolve = resolve;
			deferredPause.reject = reject;
		});
		var deferredResume = { resolve: null, reject: null };
		deferredResume.promise = new Promise((resolve, reject) => {
			deferredResume.resolve = resolve;
			deferredResume.reject = reject;
		});
		var anim = Durata.create([1, -5], [3, 10], 1500);
		anim.on('pause', (reason) => {
			deferredPause.resolve('paused');
			expect(reason).toBe('Pause for test!')
			expect(anim.isPaused()).toBeTruthy();
			anim.resume('Resume for test!');
		})
		anim.on('resume', (reason) => {
			deferredResume.resolve('resumed');
			expect(reason).toBe('Resume for test!')
		})
		expect(deferredPause.promise).resolves.toEqual('paused');
		expect(deferredResume.promise).resolves.toEqual('resumed');
		anim.pause('Pause for test!');
	});

	it('Returns correct complete-state, pause-state and calls update-event', () => {
		var deferredUpdate = { resolve: null, reject: null };
		deferredUpdate.promise = new Promise((resolve, reject) => {
			deferredUpdate.resolve = resolve;
			deferredUpdate.reject = reject;
		});
		var anim = Durata.create(1, 3, 200);
		anim.on('update', () => {
			deferredUpdate.resolve('updated');
			expect(anim.isComplete()).toBeFalsy();
			expect(anim.isPaused()).toBeFalsy();
		})
		expect(anim.isComplete()).toBeFalsy();
		expect(anim.isPaused()).toBeFalsy();
		expect(deferredUpdate.promise).resolves.toEqual('updated');
	});
});
