var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var CHANGE_EVENT = 'change';

var user = null;
var loginError = null;
var signupError = null;

function _setLoginError(error) {
    loginError = error;
}

function _setSignupError(error) {
    signupError = error;
}

var AppStore = assign({}, EventEmitter.prototype, {

    getLoginError: function() {
        return loginError;
    },

    getSignupError: function() {
        return signupError;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType) {
    case Constants.USER_LOGIN:
        _setLoginError(null);
        break;
    case Constants.USER_LOGIN_ERROR:
        _setLoginError(action.error);
        break;
    case Constants.USER_SIGNUP:
        _setSignupError(null);
        break;
    case Constants.USER_SIGNUP_ERROR:
        _setSignupError(action.error);
        break;
    default:
        return true;
    }

    // All events trigger UI changes
    AppStore.emitChange();
    return true;
});

module.exports = AppStore;
