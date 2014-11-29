var React = require('react');
var bs = require('react-bootstrap');
var PageHeader = bs.PageHeader;
var Grid = bs.Grid;
var Col = bs.Col;

var AppStore = require('../stores/AppStore');
var LoginAndSignup = require('./LoginAndSignup');

var AppComponent = React.createClass({

    getInitialState: function() {
        return {
            user: null
        }
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        console.debug("AppComponent._onChange");
        // TODO setState user...
    },

    render: function() {
        var content = null;
        if (!this.state.user) {
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
