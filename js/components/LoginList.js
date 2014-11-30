var React = require('react');
var bs = require('react-bootstrap');
var Alert = bs.Alert;

var LoginStore = require('../stores/LoginStore');
var Actions = require('../actions/Actions');

var LoginList = React.createClass({

    getInitialState: function() {
        return this._refreshState()
    },

    _refreshState: function() {
        return {
            logins: LoginStore.getRecentLogins(5),
            error: LoginStore.getLoginsError()
        }
    },

    _onChange: function() {
        this.setState(this._refreshState());
    },

    componentDidMount: function() {
        LoginStore.addChangeListener(this._onChange);
        Actions.listLogins();
    },

    componentWillUnmount: function() {
        LoginStore.removeChangeListener(this._onChange);
    },

    render: function() {
        if (this.state.error) {
            return (
              <Alert bsStyle="danger">
                <strong>Sorry!</strong> couldn't load your
                logins, {this.state.error}.
              </Alert>
            )
        }
        else {
            var items = _.map(this.state.logins, function(item) {
               return <p key={item.id}>{item.timestamp.format()}</p>
            })
            return (
                    <div>{items}</div>
            )
        }
    }

});

module.exports = LoginList;
