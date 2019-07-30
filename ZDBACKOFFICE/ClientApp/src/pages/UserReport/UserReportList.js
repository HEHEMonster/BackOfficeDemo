import React, { Component } from 'react';
import { Table, Row, Col, DatePicker, Button, message, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import { GetWithParams, Post } from '../../utils/http';
import { getFormatDate } from '../../utils/date';
const { RangePicker } = DatePicker;

class UserReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            modelVisible: false,
            confirmLoading: false,
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            sourceType: 0,
            reportType: -1,
            status: -1,
            totalCount: 0,
            currentPageIndex: 1,
            tags: []
        }
    }

    componentDidMount() {
        this.handleSearch();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }


    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getUserReportList(this.getFilter()));
    }

    getUserReportList = (filter) => {
        this.setState({ loading: true });
        GetWithParams('/api/userReport/list', filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount,
                loading: false
            });
        })
    }

    getFilter = () => {
        const { sourceType, reportType, startDate, endDate, status } = this.state;
        return {
            sourceType: sourceType,
            reportType: reportType,
            startDate: startDate.format('YYYY/MM/DD'),
            endDate: endDate.format('YYYY/MM/DD'),
            status: status
        }
    }

    handleReset = () => {
        this.setState({
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            sourceType: 0,
            reportType: -1,
            status: -1,
        }, () => {
            this.handleSearch();
        });
    }

    handlePageChange = (page, pageSize) => {
        this.setState({ currentPageIndex: page });
        this.getUserReportList({ pageIndex: page, ...this.getFilter() });
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                render: (text, record, index) => <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
            }, {
                title: '来源类型',
                dataIndex: 'sourceType',
                key: 'sourceType',
                render: text => {

                    switch (text) {
                        case '1':
                            return <span>聊天</span>;
                        case '2':
                            return <span>文章</span>;
                        case '3':
                            return <span>动态</span>;
                        case '4':
                            return <span>产品</span>;
                        default:
                            return null;
                    }
                }
            }, {
                title: '违规类型',
                dataIndex: 'reportType',
                key: 'reportType',
                render: text => {

                    switch (text) {
                        case '1':
                            return <span>色情</span>;
                        case '2':
                            return <span>欺诈</span>;
                        case '3':
                            return <span>广告骚扰</span>;
                        case '4':
                            return <span>违规</span>;
                        case '5':
                            return <span>政治敏感</span>;
                        case '6':
                            return <span>侵权</span>;
                        case '0':
                            return <span>其他</span>;
                        default:
                            return null;
                    }
                }
            }, {
                title: '举报人',
                dataIndex: 'reportUserName',
                key: 'reportUserName',
            }, {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate',
                render: CreateDate => (<span>{getFormatDate(CreateDate)}</span>)
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: text => {

                    switch (text) {
                        case 0:
                            return <span>未处理</span>;
                        case 1:
                            return <span>已处理</span>;
                        default:
                            return null;
                    }
                }
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 100,
                // render: (text, record) => (
                //     <span>
                //         {record.status !== 1 ? <a href='javascript:;' onClick={() => this.showModal(record)}>审核</a> : null}
                //     </span>
                // )
            }];
        const { startDate, endDate, status, sourceType, reportType } = this.state;
        return (
            <div>
                {/* 查询条件 */}
                <Row gutter={16}>
                    <Col xl={6} md={12} sm={24} className='mb-15' style={{ display: 'flex' }}>
                        <div className='search-field-item'>
                            <label>创建时间</label>
                        </div>
                        <RangePicker
                            allowClear={false}
                            className='width100'
                            locale={locale}
                            format='YYYY/MM/DD'
                            value={[startDate, endDate]}
                            onChange={([start, end]) => this.setState({
                                startDate: start,
                                endDate: end
                            })}
                        />
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Select
                            placeholder="状态"
                            style={{ width: '100%' }}
                            value={status}
                            onChange={(value, option) => this.setState({
                                status: value
                            })}
                        >
                            <Select.Option value={-1}>全部状态</Select.Option>
                            <Select.Option value={0}>未处理</Select.Option>
                            <Select.Option value={1}>已处理</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Select
                            placeholder="来源类型"
                            style={{ width: '100%' }}
                            value={sourceType}
                            onChange={(value, option) => this.setState({
                                sourceType: value
                            })}
                        >
                            <Select.Option value={0}>全部来源类型</Select.Option>
                            <Select.Option value={1}>聊天</Select.Option>
                            <Select.Option value={2}>文章</Select.Option>
                            <Select.Option value={3}>动态</Select.Option>
                            <Select.Option value={4}>产品</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Select
                            placeholder="违规类型"
                            style={{ width: '100%' }}
                            value={reportType}
                            onChange={(value, option) => this.setState({
                                reportType: value
                            })}
                        >
                            <Select.Option value={-1}>全部违规类型</Select.Option>
                            <Select.Option value={1}>色情</Select.Option>
                            <Select.Option value={2}>欺诈</Select.Option>
                            <Select.Option value={3}>广告骚扰</Select.Option>
                            <Select.Option value={4}>违规</Select.Option>
                            <Select.Option value={5}>政治敏感</Select.Option>
                            <Select.Option value={6}>侵权</Select.Option>
                            <Select.Option value={0}>其他</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={6} md={24} sm={24} className='mb-15'>
                        <Row type="flex" align="middle">
                            <Button type="primary" icon="search" style={{ marginRight: 6 }} onClick={this.handleSearch}>搜索</Button>
                            <Button type="default" icon="redo" onClick={this.handleReset}>重置</Button>
                        </Row>
                    </Col>
                </Row>
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.data}
                    columns={columns}
                    rowKey={record => record.reportID}
                    scroll={{ x: 1300 }}
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 20,
                        total: this.state.totalCount,
                        onChange: this.handlePageChange,
                        current: this.state.currentPageIndex,
                        showTotal: (total, range) => <span>共计{total}条</span>
                    }}
                >
                </Table>
            </div>
        );
    }
}

export default UserReportList;
