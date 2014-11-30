var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var AppStore = require('../stores/AppStore');

var Backend = require('../services/Backend');
var Session = require('../services/Session');

var Actions = {

    loadSession: function() {
        Session.load()
    },

    clearSession: function() {
        Session.clear();
    },

    login: function(username, password) {
        AppDispatcher.handleViewAction({
            actionType: Constants.USER_LOGIN
        });
        Backend.login(username, password);
    },

    // start background sync loop from here?
    listLogins: function() {
        auth = AppStore.getAuth();
        if (auth) {
            Backend.listLogins(auth);
        }
        // TODO else ?
    },

    signup: function(username, password) {
        AppDispatcher.handleViewAction({
            actionType: Constants.USER_SIGNUP
        });
        Backend.signup(username, password);
    }
};

module.exports = Actions;
