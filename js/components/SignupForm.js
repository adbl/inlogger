var React = require('react');

var bs = require('react-bootstrap');
var Input = bs.Input;
var Button = bs.Button;
var Alert = bs.Alert;
var Col = bs.Col;

var AppStore = require('../stores/AppStore');
var Actions = require('../actions/Actions');

var SignupForm = React.createClass({

    getInitialState: function() {
        return {
            username: "",
            password: "",
            waiting: false,
            success: null,
            error: null
        }
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        signupSuccess = AppStore.getSignupSuccess();
        if (signupSuccess) {
            this.setState(_.extend(this.getInitialState(), {
                success: signupSuccess
            }));
        }
        else {
            signupError = AppStore.getSignupError();
            password = signupError ? "" : this.state.password;
            this.setState({
                waiting: false,
                error: signupError,
                password: password
            });
        }
    },

    _handleSubmit: function(event) {
        event.preventDefault();
        Actions.signup(this.state.username, this.state.password);
        this.setState({waiting: true});
        // TODO set state "logging in..."
    },

    _setFields: function(username, password) {
        this.setState({
            username: username,
            password: password,
            // clear error/success when changing the form
            error: null,
            success: null,
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
        var message = null;
        if (this.state.success) {
            message = (
              <Alert className="h4" bsStyle="success">
                  <strong>Success!</strong> Signed up as <strong>{this.state.success}</strong>
              </Alert>
            );
        }
        else if (this.state.error) {
            message = (
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
              placeholder="Choose a login name"
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
              placeholder="Choose a password"
              label="Password"
              hasFeedback
              groupClassName="group-class"
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              className="input-lg"
              onChange={this._handlePasswordChange} />

            <Input
              disabled={!this._allowSubmit()}
              type="submit"
              value="Sign up"
              className="col-xs-3 col-xs-offset-9"
              bsStyle="primary"
              bsSize="large" />

            {message}
          </form>
        )
    }
})

module.exports = SignupForm;
