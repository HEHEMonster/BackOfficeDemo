import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Layouts from './Layout';
import NotFind from './pages/NotFind';
import WrappedNormalLoginForm from './pages/Login';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={WrappedNormalLoginForm} />
                    <Redirect exact from="/" to="dashboard" />
                    <Route path="/dashboard" component={Layouts} />
                    <Route path="/audit" component={Layouts} />
                    <Route path="/content" component={Layouts} />
                    <Route path="/activity" component={Layouts} />
                    <Route path="/system" component={Layouts} />
                    <Route path="/feedback" component={Layouts} />
                    <Route path="/accusation" component={Layouts} />
                    <Route path="/forbidden" component={Layouts} />
                    <Route component={NotFind} />
                </Switch>
            </Router>
        );
    }
}

export default App;
