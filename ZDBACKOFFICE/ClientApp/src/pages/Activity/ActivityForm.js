import React from 'react';
import {
    Modal, Form, Input, Select, InputNumber, DatePicker, message, Upload, Button, Icon

} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import TextArea from 'antd/lib/input/TextArea';
import { Request } from '../../utils/http';
import qs from 'qs';
import PicturesWall from './PicturesWall';
import EditorComponent from './EditorComponent';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const InsertAction = '/api/Activity/InsertActivity';
const UpdateAction = '/api/Activity/UpdateActivity';


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const rangeConfig = {
    rules: [{ type: 'array', required: true, message: '请选择时间!' }],
};

const ActivityForm = Form.create({

    onFieldsChange(props, changedFields) {
        //console.log('onFieldsChange:', props, changedFields);
        //props.onChange(changedFields);
    },
    mapPropsToFields(props) {


        return {


            title: Form.createFormField({
                value: props.currentActivity.title || "",
            }),
            content: Form.createFormField({
                value: props.currentActivity.content || "",
            }),
            description: Form.createFormField({
                value: props.currentActivity.description || "",
            }),
            type: Form.createFormField({
                value: props.currentActivity.type || 1,
            }),
            unitPrice: Form.createFormField({
                value: props.currentActivity.unitPrice || 0,
            }),
            attendance: Form.createFormField({
                value: props.currentActivity.attendance || 0,
            }),
            places: Form.createFormField({
                value: props.currentActivity.places || 1,
            }),
            registrationRangepicker: Form.createFormField({
                value: [moment(props.currentActivity.registrationBegin), moment(props.currentActivity.registrationEnd)] || "",
            }),
            beginDateRangepicker: Form.createFormField({
                value: [moment(props.currentActivity.beginDate), moment(props.currentActivity.endDate)] || "",
            }),
            status: Form.createFormField({
                value: props.currentActivity.status || 1,
            }),
            address: Form.createFormField({
                value: props.currentActivity.address || "",
            }),
            addressDetail: Form.createFormField({
                value: props.currentActivity.addressDetail || "",
            }),
            coverPhoto: Form.createFormField({
                value: props.currentActivity.coverPhoto || "",
            }),
            images: Form.createFormField({
                value: props.currentActivity.images || "[]",
            }),

        };
    },
    onValuesChange(_, values) {
        //console.log(_);
    },


})(
    // eslint-disable-next-line
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ...props,
                strateditfileList1: null || false,
                strateditfileList2: null || false,
                strateditorState: false,
            };
            //console.log("ActivityForm constructor props", props)

        }

        handleCancel = () => {
            this.setState({ strateditfileList1: false, strateditfileList2: false, strateditorState: false });
            this.props.returnVisible(false);
        }

        componentWillReceiveProps(props) {

            this.setState({ ...props });
        }
        
        normContent = (e) => {
            this.setState({ strateditorState: true });
            //console.log('ActivityForm normContent  e', e);
            return e.value;
        }

        normFile1 = (e) => {
            this.setState({ strateditfileList1: true });
            let fileList = e.fileList;
            fileList = fileList.map((file) => {
                if (file.response) {
                    // Component will show file.url as link
                    if (file.response.code && file.response.code == "200") {
                        console.log('normFile1 JSON.parse(file.response.text).url', JSON.parse(file.response.text).url);
                        return JSON.parse(file.response.text).url;
                    }
                    //return file.response.url;
                }
                if (file.url) {
                    // Component will show file.url as link
                    console.log('normFile1 file.url', file.url);
                    return file.url;
                }
                return "";
            });

            //this.setState({ valuefileList: fileList })
            //console.log('ActivityForm normFile  this.setState', this.state);
            return fileList.length > 0 ? fileList[0] : "";
        }
        normFile2 = (e) => {
            this.setState({ strateditfileList2: true });
            let fileList = e.fileList;
            fileList = fileList.map((file) => {
                if (file.response) {
                    if (file.response.code && file.response.code == "200") {
                        console.log('normFile2 JSON.parse(file.response.text).url', JSON.parse(file.response.text).url);
                        return JSON.parse(file.response.text).url;
                    }
                }
                if (file.url) {
                    // Component will show file.url as link
                    console.log('normFile2 file.url', file.url);
                    return file.url;
                }
                return "";
            });

            //this.setState({ valuefileList: fileList })
            //console.log('ActivityForm normFile  this.setState', this.state);
            return fileList.length > 0 ? JSON.stringify(fileList) : "[]";
        }
        handleCreate = () => {

            //e.preventDefault();
            const form = this.props.form;
            //console.log(form)
            form.validateFields((err, fieldsValue) => {
                //console.log('Received 2: ', fieldsValue);
                if (err) {
                    return;
                }
                const registrationRangepicker = fieldsValue['registrationRangepicker'];
                const beginDateRangepicker = fieldsValue['beginDateRangepicker'];
                const values = {
                    ...fieldsValue,
                    activityId: this.state.currentActivity.activityId || 0,
                    registrationBegin: registrationRangepicker[0].format('YYYY-MM-DD'),
                    registrationEnd: registrationRangepicker[1].format('YYYY-MM-DD'),
                    beginDate: beginDateRangepicker[0].format('YYYY-MM-DD'),
                    endDate: beginDateRangepicker[1].format('YYYY-MM-DD')
                }


                Request({
                    url: this.state.okText == "发布+" ? InsertAction : UpdateAction,
                    method: this.state.okText == "发布+" ? 'POST' : 'PUT',
                    data: qs.stringify({ key: this.state.currentActivity.activityId || 0, values: JSON.stringify(values) }),
                    responseType: 'json',
                }).then(({ data }) => {
                    if (data.message == "OK") {
                        message.success('提交成功');
                        form.resetFields();
                        this.props.returnVisible(false);
                        this.props.handleReturnData(values);
                        //console.log(values)
                    }
                }).catch(error => console.log(error));

            });
            this.setState({ strateditfileList1: false, strateditfileList2: false, strateditorState: false });

        }

        checkPrice = (rule, value, callback) => {
            if (value > 0) {
            callback();
            return;
            }
            callback('金额必须大于0!');
        }
    
        checkAttendance =(rule, value, callback)=>
        {
             if(value > this.state.form.getFieldsValue()['places'])
             {
                callback('报名人数不能超过名额上限!');
             }
             callback();
             return;
        }

        render() {
            const { getFieldDecorator } = this.state.form;
            return (
                <Modal
                    width="650px"
                    visible={this.state.visible}
                    title="活动"
                    okText={this.state.okText}
                    onCancel={this.handleCancel}
                    onOk={this.handleCreate}
                >

                    <Form layout="horizontal">
                        <FormItem label="活动名" {...formItemLayout}   >
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: "请输入活动名" }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="简介"  {...formItemLayout}>
                            {getFieldDecorator('description')(
                                <TextArea />
                            )}
                        </FormItem>
                        <FormItem label="具体内容" {...formItemLayout}>
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: "请输入具体内容" }],
                                valuePropName: 'value',
                                getValueFromEvent: this.normContent,
                            })(<EditorComponent starteditorState={this.state.strateditorState} />)}
                        </FormItem>

                        <FormItem label="活动类型" {...formItemLayout}>
                            {getFieldDecorator('type', {
                                rules: [{ required: true }],
                                initialValue: "1",
                                //valuePropName: "checked"
                            })(
                                <Select>
                                    <Option value={1}>线下沙龙</Option>
                                    <Option value={2}>线上报名</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="报名金额" {...formItemLayout}>
                            {getFieldDecorator('unitPrice', {
                                rules: [{ required: true, message: "请输入报名金额"}, { validator: this.checkPrice } ],
                                initialValue: 0,
                            })(
                                <InputNumber min={0} />
                            )}
                        </FormItem>
                        <FormItem label="报名人数" {...formItemLayout}>
                            {getFieldDecorator('attendance', {
                                rules: [{ required: true, message: "请输入报名人数"}, { validator: this.checkAttendance } ],
                                initialValue: 0,
                            })(
                                <InputNumber min={0} />
                            )}
                        </FormItem>
                        <FormItem label="名额上限" {...formItemLayout}>
                            {getFieldDecorator('places', {
                                rules: [{ required: true, message: "请输入名额上限" }],
                                initialValue: 1,
                            })(
                                <InputNumber min={1} />
                            )}
                        </FormItem>
                        <FormItem label="报名时间"  {...formItemLayout}>
                            {getFieldDecorator('registrationRangepicker', rangeConfig)(
                                <RangePicker />
                            )}
                        </FormItem>

                        <FormItem label="举办时间"  {...formItemLayout}>
                            {getFieldDecorator('beginDateRangepicker', rangeConfig)(
                                <RangePicker />
                            )}
                        </FormItem>
                        <FormItem label="状态" {...formItemLayout}>
                            {getFieldDecorator('status', {
                                rules: [{ required: true }],
                                initialValue: 1,
                            })(
                                <Select>
                                    <Option value={0}>无效</Option>
                                    <Option value={1}>有效</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="活动地址"  {...formItemLayout}>
                            {getFieldDecorator('address')(
                                <TextArea />
                            )}
                        </FormItem>
                        <FormItem label="详细地址"  {...formItemLayout}>
                            {getFieldDecorator('addressDetail')(
                                <TextArea />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="列表图片">
                            {getFieldDecorator('coverPhoto', {
                                valuePropName: 'value',
                                rules: [{ required: true, message: "至少需要一张图片" }],
                                getValueFromEvent: this.normFile1,

                            })(
                                <PicturesWall limit={1} starteeditorfileList={this.state.strateditfileList1} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="详细图">
                            {getFieldDecorator('images', {
                                valuePropName: 'value',
                                getValueFromEvent: this.normFile2,
                            })(
                                <PicturesWall limit={3} starteeditorfileList={this.state.strateditfileList2} />
                            )}
                        </FormItem>

                    </Form>
                </Modal >
            );
        }
    }
);

//ReactDOM.render(<CollectionsPage />, mountNode);

export default ActivityForm;