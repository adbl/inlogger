var ServerActions = require('../actions/ServerActions');
var Session = require('./Session');

function isUnauthorized(textStatus, textError) {
    return textStatus == "error" &&
        textError == "UNAUTHORIZED";
}

function get(url, auth, success, error, options) {
    errorUnauthorized = function(jqXHR, textStatus, textError) {
        if (isUnauthorized(textStatus, textError)) {
            Session.clear();
            ServerActions.loginError("Your authentication is no longer valid.");
        }
        else {
            error(jqXHR, textStatus, textError);
        }
    };

    $.ajax(_.extend({
        type: "GET",
        url: url,
        username: auth.username,
        password: auth.password,
        success: success,
        error: errorUnauthorized
    }, options ? options : {}));
}

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
            Session.create(username, password);
            ServerActions.authenticated(username, password);
        }, function(jqXHR, textStatus, textError) {
            var error = "unknown error";
            if (isUnauthorized(textStatus, textError)) {
                    error = "Incorrect login or password";
            }
            else if (textStatus == "error") {
                error = jqXHR.responseText;
            }
            ServerActions.loginError(error);
        }, {
            username: username,
            password: password
        })
    },

    listLogins: function(auth) {
        // TODO detect unauthorized and logout?
        get('/api/login/' + auth.username, auth,
            function(data, textStatus, jqXHR) {
                ServerActions.listLoginsSuccess(data)
            }, function(jqXHR, textStatus, textError) {
                ServerActions.listLoginsError(true)
            })
    }
};

module.exports = Backend;
