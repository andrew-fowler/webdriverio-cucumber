'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _wdioSync = require('wdio-sync');

var __$Getters__ = [];
var __$Setters__ = [];
var __$Resetters__ = [];

function __GetDependency__(name) {
    return __$Getters__[name]();
}

function __Rewire__(name, value) {
    __$Setters__[name](value);
}

function __ResetDependency__(name) {
    __$Resetters__[name]();
}

var __RewireAPI__ = {
    '__GetDependency__': __GetDependency__,
    '__get__': __GetDependency__,
    '__Rewire__': __Rewire__,
    '__set__': __Rewire__,
    '__ResetDependency__': __ResetDependency__
};
var executeHooksWithArgs = _wdioSync.executeHooksWithArgs;

__$Getters__['executeHooksWithArgs'] = function () {
    return executeHooksWithArgs;
};

__$Setters__['executeHooksWithArgs'] = function (value) {
    executeHooksWithArgs = value;
};

__$Resetters__['executeHooksWithArgs'] = function () {
    executeHooksWithArgs = _wdioSync.executeHooksWithArgs;
};

var CUCUMBER_EVENTS = ['handleBeforeFeatureEvent', 'handleAfterFeatureEvent', 'handleBeforeScenarioEvent', 'handleAfterScenarioEvent', 'handleBeforeStepEvent', 'handleStepResultEvent'];

var _CUCUMBER_EVENTS = CUCUMBER_EVENTS;

__$Getters__['CUCUMBER_EVENTS'] = function () {
    return CUCUMBER_EVENTS;
};

__$Setters__['CUCUMBER_EVENTS'] = function (value) {
    CUCUMBER_EVENTS = value;
};

__$Resetters__['CUCUMBER_EVENTS'] = function () {
    CUCUMBER_EVENTS = _CUCUMBER_EVENTS;
};

var HookRunner = (function () {
    function HookRunner(BaseListener, config) {
        _classCallCheck(this, HookRunner);

        this.listener = BaseListener;

        this.beforeFeature = config.beforeFeature;
        this.beforeScenario = config.beforeScenario;
        this.beforeStep = config.beforeStep;
        this.afterFeature = config.afterFeature;
        this.afterScenario = config.afterScenario;
        this.afterStep = config.afterStep;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _getIterator(CUCUMBER_EVENTS), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var fnName = _step.value;

                this.listener[fnName] = HookRunner.prototype[fnName].bind(this);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    _createClass(HookRunner, [{
        key: 'getListener',
        value: function getListener() {
            return this.listener;
        }
    }, {
        key: 'handleBeforeFeatureEvent',
        value: function handleBeforeFeatureEvent(event) {
            var feature = event.getUri ? event : event.getPayloadItem('feature');
            var exec = executeHooksWithArgs(this.beforeFeature, [feature]);
            var done = arguments[1];
            if (done.length === 0) {
                exec.then(function (res) {
                    if (typeof done === 'function') {
                        done(res);
                    }
                    return res;
                });
            }

            return exec.then(function () {
                return done();
            });
        }
    }, {
        key: 'handleBeforeScenarioEvent',
        value: function handleBeforeScenarioEvent(event) {
            var scenario = event.getUri ? event : event.getPayloadItem('scenario');
            var done = arguments[1];
            var exec = executeHooksWithArgs(this.beforeScenario, [scenario]);
            if (done.length === 0) {
                exec.then(function (res) {
                    if (typeof done === 'function') {
                        done(res);
                    }
                    return res;
                });
            }

            return exec['catch'](function () {
                return done();
            });
        }
    }, {
        key: 'handleBeforeStepEvent',
        value: function handleBeforeStepEvent(event) {
            var step = event.getUri ? event : event.getPayloadItem('step');
            var done = arguments[1];
            var exec = executeHooksWithArgs(this.beforeStep, [step]);
            if (done.length === 0) {
                exec.then(function (res) {
                    if (typeof done === 'function') {
                        done(res);
                    }
                    return res;
                });
            }

            return exec['catch'](function () {
                return done();
            });
        }
    }, {
        key: 'handleStepResultEvent',
        value: function handleStepResultEvent(event) {
            var stepResult = event.getStep ? event : event.getPayloadItem('stepResult');
            var done = arguments[1];
            var exec = executeHooksWithArgs(this.afterStep, [stepResult]);
            if (done.length === 0) {
                exec.then(function (res) {
                    if (typeof done === 'function') {
                        done(res);
                    }
                    return res;
                });
            }

            return exec['catch'](function () {
                return done();
            });
        }
    }, {
        key: 'handleAfterScenarioEvent',
        value: function handleAfterScenarioEvent(event) {
            var scenario = event.getUri ? event : event.getPayloadItem('scenario');
            var done = arguments[1];
            var exec = executeHooksWithArgs(this.afterScenario, [scenario]);
            if (done.length === 0) {
                exec.then(function (res) {
                    if (typeof done === 'function') {
                        done(res);
                    }
                    return res;
                });
            }

            return exec['catch'](function () {
                return done();
            });
        }
    }, {
        key: 'handleAfterFeatureEvent',
        value: function handleAfterFeatureEvent(event) {
            var feature = event.getUri ? event : event.getPayloadItem('feature');
            var done = arguments[1];
            var exec = executeHooksWithArgs(this.afterFeature, [feature]);
            if (done.length === 0) {
                exec.then(function (res) {
                    if (typeof done === 'function') {
                        done(res);
                    }
                    return res;
                });
            }

            return exec['catch'](function () {
                return done();
            });
        }
    }]);

    return HookRunner;
})();

var _defaultExport = HookRunner;

if (typeof _defaultExport === 'object' || typeof _defaultExport === 'function') {
    Object.defineProperty(_defaultExport, '__Rewire__', {
        'value': __Rewire__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__set__', {
        'value': __Rewire__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__ResetDependency__', {
        'value': __ResetDependency__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__GetDependency__', {
        'value': __GetDependency__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__get__', {
        'value': __GetDependency__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__RewireAPI__', {
        'value': __RewireAPI__,
        'enumberable': false
    });
}

exports['default'] = _defaultExport;
exports.__GetDependency__ = __GetDependency__;
exports.__get__ = __GetDependency__;
exports.__Rewire__ = __Rewire__;
exports.__set__ = __Rewire__;
exports.__ResetDependency__ = __ResetDependency__;
exports.__RewireAPI__ = __RewireAPI__;
module.exports = exports['default'];
