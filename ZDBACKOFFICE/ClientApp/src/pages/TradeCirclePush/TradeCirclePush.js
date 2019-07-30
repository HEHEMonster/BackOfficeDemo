import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TradeCirclePushList from './TradeCirclePushList';


class TradeCirclePush extends Component {
    constructor(props) {
        super(props); 
        this.state = {} 
    }
    render() {
        const { match } = this.props;
        return (
            <div>
                <Route path={match.url} exact render={props => <TradeCirclePushList {...props}></TradeCirclePushList>}></Route>
                {/*<Route path={`${match.url}/:id`} component={details}></Route>*/}                
            </div>
        );
    }
}

export default TradeCirclePush;