import React, { Component } from 'react';
import { Table, message } from 'antd';
import { getFormatDate } from '../../utils/date';
import { GetWithParams, Put } from '../../utils/http';
import '../../styles/Common.css';

import ContentTradeCircleDetails from './ContentTradeCircleDetails';
import ContentTradeCircleSearch from './ContentTradeCircleSearch';


class ContentTradeCircleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            detailsVisible: false,
            confirmLoading: false,
            currentPageIndex: 1,
            totalCount: 0,
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

    showDetailsModal = (tradeCircle) => {
        this.selectTradeCircle = tradeCircle;
        this.setState({ detailsVisible: true })
    }

    handleCancel = () => {
        this.setState({ modelVisible: false, detailsVisible: false, auditVisible: false });
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


    handleUpdateTags = (tags) => {
        if ([...tags].length > 0) {
            this.setState({ confirmLoading: true });
            Put('/api/moments/update/tags', {
                tags,
                'id': this.selectTradeCircle.id
            }).then(() => {
                this.setState({ detailsVisible: false });
                message.success("标签添加成功！");
                this.getTradeCircleAuditList({ ...this.getFilter(), pageIndex: this.state.currentPageIndex });
            }).catch(({ response }) => {
                message.error(`操作失败，失败原因:${response.data.message}`);
            }).then(() => this.setState({ confirmLoading: false }));
        } else {
            message.info("未添加标签！")
        }
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
                render: (text) => {
                    return (
                        <span>
                            {text ? (text.length > 5 ? text.substr(0, 5) + "..." : text) : ""}
                        </span>
                    )
                }
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
                        {record.status !== 1 ? <button className="link-button" onClick={() => this.showDetailsModal(record)} >查看</button> : null}
                    </span>
                )
            }];
        // ,{
        //     title: '推荐情况',
        //     dataIndex: 'recommendation',
        //     key: 'recommendation',
        //     render: text => {
        //         switch (text) {
        //             case 1:
        //                 return <span>未推荐</span>;
        //             case 2:
        //                 return <span>已推荐待推送</span>;
        //             case 3:
        //                 return <span>已推送</span>;
        //             default:
        //                 return null;
        //         }
        //     }
        // }


        const { loading, detailsVisible } = this.state;

        return (
            <div>
                <ContentTradeCircleSearch
                    wrappedComponentRef={(form) => this.formRef = form}
                    onSearch={this.handleSearch}
                >
                </ContentTradeCircleSearch>

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

                <ContentTradeCircleDetails
                    visible={detailsVisible}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleUpdateTags}
                    tradeCircle={this.selectTradeCircle}
                    confirmLoading={this.state.confirmLoading}
                />
            </div>
        );
    }
}

export default ContentTradeCircleList;