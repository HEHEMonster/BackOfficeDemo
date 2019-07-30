import React, { Component } from 'react';
import { Modal, Row, Col, Tag, Radio, Input, Tooltip, Icon } from 'antd';

const RadioGroup = Radio.Group;

class TradeCircleAudit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            selectTags: [],
            auditValue: 1,
            recommendationValue: 2,
            tags: ['区块链', '5G通信'],
            inputVisible: false,
            inputValue: '',
        }
    }

    onChangeAuditValue = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            auditValue: e.target.value,
        });
      }
    
    onChangeRecommendationValue = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            recommendationValue: e.target.value,
        });
    }  

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (url) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
      }
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      }
    
      handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
      }
    
      handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      }
    
    saveInputRef = input => this.input = input

    render() {
        const { visible, onCancel, confirmLoading, tradeCircle } = this.props;
        const { tags, inputVisible, inputValue } = this.state;

         /*判断是否为视频*/
         const ImageOrVideo = (
            tradeCircle.type === 2 ?
                <video src={tradeCircle.cover}
                    controls="controls"
                    preload="auto"
                    controlsList="nofullscreen "
                    width="100%"
                    height="100%"
                >
                </video> :
                <img src={tradeCircle.cover}
                    width={150}
                    height={150}
                    alt='封面'
                    onClick={() => this.handlePreview(tradeCircle.cover)}
                />
        )

        const tradeCircleTags = (
            tradeCircle.tags !== "" ? 
                <span>{tradeCircle.tags}</span>
                : <Tag>暂无标签</Tag>
        )

        const tradeCircleStatus = (
            <span>{(() => {
                switch(tradeCircle.status){
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
                    title='生意圈审核'
                    okText='确定'
                    CancelText='取消'
                    onOk={onCancel}
                    visible={visible}
                    onCancel={onCancel}
                    confirmLoading={confirmLoading}
                    destroyOnClose 
                >
  
                    <Row type='flex' style={{ height: '40px' }} gutter={32}>
                       <Col>
                          <h3>姓名：<span>王三</span></h3>
                       </Col>
                       <Col>
                          <h3>手机号码：<span>13010101010</span></h3>
                       </Col>
                       <Col>
                          <h3>生意圈类型：<span>视频</span></h3>
                       </Col>
                    </Row>

                    <Row type='flex' gutter={5}>
                        <Col md={5}>
                            <h3>生意圈图片:</h3>
                        </Col>
                        <Col md={16}>
                            <img style={{width:120,height:30}} alt="视频" />
                        </Col>
                    </Row>
                    
                    <Row gutter={10}>
                        <Col md={5}>
                          <h3>生意圈内容:</h3>
                        </Col>
                        <Col md={18}>
                          <span>生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容生意圈内容</span>
                          <div className='mb-10' dangerouslySetInnerHTML={{ __html: tradeCircle.content }}></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                           <h3>点赞数：<span>333</span></h3>                        
                        </Col>
                    </Row>
                    
                    <Row type='flex' style={{ height: '40px' }}>
                        <Col md={3}>
                            <h3>标签：</h3>
                        </Col>
                        <Col md={12}>
                            {tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                    <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                            {inputVisible && (
                            <Input
                                ref={this.saveInputRef}
                                type="text"
                                size="small"
                                style={{ width: 78 }}
                                value={inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}
                                onPressEnter={this.handleInputConfirm}
                            />
                            )}
                            {!inputVisible && (
                            <Tag
                                onClick={this.showInput}
                                style={{ background: '#fff', borderStyle: 'dashed' }}
                            >
                                <Icon type="plus" /> 添加标签
                            </Tag>
                            )}
                        </Col>
                    </Row>
                    
                    <Row type='flex' style={{ height: '110px' }}>
                        <Col md={3}>
                           <h3>备注：</h3>
                        </Col>
                        <Col md={8}>
                           <textarea style={{width:350,height:100}}></textarea>
                        </Col>
                    </Row>

                    <Row type='flex' style={{ height: '100px' }}>
                        <Col md={5}>
                            <h3>审核结果：</h3>
                        </Col>  
                        <Col md={8}>
                            <RadioGroup onChange={this.onChangeAuditValue} value={this.state.auditValue}>
                                <Radio value={1}>通过</Radio>
                                <Radio value={2}>不通过</Radio>
                            </RadioGroup>
                        </Col>
                        <Col md={8}>
                            不通过原因:
                            <textarea style={{width:200,height:70}}></textarea>
                        </Col>
                    </Row>
                    
                    <Row type='flex' style={{ height: '40px' }}>
                        <Col md={5}>
                           <h3>推荐情况：</h3>
                        </Col>
                        <Col md={8}>
                            <RadioGroup onChange={this.onChangeRecommendationValue} value={this.state.recommendationValue}>
                                <Radio value={1}>推荐</Radio>
                                <Radio value={2}>不推荐</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                </Modal>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="封面" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>

        );
    }
}

export default TradeCircleAudit;