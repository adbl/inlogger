var Cookies = require('cookies-js')

var ServerActions = require('../actions/ServerActions');

var Session = {

    load: function() {
        username = Cookies.get("username")
        password = Cookies.get("password")
        if (username && password) {
            ServerActions.authenticated(username, password)
        }
    },

    create: function(username, password) {
        // TODO should use secure option
        Cookies.set("username", username).set("password", password);
    },

    clear: function() {
        Cookies.expire("username").expire("password");
    }
};

module.exports = Session;
