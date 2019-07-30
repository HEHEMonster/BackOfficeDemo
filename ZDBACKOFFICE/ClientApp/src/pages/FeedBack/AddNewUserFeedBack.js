import React, { Component } from 'react'
import { Modal, Form, Input, DatePicker, Upload, Icon } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
const dateFormat = 'YYYY/MM/DD';

class AddNewFeedBackModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: '',
        }
    }

    //--
    handleCancel = () => this.setState({ previewVisible: false })

    //--
    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
  
    //--
    handleChange = ({ fileList }) => this.setState({ fileList })

    
    render() {
        const { visible, onCancel, form, confirmLoading, onOk } = this.props;
        const { getFieldDecorator } = form;

        //--
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

        return (
            <Modal
                visible={visible}
                title="反馈录入"
                okText="完成"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
            >
                <Form layout="horizontal">
                    <Form.Item label="姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入姓名' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item label="联系方式">
                        {getFieldDecorator('contact', {
                            rules: [{ required: true, message: '请输入联系方式' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item label="反馈时间">
                        {getFieldDecorator('createDate', {
                            rules: [{ required: true, message: '请选择日期' }],
                        })(
                            <DatePicker />
                        )}
                    </Form.Item>

                    <Form.Item label="意见反馈">
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请描述' }],
                        })(
                            <TextArea />
                        )}
                    </Form.Item>
                   
                    {/*<Form.Item
                        label="相关材料">
                        {getFieldDecorator('coverPhoto', {
                            valuePropName: 'value',
                            rules: [{ required: true, message: "至少需要一张图片" }],
                            getValueFromEvent: this.normFile1,
                        })(
                            <PictureWall limit={1} starteeditorfileList={this.state.strateditfileList1} />
                        )}
                        </Form.Item>*/}
                    
                        <Form.Item label="上传材料">
                        {getFieldDecorator('photo') 
                        (
                            <Upload
                            action='/api/QiNiuYun/Posts/'
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            >
                            {fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                        )                           
                        }
                        <h4>图片大小不超过10Mb，建议格式：png，jpg，jpeg，bmp</h4>

                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                        </Form.Item>
                </Form>
            </Modal>
        )
    }
}

AddNewFeedBackModal = Form.create()(AddNewFeedBackModal)

export default AddNewFeedBackModal