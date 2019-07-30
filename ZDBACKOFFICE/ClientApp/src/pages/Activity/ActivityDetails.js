import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { getFormatDate } from '../../utils/date';
import { Get } from '../../utils/http';
import '../../styles/Common.css';

class ActivityDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            loading: true,
            visible: false
        }
    }

    componentDidMount() {
        const { match } = this.props;
        Get(`/api/Activity/${match.params.id}`).then(({ data }) => {
            this.setState({
                details: data,
                loading: false
            });
        });
    }

    handleClick = () => {
        const { history, location } = this.props;
        history.push('/activity/list', location.state);
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    render() {
        const { details } = this.state;
        return (
            <div>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>活动名称</b></Col>
                    <Col md={6} sm={8}>{details.title}</Col>
                </Row>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>活动内容</b></Col>
                    <Col md={6} sm={8}><div dangerouslySetInnerHTML={{ __html: details.content }}></div></Col>
                </Row>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>发布时间</b></Col>
                    <Col md={6} sm={8}> {getFormatDate(details.createDate)}</Col>
                </Row>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>举办时间</b></Col>
                    <Col md={6} sm={8}> {getFormatDate(details.beginDate)} -- {getFormatDate(details.endDate)}</Col>
                </Row>
                <Row className='mb-10'>
                    <Col md={2} sm={6}><b>报名时间</b></Col>
                    <Col md={6} sm={8}> {getFormatDate(details.registrationBegin)} -- {getFormatDate(details.registrationEnd)}</Col>
                </Row>
                <Button type="default" onClick={this.handleClick}>
                    返回
                </Button>

            </div>
        );
    }
}
export default ActivityDetails;