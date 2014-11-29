var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var Backend = require('../services/Backend');

var Actions = {

    login: function(username, password) {
        AppDispatcher.handleViewAction({
            actionType: Constants.USER_LOGIN
        });
        Backend.login(username, password);
    },

    signup: function(username, password) {
        AppDispatcher.handleViewAction({
            actionType: Constants.USER_SIGNUP
        });
        Backend.signup(username, password);
    }
};

module.exports = Actions;
