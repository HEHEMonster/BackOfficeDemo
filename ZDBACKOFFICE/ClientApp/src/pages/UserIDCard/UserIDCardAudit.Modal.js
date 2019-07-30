import React from 'react';
import { Modal, Form, Input, Radio, DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import PictureModal from '../../components/PictureModal';

/* const RadioGroup = Radio.Group; */
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const UserIDCardAuditModal = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                imageUrl: ''
            }
        }

        /* state = {
            status: 1
        } */

        /* const isPass = this.state.status === 1; */

        handlePreview = (url) => {
            this.setState({
                visible: true,
                imageUrl: url
            });
        }

        handleCancel = () => {
            this.setState({ visible: false });
        }

        render() {
            const { visible, onCancel, onAudit, form, confirmLoading, idCard } = this.props;
            const { getFieldDecorator } = form;
            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 18 },
                },
            };

            return (
                <Modal
                    title="审核"
                    okText="完成"
                    cancelText="取消"
                    visible={visible}
                    onCancel={onCancel}
                    onOk={onAudit}
                    confirmLoading={confirmLoading}
                >
                    <Form>
                        <Form.Item
                         label="身份证正面"
                         style={{marginLeft: 100}}>
                           <img alt='身份证正面'
                                width={300}
                                height={200}
                                src={idCard.idcardFrontUrl}
                                onClick={() => this.handlePreview(idCard.idcardFrontUrl)}
                                style={{ cursor: 'pointer' }} />
                        </Form.Item>
                        <Form.Item 
                         label="身份证反面"
                         style={{marginLeft: 100}}>
                            <img alt='身份证反面'
                                width={300}
                                height={200}
                                src={idCard.idcardBackUrl}
                                onClick={() => this.handlePreview(idCard.idcardBackUrl)}
                                style={{ cursor: 'pointer' }} />
                        </Form.Item>
                        <Form.Item
                            label="审核结果"
                            {...formItemLayout}
                        >
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
                        {this.props.form.getFieldValue('status') === -1 ? <Form.Item label="原因"  {...formItemLayout}>
                            {
                                getFieldDecorator('remark', {
                                    rules: [{ required: true, message: '请填写原因!' },
                                    { max: 100, message: '输入字符过长!' }
                                ]
                                })(
                                    <Input.TextArea></Input.TextArea>
                                )
                            }
                        </Form.Item> : <div>
                                <FormItem
                                    label="姓名"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('userName', {
                                        initialValue: idCard.userName || '',
                                        rules: [{
                                            required: true, message: "请输入姓名!"
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                {/* <FormItem
                                    label="性别"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('gender', {
                                        initialValue: idCard.gender,
                                        rules: [{
                                            required: true, message: "请选择性别"
                                        }],
                                    })(
                                        <RadioGroup name='gender'>
                                            <Radio value={0}>女</Radio>
                                            <Radio value={1}>男</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="民族"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('nation', {
                                        initialValue: idCard.nation || '',
                                        rules: [{
                                            required: true, message: "请输入民族!"
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="生日"
                                    hasFeedback
                                    {...formItemLayout}>
                                    {getFieldDecorator('birthday', {
                                        initialValue: idCard.birthday ? moment(`${idCard.birthday}`) : null,
                                        rules: [{
                                            type: 'object', required: true, message: "请选择生日!"
                                        }],
                                    })(
                                        <DatePicker locale={locale} style={{ width: '100%' }} />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="住址"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('address', {
                                        initialValue: idCard.address || '',
                                        rules: [{
                                            required: true, message: "请输入住址!"
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem> */}
                                <FormItem
                                    label="有效日期"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('validityTime', {
                                        initialValue: [
                                            idCard.validityStartTime ? moment(`${idCard.validityStartTime}`) : moment(),
                                            idCard.validityEndTime ? moment(`${idCard.validityEndTime}`) : moment()
                                        ],
                                        rules: [{
                                            type: 'array', required: true, message: "请选择有效日期!"
                                        }],
                                    })(
                                        <RangePicker
                                            locale={locale}
                                            format='YYYY/MM/DD'
                                            className='width100'
                                        />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="身份证号码"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('idCardNbr', {
                                        initialValue: idCard.idCardNumber || '',
                                        rules: [{
                                            required: true, message: "请输入身份证号码!"
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="签发机关"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('IssuingAgency', {
                                        initialValue: idCard.issuingAgency || '',
                                        // rules: [{
                                        //     required: true, message: "请输入签发机关"
                                        // }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </div>}
                    </Form>
                    <PictureModal
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        imageUrl={this.state.imageUrl}
                    />
                </Modal>
            );
        }
    }
)

export default UserIDCardAuditModal;
