import React, { Component } from 'react';
import { Modal, Row, Col, Tag } from 'antd';

class UserArticleDateils extends Component {
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
        const { visible, onCancel, confirmLoading, article } = this.props;

        /*获取反人类的视频地址*/
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
                    height={160}
                    alt='封面'
                    onClick={() => this.handlePreview(article.cover)}
                />
        )
        const tags = `${article.tags}`.split(' ');
        //获取标签
        const defaultTags = tags.map((tag, i) =>
            <Tag
                style={{ marginBottom: 3 }}
                key={i}
                color="#87d068"
            >
                {tag}
            </Tag>)

        const articleTags = (
            article.tags !== "" ? 
            <span>{defaultTags}</span>
                : <Tag>暂无标签</Tag>)

        const articleStatus = (
            <span>{(() => {
                switch(article.status){
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
                       <Col>
                        <h2>审核人：{article.auditor}</h2>
                       </Col> 
                    </Row>
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
                                    <h3>发表人：{article.userName || "佚名"}</h3>
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
                    <Row type='flex' style={{ height: '40px' }}>
                        <h3>相关标签：{articleTags}</h3>
                    </Row>
                    <Row type='flex' style={{ height: '40px' }}>
                        <h3>审核结果：{articleStatus}</h3>
                    </Row>
                    <Row type='flex' style={{ height: '40px' }}>
                        <h3>备注：{article.remark}</h3>
                    </Row>
                </Modal>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="封面" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>

        );
    }
}

export default UserArticleDateils