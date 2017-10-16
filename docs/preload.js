/**
 * 图片预加载
 */
(function() {
    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    var util = {
        extend: function(target) {
            for (var i = 1, len = arguments.length; i < len; i++) {
                for (var prop in arguments[i]) {
                    if (arguments[i].hasOwnProperty(prop)) {
                        target[prop] = arguments[i][prop]
                    }
                }
            }

            return target
        },
        isArray: function(arr) {
            return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) == '[object Array]'
        },
        isValidListener: function(listener) {
            if (typeof listener === 'function') {
                return true
            } else if (listener && typeof listener === 'object') {
                return util.isValidListener(listener.listener)
            } else {
                return false
            }
        },
        indexOf: function(array, item) {
            if (array.indexOf) {
                return array.indexOf(item);
            } else {
                var result = -1;
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] === item) {
                        result = i;
                        break;
                    }
                }
                return result;
            }
        }
    };

    function Preload(pics, options) {

        if (!util.isArray(pics)) {
            throw new Error('pics must be an array type')
        }

        this.pics = pics;

        this.options = util.extend({}, this.constructor.defaultOptions, options);

        this.index = this.failNum = 0;

        this.init();

    }

    Preload.VERSION = '1.0.0';

    Preload.defaultOptions = {
        complete: function() {},
        progress: function() {}
    };

    var proto = Preload.prototype;

    proto.init = function() {
        for (var i = 0; i < this.pics.length; i++) {
            this.loadImg(pics[i])
        }
    };

    proto.loadImg = function(src) {
        var self = this;
        var img = new Image();
        img.onload = function() {
            img.onload = null;
            self.progress(src, 'success')
        }

        img.onerror = function() {
            self.progress(src, 'fail')
        }

        img.src = src;
    };

    proto.progress = function(src, type) {

    	if (type == 'fail') this.failNum++

        this.index++;

        this.options.progress(this.index, this.pics.length, type);

        if (this.index === this.pics.length) {
            this.options.complete(this.pics.length - this.failNum, this.failNum);
        }
    };

    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = Preload;
        }
        exports.Preload = Preload;
    } else {
        root.Preload = Preload;
    };
}());