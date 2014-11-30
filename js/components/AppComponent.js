var React = require('react');
var bs = require('react-bootstrap');
var PageHeader = bs.PageHeader;
var Grid = bs.Grid;
var Col = bs.Col;

var AppStore = require('../stores/AppStore');
var LoginAndSignup = require('./LoginAndSignup');
var LoginList = require('./LoginList');

var AppComponent = React.createClass({

    getInitialState: function() {
        return {
            login: null
        }
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({
            login: AppStore.getLoginName()
        })
    },

    render: function() {
        var content = null;
        if (this.state.login) {
            content = (
                <div>
                  <p>Welcome <strong>{this.state.login}</strong>!</p>
                  <LoginList/>
                </div>
            );
        }
        else {
            content = <LoginAndSignup/>;
        }
        return (
            <Grid>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <PageHeader>InLogger <small>...</small></PageHeader>
              </Col>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                {content}
              </Col>
            </Grid>
        )
    }

})

module.exports = AppComponent;
