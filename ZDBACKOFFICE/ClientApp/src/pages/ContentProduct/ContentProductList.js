import React, { Component } from 'react';
import { Table, Row, Col, Input, DatePicker, Button, message, AutoComplete } from 'antd';
import moment from 'moment';
import '../../styles/Common.css';
import { getFormatDate } from '../../utils/date';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import ContentProductAuditModal from './ContentProductAudit.Modal';
import { GetWithParams, Post, Get } from '../../utils/http';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            modelVisible: false,
            detailsVisible:false,
            confirmLoading: false,
            startDate: moment().add(-6, "month"),
            endDate: moment(),
            auditStartDate: null,
            auditEndDate:  null,
            userName: '',
            telphone: '',
            status: 1,
            totalCount: 0,
            currentPageIndex: 1,
            tags: [],
            auditor: '',
            allOperator: []
        }
    }
    selectProduct = {};

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
        const { userName, startDate, endDate, status, telphone, auditor, auditStartDate, auditEndDate } = this.state;
        return {
            userName: userName.trim(), /** trim()删除字符串开始和末尾的空格 */
            telphone: telphone.trim(),
            auditor: auditor.trim(),
            auditStartDate:auditStartDate && auditStartDate.format(dateFormat),
            auditEndDate: auditEndDate && auditEndDate.format(dateFormat),
            startDate: startDate.format(dateFormat),
            endDate: endDate.format(dateFormat),
            status: status
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
        this.getUserProductList(filter);
    }

    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getUserProductList(this.getFilter()));
    }

    getUserProductList = (filter) => {
        this.setState({ loading: true });
        GetWithParams('/api/userProduct/list', filter).then(({ data }) => {
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
            type: '',
            userName: '',
            telphone: '',
            auditor: '',
            auditStartDate: null,
            auditEndDate: null
        }, () => {
            this.handleSearch();
        });
    }

    showModal = (product) => {
        this.selectProduct = product;
        this.getTags(product);
    }

    getTags = (product) => {
        this.setState({ loading: true });
        Post(`/api/userProduct/tags`, {
            title: product.title,
            content: product.content
        }).then(({ data }) => {
            if (data) {
                let tagArr = [...data];
                this.setState({ tags: tagArr, modelVisible: true });
            }
        }).catch(({ response }) => {
            this.setState({ tags: [], modelVisible: true });
        }).then(() => this.setState({ loading: false }));
    }

    handleCancel = () => {
        this.setState({
            modelVisible: false,
            detailsVisible: false
        });
        this.formRef.props.form.resetFields();
    }

    showDetailsModal = (product) => {
        this.setState({ detailsVisible: true })
        this.selectProduct = product
    }

    handleSubmit = (e, tags) => {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                Post('/api/userProduct/addTags', {
                    tags,
                    'id': this.selectProduct.id
                }).then(() => {
                    form.resetFields();
                    this.setState({ modelVisible: false });
                    message.success("标签添加成功！");
                    this.getUserProductList(Object.assign({ pageIndex: this.state.currentPageIndex }, this.getFilter()));
                }).catch((response) => {
                    message.error(`操作失败！失败原因:${response.data.message}`);
                }).then(() => this.setState({ confirmLoading: false }))
            }
        })
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                render: (text, record, index) => <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
            },{
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },{
                title: '手机号',
                dataIndex: 'telphone',
                key: 'telphone',
            },{
                title: '内容预览',
                dataIndex: 'content',
                key: 'content',
                render:(text) => {
                    return (
                        <span dangerouslySetInnerHTML = {{__html: text ? (text.length > 10 ? text.substr(0 , 10) + "(....)": text) : ""}}>
                        </span>
                    )
                }
            },{
                title: '发布时间',
                dataIndex: 'createDate',
                key: 'createDate',
                sorter: true,
                render: CreateDate => (<span>{getFormatDate(CreateDate)}</span>)
            },{
                title: '审核人',
                dataIndex: 'auditor',
                key: 'auditor',
            },{
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: text => {
                    switch (text) {
                        case -1:
                            return <span>审核未通过</span>;
                        case 0:
                            return <span>审核中</span>;
                        case 1:
                            return <span>审核通过</span>;
                        default:
                            return null;
                    }
                }
            },{
                title: '审核时间',
                dataIndex: 'auditDate',
                key: 'auditDate',
                render: AuditDate => (<span>{AuditDate != null ? getFormatDate(AuditDate) : null}</span>)
            },{
                title: '标签',
                dataIndex: 'tags',
                key: 'tags',
                render:(text) => 
                {
                    return (
                        <span>
                            {text ? (text.length > 6 ? text.substr(0, 6) + "..." : text): ""}
                        </span>
                    )
                }
            },{
                title: '备注',
                dataIndex: 'remark',
                key:'remark',
            },{
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 110,
                render: (text, record) => (
                    <span>
                        <button className="link-button" onClick={() => this.showModal(record)}>查看</button>
                    </span>
                )
            }];

        const { startDate, endDate, telphone, userName, auditor, auditStartDate, auditEndDate, allOperator} = this.state;
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
                        <Input placeholder="请输入用户名" value={userName} onChange={({ target }) => this.setState({
                            userName: target.value
                        })}></Input>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Input placeholder="请输入手机号" value={telphone} onChange={({ target }) => this.setState({
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
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 20,
                        total: this.state.totalCount,
                        current: this.state.currentPageIndex,
                        showTotal: (total, range) => <span>共计{total}条</span>
                    }}
                    onChange={this.handleTableChange}
                >
                </Table>

                <ContentProductAuditModal
                    visible={this.state.modelVisible}
                    confirmLoading={this.state.confirmLoading}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleCancel}
                    aiTags={this.state.tags}
                    wrappedComponentRef={(form) => { this.formRef = form; }}
                    product={this.selectProduct}
                />
            </div>
        );
    }
}

export default ProductList;