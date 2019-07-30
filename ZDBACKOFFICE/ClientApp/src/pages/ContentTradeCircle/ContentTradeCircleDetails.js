import React, { Component } from 'react';
import { Modal, Row, Col, Tag, Input, Icon } from 'antd';
import CustomTag from '../../components/CustomTag';

class TradeCircleDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            inputVisible: false,
            inputValue: '',
            selectTags: [],
            displayTags: []
        }
    }

    componentWillReceiveProps(nextProps) {
        const defaultTags = `${nextProps.tradeCircle.tags}`.split(' ').filter(t => t);
        const displayTags = Array.from(new Set([...defaultTags])).filter(t => t && t !== 'null');
        this.setState({
            selectTags: defaultTags,
            displayTags: displayTags
        });
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

    saveInputRef = input => this.input = input

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.displayTags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
            this.handleTagChecked(inputValue);
        }
        this.setState({
            displayTags: tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    handleTagChecked = (tag) => {
        const { selectTags } = this.state;
        const nextSelectTags = selectTags.indexOf(tag) > -1 ?
            selectTags.filter(t => t !== tag) : [...selectTags, tag];
        this.setState({ selectTags: nextSelectTags });
    }

    isExistTag = (tag) => this.state.selectTags.indexOf(tag) > -1;

    handleSubmit = () => {
        const { onSubmit } = this.props;
        onSubmit(this.state.selectTags);
    }

    render() {
        const { visible, onCancel, confirmLoading, tradeCircle } = this.props;
        const { inputValue, inputVisible, displayTags } = this.state;
        const url = this.handleUrl(tradeCircle.medias);

        const DefaultTags = displayTags.map((tag, i) =>
            <CustomTag
                style={{ marginBottom: 3 }}
                key={i}
                checked={this.isExistTag(tag)}
                onChecked={() => this.handleTagChecked(tag)}
            >
                {tag}
            </CustomTag>
        );

        const AddTagInput = (<React.Fragment>
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
        </React.Fragment>)

        return (
            <div>
                <Modal
                    title='生意圈详情'
                    CancelText='取消'
                    onOk={this.handleSubmit}
                    visible={visible}
                    onCancel={onCancel}
                    confirmLoading={confirmLoading}
                    destroyOnClose
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
                        <Col md={10}>
                            <h3>推荐情况：<span>{tradeCircle.remark ? '已推荐' : '未推荐'}</span></h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <h3>备注：</h3>
                        </Col>
                        <Col md={21}>
                            <span>{tradeCircle.remark}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <h3>标签：</h3>
                        </Col>
                        <Col md={21}>
                            {DefaultTags}
                            {AddTagInput}
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

export default TradeCircleDetails;