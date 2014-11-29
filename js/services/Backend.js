var ServerActions = require('../actions/ServerActions');

function post(url, data, success, error, options) {
    $.ajax(_.extend({
        // timeout?
        type: "POST",
        url: url,
        contentType: 'application/json; charset=UTF-8',
        cache: false,
        data: data,
        success: success,
        error: error
    }, options ? options : {}));
}

var Backend = {

    signup: function(username, password) {
        post('/api/signup', JSON.stringify({
            username: username,
            password: password
        }), function(data, textStatus, jqXHR) {
            ServerActions.signupSuccess(username);
        }, function(jqXHR, textStatus, textError) {
            ServerActions.signupError(
                textStatus == "error" ? jqXHR.responseText : "unknown error");
        })
    },

    login: function(username, password) {
        post('/api/login', null, function(data, textStatus, jqXHR) {
            debugger
            ServerActions.loginSuccess(username, password)
        }, function(jqXHR, textStatus, textError) {
            var error = "unknown error";
            if (textStatus == "error") {
                if (textError == "UNAUTHORIZED") {
                    error = "Incorrect login or password";
                }
                else {
                    error = jqXHR.responseText;
                }
            }
            ServerActions.loginError(error);
        }, {
            username: username,
            password: password
        })
    }
};

module.exports = Backend;
