import React, { Component } from 'react';
import { Form, Modal, Row, Col, Input, Tag, Icon } from 'antd';
import CustomTag from '../../components/CustomTag';

class ArticleAddTagsModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            selectTags: [],
            displayTags: [],
            inputVisible: false,
            inputValue: ''
        }
    }

    //默认添加已存在的标签
    componentWillReceiveProps(nextProps) {
        if (!nextProps.visible) this.setState({ selectTags: [], displayTags: [] }); // 关闭弹出层清空选中的标签数组
        if (this.props.article.tags !== nextProps.article.tags || this.props.aiTags !== nextProps.aiTags) {
            const defaultTags = `${nextProps.article.tags}`.split(' ').filter(t => t);
            const displayTags = Array.from(new Set([...defaultTags, ...nextProps.aiTags])).filter(t => t && t !== 'null');
            this.setState({
                selectTags: defaultTags,
                displayTags: displayTags
            });
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handleSubmit = () => {
        const { onSubmit } = this.props;
        onSubmit( this.state.selectTags);
    }

    isExistTag = (tag) => this.state.selectTags.indexOf(tag) > -1;

    handlePreview = (url) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
    }

    /*标签多选*/
    handleTagChecked = (tag) => {
        const { selectTags } = this.state;  //已选标签
        const nextSelectTags = selectTags.indexOf(tag) > -1 ?
            selectTags.filter(t => t !== tag) : [...selectTags, tag]; //选择标签
        this.setState({ selectTags: nextSelectTags });
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

    saveInputRef = input => this.input = input

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    render() {
        const { visible, onCancel, confirmLoading, article } = this.props;
        const { inputValue, inputVisible, displayTags } = this.state;

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
                    title='审核'
                    okText='完成'
                    CancelText='取消'
                    onOk={this.handleSubmit}
                    visible={visible}
                    onCancel={onCancel}
                    confirmLoading={confirmLoading}
                    destroyOnClose      //弹出层关闭时删除此组件
                    okButtonProps={{ disabled: this.state.selectTags.length < 1 }}
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
                    <h3>相关标签：<small>(绿色为已选标签，白色为未选标签)</small></h3>
                    <div className='mb-10'>
                        {DefaultTags}
                        {AddTagInput}
                    </div>
                </Modal>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="封面" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>

        );
    }
}

ArticleAddTagsModel = Form.create()(ArticleAddTagsModel)
export default ArticleAddTagsModel