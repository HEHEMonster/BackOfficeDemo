import React, { Component } from 'react';
import { Table, Divider, Popconfirm, message } from 'antd';
import { getFormatDate } from '../../utils/date';
import '../../styles/Common.css';
import './TradeCirclePush.css';

// import TradeCirclePush from './TradeCirclePush';
import TradeCircleDetails from '../TradeCircleAudit/TradeCircleDetails';
import TradeCirclePushSearch from'./TradeCirclePushSearch';

class TradeCirclePushList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsVisible: false,
            auditVisible: false,
            modelVisible: false,
        }
    }

    selectArticle = {};

    showAuditModal = (article) => {
        this.setState ({ auditVisible: true })
        // this.selectArticle = article
    }

    showDetailsModal = (article) => {
        // this.selectArticle = article;
        // this.getTags(article);
        this.setState ({ detailsVisible: true })
    }

    handleCancel = () => {
        this.setState({ modelVisible: false, detailsVisible: false, auditVisible: false  });
        // this.formRef.props.form.resetFields();
    }
    
    confirm = (e) => {
        // console.log(e);
        message.success('操作成功！');
    }
      
    cancel = (e) => {
        // console.log(e);
        // message.error('您选择了不推送！');
    }


    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                width: 80,
                render: (text, record, index) => <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
            },{
                title: '姓名',
                dataIndex: 'userName',
                key: 'userName',
                width: 80,
            },{
                title: '手机号码',
                dataIndex : 'telphone',
                key: 'telphone',
                width: 80,
            },{
                title: '生意圈类型',
                dataIndex: 'type',
                key: 'type',
                width: 80,
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
            },{
                title: '内容预览',
                dataIndex: 'content',
                key: 'content',
                width: 100,
                render:(text) => {
                    return (
                        <span>
                            {text ? (text.length > 10 ? text.substr(0, 10) + "(.....)" : text) : ""}
                        </span>
                    )
                }
            },{
                title: '发布时间',
                dataIndex: 'createDate',
                key: 'createDate',
                width: 145,
                render: CreateDate => (<span>{getFormatDate(CreateDate)}</span>)
            },{
                title: '推荐人',
                dataIndex: 'reportUserName',
                key: 'reportUserName',
                width: 80,
            },{
                title: '标签',
                dataIndex: 'tags',
                key: 'tags',
                // width: 100,
            },{
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                width: 100,
                render:(text) => {
                    return (
                        <span>
                            {text ? (text.length > 10 ? text.substr(0 , 10) + "(....)": text) : ""}
                        </span>
                    )
                }
            },{
                title: '推送状态',
                dataIndex: 'status',
                key: 'status',
                width: 90,
                render: text => {
                    switch (text) {
                        case 0:
                            return <span>未推送</span>;
                        case 1:
                            return <span>已推送</span>
                        default:
                            return null;
                    }
                }
            },{
                title: '推送时间',
                dataIndex: 'pushDate',
                key: 'pushDate',
                width: 145,
                render: CreateDate => (<span>{getFormatDate(CreateDate)}</span>)
            },{
                title: '热门排序',
                dataIndex: 'hotSort',
                width: 90,
            },{
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 200,
                render: (text, record) => (
                    <span>
                        {/* {record.status !== 1 
                        ? <Popconfirm title="是否确定推送此条生意圈？" onConfirm={this.confirm} onCancel={this.cancel} okText="是" cancelText="否">
                         <a href="javascript:;">推送</a>
                        </Popconfirm> 
                        : null}
                        <Divider type='vertical'></Divider> */}
                        <a href='javascript:;' onClick={() => this.showDetailsModal(record)}>查看</a>
                        <Divider type='vertical'></Divider>
                        {/* {record.status !== 0 ? <a href='javascript:;' onClick={() => alert("是否确定取消推送此条生意圈？")}>取消推送</a> : null}  */}
                        {record.status !== 0 
                        ? <Popconfirm title="是否确定取消推送此条生意圈？" onConfirm={this.confirm} onCancel={this.cancel} okText="是" cancelText="否">
                         <a href="javascript:;">取消推送</a>
                        </Popconfirm> 
                        : null}
                        <Divider type='vertical'></Divider>
                        {/* {record.status !== 0 ? <a href='javascript:;' onClick={() => alert("是否确定置顶此条生意圈？")}>置顶</a> : null} */}
                        {record.status !== 0 
                        ? <Popconfirm title="是否确定置顶此条生意圈？" onConfirm={this.confirm} onCancel={this.cancel} okText="是" cancelText="否">
                         <a href="javascript:;">置顶</a>
                        </Popconfirm> 
                        : null}
                    </span>
                )
            }];

        const data = [{
            key: '1',
            num: 1,
            userName: '王三',
            telphone: '13010101010',
            type: 1,
            content: 'img',
            createDate: '2019/1/25 12:00:00',
            reportUserName: 'ZD001',
            tags: '5G通信、华为基站、通信布局',
            remark: '优质内容',
            status: 0,
            pushDate:'2019/2/25 12:00:00',
            hotSort: 1,
            action: ''
            }, {
            key: '2',
            num: 2,
            userName: '陈盛强',
            telphone: '13909090909',
            type: 2,
            content: 'Video',
            createDate: '2019/1/25 12:00:00',
            reportUserName: 'ZD002',
            tags: '5G通信、华为基站、通信布局',
            remark: '优质内容',
            status: 1,
            pushDate:'2019/2/25 12:00:00',
            hotSort:2,
            action: ' '
            }, {
            key: '3',
            num: 3,
            userName: '陈秀秀',
            telphone: '13808080808',
            type: 3,
            content: '大王叫我来巡山，咿呀哟~',
            createDate: '2019/1/25 12:00:00',
            reportUserName: 'ZD003',
            tags: '5G通信、华为基站、通信布局',
            remark: '优质内容',
            status: 0,
            pushDate:'2019/2/25 12:00:00',
            hotSort: 3,
            action: ''
            }];

        return (
            <div>
                <TradeCirclePushSearch />
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1500 }}
                />
                {/* <TradeCirclePush
                    visible={this.state.auditVisible}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleCancel}
                    article={this.selectArticle}
                /> */}

                <TradeCircleDetails
                    visible={this.state.detailsVisible}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleCancel}
                    article={this.selectArticle}
                /> 
            </div> 
        );
    }
}

export default TradeCirclePushList;