import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TradeCircleAuditList from './TradeCircleAuditList';


class TradeCircle extends Component {
    constructor(props) {
        super(props); 
        this.state = {} 
    }
    render() {
        const { match } = this.props;
        return (
            <div>
                <Route path={match.url} exact render={props => <TradeCircleAuditList {...props}></TradeCircleAuditList>}></Route>
                {/*<Route path={`${match.url}/:id`} component={details}></Route>*/}                
            </div>
        );
    }
}

export default TradeCircle;