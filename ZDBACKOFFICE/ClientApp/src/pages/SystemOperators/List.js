import React, { Component } from 'react';
import { Row, Col, Input, Table, Select, Button, message } from 'antd';

import '../../styles/Common.css';
import { getFormatDate } from '../../utils/date';
import NewOperatorModal from './CreationModal';
import AssginRoleModal from './AssginRoleModal';
import { getSystemOperators, createOperator, assginRoles } from './Service';
const { Column } = Table;

class SystemOperatorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalCount: 0,
            loading: false,
            visible: false,
            confirmLoading: false,
            currentPageIndex: 1,
            assginModalVisible: false,
            assginModalConfirmLoading: false,
            name: '',
            status: -1,
        }
    }
    selectOperator = {};
    password = '';

    componentDidMount() {
        this.handleSearch();
    }

    getSystemOperatorList = async (filter) => {
        this.setState({ loading: true });
        getSystemOperators(filter).then(({ data }) => {
            this.setState({
                data: data.pageData,
                totalCount: data.totalCount
            });
        }).catch((err) => console.log(err))
            .then(() => this.setState({ loading: false }));
    }

    handlePageChange = (page, pageSize) => {
        this.setState({ currentPageIndex: page });
        this.getSystemOperatorList(Object.assign({ pageIndex: page }, this.getFilter()));
    }

    handleSearch = () => {
        this.setState({ currentPageIndex: 1 }, () => this.getSystemOperatorList(this.getFilter()));
    }

    getFilter = () => {
        return {
            name: this.state.name,
            status: this.state.status
        }
    }

    handleReset = () => {
        this.setState({
            name: '',
            status: -1
        }, () => {
            this.handleSearch();
        });
    }

    showAddModal = () => {
        this.setState({ visible: true });
    }

    handleAddSumbit = (e) => {
        e.preventDefault();
        const form = this.formRefAdd.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                createOperator(values).then(res => {
                    message.success("创建成功！");
                    // this.setState({ visible: false });
                    this.password = res.data.result;
                    this.getSystemOperatorList(Object.assign({ pageIndex: this.state.currentPageIndex }, this.getFilter()));
                }).catch(err => {
                    let msg = err.response.data.message;
                    message.error(`创建失败！失败原因:${msg}`);
                }).then(() => this.setState({ confirmLoading: false }));
            }
        })
    }

    handleAddCancel = () => {
        this.password = '';
        this.setState({
            visible: false
        });
        this.formRefAdd.props.form.resetFields();
    }

    showAssginModal = (operator) => {
        this.selectOperator = operator;
        this.setState({ assginModalVisible: true });
    }

    handleAssginCancel = () => {
        this.setState({
            assginModalVisible: false
        });
    }

    handleAssginRoles = (roles) => {
        if (this.selectOperator !== {}) {
            this.setState({ assginModalConfirmLoading: true });
            let model = { operatorID: this.selectOperator.operatorID, roleIDs: roles };
            assginRoles(model).then((res) => {
                message.success("操作成功！");
                this.handleAssginCancel();
                this.getSystemOperatorList({ pageIndex: this.state.currentPageIndex, ...this.getFilter() })
            }).catch(err => {
                let msg = err.response.data.message;
                message.error(`操作失败！失败原因:${msg}`);
            }).then(() => this.setState({ assginModalConfirmLoading: false }))
        }
    }

    render() {
        const { name, status, visible, confirmLoading, loading, data, assginModalVisible, assginModalConfirmLoading } = this.state;
        return (
            <div>
                <Row
                    gutter={16}
                >
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Input placeholder="用户名" value={name} onChange={({ target }) => this.setState({
                            name: target.value
                        })} />
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
                            <Select.Option value={0}>未启用</Select.Option>
                            <Select.Option value={1}>启用</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={12} md={24} sm={24} className='mb-15'>
                        <Row type='flex' align='middle' justify='space-between'>
                            <div>
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
                            </div>
                            <Button
                                type="default"
                                icon="plus"
                                onClick={this.showAddModal}
                            >新建</Button>
                        </Row>
                    </Col>
                </Row>
                <Table
                    loading={loading}
                    dataSource={data}
                    rowKey={record => record.operatorID}
                    scroll={{ x: 1300 }}
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 20,
                        total: this.state.totalCount,
                        onChange: this.handlePageChange,
                        current: this.state.currentPageIndex,
                        showTotal: total => <span>共计{total}条</span>
                    }}
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
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="状态"
                        dataIndex="status"
                        key="status"
                        render={text => {
                            switch (text) {
                                case 0:
                                    return <span>未启用</span>;
                                case 1:
                                    return (<span>已启用</span>);
                                default:
                                    return null;
                            }
                        }}
                    />
                    <Column
                        title="创建时间"
                        dataIndex="createDate"
                        key="createDate"
                        render={createDate => (
                            <span>{getFormatDate(createDate)}</span>
                        )}
                    />
                    <Column
                        title="操作"
                        key="action"
                        fixed="right"
                        width={150}
                        render={(text, record) => (
                            <button className="link-button" onClick={() => this.showAssginModal(record)}>分配角色</button>
                        )}
                    />
                </Table>
                <NewOperatorModal
                    visible={visible}
                    onOk={this.handleAddSumbit}
                    onCancel={this.handleAddCancel}
                    confirmLoading={confirmLoading}
                    wrappedComponentRef={(form) => { this.formRefAdd = form; }}
                    password={this.password}
                />

                <AssginRoleModal
                    visible={assginModalVisible}
                    onOk={this.handleAssginRoles}
                    onCancel={this.handleAssginCancel}
                    confirmLoading={assginModalConfirmLoading}
                    operator={this.selectOperator}
                />
            </div>
        );
    }
}

export default SystemOperatorList;