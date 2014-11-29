var ServerActions = require('../actions/ServerActions');

function post(url, data, success, error) {
    $.ajax({
        // timeout?
        type: "POST",
        url: url,
        contentType: 'application/json; charset=UTF-8',
        cache: false,
        data: data,
        success: success,
        error: error
    });
}

var Backend = {

    signup: function(username, password) {
        post('/api/signup', JSON.stringify({
            username: username,
            password: password
        }), function(data, textStatus, jqXHR) {
            debugger
            console.debug("server success");
        }, function(jqXHR, textStatus, textError) {
            ServerActions.signupError(
                textStatus == "error" ? jqXHR.responseText : "unknown error");
        })
    },

    login: function(username, password) {
        post('/api/login', JSON.stringify({
            username: username,
            password: password
        }), function(data, textStatus, jqXHR) {
            debugger
            console.debug("server success");
        }, function(jqXHR, textStatus, textError) {
            ServerActions.loginError(
                textStatus == "error" ? jqXHR.responseText : "unknown error");
        })
    }
};

module.exports = Backend;
