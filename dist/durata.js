/**
 * Requirements: IE9+
 *
 * @param   {Object} root
 * @param   {Function} factory
 *
 * @returns {Object}
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define('durata',factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.Durata = factory();
	}
}(this, function () {
	"use strict";

	/**
	 * @private
	 * 
	 * @param {Int}      duration
	 * @param {Function} easing
	 */
	function Durata(duration, easing) {
		this[' easing'] = typeof easing === 'function'
			? easing
			: function linearEasing(input) {
				return input;
			};
		this[' duration'] = parseInt(duration) || 1000;
		this[' startTime'] = +(new Date);
	}

	/**
	 * @constructor
	 * 
	 * @param {Float}    startValue
	 * @param {Float}    targetValue
	 * @param {Int}      duration
	 * @param {Function} easing
	 */
	function DurataSingleValue(startValue, targetValue, duration, easing) {
		this[' startValue'] = parseFloat(startValue);
		this[' targetValue'] = parseFloat(targetValue);
		this[' diffValue'] = this[' targetValue'] - this[' startValue'];
		
		Durata.call(this, duration, easing);
	}

	/**
	 * @constructor
	 * 
	 * @param {Array}    startValues
	 * @param {Array}    targetValues
	 * @param {Int}      duration
	 * @param {Function} easing
	 */
	function DurataMultipleValue(startValues, targetValues, duration, easing) {

		if (startValues.length != targetValues.length) {
			throw new RangeError(
				'The start values array has to have the same length as the target values array!'
			);
		}

		this[' startValues'] = startValues.map(function (startValue) {
			return parseFloat(startValue);
		});
		this[' targetValues'] = targetValues.map(function (startValue) {
			return parseFloat(startValue);
		});
		this[' diffValues'] = this[' startValues'].map(function (startValue, index) {
			return this[' targetValues'][index] - startValue;
		}, this);
			
		Durata.call(this, duration, easing);
	}

	/**
	 * Returns the quotient of the current progress between start and target time
	 * 
	 * @returns {Float}
	 */
	function getEasedProgressValue() {
		var progress = (+(new Date) - this[' startTime']) / this[' duration'];

		if (1 < progress) {
			progress = 1;
		}

		return this[' easing'](progress);
	}

	/**
	 * Returns the current calculated value
	 * 
	 * @returns {Float}
	 */
	DurataSingleValue.prototype.get = function () {
		return this[' startValue'] + this[' diffValue'] * getEasedProgressValue.call(this);
	};

	/**
	 * Returns the current calculated values
	 * 
	 * @returns {Array}
	 */
	DurataMultipleValue.prototype.get = function () {
		var progessFactor = getEasedProgressValue.call(this);

		return this[' startValues'].map(function (startValue, index) {
			return startValue + this[' diffValues'][index] * progessFactor;
		}, this);
	};

	/**
	 * Returns whether the animation is complete.
	 * 
	 * @returns {Boolean}
	 */
	DurataSingleValue.prototype.isComplete = 
	DurataMultipleValue.prototype.isComplete = function () {
		return this[' duration'] <= +(new Date) - this[' startTime'];
	};

	// Module-API
	return {
		/**
		 * Creates an object to run initial float value(s) to a target value(s).
		 * 
		 * @alias   module:Durata.create
		 * @returns {Durata}
		 */
		create: function (startFloatValue, targetFloatValue, duration, easing) {
			if (Array.isArray(startFloatValue) && Array.isArray(startFloatValue)) {
				return new DurataMultipleValue(startFloatValue, targetFloatValue, duration, easing);
			}

			if (Array.isArray(startFloatValue) || Array.isArray(startFloatValue)) {
				throw new RangeError('Both values - start and target value have to be of the same type!');
			}
			
			return new DurataSingleValue(startFloatValue, targetFloatValue, duration, easing);
		}
	};
}));
if (typeof define === 'function' && define.amd) {
    define(['durata'], function (Durata) { return Durata; });
}
