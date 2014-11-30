var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var moment = require('moment');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var CHANGE_EVENT = 'change';

var _logins = null;
var _error = null;

function _setLogins(data) {
    var logins = data.logins;
    _.forEach(logins, function(login) {
        login.timestamp = moment.utc(login.timestamp).local()
    });
    _logins = _.sortBy(logins, 'timestamp');
}

function _setLoginsError(error) {
    _logins = null;
    _error = error;
}

var LoginStore = assign({}, EventEmitter.prototype, {

    getRecentLogins: function(count) {
        if (_logins) {
            return _logins.slice(-count).reverse();
        }
        return null;
    },

    getLogins: function() {
        return _logins;
    },

    getLoginsError: function() {
        return _error;
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
    case Constants.GET_LOGINS_SUCCESS:
        _setLogins(action.data);
        LoginStore.emitChange();
        break;
    case Constants.GET_LOGINS_ERROR:
        _setLoginsError(action.error);
        LoginStore.emitChange();
        break;
    }
    return true;
});

module.exports = LoginStore;
