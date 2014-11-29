var ServerActions = require('../actions/ServerActions');

var Backend = {
    login: function(username, password) {
        setTimeout(function() {
            console.debug("fail from server");
            ServerActions.loginError("fooba");
        }, 1000);
    }
};

module.exports = Backend;
