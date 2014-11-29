var React = require('react');
var bs = require('react-bootstrap');
var Nav = bs.Nav;
var NavItem = bs.NavItem;

var LoginForm = require('./LoginForm');
var SignupForm = require('./SignupForm');

var LoginAndSignup = React.createClass({

    getInitialState: function() {
        return {
            active: "login"
        }
    },

    _handleSelect: function(selected) {
        this.setState({active: selected});
    },

    render: function() {
        var active;
        // TODO refactor LoginForm and SignupForm into one component
        // error: AppStore. loginError / signupError,/ errorPrefix, usernamePlaceholder
        // passwordPlaceholder, submitText, onSubmit
        if (this.state.active == "login") {
            active = <LoginForm/>;
        }
        else if (this.state.active == "signup") {
            active = <SignupForm/>;
        }

        return (
          <div>
            <Nav bsStyle="tabs" activeKey={this.state.active} onSelect={this._handleSelect}>
              <NavItem eventKey={"login"} href="/home">Login</NavItem>
              <NavItem eventKey={"signup"} title="Item">Sign up</NavItem>
            </Nav>
            <h1/>
            {active}
          </div>
        )
    }

});

module.exports = LoginAndSignup;
