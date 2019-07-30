import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Form, Row, Col, Input, Button, DatePicker, Select, Cascader, Upload, Icon, message
} from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './Person.css';
import cityOptions from '../../static/city.json';
import industryOptions from '../../static/industry.json';
import { getToken } from '../../static/sessionKey';
const { RangePicker } = DatePicker;


class PersonSearch extends Component {

    // componentDidMount() {
    //     let data = [...cityOptions].map(c => {
    //         [...c.children].map(cc => {
    //             delete cc.children;
    //         })
    //     })
    //     console.log(data);
    // }

    handleReset = () => {
        this.props.form.resetFields();
        this.props.onSearch();
    }

    handleSumbit = (e) => {
        e.preventDefault();
        this.props.onSearch();
    }

    handleExport = () => {
        this.props.onExport();
    }

    handleFileChange = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            this.props.onSearch();
            message.success(`${info.file.name} 文件导入成功!`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 导入失败!`);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                className="person-search-form"
                onSubmit={this.handleSumbit}
            >
                <Row gutter={24}>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="用户名">
                            {getFieldDecorator('person', {
                                initialValue: ''
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="行业">
                            {getFieldDecorator('industry', {
                                initialValue: []
                            })(
                                <Cascader options={industryOptions} placeholder="请选择" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="区域">
                            {getFieldDecorator('region', {
                                initialValue: []
                            })(
                                <Cascader options={cityOptions} placeholder="请选择" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="联系状态">
                            {getFieldDecorator('isContact', {
                                initialValue: -1
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                >
                                    <Select.Option value={-1}>全部状态</Select.Option>
                                    <Select.Option value={0}>未联系</Select.Option>
                                    <Select.Option value={1}>已联系</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="联系后状态">
                            {getFieldDecorator('contactedState', {
                                initialValue: -1
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                >
                                    <Select.Option value={-1}>全部状态</Select.Option>
                                    <Select.Option value={0}>不需要</Select.Option>
                                    <Select.Option value={1}>回访电话</Select.Option>
                                    <Select.Option value={2}>无人接听</Select.Option>
                                    <Select.Option value={3}>职位不符</Select.Option>
                                    <Select.Option value={4}>同意</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="录入时间">
                            {getFieldDecorator('createDate', {
                                initialValue: [moment().add(-6, "month"), moment()]
                            })(
                                <RangePicker
                                    allowClear={false}
                                    className='width100'
                                    locale={locale}
                                    format='YYYY/MM/DD'
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <Form.Item label="录入人">
                            {getFieldDecorator('operator', {
                                initialValue: ''
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={24} sm={24}>
                        <Button type="primary" icon="search" htmlType="submit" style={{ marginRight: 6 }}  >搜索</Button>
                        <Button type="default" icon="redo" onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
                <Row className='mb-10'>
                    <Col xl={12} md={24} sm={24}>
                        <Button type="primary" icon="form" style={{ marginRight: 6 }} >
                            <Link to='./person/add' style={{ color: "white" }}> 客户录入</Link>
                        </Button>
                        <Button type="default" icon="download" style={{ marginRight: 6 }} onClick={this.handleExport}>Excel导出</Button>
                        <Upload
                            name="file"
                            action="/api/personInfo/import"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            showUploadList={true}
                            onChange={this.handleFileChange}
                            headers={{ Authorization: `Bearer ${getToken()}` }}
                        >
                            <Button>
                                <Icon type="upload" /> Excel导入
                             </Button>
                        </Upload>
                    </Col>
                </Row>
            </Form>
        );
    }
}

PersonSearch = Form.create({ name: 'person_search' })(PersonSearch);

export default PersonSearch;