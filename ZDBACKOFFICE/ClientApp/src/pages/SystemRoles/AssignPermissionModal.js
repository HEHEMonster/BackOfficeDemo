import React, { Component } from 'react';
import { Modal, Transfer } from 'antd';
import { Get } from '../../utils/http';

class AssignPermissionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions: [],
            targetKeys: [],
            selectedKeys: [],
            disabled: false
        }
    }

    // 获取系统操作权限数据
    componentDidMount() {
        Get('/api/system/all/permission').then(res => {
            let permissions = [];
            [...res.data].map(x => permissions.push(
                {
                    key: x.id,
                    title: `${x.name}`,
                    description: `${x.name}`,
                    disabled: false,
                }));
            this.setState({ permissions: permissions });
        })
    }

    // 设置当前操作员角色
    componentWillReceiveProps(nextProps) {
        // if(!nextProps.visible) this.setState({ targetKeys: [] });
        if (this.props.role.permissions !== nextProps.role.permissions) {
            this.setState({ targetKeys: nextProps.role.permissions });
        }
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
        const { visible, onCancel, confirmLoading, role } = this.props;
        const { targetKeys, selectedKeys, permissions, disabled } = this.state;
        return (
            <Modal
                title="分配权限"
                okText="完成"
                cancelText="取消"
                visible={visible}
                onOk={this.handleOk}
                onCancel={onCancel}
                confirmLoading={confirmLoading}
            >
                <h3>角色名</h3>
                <div>{role.name}</div>
                <br />
                <Transfer
                    dataSource={permissions}
                    titles={['系统操作权限', '当前角色拥有权限']}
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

export default AssignPermissionModal;