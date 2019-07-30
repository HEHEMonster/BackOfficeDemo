import React, { Component } from 'react';
import { Modal, Transfer } from 'antd';
import { getAllRolesForAssgin } from './Service';


class AssginRoleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            targetKeys: [],
            selectedKeys: [],
            disabled: false
        }
    }

    // 获取系统角色数据
    componentDidMount() {
        getAllRolesForAssgin().then(res => {
            let roles = [];
            [...res.data].map(x => roles.push(
                {
                    key: x.id,
                    title: `${x.name}`,
                    description: `${x.name}`,
                    disabled: false,
                }));
            this.setState({ roles: roles });
        })
    }

    // 设置当前操作员角色
    componentWillReceiveProps(nextProps) {
        if (this.props.operator.roles !== nextProps.operator.roles)
            this.setState({ targetKeys: nextProps.operator.roles });
    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });

    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }

    // handleScroll = (direction, e) => {
    //     // e.target
    // }

    handleOk = () => {
        const { onOk } = this.props;
        onOk(this.state.targetKeys);
    }

    render() {
        const { visible, onCancel, confirmLoading, operator } = this.props;
        const { targetKeys, selectedKeys, roles, disabled } = this.state;
        return (
            <Modal
                title="分配角色"
                okText="完成"
                cancelText="取消"
                visible={visible}
                onOk={this.handleOk}
                onCancel={onCancel}
                confirmLoading={confirmLoading}
            >
                <h3>用户名</h3>
                <div>{operator.name}</div>
                <br />
                <Transfer
                    dataSource={roles}
                    titles={['系统角色', '当前角色']}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    onScroll={this.handleScroll}
                    render={item => item.title}
                    disabled={disabled}
                    listStyle={{
                        width: '45%'
                    }}
                />
            </Modal>
        );
    }
}

export default AssginRoleModal;