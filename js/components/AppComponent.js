var React = require('react');
var bs = require('react-bootstrap');
var PageHeader = bs.PageHeader;
var Grid = bs.Grid;
var Col = bs.Col;

var AppStore = require('../stores/AppStore');
var Actions = require('../actions/Actions');
var LoginAndSignup = require('./LoginAndSignup');
var LoginList = require('./LoginList');

var AppComponent = React.createClass({

    getInitialState: function() {
        return {
            login: AppStore.getLoginName()
        }
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
        Actions.loadSession();
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this.getInitialState());
    },

    _handleLogout: function(event) {
        Actions.clearSession();
    },

    render: function() {
        var content = null;
        var logout = null;
        if (this.state.login) {
            content = (
                <div>
                  <p>Welcome <strong>{this.state.login}</strong>!</p>
                  <LoginList/>
                </div>
            );
            logout = (
                <a href="/" onClick={this._handleLogout}>Log out</a>
            );
        }
        else {
            content = <LoginAndSignup/>;
        }
        return (
            <Grid>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <PageHeader>
                    InLogger
                    <small className="pull-right">{logout}</small>
                </PageHeader>
              </Col>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                {content}
              </Col>
            </Grid>
        )
    }

})

module.exports = AppComponent;
