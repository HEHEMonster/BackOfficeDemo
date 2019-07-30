import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import UserIDCardList from './UserIDCardList';
import UserIDCardDetails from './UserIDCardDetails';


class UserIDCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { match } = this.props;
        return (
            <div>
                <Route path={match.url} exact render={props => <UserIDCardList {...props}></UserIDCardList>}></Route>
                <Route path={`${match.url}/:id`} exact render={props => <UserIDCardDetails {...props}></UserIDCardDetails>}></Route>
            </div>
        );
    }
}

export default UserIDCard;