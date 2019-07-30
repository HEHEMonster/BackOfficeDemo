import React, { Component } from 'react';
import { Form, Modal, Row, Col, Select, Input } from 'antd';
import '../../styles/Common.css';
import PictureModal from '../../components/PictureModal';

class UserProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (url) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
    }

    handleSumbit = (e) => {
        const { onSubmit } = this.props;
        onSubmit(e, this.state.selectTags);
    }

    render() {
        const { visible, onCancel, confirmLoading, product } = this.props;
        const { getFieldDecorator } = this.props.form;

        // 审核表单
        const AuditForm = (
            <Form layout='vertical'>
                <Form.Item label="审核结果">
                    {
                        getFieldDecorator('status', {
                            rules: [{ required: true, message: '请选择审核结果!' }]
                        })(
                            <Select
                                className='width100'
                                placeholder='请选择审核结果'
                                onChange={value => this.setState({
                                    status: value
                                })}
                            >
                                <Select.Option value={1}>通过</Select.Option>
                                <Select.Option value={-1}>不通过</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                {this.props.form.getFieldValue('status') === -1 ? <Form.Item label="未通过原因">
                    {
                        getFieldDecorator('auditRemark', {
                            rules: [{ 
                                required: true, message: '请填写原因!' 
                            },{
                                max: 120, message: '不得超过120字!'
                            }]
                        })(
                            <Input.TextArea></Input.TextArea>
                        )
                    }
                </Form.Item> : null}
            </Form>
        );

        return (
            <div>
                <Modal
                    title="审核"
                    okText="完成"
                    cancelText="取消"
                    visible={visible}
                    onOk={this.handleSumbit}
                    onCancel={onCancel}
                    confirmLoading={confirmLoading}
                >
                    <Row type='flex' gutter={16}>
                        <Col md={8}>
                            <img
                                src={product.cover}
                                width={150}
                                height={180}
                                alt="产品封面"
                                onClick={() => this.handlePreview(product.cover)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Col>
                        <Col md={16}>
                            <Row type='flex' style={{ height: '50px' }} align='top'>
                                <Col span={24}>
                                    <h2>{product.title}</h2>
                                </Col>
                            </Row>
                            <Row type='flex' style={{ height: '50px' }} align='middle'>
                                <Col span={24}>
                                    <h2 className='text-pirmary'>价格：<span>{product.unitPrice}</span></h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <h3>创建人：{product.userName || "佚名"}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <h3>联系方式：{product.telphone || "无"}</h3>
                                </Col>
                            </Row>
                            <Row /*type='flex' justify='space-around' /*style={{ height: '50px' }}*/ align='bottom'>
                                <Col span={8}>
                                    <h3>浏览数：{product.viewCount}</h3>
                                </Col>
                                <Col span={8}>
                                    <h3>收藏数：{product.collectCount}</h3>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <h3>生意详情</h3>
                    <div className='mb-10' dangerouslySetInnerHTML={{ __html: product.content }}></div>
                    {AuditForm}
                </Modal>

                <PictureModal
                    alt="封面"
                    visible={this.state.previewVisible}
                    imageUrl={this.state.previewImage}
                    onCancel={this.handleCancel}
                />
            </div>

        );
    }
}

UserProductModal = Form.create()(UserProductModal);

export default UserProductModal;