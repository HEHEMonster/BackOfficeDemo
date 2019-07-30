import React, { Component } from 'react';
import { Table, Row, Col, Input, DatePicker, Button, Select, message, AutoComplete } from 'antd';
import moment from 'moment';

import { GetWithParams, Post, Get } from '../../utils/http';
import { getFormatDate } from '../../utils/date';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import '../../styles/Common.css';
import '../../styles/Common.css';
import ArticleAddTagsModel from './ArticleAddTags.Modal';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class ContentArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            modelVisible: false,
            detailsVisible: false,
            confirmLoading: false,
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            type: 0,
            status: 1,
            userName: '',
            telphone: '',
            auditor: '',
            auditStartDate: null,
            auditEndDate: null,
            totalCount: 0,
            currentPageIndex: 1,
            tags: [],
            allOperator: []
        }
    }
    selectArticle = {};

    componentDidMount() {
        this.handleSearch();
        this.handleGetAllOperator();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    getFilter = () => {
        const { type, startDate, endDate, status, userName, telphone, auditor, auditStartDate, auditEndDate } = this.state;
        return {
            type: type,
            startDate: startDate.format(dateFormat),
            endDate: endDate.format(dateFormat),
            status: status,
            userName: userName,
            telphone: telphone,
            auditor: auditor,
            auditStartDate: auditStartDate && auditStartDate.format(dateFormat),
            auditEndDate: auditStartDate && auditEndDate.format(dateFormat)
        }
    }

    handleGetAllOperator = () => {
        Get('/api/system/all/Operator').then(({ data }) => {
            let operator = [...data].map(x => `${x.name}`);
            this.setState({ allOperator: operator})
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({ currentPageIndex: pagination.current });
        var filter={
            ...this.getFilter(),
            sortField: sorter.field,
            sortOrder: sorter.order,
            pageIndex: pagination.current
        }
        this.getUserArticleList(filter);
    }

    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getUserArticleList(this.getFilter()));
    }

    getUserArticleList = (filter) => {
        this.setState({ loading: true });
        GetWithParams('/api/userArticle/list', filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount,
                loading: false
            });
        })
    }

    /*重置*/
    handleReset = () => {
        this.setState({
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            type: 0,
            status: 1,
            userName: '',
            telphone: '',
            auditor: '',
            auditStartDate: null,
            auditEndDate: null
        }, () => {
            this.handleSearch(); //点击重置自动刷新列表
        });
    }

    /*获取标签*/
    getTags = (article) => {
        this.setState({ loading: true });
        Post(`/api/userArticle/tags`, { title: article.title, content: article.content }).then(({ data }) => {
            if (data) {
                let tagArr = [...data];
                this.setState({ tags: tagArr, modelVisible: true });
            }
        }).catch(({ response }) => {
            this.setState({ tags: [], modelVisible: true });
        }).then(() => this.setState({ loading: false }));
    }

    showAddTagsModal = (article) => {
        this.selectArticle = article;
        this.getTags(article);
    }


    handleCancel = () => {
        this.setState({ modelVisible: false, detailsVisible: false });
        this.formRef.props.form.resetFields();
    }

    handleSubmit = (tags) => {
        const form = this.formRef.props.form;
        form.validateFields((err) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                Post('/api/userArticle/addTags', {
                    tags,
                    'id': this.selectArticle.id
                }).then(() => {
                    form.resetFields();
                    this.setState({ modelVisible: false });
                    message.success("标签添加成功！");
                    this.getUserArticleList(Object.assign({ pageIndex: this.state.currentPageIndex }, this.getFilter()));
                }).catch(({ response }) => {
                    message.error(`操作失败，失败原因:${response.data.message}`);
                }).then(() => this.setState({ confirmLoading: false }));
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
                title: '发表人',
                dataIndex: 'userName',
                key: 'userName',
            }, {
                title: '手机号',
                dataIndex: 'telphone',
                key: 'telphone',
            }, {
                title: '内容预览',
                dataIndex: 'content',
                key: 'content',
                render: (text) => {
                    return (
                        <span dangerouslySetInnerHTML={{ __html: text ? (text.length > 10 ? text.substr(0, 10) + "(....)" : text) : "" }}>
                        </span>
                    )
                }
            }, {
                title: '类型',
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
                title: '发布时间',
                dataIndex: 'createDate',
                key: 'createDate',
                sorter: true,
                render: CreateDate => (<span>{getFormatDate(CreateDate)}</span>)
            }, {
                title: '审核人',
                dataIndex: 'auditor',
                key: 'auditor',
            }, {
                title: '审核时间',
                dataIndex: 'auditDate',
                key: 'auditDate',
                render: AuditDate => (<span>{AuditDate != null ? getFormatDate(AuditDate) : null}</span>)
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
                fixed: 'right',
                width: 110,
                render: (text, record) => (
                    <span>
                        <button className="link-button" onClick={() => this.showAddTagsModal(record)}>查看</button>
                    </span>
                )
            }];

        const { startDate, endDate, userName, telphone, type, auditor, auditStartDate, auditEndDate, allOperator } = this.state;
        return (
            <div>
                {/* 查询条件 */}
                <Row gutter={16}>
                    <Col xl={6} md={12} sm={24} className='mb-15' style={{ display: 'flex' }}>
                        <div className='search-field-item'>
                            <label>发布时间</label>
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
                        <Input placeholder="发表人" value={userName} onChange={({ target }) => this.setState({
                            userName: target.value
                        })}></Input>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Input placeholder="手机号" value={telphone} onChange={({ target }) => this.setState({
                            telphone: target.value
                        })}></Input>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        {/* <Input placeholder="审核人" value={auditor} onChange={({ target }) => this.setState({
                            auditor: target.value
                        })}></Input> */}
                         <AutoComplete
                            dataSource={allOperator}
                            style={{ width: 250 }}
                            value={auditor}
                            onChange={(value) => this.setState({ auditor: value })}
                            placeholder="审核人"
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15' style={{ display: 'flex' }}>
                        <div className='search-field-item'>
                            <label>审核时间</label>
                        </div>
                        <RangePicker
                            allowClear={false}
                            className='width100'
                            locale={locale}
                            format='YYYY/MM/DD'
                            value={[auditStartDate, auditEndDate]}
                            onChange={([start, end]) => this.setState({
                                auditStartDate: start,
                                auditEndDate: end
                            })}
                        />
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Select
                            placeholder="文章类型"
                            style={{ width: '100%' }}
                            value={type}
                            onChange={(value) => this.setState({
                                type: value
                            })}
                        >
                            <Select.Option value={0}>全部类型</Select.Option>
                            <Select.Option value={1}>图文</Select.Option>
                            <Select.Option value={2}>视频</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={6} md={24} sm={24} className='mb-15'>
                        <Row type="flex" align="middle">
                            <Button type="primary" icon="search" style={{ marginRight: 6 }} onClick={this.handleSearch}>搜索</Button>
                            <Button type="default" icon="redo" onClick={this.handleReset}>重置</Button>
                        </Row>
                    </Col>
                </Row>

                {/* 列表 */}
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.data}
                    columns={columns}
                    rowKey={record => record.rowId}
                    scroll={{ x: 1300 }}
                    onChange={this.handleTableChange}
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 20,
                        total: this.state.totalCount,
                        current: this.state.currentPageIndex,
                        showTotal: (total) => <span>共计{total}条</span>
                    }}
                >
                </Table>

                <ArticleAddTagsModel
                    visible={this.state.modelVisible}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleSubmit}
                    article={this.selectArticle}
                    aiTags={this.state.tags}
                    wrappedComponentRef={(form) => { this.formRef = form; }}
                />
            </div>
        );
    }
}

export default ContentArticleList;