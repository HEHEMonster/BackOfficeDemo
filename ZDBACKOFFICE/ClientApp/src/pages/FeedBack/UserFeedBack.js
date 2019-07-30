import React, { Component } from 'react';
import { Table, Row, Col, Input, DatePicker, Button, message } from 'antd';
import '../../styles/Common.css';
import { getFormatDate } from '../../utils/date';
import { GetWithParams, Post } from '../../utils/http';
import FeedBackDetails from './UserFeedBackDetails';
import AddNewFeedBack from './AddNewUserFeedBack';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class UserFeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            visible: false,
            addModalVisible: false,
            addConfirmLoading: false,
            confirmLoading: false,
            currentPageIndex: 1,
            total: 0,
            reportUserName: '',
            startDate: moment().add(-6, "month"),
            endDate: moment()
        }
    }
    selectFeedback = {};

    componentDidMount() {
        this.handleSearch();
    }

    getFilter = () => {
        const { reportUserName, startDate, endDate } = this.state;
        return {
            reportUserName: reportUserName,
            startDate: startDate.format(dateFormat),
            endDate: endDate.format(dateFormat)
        }
    }

    /* 搜索 */
    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getFeedBackList(this.getFilter()));
    }

    /* 重置 */
    handleReset = () => {
        this.setState({
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            reportUserName: ''
        }, () => {
            this.handleSearch();
        });
    }

    showModal = (feedback) => {
        this.selectFeedback = feedback;
        this.setState({ visible: true });
    }

    addNewModel = () => {
        this.setState({ addModalVisible: true })
    }

    handleCancel = () => {
        this.setState({ visible: false });
        this.formRef.props.form.resetFields();
    }

    handleAddNewCancel = () => {
        this.setState({ addModalVisible: false })
        this.formRef.props.form.resetFields();
    }

    handleCreate = (e) => {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, value) => {
            if (!err) {
                this.setState({ addConfirmLoading: true })
                Post('/api/feedback/create', value).then(() => {
                    this.setState({ addModalVisible: false, addConfirmLoading: false })
                    form.resetFields();
                    message.success('录入成功');
                    this.getFeedBackList(Object.assign({ pageIndex: this.state.currentPageIndex }, this.getFilter()));
                }, (err) => {
                    this.setState({ addConfirmLoading: false })
                    message.error(`录入失败，失败原因：${err.response.data.message}`)
                })
            }
        })
    }

    /*分页 */
    handlePageChange = (page) => {
        this.setState({ currentPageIndex: page });
        this.getFeedBackList(Object.assign({ pageIndex: page }))
    }

    /* 列表查询 */
    getFeedBackList = (filter) => {
        this.setState({ loading: true });
        GetWithParams('/api/feedback/list', filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount,
                loading: false,
            })
        })
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                render: (text, record, index) => <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
            }, {
                title: '反馈人',
                dataIndex: 'reportUserName',
                key: 'reportUserName',
            }, {
                title: '描述',
                dataIndex: 'reason',
                key: 'reason',
                render: (text) => {
                    return (
                        <span>
                            {text ? (text.length > 10 ? text.substr(0, 10) + "....." : text) : ""}
                        </span>
                    )
                }
            }, {
                title: '联系方式',
                dataIndex: 'contact',
                key: 'contact',
            }, {
                title: '上传时间',
                dataIndex: 'createDate',
                key: 'createDate',
                render: CreateDate => (<span>{getFormatDate(CreateDate)}</span>)
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 100,
                render: (text, record) => (
                    <span>
                        {/*当描述字数大于10或有详情图显示详情按钮*/}
                        {/*record.reason.length > 10 || record.photos != "[]" ?*/}
                        <button className="link-button" onClick={() => this.showModal(record)} >详情</button>
                    </span>
                )
            }];

        const { reportUserName, startDate, endDate } = this.state;
        return (
            <div>
                <Row gutter={16}>
                    <Col xl={5} md={12} sm={24} className='mb-15'>
                        <Input placeholder="请输入反馈人" value={reportUserName} onChange={({ target }) => this.setState({
                            reportUserName: target.value
                        })}></Input>
                    </Col>
                    <Col xl={5} md={12} sm={24} className='mb-15'>
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
                    <Col xl={6} md={24} sm={24} className='mb-15'>
                        <Button type="primary" icon="search" style={{ marginRight: 6 }} onClick={this.handleSearch}>搜索</Button>
                        <Button type="default" icon="redo" onClick={this.handleReset}>重置</Button>
                    </Col>
                    <Col xl={5} md={12} sm={12} className='mb-15'>
                        <Button type="default" icon="plus" style={{ marginRight: 6 }} onClick={this.addNewModel}>反馈录入</Button>
                        {/*<Button type="default" icon="file-excel" style={{ marginRight: 6 }} onClick={}>导出Excel</Button>*/}
                    </Col>
                </Row>

                <Table
                    loading={this.state.loading}
                    dataSource={this.state.data}
                    columns={columns}
                    rowKey={record => record.reportID}
                    scroll={{ x: 1300 }}
                    pagination={{
                        defaultPageSize: 20,
                        total: this.state.totalCount,
                        onChange: this.handlePageChange,
                        current: this.state.currentPageIndex,
                        showTotal: (total) => <span>共计{total}条</span>
                    }}
                >
                </Table>

                <FeedBackDetails
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    onOk={this.handleCancel}
                    feedback={this.selectFeedback}
                    wrappedComponentRef={(form) => { this.formRef = form; }}
                />

                <AddNewFeedBack
                    visible={this.state.addModalVisible}
                    confirmLoading={this.state.addConfirmLoading}
                    onCancel={this.handleAddNewCancel}
                    onOk={this.handleCreate}
                    wrappedComponentRef={(form) => { this.formRef = form; }}
                />
            </div>
        )
    };
}

export default UserFeedBack;