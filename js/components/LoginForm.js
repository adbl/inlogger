var React = require('react');

var bs = require('react-bootstrap');
var Input = bs.Input;
var Button = bs.Button;
var Alert = bs.Alert;
var Col = bs.Col;

var AppStore = require('../stores/AppStore');
var Actions = require('../actions/Actions');

var LoginForm = React.createClass({

    getInitialState: function() {
        return {
            username: "",
            password: "",
            error: null,
            waiting: false
        }
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        // FIXME called after login before componentWillUnmount have been called
        this.setState({
            waiting: false,
            error: AppStore.getLoginError()
        });
    },

    _handleSubmit: function(event) {
        event.preventDefault();
        Actions.login(this.state.username, this.state.password);
        this.setState({waiting: true});
        // TODO set state "logging in..."
    },

    _setFields: function(username, password) {
        this.setState({
            username: username,
            password: password,
            // clear error when changing the form
            error: null
        });
    },

    _handleLoginChange: function(event) {
        this._setFields(event.target.value, this.state.password);
    },

    _handlePasswordChange: function(event) {
        this._setFields(this.state.username, event.target.value);
    },

    _allowSubmit: function() {
        return !this.state.waiting &&
            this.state.username.trim() && this.state.password.trim();
    },

    _validationState: function() {
        if (this.state.error) {
            return "error";
        }
        return null;
    },

    render: function() {
        var error = null;
        if (this.state.error) {
            error = (
              <Alert className="h4" bsStyle="danger">
                  <strong>Sorry!</strong> {this.state.error}
              </Alert>
            );
        }
        // TODO larger label texts
        return (
          <form className="form-horizontal" onSubmit={this._handleSubmit}>
            <Input
              type="text"
              value={this.state.username}
              placeholder="Enter your login name"
              label="Login"
              bsStyle={this._validationState()}
              hasFeedback
              groupClassName="group-class"
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              className="input-lg"
              onChange={this._handleLoginChange} />

            <Input
              type="password"
              value={this.state.password}
              placeholder="Enter your password"
              label="Password"
              bsStyle={this._validationState()}
              hasFeedback
              groupClassName="group-class"
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              className="input-lg"
              onChange={this._handlePasswordChange} />

            <Input
              disabled={!this._allowSubmit()}
              type="submit"
              value="Login"
              className="col-xs-3 col-xs-offset-9"
              bsStyle="primary"
              bsSize="large" />

            {error}
          </form>
        )
    }
})

module.exports = LoginForm;
