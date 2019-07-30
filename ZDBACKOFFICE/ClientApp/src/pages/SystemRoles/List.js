import React, { Component } from 'react';
import { Table, Input, Button, Row, Col, Select, Switch, message } from 'antd';
import moment from 'moment';
import '../../styles/Common.css';
import { GetWithParams, Post } from '../../utils/http';
import { getFormatDate } from '../../utils/date';
import NewRolesModal from './Modal';
import AssignPermissionModal from './AssignPermissionModal';

class SystemRoleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPageIndex: 1,
            total: 0,
            createDate: moment,
            totalCount: 0,
            loading: false,
            modelVisible: false,
            confirmLoading: false,
            assignModalVisible: false,
            assignModalConfirmLoading: false,
            name: "",
            status: -1,
        }
    }

    selectRole = {};

    componentDidMount() {
        this.handleSearch(this.getFilter());
    }

    /*重置 */
    handleReset = () => {
        this.setState({
            name: '',
            status: -1
        }, () => {
            this.handleSearch();
        });
    }

    /*搜索*/
    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getSystemRolesList(this.getFilter()));
    }

    getFilter = () => {
        return {
            name: this.state.name,
            status: this.state.status
        }
    }

    /*分页 */
    handlePageChange = (page) => {
        this.setState({ currentPageIndex: page });
        this.getSystemRolesList(Object.assign({ pageIndex: page }.getFilter()))
    }

    /*获取列表 */
    getSystemRolesList = (filter) => {
        this.setState({ loading: true });
        GetWithParams('/api/system/roles', filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount,
                loading: false,
            })
        })
    }

    showModel = () => {
        this.setState({ modelVisible: true })
    }

    handleCreate = (e) => {
        e.preventDefault();
        const form = this.formRefAdd.props.form;
        form.validateFields((err, value) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                Post('/api/system/create/role', value).then(() => {
                    form.resetFields();
                    this.setState({ confirmLoading: false, modelVisible: false });
                    message.success("创建成功！")
                    this.getSystemRolesList(Object.assign({ pageIndex: this.state.currentPageIndex }, this.getFilter()));
                }, (err) => {
                    this.setState({ confirmLoading: false });
                    message.error(`创建失败，失败原因:${err.response.data.message}`)
                })
            }
        })
    }

    handleCancel = () => {
        this.setState({
            modelVisible: false
        });
        this.formRefAdd.props.form.resetFields();
    }

    /*开启角色状态 */
    handleSwitch = (record) => {
        this.setState({ loading: true });
        Post('/api/system/IsEnable', record).then(() => {
            message.success("操作成功");
            this.handleSearch();
        }).catch(err => {
            message.error(`操作失败，失败原因:${err.message}`);
        }).then(() => this.setState({ loading: false }));
    }

    showAssignModal = (role) => {
        this.selectRole = role;
        this.setState({ assignModalVisible: true });
    }

    handleAssignCancel = () => {
        this.setState({
            assignModalVisible: false
        });
    }

    handleAssignPremission = (permissions) => {
        if (this.selectRole !== {}) {
            this.setState({ assignModalConfirmLoading: true });
            let model = { roleID: this.selectRole.id, permissionIDs: permissions };
            Post('/api/system/assign/permission', model).then((res) => {
                message.success("操作成功！");
                this.handleAssignCancel();
                this.getSystemRolesList({ pageIndex: this.state.currentPageIndex, ...this.getFilter() });
            }).catch(err => {
                let msg = err.response.data.message;
                message.error(`操作失败！失败原因:${msg}`);
            }).then(() => this.setState({ assignModalConfirmLoading: false }))
        }
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                render: (text, record, index) => <span>{(this.state.currentPageIndex - 1) * 20 + index + 1}</span>
            }, {
                title: '角色名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => (
                    <Switch defaultChecked={text === 1}
                        checkedChildren="|" unCheckedChildren="O"
                        onChange={() => this.handleSwitch(record)}
                    />
                )
            }, {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate',
                render: createDate => <span>{getFormatDate(createDate)}</span>
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 150,
                render: (text, record) => record.status === 1 ? (<button className="link-button" onClick={() => this.showAssignModal(record)}>分配权限</button>) : null
            }]

        const { name, status, confirmLoading, assignModalConfirmLoading, assignModalVisible } = this.state
        return (
            <div>
                <Row gutter={16}>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Input placeholder="角色名" value={name}
                            onChange={({ target }) => this.setState({ name: target.value })}
                        />
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Select style={{ width: '100%' }} placeholder="状态"
                            value={status}
                            onChange={(value, option) => this.setState({
                                status: value
                            })}>
                            <Select.Option value={-1}>全部状态</Select.Option>
                            <Select.Option value={0}>未启用</Select.Option>
                            <Select.Option value={1}>已启用</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={12} md={24} sm={24} className='mb-15'>
                        <Row type='flex' align='middle' justify='space-between'>
                            <div>
                                <Button
                                    type="primary"
                                    icon="search"
                                    style={{ marginRight: 6 }}
                                    onClick={this.handleSearch}
                                >
                                    搜索
                        </Button>
                                <Button
                                    type='default'
                                    icon="redo"
                                    style={{ marginRight: 6 }}
                                    onClick={this.handleReset}
                                >
                                    重置
                         </Button>
                            </div>
                            <Button
                                type='default'
                                icon="plus"
                                onClick={this.showModel}
                            >
                                新建
                    </Button>
                        </Row>
                    </Col>
                </Row>

                <Table
                    dataSource={this.state.data}
                    columns={columns}
                    loading={this.state.loading}
                    rowKey={record => record.id}
                    scroll={{ x: 1300 }}
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 20,
                        total: this.state.totalCount,
                        onChange: this.handlePageChange,
                        current: this.state.currentPageIndex,
                        showTotal: (total) => <span>共{total}条</span>
                    }}
                >
                </Table>

                <NewRolesModal
                    onOk={this.handleCreate}
                    onCreate={this.handleCreate}
                    onCancel={this.handleCancel}
                    visible={this.state.modelVisible}
                    confirmLoading={confirmLoading}
                    wrappedComponentRef={(form) => { this.formRefAdd = form; }}
                />

                <AssignPermissionModal
                    visible={assignModalVisible}
                    onOk={this.handleAssignPremission}
                    onCancel={this.handleAssignCancel}
                    confirmLoading={assignModalConfirmLoading}
                    role={this.selectRole}
                />
            </div>
        );
    }
}

export default SystemRoleList;