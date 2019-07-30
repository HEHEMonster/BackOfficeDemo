import React from 'react';
import { Link } from 'react-router-dom';
import {
    Table, Input, Button, DatePicker, Row, Col, Select, Divider
} from 'antd';
import moment from 'moment';
import { GetWithParams } from '../../utils/http';
import { getFormatDate } from '../../utils/date';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import '../../styles/Common.css';
import ActivityForm from './ActivityForm';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const LoadAction = '/api/Activity/GetActivityList';

export default class ActivityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            okText: null,
            currentActivity: [],
            data: [],
            loading: false,
            visible: false,
            confirmLoading: false,
            title: '',
            status: -2,
            type: -2, // 默认全部类型
            createDate_start: moment().add(-6, "month"),
            createDate_end: moment(),
            beginDate: moment().add(-6, "month"),
            endDate: moment(),
            registrationBegin: moment().add(-6, "month"),
            registrationEnd: moment(),
            totalCount: 0,
            currentPageIndex: 1
        }
    }
    componentDidMount() {
        const { location } = this.props;
        if (location.state) this.returnPageCallBack(location.state);
        else this.handleSearch();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
    getFilter = () => {
        const { title, type, status, createDate_start, createDate_end, beginDate, endDate, registrationBegin, registrationEnd } = this.state;
        return {
            title: title,
            type: type,
            status: status,
            createDate_start: createDate_start.format(dateFormat),
            createDate_end: createDate_end.format(dateFormat),
            beginDate: beginDate.format(dateFormat),
            endDate: endDate.format(dateFormat),
            registrationBegin: registrationBegin.format(dateFormat),
            registrationEnd: registrationEnd.format(dateFormat)
        }
    }
    //请求控制器，返回查询结果
    getActivityList = (filter) => {
        this.setState({ loading: true });
        GetWithParams(LoadAction, filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount,
                loading: false
            });
        })
    }
    //翻页
    handlePageChange = (page, pageSize) => {
        this.setState({ currentPageIndex: page });
        this.getActivityList(Object.assign({ pageIndex: page }, this.getFilter()));
    }
    //查询方法
    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getActivityList(this.getFilter()));
    }
    returnPageCallBack = ({ pageIndex, title, type, status, createDate_start, createDate_end, beginDate, endDate, registrationBegin, registrationEnd }) => {
        this.setState({
            currentPageIndex: pageIndex,
            title: title,
            type: type,
            status: status,
            createDate_start: moment(createDate_start),
            createDate_end: moment(createDate_end),
            beginDate: moment(beginDate),
            endDate: moment(endDate),
            registrationBegin: moment(registrationBegin),
            registrationEnd: moment(registrationEnd)
        }, () => this.getUserIdCardList({ pageIndex, ...this.getFilter() }));
    }

    //打开modal（添加活动）
    showModals = (record) => {
        this.setState({ visible: true, okText: "发布+", currentActivity: [] });
    }
    

    //打开modal(发布活动)
    showModal = (record) => {
        this.setState({ visible: true, okText: "发布", currentActivity: record });
    }


    //把当前行数据给form
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    //不懂
    handleReturnData(_data) {
        if (!_data["activityId"] || (_data["activityId"] == 0)) {
            this.fetch();
            return;
        }
        const data = this.state.data;
        for (let i = 0; data.length > i; i++) {
            if (_data["activityId"] == data[i]["activityId"]) {
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

    //重置查询条件
    handleReset = () => {
        this.setState({
            title: '',
            status: -2,
            type: -2, // 默认全部类型
            createDate_start: moment().add(-6, "month"),
            createDate_end: moment(),
            beginDate: moment().add(-6, "month"),
            endDate: moment(),
            registrationBegin: moment().add(-6, "month"),
            registrationEnd: moment(),
        }, () => {
            this.handleSearch();
        });
    }
    render() {
        const { title, type, status, createDate_start, createDate_end, beginDate, endDate, registrationBegin, registrationEnd } = this.state;
        const columns = [
            {
                title: '全选',
                dataIndex: 'num',
                width: 140,
                render: (text, record, index) => <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
            },
            {
                title: '活动名称',
                dataIndex: 'title',
                key: 'title',
                width: 140,
            },
            {
                title: '列表图',
                dataIndex: 'coverPhoto',
                key: 'coverPhoto',
                width: 140,
                render: (text) => {
                    return (
                        <span>
                            <img src={text} alt="" height="30" />
                        </span>
                    );
                },
            },
            {
                title: '报名金额',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                width: 140,
            },
            {
                title: '举办时间',
                width: 140,
                render: (text, record) => (
                    <span>{getFormatDate(record.beginDate)}
                          <br/>至<br/>
                          {getFormatDate(record.endDate)}
                    </span>)
            },
            {
                title: '报名时间',
                width: 140,
                render: (text, record) => (
                    <span>{getFormatDate(record.registrationBegin)}
                        <br />至<br />
                        {getFormatDate(record.registrationEnd)}
                    </span>)
            },
            //{
            //    title: '活动内容预览',
            //    dataIndex: 'content',
            //    key: 'content',
            //    width: 140
            //},
            {
                title: '活动类型',
                dataIndex: 'type',
                key: 'type',
                width: 140,
                render: (text) => {
                    if (text == "1") { return (<span> {"线上沙龙"} </span>); }
                    if (text == "2") { return (<span> {"线下报名"} </span>); }
                },
            },
            {
                title: '活动状态',
                dataIndex: 'status',
                key: 'status',
                width: 140,
                render: (text) => {
                    if (text == "0") { return (<span>{"无效"}</span>); }
                    if (text == "1") { return (<span>{"有效"}</span>); }
                },
            },
            {
                title: '已参与名额/活动名额',
                width: 150,
                render: (text, record) => (
                    <span>{record.attendance}/{record.places}
                    </span>)
            },
            {
                title: '发布时间',
                dataIndex: 'createDate',
                key: 'createDate',
                width: 140,
                render: createDate => (<span>{getFormatDate(createDate)}</span>)
            },
            {
                title: '操作',
                dataIndex: 'activityId',
                key: 'activityId',
                fixed: 'right',
                width: 120,
                render: (text, record) => (
                    <span>
                        <Link to={{ pathname: `./list/${record.activityId}` }}>详情</Link>
                        <Divider type='vertical'></Divider>
                        {record.status === 0? <button className="link-button" onClick={() => this.showModal(record)} >发布</button> : null}
                    </span>
                )
            }];
        return (
            <div>
                {/* 查询条件 */}
                <Row gutter={16}>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Input placeholder="活动名称" value={title} onChange={({ target }) => this.setState({
                            title: target.value
                        })} />
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Select
                            placeholder="全部类型"
                            style={{ width: '100%' }}
                            value={type}
                            onChange={(value, option) => this.setState({
                                type: value
                            })}>
                            <Select.Option value={-2}>全部类型</Select.Option>
                            <Select.Option value={1}>线上沙龙</Select.Option>
                            <Select.Option value={2}>线下报名</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Select
                            placeholder="活动状态"
                            style={{ width: '100%' }}
                            value={status}
                            onChange={(value, option) => this.setState({
                                status: value
                            })}>
                            <Select.Option value={-2}>全部状态</Select.Option>
                            <Select.Option value={0}>无效</Select.Option>
                            <Select.Option value={1}>有效</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15' style={{display: 'flex'}}>
                        <div className='search-field-item'>
                            <label>发布时间</label>
                        </div>
                        <RangePicker
                            allowClear={false}
                            className='width100'
                            locale={locale}
                            format='YYYY/MM/DD'
                            value={[createDate_start, createDate_end]}
                            onChange={([start, end]) => this.setState({
                                createDate_start: start,
                                createDate_end: end
                            })}
                        />
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15' style={{display: 'flex'}}>
                        <div className='search-field-item'>
                            <label>举办时间</label>
                        </div>
                        <RangePicker
                            allowClear={false}
                            className='width100'
                            locale={locale}
                            format='YYYY/MM/DD'
                            value={[beginDate, endDate]}
                            onChange={([start, end]) => this.setState({
                                beginDate: start,
                                endDate: end
                            })}
                        />
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15' style={{display: 'flex'}}>
                        <div className='search-field-item'>
                            <label>报名时间</label>
                        </div>
                        <RangePicker
                            allowClear={false}
                            className='width100'
                            locale={locale}
                            format='YYYY/MM/DD'
                            value={[registrationBegin, registrationEnd]}
                            onChange={([start, end]) => this.setState({
                                registrationBegin: start,
                                registrationEnd: end
                            })}
                        />
                    </Col>
                    <Col xl={8} md={24} sm={24} className='mb-15'>
                        <Row type="flex" align="middle">
                            <Button type="primary" onClick={this.handleSearch} icon="search" style={{ width: 90, marginRight: 8 }}>搜索</Button>
                            <Button onClick={this.handleReset} style={{ width: 90 , marginRight: 8  }}>重置</Button>
                            <Button onClick={this.showModals} style={{ width: 90 , marginRight: 8  }}>发布活动</Button>
                        </Row>
                    </Col>
                </Row>
                {/*列表*/}
                <Table
                    loading={this.state.loading}
                    columns={columns}
                    dataSource={this.state.data}
                    rowKey={record => record.activityId}
                    scroll={{ x: 1600 }}
                    pagination={{
                        defaultPageSize:20,
                        total: this.state.totalCount,
                        onChange: this.handlePageChange,
                        current: this.state.currentPageIndex,
                        showTotal: (total, range) => <span>共计{total}条</span>
                    }}></Table>
                <ActivityForm
                    okText={this.state.okText}
                    visible={this.state.visible}
                    wrappedComponentRef={this.saveFormRef}
                    currentActivity={this.state.currentActivity}
                    handleReturnData={this.handleReturnData.bind(this)}
                    returnVisible={this.handleReturnVisible.bind(this)}
                />
            </div>
        );
    }
}
