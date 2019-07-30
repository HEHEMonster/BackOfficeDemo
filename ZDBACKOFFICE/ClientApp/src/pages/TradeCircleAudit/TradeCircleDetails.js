import React, { Component } from 'react';
import { Form, Modal, Row, Col, Input, Tag, Radio } from 'antd';

class TradeCircleDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: ''
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (url) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
    }

    handleUrl = (medias) => {
        try {
            return medias ? JSON.parse(medias)[0].url : null;
        }
        catch{
            return null;
        }
    }

    handleChange() {
        console.log(this.props.form.getFieldValue('status'));
    }

    handleType = (text) => {
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

    render() {
        const { visible, onCancel, confirmLoading, tradeCircle, isViewDetails, onSubmit } = this.props;
        const footer = isViewDetails ? { footer: null } : {};
        const { getFieldDecorator } = this.props.form;
        const url = this.handleUrl(tradeCircle.medias);
        const AuditForm = (
            <Form>
                <Form.Item label='审核结果'>
                    {
                        getFieldDecorator('status', {
                            rules: [{ required: true, message: '请选择审核结果' }]
                        })(
                            <Radio.Group>
                                {/* <Radio value="1">无违规</Radio> */}
                                <Radio value="0">删除</Radio>
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                {this.props.form.getFieldValue('status') === "0" ? <Form.Item label='删除原因'>
                    {
                        getFieldDecorator('remark', {
                            rules: [{
                                required: true, message: '请填写原因'
                            }, {
                                max: 120, message: '不得超过120字!'
                            }]
                        })(
                            <Input.TextArea></Input.TextArea>
                        )
                    }
                </Form.Item> : null}
            </Form>
        )
        return (
            <div>
                <Modal
                    title='生意圈详情'
                    okText='确认'
                    CancelText='取消'
                    onOk={onSubmit}
                    visible={visible}
                    onCancel={onCancel}
                    confirmLoading={confirmLoading}
                    destroyOnClose
                    {...footer}
                >
                    <Row gutter={32}>
                        <Col>
                            <h3>姓名：<span>{tradeCircle.user ? tradeCircle.user.nickName : null}</span></h3>
                        </Col>
                        <Col>
                            <h3>手机号码：<span>{tradeCircle.telphone}</span></h3>
                        </Col>
                        <Col>
                            <h3>生意圈类型：<span>{this.handleType(tradeCircle.type)}</span></h3>
                        </Col>
                    </Row>
                    <Row type='flex' gutter={5}>
                        <Col md={5}>
                            <h3>{tradeCircle.type === 2 ? "生意圈视频" : "生意圈图片"}</h3>
                        </Col>
                    </Row>
                    <Row type='flex' gutter={5}>
                        <Col md={5}>
                        </Col>
                        <Col md={16}>
                            {tradeCircle.type === 2 ? <video controls="controls"
                                src={url}
                                preload="auto"
                                controlsList="fullscreen"
                                width="100%"
                                height="100%"></video> : <img alt="图片" src={url} onClick={() => this.handlePreview(url)} />}
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col md={5}>
                            <h3>生意圈内容:</h3>
                        </Col>
                        <Col md={18}>
                            <div className='mb-10' dangerouslySetInnerHTML={{ __html: tradeCircle.content ? tradeCircle.content : '无' }}></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>点赞数：<span>{tradeCircle.likeCount}</span></h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <h3>备注：</h3>
                        </Col>
                        <Col md={18}>
                            <span>{tradeCircle.remark}</span>
                        </Col>
                    </Row>
                    <Row type='flex' style={{ height: '40px' }}>
                        <Col md={10}>
                            <h3>推荐情况：<span>{tradeCircle.remark ? '已推荐' : '未推荐'}</span></h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <h3>标签：</h3>
                        </Col>
                        <Col md={12}>
                            {tradeCircle.tags ? `${tradeCircle.tags}`.split(' ').map((t, i) => <Tag key={i} color="green">{t}</Tag>) : '无'}
                        </Col>
                    </Row>
                    {!isViewDetails ? AuditForm : null}
                </Modal>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="封面" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>

        );
    }
}

TradeCircleDetails = Form.create()(TradeCircleDetails)
export default TradeCircleDetails;