var React = require('react');

var bs = require('react-bootstrap');
var PageHeader = bs.PageHeader;
var Grid = bs.Grid;
var Col = bs.Col;

var LoginForm = require('./LoginForm');

var AppComponent = React.createClass({

    getInitialState: function() {
        return {
            user: null
        }
    },

    handleLogin: function(username, password) {
        // TODO send some event...
    },

    render: function() {
        var content = null;
        if (!this.state.user) {
            content = <LoginForm onSubmit={this.handleLogin}/>;
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
