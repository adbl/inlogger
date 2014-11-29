var React = require('react');

var bs = require('react-bootstrap');
var Input = bs.Input;
var Button = bs.Button;
var Col = bs.Col;

var LoginForm = React.createClass({

    propTypes: {
        onSubmit: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            username: "",
            password: ""
        }
    },

    handleSubmit: function(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    },

    handleLoginChange: function(event) {
        this.setState({username: event.target.value});
    },

    handlePasswordChange: function(event) {
        this.setState({password: event.target.value});
    },

    render: function() {
        return (
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <Input
              type="text"
              value={this.state.username}
              placeholder="Enter your login name"
              label="Login"
              hasFeedback
              groupClassName="group-class"
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              className="input-lg"
              onChange={this.handleLoginChange} />

            <Input
              type="password"
              value={this.state.password}
              placeholder="Enter your password"
              label="Password"
              hasFeedback
              groupClassName="group-class"
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              className="input-lg"
              onChange={this.handlePasswordChange} />

            <Input
              type="submit"
              value="Login"
              className="pull-right"
              bsStyle="primary"
              bsSize="large" />

          </form>
        )
    }
})

module.exports = LoginForm;
