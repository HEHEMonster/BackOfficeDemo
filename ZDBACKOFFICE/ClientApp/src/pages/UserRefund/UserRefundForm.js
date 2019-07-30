import React from 'react';
import {
    Modal,
    Form,
    message,
    Button
} from 'antd';

import 'moment/locale/zh-cn';
import TextArea from 'antd/lib/input/TextArea';
import { Request } from '../../utils/http';
import qs from 'qs';
const FormItem = Form.Item;
const InsertAction = '/api/Activity/InsertActivity';
const UpdateAction = '/api/UserRefund/UpdateUserRefund';


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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const UserRefundForm = Form.create({

    onFieldsChange(props, changedFields) {
        //console.log('onFieldsChange:', props, changedFields);
        //props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {

            userName: Form.createFormField({
                value: props.currentData.user ? props.currentData.user.userName || "" : "",
            }),
            reason: Form.createFormField({
                value: props.currentData.reason || "",
            }),
            price: Form.createFormField({
                value: props.currentData.price || 0,
            }),
            status: Form.createFormField({
                value: props.currentData.status || 0,
            }),
            payType: Form.createFormField({
                value: props.currentData.payType || 0,
            }),
            remark: Form.createFormField({
                value: props.currentData.remark || "",
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
            };
            //console.log("ActivityForm constructor props", props)

        }

        handleCancel = () => {

            this.props.returnVisible(false);
        }

        componentWillReceiveProps(props) {
            this.setState({ ...props });
        }

        handleCreate = (status) => {

            const form = this.props.form;
            //console.log(form)
            form.validateFields((err, fieldsValue) => {
                //console.log('Received 2: ', fieldsValue);
                if (err) {
                    return;
                }
                let values = { id: this.state.currentData.id, status: status, ...fieldsValue };
                console.log('handleCreate values : ', values);
                Request({
                    url: this.state.okText === "修改" ? UpdateAction : InsertAction,
                    method: this.state.okText === "修改" ? 'PUT' : 'POST',
                    data: qs.stringify({ key: this.state.currentData.id || 0, values: JSON.stringify(values) }),
                    responseType: 'json',
                }).then(({ data }) => {
                    if (data.message === "OK") {
                        message.success('提交成功');
                        form.resetFields();
                        this.handleCancel();
                        this.props.handleReturnData(values);

                    }
                }).catch(error => console.log(error));

            });
            this.setState({ strateditfileList1: false, strateditfileList2: false, strateditorState: false });

        }

        renderStatus(text) {

            return text === 0 ? "未退款" : "已退款";
        }
        renderPayType(text) {
            if (text === 0) { return "其它"; }
            if (text === 1) { return "微信"; }
            if (text === 2) { return "支付宝"; }
            if (text === 3) { return "网联"; }
            if (text === 4) { return "银生宝"; }
            if (text === 5) { return "余额"; }

        }


        render() {
            const { getFieldDecorator } = this.state.form;
            const { currentData } = this.props;
            return (
                <Modal
                    width="650px"
                    visible={this.state.visible}
                    title="退款审核"
                    onCancel={this.handleCancel}
                    footer={null}
                //okText={this.state.okText}
                //onOk={this.handleCreate}
                >

                    <Form layout="horizontal">

                        <FormItem label="用户" {...formItemLayout}>
                            <span className="ant-form-text">{currentData.user ? currentData.user.userName || "" : ""}</span>
                        </FormItem>
                        <FormItem label="用户退款理由" {...formItemLayout}>
                            <span className="ant-form-text">{currentData.reason || ""}</span>

                        </FormItem>
                        <FormItem label="申请退款金额" {...formItemLayout}>
                            <span className="ant-form-text">{currentData.price || ""}</span>

                        </FormItem>
                        <FormItem label="状态" {...formItemLayout}>
                            <span className="ant-form-text">
                                {this.renderStatus(currentData.status)}
                            </span>
                        </FormItem>
                        <FormItem label="支付方式" {...formItemLayout}>
                            <span className="ant-form-text">
                                {this.renderPayType(currentData.payType)}
                            </span>

                        </FormItem>
                        <FormItem label="备注"  {...formItemLayout}>
                            {getFieldDecorator('remark')(
                                <TextArea />
                            )}
                        </FormItem>
                        <Form.Item {...tailFormItemLayout}>
                            <div className="table-operations">
                                <Button type="primary" onClick={this.handleCreate.bind(this, 1)}>同意</Button>
                                <Button onClick={this.handleCreate.bind(this, -1)}>不同意</Button>
                                <Button onClick={this.handleCancel}>关闭</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal >
            );
        }
    }
);

//ReactDOM.render(<CollectionsPage />, mountNode);

export default UserRefundForm;