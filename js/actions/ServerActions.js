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

    loginSuccess: function(user) {
        AppDispatcher.handleServerAction({
            actionType: Constants.USER_LOGIN_SUCCESS,
            user: user
        })
    }

};

module.exports = ServerActions;
