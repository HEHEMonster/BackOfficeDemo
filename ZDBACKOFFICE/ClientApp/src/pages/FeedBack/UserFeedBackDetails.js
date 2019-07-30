import React, { Component, Fragment  } from 'react';
import { Form, Modal,Row,Col } from 'antd';

class FeedBackDetails extends Component {
    render() {
        const { visible, onCancel, confirmLoading, feedback } = this.props; 

        /*转换地址格式*/
        let photos = JSON.parse( feedback.photos || "[]" ).map((photoUrl,index) => <img key={index} src={photoUrl} alt='详情图' className='width100'/>);

        /*判断是否显示图片栏*/
        const photoForm = (
            feedback.photos !== ("[]") && feedback.photos != null ? 
            <Fragment> 
                <Row type='flex' justify='center' className='mb-3'>
                    <Col span={4}><h2>详情图</h2></Col>
                </Row>
                <Row type='flex' className='mb-5'>
                    <Col span={24}>            
                        {photos}               
                    </Col>
                </Row> 
            </Fragment> : null
            )

        return (
            <div>
                <Modal
                    title='反馈详情'
                    CancelText='取消'
                    onOk={onCancel}
                    visible={visible}
                    onCancel={onCancel}
                    ConfirmLoading={confirmLoading}
                >
                <Row type='flex' justify='space-between' className='mb-3'>
                    <Col span={4}><h3>反馈人</h3></Col>
                    <Col span={18}><h3>{feedback.reportUserName}</h3></Col>
                </Row>
                <Row type='flex' justify='space-between' className='mb-3'>
                    <Col span={6}><h3>联系方式</h3></Col>
                    <Col span={18}><h3>{feedback.contact}</h3></Col>
                </Row>
                <h3>描述</h3>
                <h4><div style={{color:"gray"}} className='mb-10' dangerouslySetInnerHTML={{ __html: feedback.reason }}></div></h4>
                    {photoForm}  
                </Modal>
            </div>
        );
    }
}

FeedBackDetails = Form.create()(FeedBackDetails)
export default FeedBackDetails