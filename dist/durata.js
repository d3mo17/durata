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
     * @constructor
     * @private
     * 
     * @param {Float} startFloatValue 
     * @param {Float} targetFloatValue 
     * @param {Int} duration 
     * @param {Function} easing 
     */
    function Durata(startFloatValue, targetFloatValue, duration, easing) {
        this[' easing'] = typeof easing === 'function'
            ? easing
            : function linearEasing(input) {
                return input;
            };
        this[' startTime'] = +(new Date);
        this[' duration'] = duration || 1000;
        this[' startValue'] = startFloatValue;
        this[' targetValue'] = targetFloatValue;
        this[' diffValue'] = targetFloatValue - startFloatValue;
    }

        /**
         * Returns the current calculated value
         * 
         * @returns {Float}
         */
        Durata.prototype.get = function () {
            var progress = (+(new Date) - this[' startTime']) / this[' duration'];
            
            if (1 < progress) {
                progress = 1;
            }

            return this[' startValue']
                + this[' diffValue'] * this[' easing'](progress);
        };

        /**
         * Returns whether the animation is complete.
         * 
         * @returns {Boolean}
         */
        Durata.prototype.isComplete = function () {
            return this[' duration'] <= +(new Date) - this[' startTime'];
        };

    // Module-API
    return {
        /**
         * Creates an object to run a initial float value to a target value.
         * 
         * @alias   module:Durata.create
         * @returns {Durata}
         */
        create: function (startFloatValue, targetFloatValue, duration, easing) {
            return new Durata(startFloatValue, targetFloatValue, duration, easing);
        }
    };
}));

if (typeof define === 'function' && define.amd) {
    define(['durata'], function (Durata) { return Durata; });
}
