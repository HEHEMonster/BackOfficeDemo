import React, { Component } from 'react';
import { Button, Spin, Row, Col } from 'antd';
import { Get } from '../../utils/http';
import { getFormatDate } from '../../utils/date';
import '../../styles/Common.css';
import PictureModal from '../../components/PictureModal';

class UserIDCardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            loading: true,
            visible: false,
            imageUrl: ''
        }
    }

    componentDidMount() {
        const { match } = this.props;

        Get(`/api/userIdCard/${match.params.id}`).then(({data}) => {
            this.setState({
                details: data,
                loading: false
            });
        });
    }

    handleClick = () => {
        const { history, location } = this.props;
        history.push('/audit/idcard', location.state);
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handlePreview = (url) => {
        this.setState({
            visible: true,
            imageUrl: url
        });
    }

    convertStatus = text => {
        switch (text) {
            case -1:
                return <span>认证失败</span>;
            case 0:
                return <span>未认证</span>;
            case 1:
                return <span>已认证</span>;
            case 2:
                return <span>待认证</span>;
            default:
                return null;
        }
    }

    render() {
        const { details, visible, imageUrl } = this.state;
        return (
            <div>
                <Spin spinning={this.state.loading} tip='读取中...'></Spin>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>姓名</b></Col>
                    <Col md={6} sm={8}>{details.userName}</Col>
                </Row>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>上传时间</b></Col>
                    <Col md={6} sm={8}> {getFormatDate(details.createTime)}</Col>
                </Row>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>审核状态</b></Col>
                    <Col md={6} sm={8}><b className='text-danger'>{this.convertStatus(details.status)}</b></Col>
                </Row>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>身份证正面</b></Col>
                    <Col md={6} sm={8}>
                        <img alt='身份证正面'
                            onClick={() => this.handlePreview(details.idcardFrontUrl)}
                            src={details.idcardFrontUrl}
                            width={300}
                            height={200}
                            style={{ cursor: 'pointer' }} />
                    </Col>
                </Row>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>身份证反面</b></Col>
                    <Col md={6} sm={8}>
                        <img alt='身份证反面'
                            onClick={() => this.handlePreview(details.idcardBackUrl)}
                            src={details.idcardBackUrl}
                            width={300}
                            height={200}
                            style={{ cursor: 'pointer' }} />
                    </Col>
                </Row>
                <Button type="default" onClick={this.handleClick}>
                    返回
                </Button>
                <PictureModal
                    visible={visible}
                    onCancel={this.handleCancel}
                    imageUrl={imageUrl}
                />
            </div>
        );
    }
}

export default UserIDCardDetails;