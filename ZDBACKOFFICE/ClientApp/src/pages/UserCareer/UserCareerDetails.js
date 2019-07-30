import React, { Component } from 'react';
import { Modal, Row, Col, Input, Form, Select, Tag } from 'antd';
import PropTypes from 'prop-types';
import '../../styles/Common.css';

class UserCareerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0
        }
    }

    handlePictrueUrl = (url) => {
        try {
            return JSON.parse(`${url}`)
        } catch (e) {
            return {};
        }
    }

    render() {
        const { visible, onOk, onCancel, confirmLoading, career } = this.props;

        const CommonContext = (
            <div>
                <Row type='flex' justify='start' className='mb-3'>
                    <Col span={4}><h3>名片/工牌</h3></Col>
                </Row>
                <Row type='flex' className='mb-5'>
                    <Col span={24}>
                        <img src={career.cardUrl} alt='名片/工牌' className='width100' />
                    </Col>
                </Row>
            </div>
        );

        const carUrlObj = this.handlePictrueUrl(career.cardUrl);
        const CardContext = (career.careerType === 1 || career.careerType === 2) ? CommonContext : (
            <div>
                <Row type='flex' justify='center' className='mb-3'>
                    <Col span={4}><h3>名片/工牌</h3></Col>
                </Row>
                <Row type='flex' className='mb-5'>
                    <Col span={24}>
                        <img src={carUrlObj.businessCard} alt='名片/工牌' className='width100' />
                    </Col>
                </Row>
                <Row type='flex' justify='center' className='mb-3'>
                    <Col span={4}><h3>营业执照</h3></Col>
                </Row>
                <Row type='flex' className='mb-5'>
                    <Col span={24}>
                        <img src={carUrlObj.businessLicense} alt='营业执照' className='width100' />
                    </Col>
                </Row>
                <Row type='flex' justify='center' className='mb-3'>
                    <Col span={8}><h3>法人身份证(正面)</h3></Col>
                </Row>
                <Row type='flex' className='mb-5'>
                    <Col span={24}>
                        <img src={carUrlObj.idCardPositive} alt='法人身份证(正面)' className='width100' />
                    </Col>
                </Row>
                <Row type='flex' justify='center' className='mb-3'>
                    <Col span={8}><h3>法人身份证(反面)</h3></Col>
                </Row>
                <Row type='flex' className='mb-5'>
                    <Col span={24}>
                        <img src={carUrlObj.idCardBack} alt='法人身份证(反面)' className='width100' />
                    </Col>
                </Row>
            </div>
        );

        const { getFieldDecorator } = this.props.form;
        // const AuditForm = (
        //     <Form layout='vertical'>
        //         <Form.Item label="审核结果">
        //             {
        //                 getFieldDecorator('status', {
        //                     rules: [{ required: true, message: '请选择审核结果!' }]
        //                 })(
        //                     <Select
        //                         className='width100'
        //                         placeholder='请选择审核结果'
        //                         onChange={value => this.setState({
        //                             status: value
        //                         })}
        //                     >
        //                         <Select.Option value={1}>通过</Select.Option>
        //                         <Select.Option value={-1}>不通过</Select.Option>
        //                     </Select>
        //                 )
        //             }
        //         </Form.Item>
        //         {this.props.form.getFieldValue('status') === -1 ? <Form.Item label="原因">
        //             {
        //                 getFieldDecorator('remark', {
        //                     rules: [{ required: true, message: '请填写原因!' }]
        //                 })(
        //                     <Input.TextArea></Input.TextArea>
        //                 )
        //             }
        //         </Form.Item> : null}
        //     </Form>
        // );

        const careerType = (
            <span>{(() => {
                switch(career.careerType){
                    case 1:
                        return <span>企业员工</span>
                    case 2:
                        return <span>企业高管</span>
                    case 3:
                        return <span>企业主</span>
                    case 4:
                        return <span>个体经营</span>
                    default:
                        return <span>暂无</span>
                }
            })()}</span>
        )

        const confirmCareerType = (
            <span>{(() => {
                switch(career.confirmCareerType){
                    case 1:
                        return <span>企业员工</span>
                    case 2:
                        return <span>企业高管</span>
                    case 3:
                        return <span>企业主</span>
                    case 4:
                        return <span>个体经营</span>    
                    default:
                        return <span>暂无</span>
                }
            })()}</span>
        )

        const status = (
            <span>{(() => {
                switch(career.status){
                    case -1:
                    return <span>认证失败</span>
                    case 0:
                        return <span>未认证</span>
                    case 1:
                        return <span>已认证</span>
                    case 2:
                        return <span>待认证</span>
                    default:
                        return null
                }
            })()}</span>
        )

        return (
            <Modal
                title="名片详情"
                okText="返回"
                cancelText="取消"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                footer={null}
            >
                <Row>
                    <Col>
                        <h1>审核人: <span>{career.auditor}</span></h1>
                    </Col>
                </Row>
                <Row type='flex' justify='space-between' className='mb-3'>
                    <Col span={4}><h3>提交身份</h3></Col>
                    <Col span={18}><h4>{careerType}</h4></Col>
                </Row>
                <Row type='flex' justify='space-between' className='mb-3'>
                    <Col span={4}><h3>公司名称</h3></Col>
                    <Col span={18}><h4>{career.company}</h4></Col>
                </Row>
                <Row type='flex' justify='space-between' className='mb-3'>
                    <Col span={4}><h3>职位</h3></Col>
                    <Col span={18}><h4>{career.position}</h4></Col>
                </Row>
                <Row type='flex' justify='space-between' className='mb-3'>
                    <Col span={4}><h3>公司电话</h3></Col>
                    <Col span={18}><h4>{career.companyTel}</h4></Col>
                </Row>
                {CardContext}
                {/* {AuditForm} */}
                <Row type='flex' justify='space-between' className='mb-3'>
                    <Col span={4}><h3>审核状态</h3></Col>
                    <Col span={18}><h4>{status}</h4></Col>
                </Row>
                <Row type='flex' justify='space-between' className='mb-3'>
                    <Col span={4}><h3>核定身份</h3></Col>
                    <Col span={18}><h4>{confirmCareerType}</h4></Col>
                </Row>
            </Modal>
        );
    }
}

UserCareerDetails.propTypes = {
    visible: PropTypes.bool,
    confirmLoading: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
}

UserCareerDetails = Form.create()(UserCareerDetails);

export default UserCareerDetails;