import React, { Component } from 'react';
import { Row, Col, Input, Table, DatePicker, Select, Button, message, Divider, AutoComplete } from 'antd';
import moment from 'moment';
import { saveAs } from 'file-saver';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { GetWithParams, Post, Get } from '../../utils/http';
import { getFormatDate } from '../../utils/date';
import '../../styles/Common.css';
import UserCareerAuditModal from './UserCareerAudit.Modal';
import UserCareerDetails from './UserCareerDetails';

const { RangePicker } = DatePicker;
const { Column } = Table;
const dateFormat = 'YYYY/MM/DD';

class UserCareerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalCount: 0,
            loading: false,
            visible: false,
            detailsVisible: false,
            confirmLoading: false,
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            userName: '',
            telphone: '',
            auditor: '',
            careerType: 0,
            status: -2,
            currentPageIndex: 1,
            allOperator: []
        }
    }
    selectCareer = {};

    componentDidMount() {
        this.handleSearch();
        this.handleGetAllOperator();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    getUserCareerList = (filter) => {
        this.setState({ loading: true });
        GetWithParams('/api/userCareer/list', filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount,
                loading: false,
            });
        })
    }

    handleGetAllOperator = () => {
        Get('/api/system/all/Operator').then(({ data }) => {
            let operator = [...data].map(x => `${x.name}`);
            this.setState({ allOperator: operator })
        })
    }

    handlePageChange = (page, pageSize) => {
        this.setState({ currentPageIndex: page });
        this.getUserCareerList(Object.assign({ pageIndex: page }, this.getFilter()));
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({ currentPageIndex: pagination.current });
        var filter={
            ...this.getFilter(),
            sortField: sorter.field,
            sortOrder: sorter.order,
            pageIndex: pagination.current
        }
        this.getUserCareerList(filter);
    }

    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getUserCareerList(this.getFilter()));
    }

    getFilter = () => {
        const { userName, careerType, startDate, endDate, status, telphone, auditor } = this.state;
        return {
            userName: userName,
            startDate: startDate.format(dateFormat),
            endDate: endDate.format(dateFormat),
            careerType: careerType,
            status: status,
            telphone: telphone,
            auditor: auditor
        }
    }

    handleReset = () => {
        this.setState({
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            userName: '',
            telphone: '',
            auditor: '',
            careerType: 0,
            status: -2
        }, () => {
            this.handleSearch();
        });
    }

    showModal = (career) => {
        this.selectCareer = career;
        this.setState({ visible: true });
    }

    showDetailsModal = (career) => {
        this.selectCareer = career;
        this.setState({ detailsVisible: true })
    }

    handleExportExcel = () => {
        Post('/api/usercareer/export', this.getFilter(), {
            responseType: 'blob'
        }).then((response) => {
            var blob = new Blob([response.data], { type: "application/vnd.ms-excel" });
            saveAs(blob, "UserCareer.xlsx");
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                Post('/api/usercareer/audit', {
                    ...values,
                    'id': this.selectCareer.id
                }).then(() => {
                    form.resetFields();
                    this.setState({ visible: false });
                    message.success("审核成功！");
                    this.getUserCareerList(Object.assign({ pageIndex: this.state.currentPageIndex }, this.getFilter()));
                }).catch(({ response }) => {
                    message.error(`操作失败！失败原因:${response.data.message}`)
                }).then(() => this.setState({ confirmLoading: false }))
            }
        })
    }

    handleCancel = () => {
        this.setState({ visible: false, detailsVisible: false });
        this.formRef.props.form.resetFields();
    }

    render() {
        const { startDate, endDate, userName, careerType, visible, confirmLoading, status, telphone, auditor, allOperator } = this.state;
        return (
            <div>
                <Row gutter={16} >
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
                        })} />
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Select
                            placeholder="身份类型"
                            style={{ width: '100%' }}
                            value={careerType}
                            onChange={(value, option) => this.setState({
                                careerType: value
                            })}
                        >
                            <Select.Option value={0}>全部身份</Select.Option>
                            <Select.Option value={1}>企业员工</Select.Option>
                            <Select.Option value={2}>企业高管</Select.Option>
                            <Select.Option value={3}>企业主</Select.Option>
                            <Select.Option value={4}>个体经营</Select.Option>
                        </Select>
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
                    <Col xl={8} md={24} sm={24} className='mb-15'>
                        <Row type="flex" align="middle">
                            <Button
                                type="primary"
                                icon="search"
                                onClick={this.handleSearch}
                                style={{ marginRight: 6 }}
                            >搜索</Button>
                            <Button
                                type="default"
                                icon="redo"
                                onClick={this.handleReset}
                                style={{ marginRight: 6 }}
                            >重置</Button>
                            <Button
                                type="default"
                                icon="download"
                                onClick={this.handleExportExcel}
                            >Excel导出
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.data}
                    rowKey={record => record.rowId}
                    scroll={{ x: 1300 }}
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 20,
                        total: this.state.totalCount,
                        current: this.state.currentPageIndex,
                        showTotal: total => <span>共计{total}条</span>
                    }}
                    onChange={this.handleTableChange}
                >
                    <Column
                        title="序号"
                        key="num"
                        render={(text, record, index) => (
                            <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
                        )}
                    />
                    <Column
                        title="用户名"
                        dataIndex="userName"
                        key="userName"
                    />
                    <Column
                        title="昵称"
                        dataIndex="nickName"
                        key="nickName"
                    />
                    <Column
                        title="手机号码"
                        dataIndex="telphone"
                        key="telphone"
                    />
                    <Column
                        title="提交身份"
                        dataIndex="careerType"
                        key="careerType"
                        render={(text) => {
                            switch (text) {
                                case 1:
                                    return <span>企业员工</span>;
                                case 2:
                                    return (<span>企业高管</span>);
                                case 3:
                                    return (<span>企业主</span>);
                                case 4:
                                    return (<span>个体经营</span>);
                                default:
                                    return null;
                            }
                        }}
                    />
                    <Column
                        title="提交次数"
                        dataIndex="count"
                        key="count"
                    />
                    <Column
                        title="状态"
                        dataIndex="status"
                        key="status"
                        sorter="true"
                        render={(text, record, index) => {
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
                        }}
                    />
                    <Column
                        title="上传时间"
                        dataIndex="updateDate"
                        key="updateDate"
                        sorter="true"
                        render={createDate => (
                            <span>{getFormatDate(createDate)}</span>
                        )}
                    />
                    <Column
                        title="审核人"
                        dataIndex="auditor"
                        key="auditor"
                    />
                    <Column
                        title="审核时间"
                        dataIndex="auditDate"
                        key="auditDate"
                        sorter="true"
                        render={auditDate => (
                            <span>{auditDate != null ? getFormatDate(auditDate) : null}</span>
                        )}
                    />
                    <Column
                        title="核定身份"
                        dataIndex="confirmCareerType"
                        key="confirmCareerType"
                        render={(text) => {
                            switch (text) {
                                case 1:
                                    return <span>企业员工</span>;
                                case 2:
                                    return (<span>企业高管</span>);
                                case 3:
                                    return (<span>企业主</span>);
                                case 4:
                                    return (<span>个体经营</span>);
                                default:
                                    return <span>暂无</span>;
                            }
                        }}
                    />
                    <Column
                        title="操作"
                        key="action"
                        fixed="right"
                        width={120}
                        render={(text, record) => (
                            <span>
                                <button className="link-button" onClick={() => this.showDetailsModal(record)}>详情</button>
                                <Divider type='vertical'></Divider>
                                {record.status === 2 ? <button className="link-button" onClick={() => this.showModal(record)}>审核</button> : null}
                            </span>
                        )}
                    />
                </Table>
                <UserCareerAuditModal
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    career={this.selectCareer}
                    wrappedComponentRef={(form) => { this.formRef = form; }}
                />
                <UserCareerDetails
                    visible={this.state.detailsVisible}
                    confirmLoading={confirmLoading}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    career={this.selectCareer}
                />
            </div>
        );
    }
}

export default UserCareerList;