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
		define(factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.Durata = factory();
	}
}(this, function () {
  "use strict";
  
  var eventTypes = ['update', 'complete'];

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
    this[' listener'] = {complete: []};
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
	 * Returns the progress quotient between 0.0 and 1.0.
	 * 
	 * @returns {Float}
	 */
	function getProgress() {
		var progress = (+(new Date) - this[' startTime']) / this[' duration'];

		return 1 < progress ? 1 : progress;
	}

	/**
	 * Returns the current calculated value
	 * 
	 * @returns {Float}
	 */
	DurataSingleValue.prototype.get = function () {
		return this[' startValue'] + this[' diffValue'] * this[' easing'](getProgress.call(this));
	};

	/**
	 * Returns the current calculated values
	 * 
	 * @returns {Array}
	 */
	DurataMultipleValue.prototype.get = function () {
		return this[' startValues'].map(function (startValue, index) {
			return startValue + this[' diffValues'][index] * this[' easing'](getProgress.call(this));
		}, this);
	};

	/**
	 * Returns the progress quotient between 0.0 and 1.0.
	 * 
	 * @returns {Float}
	 */
	DurataSingleValue.prototype.getProgress = 
  DurataMultipleValue.prototype.getProgress = getProgress;
  
  /**
   * Notifies all listeners of passed event-type.
   * 
   * @param {String} type 
   */
  function dispatch(type) {
    this[' listener'][type].forEach(function (listener) {
      listener.call(this);
    }, this);
  }

  /**
   * Registers an event listener of a passed type.
   * Return true in an update-callback, if you want to interrupt the the update-cycle
   * for this callback.
   * 
	 * @returns {Durata}
   */
	DurataSingleValue.prototype.on = 
  DurataMultipleValue.prototype.on = function (type, callback) {
    if (eventTypes.indexOf(type) === -1) {
      throw new RangeError(
        'Only following values are allowed for event type: ' + eventTypes.join(', ') + '!'
      );
    }

    if (type === 'update') {
      requestAnimationFrame((function update() {
        callback.call(this) || this.isComplete() || requestAnimationFrame(update.bind(this));
      }).bind(this));
    } else {
      if (type === 'complete' && !this[' listener'][type].length) {
        requestAnimationFrame((function completeWatch() {
          this.isComplete()
            ? dispatch.call(this, 'complete')
            : requestAnimationFrame(completeWatch.bind(this));
        }).bind(this));
      }
      this[' listener'][type].push(callback);
    }

    return this;
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