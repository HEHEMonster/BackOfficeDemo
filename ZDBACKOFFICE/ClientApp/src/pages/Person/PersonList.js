import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import { saveAs } from 'file-saver';
import PersonSearch from './PersonSearch';
import PersonDetails from './PersonDetails';
import { getFormatDate } from '../../utils/date';
import { GetWithParams, Post } from '../../utils/http';
import cityOptions from '../../static/city.json';
import industryOptions from '../../static/industry.json';


class PersonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            modelVisible: false,
            confirmLoading: false,
            totalCount: 0,
            currentPageIndex: 1,
            isViewDetails: true
        }
    }

    selectPerson = {}

    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getPersonList(this.getFilter()));
    }

    handlePageChange = (page, pageSize) => {
        this.setState({ currentPageIndex: page });
        this.getPersonList({ pageIndex: page, ...this.getFilter() });
    }

    getFilter = () => {
        const values = this.formRef.props.form.getFieldsValue();
        return {
            ...values,
            startDate: values['createDate'][0].format('YYYY/MM/DD'),
            endDate: values['createDate'][1].format('YYYY/MM/DD'),
            industry: [...values.industry][1],
            region: [...values.region][1]
        };
    }

    getPersonList = (filter) => {
        this.setState({ loading: true });
        GetWithParams('/api/personInfo/list', filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount,
                loading: false
            });
        })
    }

    showModal = (person, flag) => {
        this.setState({ modelVisible: true, isViewDetails: flag })
        this.selectPerson = person;
    }

    handleCancel = () => this.setState({ modelVisible: false });

    handleExportExcel = () => {
        Post('/api/personInfo/export', this.getFilter(), {
            responseType: 'blob'
        }).then((response) => {
            var blob = new Blob([response.data], { type: "application/vnd.ms-excel" });
            saveAs(blob, "UserIDCards.xlsx");
        })
    }

    /* handleIndustryCode = (code) => {
        let label='';
        try{
            let preCode = `${code}`.split('_')[0];
            let label=  [...industryOptions].filter(i => i.value === preCode)[0].children.filter(c=>c.value===code)[0].label;
            return label;
        }catch{
            return label;
        }
    } */

    handleIndustryCode = (code) => {
        let labelLength='';
        try{
            let preCode = `${code}`.split('_')[0];
            let label=  [...industryOptions].filter(i => i.value === preCode)[0].children.filter(c=>c.value===code)[0].label;
            let labelLength = label.length > 6 ? label.substr(0,6) + '...' : label
            return labelLength;
        }catch{
            return labelLength;
        }
    }

    handleCityCode = (code) => {
        let label='';
        try{
            let preCode = `${code}`.substr(0,2);
            let label=  [...cityOptions].filter(i => `${i.value}`.startsWith(preCode))[0].children.filter(c=>c.value===code)[0].label;
            return label;
        }catch{
            return label;
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
        this.getPersonList(filter);
    }

    render() {
        const { totalCount, loading, data, currentPageIndex, modelVisible, isViewDetails, confirmLoading } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                render: (text, record, index) => <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
            }, {
                title: '姓名',
                dataIndex: 'person',
                key: 'person',
            }, {
                title: '电话',
                dataIndex: 'telphone',
                key: 'telphone',
            }, {
                title: '区域',
                dataIndex: 'region',
                key: 'region',
                width: 100,
                render: (region, record, index) => <span>{this.handleCityCode(region)}</span>
            }, {
                title: '行业',
                dataIndex: 'industry',
                key: 'industry',
                width: 150,
                render: (industry, record, index) => <span>{this.handleIndustryCode(industry)}</span>
            }, {
                title: '公司名称',
                dataIndex: 'company',
                key: 'company',
                width: 130
            }, {
                title: '职务',
                dataIndex: 'position',
                key: 'position',
                width: 130
            }, {
                title: '公司地址',
                dataIndex: 'address',
                key: 'address',
                width: 150,
                render: address => (<span title={address}>{`${address}`.length > 5 ? `${address.substr(0, 6)}...` : address}</span>)
            }, {
                title: '录入时间',
                dataIndex: 'createDate',
                key: 'createDate',
                sorter: true,
                width: 160,
                render: createDate => (<span>{getFormatDate(createDate)}</span>)
            }, {
                title: '联系状态',
                dataIndex: 'isContact',
                key: 'isContact',
                sorter: true,
                width: 120,
                render: text => {
                    switch (text) {
                        case 0:
                            return <span>未联系</span>;
                        case 1:
                            return <span>已联系</span>;
                        default:
                            return null;
                    }
                }
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                sorter: true,
                width: 80,
                render: text => {
                    switch (text) {
                        case 0:
                            return <span>待审核</span>;
                        case 1:
                            return <span>已审核</span>;
                        default:
                            return null;
                    }
                }
            }, {
                title: '录入人',
                dataIndex: 'operator',
                key: 'operator',
                width: 80,
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 120,
                render: (text, record) => (
                    <span>
                        <button className="link-button" onClick={() => this.showModal(record, true)}>详情</button>
                        <Divider type='vertical'></Divider>
                        {record.status === 0 ? <button className="link-button" onClick={() => this.showModal(record, false)} >审核</button> : null}
                    </span>
                )
            }];
        return (
            <div>
                <PersonSearch
                    wrappedComponentRef={(form) => this.formRef = form}
                    onSearch={this.handleSearch}
                    onExport={this.handleExportExcel}
                >
                </PersonSearch>
                <Table
                    loading={loading}
                    dataSource={data}
                    columns={columns}
                    rowKey={record => record.id}
                    scroll={{ x: 1300 }}
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 20,
                        total: totalCount,
                        current: currentPageIndex,
                        showTotal: (total, range) => <span>共计{total}条</span>
                    }}
                    onChange={this.handleTableChange}
                >
                </Table>
                <PersonDetails
                    visible={modelVisible}
                    isViewDetails={isViewDetails}
                    person={this.selectPerson}
                    onCancel={this.handleCancel}
                    onSearch={this.handleSearch}
                    confirmLoading={confirmLoading}
                />
            </div>
        );
    }
}

export default PersonList;