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
  
  /**
   * Animating float values.
   * @module Durata
   */

  var eventTypes = ['update', 'complete', 'pause', 'resume', 'stop'];

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
    this[' duration']  = parseInt(duration) || 1000;
    this[' downTime']  = null;
    this[' startTime'] = +(new Date);
    this[' listener']  = {complete: [], pause: [], resume: [], stop: []};
    this[' stopped']   = false;
  }

  /**
   * @constructor
   * @global
   * @private
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
   * @global
   * @private
   *
   * @param {Float[]}  startValues
   * @param {Float[]}  targetValues
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
    var passedTime = this.isPaused() ? this[' downTime'] : (+(new Date) - this[' startTime']);
    var progress = passedTime / this[' duration'];

    return 1 < progress ? 1 : progress;
  }

  /**
   * Returns the current calculated value
   * @method DurataSingleValue#get
   * @returns {Float}
   */
  DurataSingleValue.prototype.get = function () {
    return this[' startValue'] + this[' diffValue'] * this[' easing'](getProgress.call(this));
  };

  /**
   * Returns the current calculated values
   * @method DurataMultipleValue#get
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
   * @method DurataSingleValue#getProgress
   * @returns {Float}
   */
  DurataSingleValue.prototype.getProgress =
  /**
   * Returns the progress quotient between 0.0 and 1.0.
   *
   * @method DurataMultipleValue#getProgress
   * @returns {Float}
   */
  DurataMultipleValue.prototype.getProgress = getProgress;

  /**
   * Stops the progress (shutdown endless loops with requestAnimationFrame-function).
   *
   * @method DurataSingleValue#stop
   * @param {*} reason Data that should be passed to the stop-listener
   * @returns {this}
   */
  DurataSingleValue.prototype.stop =
  /**
   * Stops the progress (shutdown endless loops with requestAnimationFrame-function).
   *
   * @method DurataMultipleValue#pause
   * @param {*} reason Data that should be passed to the stop-listener
   * @returns {this}
   */
  DurataMultipleValue.prototype.stop = function (reason) {
    this[' stopped'] = true;
    dispatch.call(this, 'stop', reason);
  };

  /**
   * Pauses the progress.
   *
   * @method DurataSingleValue#pause
   * @param {*} reason Data that should be passed to the pause-listener
   * @returns {this}
   */
  DurataSingleValue.prototype.pause =
  /**
   * Pauses the progress.
   *
   * @method DurataMultipleValue#pause
   * @param {*} reason Data that should be passed to the pause-listener
   * @returns {this}
   */
  DurataMultipleValue.prototype.pause = function (reason) {
    if (!this.isPaused() && !this.isComplete()) {
      this[' downTime'] = (+(new Date) - this[' startTime']);
      dispatch.call(this, 'pause', reason);
    }
    return this;
  };

  /**
   * Resumes the paused progress.
   *
   * @method DurataSingleValue#resume
   * @param {*} reason Data that should be passed to the resume-listener
   * @returns {this}
   */
  DurataSingleValue.prototype.resume =
  /**
   * Resumes the paused progress.
   *
   * @method DurataMultipleValue#resume
   * @param {*} reason Data that should be passed to the resume-listener
   * @returns {this}
   */
  DurataMultipleValue.prototype.resume = function (reason) {
    if (this.isPaused()) {
      this[' startTime'] = (+(new Date) - this[' downTime']);
      dispatch.call(this, 'resume', reason);
      this[' downTime'] = null;
    }
    return this;
  };

  /**
   * Notifies all listeners of passed event-type.
   *
   * @private
   * @param {String} type
   * @param {*} data
   */
  function dispatch(type, data) {
    this[' listener'][type].forEach(function (listener) {
      listener.call(this, data);
    }, this);
  }

  /**
   * Will be fired on each `requestAnimationFrame` until the animation `isComplete`
   * @event update
   */
  /**
   * Will be fired when the animation `isComplete`
   * @event complete
   */
  /**
   * Will be fired when the animation `isPaused`
   * @event pause
   */
  /**
   * Will be fired when the animation continues after pause
   * @event resume
   */
  /**
   * Will be fired when the animation is stopped
   * @event stop
   */

  /**
   * Registers an event listener of a passed type.
   * Return true in an update-callback, if you want to interrupt the the update-cycle
   * for this callback.
   *
   * @param {String} type Name of the event to listen to
   * @param {Function} callback Action that should be performed on event
   * @method DurataSingleValue#on
   * @returns {this}
   */
  DurataSingleValue.prototype.on =
  /**
   * Registers an event listener of a passed type.
   * Return true in an update-callback, if you want to interrupt the the update-cycle
   * for this callback.
   *
   * @param {String} type Name of the event to listen to
   * @param {Function} callback Action that should be performed on event
   * @method DurataMultipleValue#on
   * @returns {this}
   */
  DurataMultipleValue.prototype.on = function (type, callback) {
    if (eventTypes.indexOf(type) === -1) {
      throw new RangeError(
        'Only following values are allowed for event type: ' + eventTypes.join(', ') + '!'
      );
    }

    if (type === 'update') {
      requestAnimationFrame((function update() {
        this[' stopped'] || callback.call(this) || this.isComplete() || requestAnimationFrame(update.bind(this));
      }).bind(this));
    } else {
      if (type === 'complete' && !this[' listener'][type].length) {
        requestAnimationFrame((function completeWatch() {
          if (this[' stopped']) return;
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
   * Returns whether the animation is paused.
   *
   * @method DurataSingleValue#isPaused
   * @returns {Boolean}
   */
  DurataSingleValue.prototype.isPaused =
  /**
   * Returns whether the animation is paused.
   *
   * @method DurataMultipleValue#isPaused
   * @returns {Boolean}
   */
  DurataMultipleValue.prototype.isPaused = function () {
    return this[' downTime'] !== null;
  };

  /**
   * Returns whether the animation is complete.
   *
   * @method DurataSingleValue#isComplete
   * @returns {Boolean}
   */
  DurataSingleValue.prototype.isComplete =
  /**
   * Returns whether the animation is complete.
   *
   * @method DurataMultipleValue#isComplete
   * @returns {Boolean}
   */
  DurataMultipleValue.prototype.isComplete = function () {
    return !this.isPaused() && this[' duration'] <= +(new Date) - this[' startTime'];
  };

  // Module-API
  return {
    /**
     * Creates an object to run initial float value(s) to target value(s).
     *
     * @alias   module:Durata.create
     * @param   {Float|Float[]} startFloatValue
     * @param   {Float|Float[]} targetFloatValue
     * @param   {Int} duration
     * @param   {Function} easing
     * @returns {DurataSingleValue|DurataMultipleValue}
     * @throws  {RangeError}
     */
    create: function (startFloatValue, targetFloatValue, duration, easing) {
      if (Array.isArray(startFloatValue) && Array.isArray(targetFloatValue)) {
        return new DurataMultipleValue(startFloatValue, targetFloatValue, duration, easing);
      }

      if (Array.isArray(startFloatValue) || Array.isArray(targetFloatValue)) {
        throw new RangeError('Both values - start and target value have to be of the same type!');
      }

      return new DurataSingleValue(startFloatValue, targetFloatValue, duration, easing);
    }
  };
}));