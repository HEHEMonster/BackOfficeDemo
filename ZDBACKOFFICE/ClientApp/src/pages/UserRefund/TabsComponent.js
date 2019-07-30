import React from 'react';
import { Tabs } from 'antd';


import reqwest from 'reqwest';
const TabPane = Tabs.TabPane;
const LoadAction = '/api/UserOrder/GetUserOrderByOrderId';

export default class TabsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            orderData: {}
        };
        //console.log("TabsComponent constructor props", props)
    }

    componentDidMount() {
        console.log("TabsComponent componentDidMount this.state", this.state)
        this.fetch();
    }

    fetch = (params = {}) => {
        //console.log('params:', params);
        const { data } = this.state;
        this.setState({ loading: true });
        reqwest({
            url: LoadAction,
            method: 'get',
            data: { orderid: data.orderId },
            type: 'json',
        }).then((data) => {
            this.setState({
                loading: false,
                orderData: data.isSuccess ? data.data : {},
            });
        });
    }


    componentWillReceiveProps(props) {
        console.log("TabsComponent componentWillReceiveProps this.state", this.state)
        this.fetch();
        //this.setState({ ...props });
    }

    render() {
        const { data } = this.props;
        const { orderData } = this.state;
        console.log("TabsComponent render props", this.props)
        console.log("TabsComponent render state", this.state)
        return (
            <span className="" height="450px">
                <Tabs type="card"  >
                    <TabPane tab="订单状态" key="2">
                        {orderData.status == 1 ? "付款成功" : ""}
                        {orderData.status == 2 ? "付款失败" : ""}
                        {orderData.status == 3 ? "退款申请(申请中)" : ""}
                        {orderData.status == 4 ? "退款失败(不同意)" : ""}
                        {orderData.status == 5 ? "退款失败" : ""}
                        {orderData.status == 6 ? "已退款" : ""}
                    </TabPane>
                    <TabPane tab="用户" key="1">{data.user.userName}</TabPane>
                </Tabs>

            </span>
        )
    }
}