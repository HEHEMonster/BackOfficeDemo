import React, { Component } from 'react';
import { Form, Modal, Row, Col, Select, Input, Tag, Icon } from 'antd';
import '../../styles/Common.css';
import CustomTag from '../../components/CustomTag';
import PictureModal from '../../components/PictureModal';

class ContentProductAuditModal extends Component {
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

    // 添加默认已存在的标签
    componentWillReceiveProps(nextProps) {
        if (!nextProps.visible) this.setState({ selectTags: [], displayTags: [] }); // 关闭弹出层清空选中的标签数组
        if (this.props.product.tags !== nextProps.product.tags || this.props.aiTags !== nextProps.aiTags) {
            const defaultTags = `${nextProps.product.tags}`.split(' ').filter(t => t);
            const displayTags = Array.from(new Set([...defaultTags, ...nextProps.aiTags])).filter(t => t && t !== 'null');
            this.setState({
                selectTags: defaultTags,
                displayTags: displayTags
            });
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (url) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
        });
    }

    isExistTag = (tag) => this.state.selectTags.indexOf(tag) > -1;

    handleTagChecked = (tag) => {
        const { selectTags } = this.state;
        const nextSelectTags = this.isExistTag(tag) ?
            selectTags.filter(t => t !== tag) : [...selectTags, tag];
        this.setState({ selectTags: nextSelectTags });
    }

    handleSubmit = (e) => {
        const { onSubmit } = this.props;
        onSubmit(e, this.state.selectTags);
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
        const { visible, onCancel, confirmLoading, product } = this.props;
        const { inputValue, inputVisible, displayTags } = this.state;

        const DefaultTags = displayTags.map((tag, i) =>
            <CustomTag
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
                    title="审核"
                    okText="完成"
                    cancelText="取消"
                    visible={visible}
                    onOk={this.handleSubmit}
                    onCancel={onCancel}
                    confirmLoading={confirmLoading}
                    okButtonProps={{ disabled: this.state.selectTags.length < 1 }}
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
                                    <h3>联系方式：{product.telphone || "佚名"}</h3>
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
                    <h3>相关标签 <small>(绿色为已选中标签，白色为未选中标签)</small></h3>
                    <div className='mb-10'>
                        {DefaultTags}
                        {AddTagInput}
                    </div>
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

ContentProductAuditModal = Form.create()(ContentProductAuditModal);

export default ContentProductAuditModal;