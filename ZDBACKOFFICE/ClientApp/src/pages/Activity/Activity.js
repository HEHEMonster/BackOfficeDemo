import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';


class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        const { match } = this.props;
        return (
            <div>
                <Route path={ match.url } exact render={props => <ActivityList {...props}></ActivityList>}></Route>
                <Route path={`${match.url}/:id`} exact render={props => <ActivityDetails {...props}></ActivityDetails>}></Route>
            </div>
        );
    }
}

export default Activity;