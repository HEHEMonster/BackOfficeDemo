import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserArticleList from './UserArticleList';


class UserArticle extends Component {
    constructor(props) {
        super(props); 
        this.state = {} 
    }
    render() {
        const { match } = this.props;
        return (
            <div>
                <Route path={match.url} exact render={props => <UserArticleList {...props}></UserArticleList>}></Route>
                {/*<Route path={`${match.url}/:id`} component={details}></Route>*/}                
            </div>
        );
    }
}

export default UserArticle;