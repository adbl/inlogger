var React = require('react');
var bs = require('react-bootstrap');
var Alert = bs.Alert;
var Table = bs.Table;

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
                <strong>Sorry!</strong> An error occured when loading your list
                of logins.
              </Alert>
            )
        }
        else {
            var items = _.map(this.state.logins, function(item) {
               return (
                   <tr key={item.id}>
                     <td>{item.timestamp.format("dddd MMMM DD, YYYY")}</td>
                     <td>{item.timestamp.format("HH:mm:ss")}</td>
                     <td>{item.timestamp.fromNow()}</td>
                   </tr>
               )
            });
            return (
              <div>
                <p>Here are your most recent logins:</p>
                <Table striped condensed hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items}
                  </tbody>
                </Table>
              </div>
            )
        }
    }

});

module.exports = LoginList;
