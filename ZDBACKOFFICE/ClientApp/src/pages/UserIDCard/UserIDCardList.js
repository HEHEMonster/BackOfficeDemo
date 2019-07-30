import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Row, Col, Input, DatePicker, Button, message, Select, AutoComplete } from 'antd';
import moment from 'moment';
import { GetWithParams, Post, Get } from '../../utils/http';
import { getFormatDate } from '../../utils/date';
import { saveAs } from 'file-saver';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import '../../styles/Common.css';
import UserIDCardAuditModal from './UserIDCardAudit.Modal';

const dateFormat = 'YYYY/MM/DD';

class UserIDCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            modelVisible: false,
            confirmLoading: false,
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            userName: '',
            idCardNumber: '',
            telphone: '',
            auditor: '',
            status: -2, // 默认全部状态
            totalCount: 0,
            currentPageIndex: 1,
            allOperator: []
        }
    }

    selectIDCard = {};

    componentDidMount() {
        const { location } = this.props;
        if (location.state) this.retrunPageCallBack(location.state);
        else this.handleSearch();
        this.handleGetAllOperator();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    getUserIdCardList = (filter) => {
        this.setState({ loading: true });
        GetWithParams('/api/userIdCard/list', filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount,
                loading: false
            });
        })
    }

    handleGetAllOperator = () => {
        Get('/api/system/all/Operator').then(({data}) => {
            let operator = [...data].map(x => `${x.name}`);
            this.setState({ allOperator: operator })
        })
    }

    showModal = (idcard) => {
        this.selectIDCard = idcard;
        this.setState({ modelVisible: true });
    }

    handleCancel = () => {
        this.setState({ modelVisible: false });
        this.formRef.props.form.resetFields();
    }

    handleReset = () => {
        this.setState({
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            userName: '',
            idCardNumber: '',
            status: -2,
            telphone: '',
            auditor: ''
        }, () => {
            this.handleSearch();
        });
    }

    // handlePageChange = (page, pageSize) => {
    //     this.setState({ currentPageIndex: page });
    //     this.getUserIdCardList(Object.assign({ pageIndex: page }, this.getFilter()));
    // }

    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getUserIdCardList(this.getFilter()));
    }

    retrunPageCallBack = ({ pageIndex, userName, idCardNumber, status, startDate, endDate }) => {
        this.setState({
            currentPageIndex: pageIndex,
            userName: userName,
            idCardNumber: idCardNumber,
            status: status,
            startDate: moment(startDate),
            endDate: moment(endDate)
        }, () => this.getUserIdCardList({ pageIndex, ...this.getFilter() }));
    }

    getFilter = () => {
        const { userName, idCardNumber, startDate, endDate, status, telphone, auditor } = this.state;
        return {
            auditor: auditor,
            userName: userName,
            status: status,
            idCardNumber: idCardNumber.trim(),
            telphone: telphone.trim(),
            startDate: startDate.format(dateFormat),
            endDate: endDate.format(dateFormat)
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({ currentPageIndex: pagination.current });
        var filter={
            ...this.getFilter(),
            sortField: sorter.field,
            sortOrder: sorter.order,
            pageIndex: pagination.current
        }
        this.getUserIdCardList(filter);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                const formData = form.getFieldValue('status') === 1 ? {
                    ...values,
                    'userID': this.selectIDCard.userID,
                    //'birthday': values['birthday'].format(dateFormat),
                    'validityStartTime': values['validityTime'][0].format(dateFormat),
                    'validityEndTime': values['validityTime'][1].format(dateFormat)
                } : { ...values, 'userID': this.selectIDCard.userID };
                this.setState({ confirmLoading: true })
                Post('/api/userIdCard/audit', formData).then(() => {
                    form.resetFields();
                    this.setState({ modelVisible: false });
                    message.success("审核成功！");
                    this.getUserIdCardList(Object.assign({ pageIndex: this.state.currentPageIndex }, this.getFilter()));
                }).catch(({ response }) => {
                    message.error(`操作失败！失败原因:${response.data.message}`);
                }).then(() => this.setState({ confirmLoading: false }));
            }
        });
    }

    handleExportExcel = () => {
        Post('/api/userIdCard/export', this.getFilter(), {
            responseType: 'blob'
        }).then((response) => {
            var blob = new Blob([response.data], { type: "application/vnd.ms-excel" });
            saveAs(blob, "UserIDCards.xlsx");
        })
    }

    render() {
        const { RangePicker } = DatePicker;
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                render: (text, record, index) => <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
            }, {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            }, {
                title: '身份证号码',
                dataIndex: 'idCardNumber',
                key: 'idCardNumber',
            }, {
                title: '手机号码',
                dataIndex: 'phone',
                key: 'phone',
            }, {
                title: '上传时间',
                dataIndex: 'createTime',
                sorter: true,
                key: 'createTime',
                render: createTime => (<span>{getFormatDate(createTime)}</span>)
            }, {
                title: '更新时间',
                dataIndex: 'updateTime',
                sorter: true,
                key: 'updateTime',
                render: updateTime => (<span>{updateTime != null ? getFormatDate(updateTime) : null}</span>)
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                sorter: true,
                render: text => {
                    switch (text) {
                        case -1:
                            return <span>认证失败</span>;
                        case 0:
                            return <span>未认证</span>;
                        case 1:
                            return <span>已认证</span>;
                        case 2:
                            return <span>待认证</span>;
                        default:
                            return null;
                    }
                }
            }, {
                title: '审核人',
                dataIndex: 'auditor',
                key: 'auditor',
            }, {
                title: '审核时间',
                dataIndex: 'auditDate',
                key: 'auditDate',
                sorter: true,
                render: auditDate => (<span>{auditDate != null ? getFormatDate(auditDate) : null}</span>)
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 120,
                render: (text, record) => (
                    <span>
                        <Link to={{ pathname: `./idcard/${record.userID}`, state: { pageIndex: this.state.currentPageIndex, ...this.getFilter() } }}>详情</Link>
                        <Divider type='vertical'></Divider>
                        {record.status === 2 ? <button className="link-button" onClick={() => this.showModal(record)} >审核</button> : null}
                    </span>
                )
            }];
        const { startDate, endDate, userName, idCardNumber, status, telphone, auditor, allOperator } = this.state;
        return (
            <div>
                {/* 查询条件 */}
                <Row gutter={16}>
                    <Col xl={6} md={12} sm={24} className='mb-15' style={{ display: 'flex' }}>
                        <div className='search-field-item'>
                            <label>上传时间</label>
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
                        <Input placeholder="用户名" value={userName} onChange={({ target }) => this.setState({
                            userName: target.value
                        })}></Input>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Input placeholder="身份证号码" value={idCardNumber} onChange={({ target }) => this.setState({
                            idCardNumber: target.value
                        })}></Input>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Input placeholder="电话号码" value={telphone} onChange={({ target }) => this.setState({
                            telphone: target.value
                        })}></Input>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                    <AutoComplete
                            dataSource={allOperator}
                            className='width100'
                            value={auditor}
                            onChange={(value) => this.setState({ auditor: value })}
                            placeholder="审核人"
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
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
                            <Select.Option value={-2}>全部状态</Select.Option>
                            <Select.Option value={-1}>认证失败</Select.Option>
                            <Select.Option value={0}>未认证</Select.Option>
                            <Select.Option value={1}>已认证</Select.Option>
                            <Select.Option value={2}>待认证</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={8} md={24} sm={24} className='mb-15'>
                        <Row type="flex" align="middle">
                            <Button type="primary" icon="search" style={{ marginRight: 6 }} onClick={this.handleSearch}>搜索</Button>
                            <Button type="default" icon="redo" style={{ marginRight: 6 }} onClick={this.handleReset}>重置</Button>
                            <Button type="default" icon="download" onClick={this.handleExportExcel}>Excel导出</Button>
                        </Row>
                    </Col>
                </Row>
                {/* 列表 */}
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.data}
                    columns={columns}
                    rowKey={record => record.id}
                    scroll={{ x: 1300 }}
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 20,
                        total: this.state.totalCount,
                        // onChange: this.handlePageChange,
                        current: this.state.currentPageIndex,
                        showTotal: (total, range) => <span>共计{total}条</span>
                    }}
                    onChange={this.handleTableChange}
                >
                </Table>
                <UserIDCardAuditModal
                    idCard={this.selectIDCard}
                    confirmLoading={this.state.confirmLoading}
                    visible={this.state.modelVisible}
                    onAudit={this.handleSubmit}
                    onCancel={this.handleCancel}
                    wrappedComponentRef={(form) => { this.formRef = form; }}
                />
            </div >
        );
    }
}

export default UserIDCardList;