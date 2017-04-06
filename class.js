/**
 * Created by Administrator on 2017/4/1 0001.
 */
var Class = function () {
    var klass = function () {
        this.init.apply(this, arguments);
    }

    klass.prototype.init = function () {
    };
    klass.fn = klass.prototype;
    /**
     * 委托函数，为了访问初始上下文
     * @param func
     * @returns {Function}
     */
    klass.proxy = function (func) {
        var self = this;
        return (function () {
            return func.apply(self, arguments);
        });
    }
    /**
     * Pub/Sub 发布/订阅模式
     * @param ev
     * @param callback
     * @returns {Class}
     */
    klass.fn.subscribe = function (ev, callback) {
        //创建_callbacks对象，除非已存在
        var calls = this._callbacks || (this._callbacks = {});
        //针对给定事件的key,添加到callbacks对象中
        this._callbacks[ev] = callback;
        return this;
    }
    klass.fn.publish = function () {
        //将arguments对象转换为真正的数组
        var args = Array.prototype.slice.call(arguments, 0);
        //拿出第一个参数，及事件的名称
        var ev = args.shift();
        //如果不存在_callbacks对象则返回
        //或者如果不包含给定的事件
        var callback, calls;
        if (!(calls = this._callbacks))return this;
        if (!(callback = this._callbacks[ev]))return this;
        //触发回调
        callback.apply(this, args);
        return this;
    }

    klass.fn.guid= function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }
    klass.fn.proxy = klass.proxy;
    klass.extend = function (obj) {
        var extended = obj.extended;
        for (var i in obj) {
            klass[i] = obj[i];
        }
        if (extended)extended(klass);
    }

    klass.include = function (obj) {
        var included = obj.included;
        for (var i in obj) {
            klass.fn[i] = obj[i];
        }
        if (included)included(klass);
    }

    return klass;
}
