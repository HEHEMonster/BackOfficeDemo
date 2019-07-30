import React, { Component } from 'react';
import { Form, Modal, Row, Col, Select, Input } from 'antd';

class UserArticleModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handleSubmit = (e) => {
        const { onSubmit } = this.props;
        onSubmit(e);
    }

    handlePreview = (url) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
    }

    render() {
        const { visible, onCancel, confirmLoading, article } = this.props;
        const { getFieldDecorator } = this.props.form;

        const AuditForm = (
            <Form layout='vertical'>
                <Form.Item label='审核结果'>
                    {
                        getFieldDecorator('status', {
                            rules: [{ required: true, message: '请选择审核结果' }]
                        })(
                            <Select
                                className='width100'
                                placeholder='请选择审核结果'
                            >
                                <Select.Option value={-1}>删除</Select.Option>
                                <Select.Option value={1}>通过</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                {this.props.form.getFieldValue('status') === -1 ? <Form.Item label='删除原因'>
                    {
                        getFieldDecorator('remark', {
                            rules: [{ 
                                required: true, message: '请填写原因' 
                            },{
                                max: 120, message: '不得超过120字!'
                            }]
                        })(
                            <Input.TextArea></Input.TextArea>
                        )
                    }
                </Form.Item> : null}
                {this.props.form.getFieldValue('status') === 1 ? <Form.Item label='是否推送热门'>
                    {
                        getFieldDecorator('isHot', {
                            rules: [{ required: true, message: '请选择是否推送' }]
                        })(
                            <Select
                                className='width100'
                                placeholder='请选择是否推送'
                            >
                                <Select.Option value={1}>是</Select.Option>
                                <Select.Option value={0}>否</Select.Option>
                            </Select>
                        )
                    }</Form.Item> : null}
            </Form>
        )

        const urls = `${article.cover}`.split('"');

        /*判断是否为视频*/
        const ImageOrVideo = (
            article.type === 2 ?
                <video src={urls[7]}
                    controls="controls"
                    preload="auto"
                    controlsList="nofullscreen "
                    width="100%"
                    height="100%"
                >
                </video> :
                <img src={article.cover}
                    width={150}
                    height={150}
                    alt='封面'
                    onClick={() => this.handlePreview(article.cover)}
                />
        )

        return (
            <div>
                <Modal
                    title='审核'
                    okText='完成'
                    CancelText='取消'
                    onOk={this.handleSubmit}
                    visible={visible}
                    onCancel={onCancel}
                    confirmLoading={confirmLoading}
                    destroyOnClose      //弹出层关闭时删除此组件
                >
                    <Row type='flex' gutter={16}>
                        <Col md={8}>
                            {ImageOrVideo}
                        </Col>
                        <Col md={16}>
                            <Row type='flex' style={{ height: '80px' }} align='top'>
                                <Col span={24}>
                                    <h2>标题： {article.title}</h2>
                                </Col>
                            </Row>
                            <Row type='flex' style={{ height: '30px' }} align='top'>
                                <Col span={11}>
                                    <h3>发表人：{article.userName}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <h3>手机号：{article.telphone}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11}>
                                    <h3>点赞数: {article.likeCount}</h3>
                                </Col>
                                <Col span={11}>
                                    <h3>收藏数: {article.collectCount}</h3>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <h3>正文</h3>
                    <div className='mb-10' dangerouslySetInnerHTML={{ __html: article.content }}></div>
                    {AuditForm}
                </Modal>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="封面" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>

        );
    }
}

UserArticleModel = Form.create()(UserArticleModel)
export default UserArticleModel