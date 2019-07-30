import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PersonList from './PersonList';
// import PersonDetails from './PersonDetails';
import PersonAdd from './PersonAdd';


class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {} 
    }

    render() {
        const { match } = this.props;
        return (
            <div>
                <Route path={match.url} exact render={props => <PersonList {...props}></PersonList>}></Route>
                <Route path={`${match.url}/add`} exact render={props => <PersonAdd {...props}></PersonAdd>}></Route>
                {/* <Route path={`${match.url}/:id`} render={props => <PersonDetails {...props}></PersonDetails>}></Route> */}
            </div>
        );
    }
}

export default Person;