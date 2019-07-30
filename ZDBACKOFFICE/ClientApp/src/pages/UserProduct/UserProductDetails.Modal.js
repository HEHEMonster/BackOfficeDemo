import React, { Component } from 'react';
import { Modal, Row, Col, Tag } from 'antd';

class UserProductDateils extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (url) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
    }

    render() {
        const { visible, onCancel, confirmLoading, product } = this.props;

        const tags = `${product.tags}`.split(' ');

        //获取标签
        const defaultTags = tags.map((tag, i) =>
            <Tag
                style={{ marginBottom: 3 }}
                key={i}
                color="#87d068"
            >
                {tag}
            </Tag>)

        const productTags = (
            product.tags !== "" ? 
            <span>{defaultTags}</span>
                : <Tag>暂无标签</Tag>)

        const productStatus = (
            <span>{(() => {
                switch(product.status){
                    case -1:
                        return <Tag color="red">未通过</Tag>
                    case 0:
                        return <Tag color="volcano">审核中</Tag>
                    case 1:
                        return <Tag color="green">通过</Tag>
                    default:
                        return null
                }
            })()}</span>
        )      

        return (
            <div>
                <Modal
                    title='查看详情'
                    okText='返回'
                    CancelText='取消'
                    onOk={onCancel}
                    visible={visible}
                    onCancel={onCancel}
                    confirmLoading={confirmLoading}
                    destroyOnClose 
                    footer={null}
                >
                    <Row type='flex' gutter={16} style={{height: '50px'}}>
                       <Col span={14}>
                        <h2>审核人：{product.auditor}</h2>
                       </Col> 
                       <Col span={10}>
                       <h2 className='text-pirmary'>产品价格：<span>{product.unitPrice}</span></h2>
                       </Col>
                    </Row>
                    <Row type='flex' gutter={16}>
                        <Col md={8}>
                        <img src={product.cover}
                            width={150}
                            height={160}
                            alt='封面'
                            onClick={() => this.handlePreview(product.cover)}
                        />
                        </Col>
                        <Col md={16}>
                            <Row type='flex' style={{ height: '80px' }} align='top'>
                                <Col span={24}>
                                    <h2>标题： {product.title}</h2>
                                </Col>
                            </Row>
                            <Row type='flex' style={{ height: '30px' }} align='top'>
                                <Col span={11}>
                                    <h3>发表人：{product.userName || "佚名"}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <h3>手机号：{product.telphone}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11}>
                                    <h3>点赞数: {product.likeCount || "0"}</h3>
                                </Col>
                                <Col span={11}>
                                    <h3>收藏数: {product.collectCount || "0"}</h3>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <h2>产品描述</h2>
                    <div className='mb-10' dangerouslySetInnerHTML={{ __html: product.content }}></div>
                    <Row type='flex' style={{ height: '60px' }}>
                        <h3>相关标签：{productTags}</h3>
                    </Row>
                    <Row type='flex' style={{ height: '40px' }}>
                        <h3>审核结果：{productStatus}</h3>
                    </Row>
                    <Row type='flex' style={{ height: '40px' }}>
                        <h3>备注：{product.remark}</h3>
                    </Row>
                </Modal>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="封面" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>

        );
    }
}

export default UserProductDateils