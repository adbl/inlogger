var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ServerActions = {

    signupSuccess: function(login) {
        AppDispatcher.handleServerAction({
            actionType: Constants.USER_SIGNUP_SUCCESS,
            login: login
        })
    },

    signupError: function(error) {
        AppDispatcher.handleServerAction({
            actionType: Constants.USER_SIGNUP_ERROR,
            error: error
        })
    },

    loginError: function(error) {
        AppDispatcher.handleServerAction({
            actionType: Constants.USER_LOGIN_ERROR,
            error: error
        })
    },

    loginSuccess: function(username, password) {
        AppDispatcher.handleServerAction({
            actionType: Constants.USER_LOGIN_SUCCESS,
            username: username,
            password: password
        })
    },

    listLoginsSuccess: function(data) {
        AppDispatcher.handleServerAction({
            actionType: Constants.GET_LOGINS_SUCCESS,
            data: data
        })
    },

    listLoginsError: function(error) {
        AppDispatcher.handleServerAction({
            actionType: Constants.LIST_LOGINS_ERROR,
            error: error
        })
    }

};

module.exports = ServerActions;
