import React, { Component } from 'react';
import { Modal, Row, Col, Input, Form, Select, Radio } from 'antd';
import PropTypes from 'prop-types';
import '../../styles/Common.css';

const RadioGroup = Radio.Group;

class UserCareerAuditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            //auditValue: 1,
            careerType: 0
        }
    }

    handlePictrueUrl = (url) => {
        try {
            return JSON.parse(`${url}`)
        } catch (e) {
            return {};
        }
    }

    /*onChangeAuditValue = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            auditValue: e.target.value,
        });
    }*/

    /*onChangeIDValue = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            careerType: e.target.value,
        });
    }*/
    

    render() {
        const { visible, onOk, onCancel, confirmLoading, career } = this.props;

        const CommonContext = (
            <div>
                <Row type='flex' justify='center' className='mb-3'>
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
        const AuditForm = (
            <Form layout='vertical'>
                <Form.Item label="审核结果">
                    {
                        getFieldDecorator('status', {
                            rules: [{ required: true, message: '请选择审核结果!' }]
                        })(
                            <Select
                                className='width100'
                                placeholder='请选择审核结果'
                                onChange={value => this.setState({
                                    status: value
                                })}
                            >
                                <Select.Option value={1}>通过</Select.Option>
                                <Select.Option value={-1}>不通过</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                {this.props.form.getFieldValue('status') === -1 ? <Form.Item label="原因">
                    {
                        getFieldDecorator('remark', {
                            rules: [{ 
                                required: true, message: '请填写原因!'
                            },{
                                max:120, message: '不得超过120字!'
                            }]
                        })(
                            <Input.TextArea></Input.TextArea>
                        )
                    }
                </Form.Item> : null}
                <Form.Item label="核定身份">
                    {
                        getFieldDecorator('careerType', {
                            rules: [{ required: true,message: '请选择身份!' }],
                            initialValue:this.state.careerType
                        })(
                        <RadioGroup
                            onChange={value => this.setState ({
                            careerType: value
                        })}>
                            <Radio value={4}>无</Radio>
                            <Radio value={1}>企业员工</Radio>
                            <Radio value={2}>企业高管</Radio>
                            <Radio value={3}>企业主</Radio>
                        </RadioGroup>
                        )
                    }
                </Form.Item>
            </Form>
        );

        const careerType = (
            <span>{(() => {
                switch(career.careerType){
                    case 1:
                    return <span>企业员工</span>
                    case 2:
                        return <span>企业高管</span>
                    case 3:
                        return <span>企业主</span>
                    default:
                        return null
                }
            })()}</span>
        )

        return (
            <Modal
                title="名片审核"
                okText="确定"
                cancelText="取消"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                okButtonProps={{ disabled: !this.state.status }}
            >   
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
                {/* <Row type='flex' style={{ height: '100px', marginTop: '20px' }}>
                    <Col md={5}>
                        <h3>审核结果</h3>
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
                           <h3>核定身份</h3>
                        </Col>
                        <Col md={14}>
                            <RadioGroup onChange={this.onChangeIDValue} value={this.state.IDValue}>
                                <Radio value={1}>无</Radio>
                                <Radio value={2}>企业高管</Radio>
                                <Radio value={3}>企业主</Radio>
                            </RadioGroup>
                        </Col>
                    </Row> */}  
                    {AuditForm}             
            </Modal>
        );
    }
}

UserCareerAuditModal.propTypes = {
    visible: PropTypes.bool,
    confirmLoading: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
}

UserCareerAuditModal = Form.create()(UserCareerAuditModal);

export default UserCareerAuditModal;