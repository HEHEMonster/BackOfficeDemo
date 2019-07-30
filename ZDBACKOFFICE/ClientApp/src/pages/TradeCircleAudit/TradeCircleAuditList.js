import React, { Component } from 'react';
import { Table, Divider, Modal, message } from 'antd';
import { getFormatDate } from '../../utils/date';
import { GetWithParams, Delete } from '../../utils/http';
import '../../styles/Common.css';
import './TradeCircle.css';

import TradeCircleDetails from './TradeCircleDetails';
import TradeCircleAuditSearch from './TradeCircleAuditSearch';

const confirm = Modal.confirm;

class TradeCircleAuditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            detailsVisible: false,
            currentPageIndex: 1,
            totalCount: 0,
            isViewDetails: false,
            confirmLoading: false,
        }
    }

    componentDidMount() {
        this.handleSearch()
    }

    selectTradeCircle = {};

    /**过滤条件 */
    getFilter = () => {
        const values = this.formRef.props.form.getFieldsValue();
        return {
            ...values,
            startDate: values['createDate'][0].format('YYYY/MM/DD'),
            endDate: values['createDate'][1].format('YYYY/MM/DD'),
        };
    }

    showDetailsModal = (tradeCircle, isViewDetails) => {
        this.selectTradeCircle = tradeCircle;
        this.setState({ detailsVisible: true, isViewDetails: isViewDetails })
    }

    handleCancel = () => {
        this.setState({ detailsVisible: false });
        this.formRef.props.form.resetFields();
    }

    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getTradeCircleAuditList(this.getFilter()));
    }

    handlePageChange = (page, pageSize) => {
        this.setState({ currentPageIndex: page });
        this.getTradeCircleAuditList({ pageIndex: page, ...this.getFilter() });
    }

    /* 获取生意圈审核列表数据 */
    getTradeCircleAuditList = (filter) => {
        this.setState({ loading: true });
        GetWithParams('/api/moments/list', filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount,
                loading: false
            });
        })
    }

    // showConfirm = (id) => {
    //     let that = this;
    //     confirm({
    //         title: '确认删除此条生意圈?',
    //         content: '',
    //         onOk() {
    //             return new Promise((resolve, reject) => {
    //                 Delete('/api/moments', { id }).then(() => {
    //                     message.success("删除成功!");
    //                     that.handleSearch();
    //                     resolve();
    //                 }).catch(({ response }) => {
    //                     message.error(`删除失败! 失败原因:${response.data.message}`);
    //                     reject();
    //                 });
    //             }).catch(() => console.log('Oops errors!'));
    //         },
    //         onCancel() { },
    //     });
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = this.formRefDetails.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                if (values["status"] === "0") {
                    this.setState({ confirmLoading: true });
                    Delete('/api/moments', { id: this.selectTradeCircle.id, remark: values["remark"] }).then(() => {
                        message.success("删除成功!");
                        this.handleCancel();
                        this.getTradeCircleAuditList({ ...this.getFilter(), pageIndex: this.state.currentPageIndex });
                    }).catch(({ response }) => {
                        message.error(`删除失败! 失败原因:${response.data.message}`);
                    }).then(() => this.setState({ confirmLoading: false }));
                } else {
                    this.handleCancel();
                }
            }
        })
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                render: (text, record, index) => <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
            }, {
                title: '姓名',
                dataIndex: 'user.nickName',
                key: 'user.nickName',
            }, {
                title: '手机号码',
                dataIndex: 'telphone',
                key: 'telphone',
            }, {
                title: '生意圈类型',
                dataIndex: 'type',
                key: 'type',
                render: text => {
                    switch (text) {
                        case 1:
                            return <span>图文</span>;
                        case 2:
                            return <span>视频</span>;
                        case 3:
                            return <span>供需</span>;
                        case 4:
                            return <span>引用</span>;
                        case 5:
                            return <span>想法</span>;
                        default:
                            return null;
                    }
                }
            }, {
                title: '内容预览',
                dataIndex: 'content',
                key: 'content',
                render: (text) => {
                    return (
                        <span>
                            {text ? (text.length > 10 ? text.substr(0, 10) + "..." : text) : ""}
                        </span>
                    )
                }
            }, {
                title: '发布时间',
                dataIndex: 'createDate',
                key: 'createDate',
                render: CreateDate => (<span>{getFormatDate(CreateDate)}</span>)
            }, {
                title: '更新时间',
                dataIndex: 'updateDate',
                key: 'updateDate',
                render: UpdateDate => (<span>{getFormatDate(UpdateDate)}</span>)
            }, {
                title: '标签',
                dataIndex: 'tags',
                key: 'tags',
            }, {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                render: (text) => {
                    return (
                        <span>
                            {text ? (text.length > 10 ? text.substr(0, 10) + "..." : text) : ""}
                        </span>
                    )
                }
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        {record.status !== 1 ? <button className="link-button" onClick={() => this.showDetailsModal(record, true)} >详情</button> : null}
                        <Divider type='vertical'></Divider>
                        <button className="link-button" onClick={() => this.showDetailsModal(record, false)}>审核</button>
                    </span>
                )
            }];

        const { loading, detailsVisible, isViewDetails, confirmLoading } = this.state;

        return (
            <div>
                <TradeCircleAuditSearch
                    wrappedComponentRef={(form) => this.formRef = form}
                    onSearch={this.handleSearch}
                >
                </TradeCircleAuditSearch>

                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={this.state.data}
                    scroll={{ x: 1300 }}
                    rowKey={record => record.id}
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 20,
                        total: this.state.totalCount,
                        onChange: this.handlePageChange,
                        current: this.state.currentPageIndex,
                        showTotal: (total) => <span>共计{total}条</span>
                    }}
                />

                <TradeCircleDetails
                    visible={detailsVisible}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleSubmit}
                    tradeCircle={this.selectTradeCircle}
                    isViewDetails={isViewDetails}
                    confirmLoading={confirmLoading}
                    wrappedComponentRef={(form) => this.formRefDetails = form}
                />
            </div>
        );
    }
}

export default TradeCircleAuditList;