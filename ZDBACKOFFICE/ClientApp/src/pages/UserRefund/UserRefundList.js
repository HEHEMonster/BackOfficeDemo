import React from 'react';
import {
    Table, Input, Button, Icon, DatePicker,
} from 'antd';
import { Request } from '../../utils/http';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Highlighter from 'react-highlight-words';
import '../../styles/Common.css';

import UserRefundForm from './UserRefundForm';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const LoadAction = '/api/UserRefund/GetUserRefundList';



export default class UserRefundList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            filteredInfo: null,
            currentData: null || [],
            returnData: null || [],
            visible: false,
            okText: null,
            data: null || [],
            returnVisible: this.handleReturnVisible,
            searchText: '',
            pagination: { pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true, showQuickJumper: true /*position: "both"*/ },
            size: 'default',
            sortedInfo: {
                order: 'descend',
                columnKey: 'createDate',
            },

        }
    }
    handleReturnData(_data) {
        if (!_data["id"] || (_data["id"] === 0)) {
            this.fetch();
            //console.log("handleReturnData", _data)
            return;
        }
        const data = this.state.data;
        for (let i = 0; data.length > i; i++) {
            if (_data["id"] === data[i]["id"]) {
                Object.getOwnPropertyNames(_data).map((key) => {
                    data[i][key] = _data[key];
                })
                break;
            }
        }
        this.setState({ data: data, visible: false });
    }
    handleReturnVisible(visible) {
        this.setState({ visible: visible });
    }

    componentDidMount() {
        this.fetch();
    }



    fetch = (params = {}) => {
        //console.log('params:', params);
        this.setState({ loading: true });
        Request({
            url: LoadAction,
            method: 'get',
            responseType: 'json',
        }).then(({ data }) => {
            this.setState({
                loading: false,
                data: data.isSuccess ? data.data : [],
            });
        });
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
            //pagination: pagination,//可有可无
        });
    }

    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = clearFilters => () => {
        clearFilters();

        this.setState({ searchText: '' });
    }

    showModal = () => {
        this.setState({ visible: true, currentData: {}, okText: "新建" });
        //this.formRef.state = { visible: true };//this.formRef 只是引用， 怎么样设置setState ？还不知道
    }



    handleEdit = (record) => {
        this.setState({ visible: true, okText: "修改", currentData: record });
    }

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    }

    clearAll = () => {
        this.fetch();
        this.setState({
            filteredInfo: null,
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    getColumnDateTimeSearchProps = (placeholder) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (<div className="custom-filter-dropdown">
            <RangePicker
                ref={node => { this.searchDateTimeInput = node; }}
                onChange={(e) => {
                    //console.log('getColumnDateTimeSearchProps e', e.length > 0 ? [
                    //    moment(e[0].format(dateFormat)).format('X') + "-" +
                    //    moment(e[1].format(dateFormat)).format('X')]
                    //    : []);
                    setSelectedKeys(
                        e.length > 0 ? [
                            moment(e[0].format(dateFormat)).format('X') + "-" +
                            moment(e[1].format(dateFormat)).format('X')]
                            : [])
                }
                }
                style={{ marginBottom: 8, display: 'block' }} />
            <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}
                icon="search" size="small" style={{ width: 90, marginRight: 8 }}>搜索</Button>
            <Button onClick={this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>重置</Button>
        </div>),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilterDropdownVisibleChange: (visible) => {
            //if (visible) {
            //    setTimeout(this.searchDateTimeInput.select());
            //}
        },
        render: (text) => (
            <span>
                {moment(text).format(dateFormat)}
            </span>
        ),
    })

    getColumnSearchProps = (placeholder) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={node => { this.searchInput = node; }}
                        placeholder={`搜索 ${placeholder}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={this.handleSearch(selectedKeys, confirm)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}
                        icon="search" size="small" style={{ width: 90, marginRight: 8 }}
                    >搜索</Button>
                    <Button onClick={this.handleReset(clearFilters)}
                        size="small" style={{ width: 90 }}
                    >重置</Button>
                </div>
            ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        //onFilterDropdownVisibleChange: (visible) => {
        //    if (visible) {
        //        setTimeout(this.searchInput.select());
        //    }
        //},
        render: (text) => (
            <Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()} />
        ),
    })


    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '操作',
            dataIndex: 'Id',
            key: 'Id',
            // fixed: 'left',
            width: 120,
            render: (text, record) => {
                return (
                    <span>
                        <Button onClick={() => this.handleEdit(record)}>审核</Button>
                    </span>
                );
            },
        },{
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate',
            //width: 140,
            sorter: (a, b) => moment(a.createDate).format('X') - moment(b.createDate).format('X'),
            sortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order,
            onFilter: (value, record) => moment(record.createDate).format('X') > value.split("-")[0] && moment(record.createDate).format('X') < value.split("-")[1],
            ...this.getColumnDateTimeSearchProps("创建时间"),

        },{
            title: '订单类型',
            dataIndex: 'order.orderType',
            key: 'order.orderType',
            render: (text) => {
                if (text === "1") { return (<span>{"活动"}</span>); }
                if (text === "2") { return (<span>{"赚道会员"}</span>); }
                if (text === "3") { return (<span>{"余额提现"}</span>); }
            }
        }, {
            title: '用户',
            dataIndex: 'user.nickName',
            key: 'user.nickName',
            //width: 140,
            onFilter: (value, record) => record['user']['nickName'].toString().toLowerCase().includes(value.toLowerCase()),
            ...this.getColumnSearchProps('用户'),
        }, {
            title: '用户退款理由',
            dataIndex: 'reason',
            key: 'reason',
            //width: 140,
            onFilter: (value, record) => record['reason'].toString().toLowerCase().includes(value.toLowerCase()),
            ...this.getColumnSearchProps('用户退款理由'),
        }, {
            title: '申请退款金额',
            dataIndex: 'price',
            key: 'price',
            //width: 140,
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
            onFilter: (value, record) => record['price'].toString().toLowerCase().includes(value.toLowerCase()),
            ...this.getColumnSearchProps('申请退款金额'),
            render: price => (<span>{price}元</span>)
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            //width: 140,
            sorter: (a, b) => a.status - b.status,
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
            filters: [
                { text: '审核不通过', value: -1 },
                { text: '审核中', value: 0 },
                { text: '审核通过', value: 1 },
                { text: '退款成功', value: 2 },
                //-1审核不通过 0 审核中 1 审核通过  2.退款成功
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status == value,
            render: (text) => {
                if (text === "-1") { return (<span>{"审核不通过"}</span>); }
                if (text === "0") { return (<span>{"审核中"}</span>); }
                if (text === "1") { return (<span>{"审核通过"}</span>); }
                if (text === "2") { return (<span>{"退款成功"}</span>); }

            },
        }, {
            //支付方式  1 微信 2 支付宝 3网联 4银生宝 5 余额
            title: '支付方式',
            dataIndex: 'payType',
            key: 'payType',
            //width: 140,
            sorter: (a, b) => a.payType - b.payType,
            sortOrder: sortedInfo.columnKey === 'payType' && sortedInfo.order,
            filters: [
                { text: '其它', value: 0 },
                { text: '微信', value: 1 },
                { text: '支付宝', value: 2 },
                { text: '网联', value: 3 },
                { text: '银生宝', value: 4 },
                { text: '余额', value: 5 },
            ],
            filteredValue: filteredInfo.payType || null,
            onFilter: (value, record) => record.payType == value,
            render: (text) => {
                if (text === 0) { return (<span>{"其它"}</span>); }
                if (text === 1) { return (<span>{"微信"}</span>); }
                if (text === 2) { return (<span>{"支付宝"}</span>); }
                if (text === 3) { return (<span>{"网联"}</span>); }
                if (text === 4) { return (<span>{"银生宝"}</span>); }
                if (text === 5) { return (<span>{"余额"}</span>); }
            },
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            //width: 140,
            onFilter: (value, record) => record['remark'].toString().toLowerCase().includes(value.toLowerCase()),
            ...this.getColumnSearchProps('备注'),

        }
            // , {
            //     title: 'userId',
            //     dataIndex: 'userId',
            //     key: 'userId',
            //     width: 140,
            //     render: (text) => {
            //         return (<span>{text}</span>);

            //     },
            // }, {
            //     title: 'orderId',
            //     dataIndex: 'orderId',
            //     key: 'orderId',
            //     width: 140,
            //     render: (text) => {
            //         return (<span>{text}</span>);

            //     },
            // }, {
            //     title: 'wxOrderId',
            //     dataIndex: 'wxOrderId',
            //     key: 'wxOrderId',
            //     width: 140,
            //     render: (text) => {
            //         return (
            //             <span>{text}</span>
            //         );
            //     },
            // }, {
            //     title: 'refundId',
            //     dataIndex: 'refundId',
            //     key: 'refundId',
            //     width: 140,
            //     render: (text) => {
            //         return (
            //             <span>{text}</span>
            //         );
            //     },
            // }, {
            //     title: 'wxRefundId',
            //     dataIndex: 'wxRefundId',
            //     key: 'wxRefundId',
            //     width: 140,
            //     render: (text) => {
            //         return (<span> {text} </span>);

            //     },
            // }
        ];

        return (
            <div>
                <UserRefundForm
                    okText={this.state.okText}
                    visible={this.state.visible}
                    wrappedComponentRef={this.saveFormRef}
                    currentData={this.state.currentData}
                    handleReturnData={this.handleReturnData.bind(this)}
                    returnVisible={this.handleReturnVisible.bind(this)}
                />
                <div className="table-operations">
                    <Button onClick={this.clearAll}>刷新</Button>
                </div>
                <Table pagination={this.state.pagination}
                    loading={this.state.loading} height="450px"
                    // expandedRowRender={record => <TabsComponent data={record} />}
                    columns={columns} size={this.state.size}
                    scroll={{ x: 1300 }}
                    dataSource={this.state.data}
                    rowKey={record => record.id}
                    onChange={this.handleChange} />
            </div>
        );
    }
}
