import React, { Component } from 'react';
import { Layout, Breadcrumb, message } from 'antd';
import { Route, Link, Redirect } from 'react-router-dom';

import Header from './layout/Header';
import Sidebar from './layout/Sidebar';

import UserArticle from './pages/UserArticle/UserArticle';
import UserIDCard from './pages/UserIDCard/UserIDCard';
import UserCareerList from './pages/UserCareer/UserCareerList';
import UserProductList from './pages/UserProduct/UserProductList';
import Activity from './pages/Activity/Activity';
import UserRefundList from './pages/UserRefund/UserRefundList';
import SystemOperatorList from './pages/SystemOperators/List';
import SystemRoleList from './pages/SystemRoles/List';
import Forbidden from './pages/Forbidden';
import PrivateRoute from './components/PrivateRoute';
import UserFeedBack from './pages/FeedBack/UserFeedBack';
import UserReportList from './pages/UserReport/UserReportList';
import TradeCircleAuditList from './pages/TradeCircleAudit/TradeCircleAuditList';
import TradeCirclePushList from './pages/TradeCirclePush/TradeCirclePushList';
import ContentProductList from './pages/ContentProduct/ContentProductList';
import ContentArticleList from './pages/ContentArticle/ContentArticleList';
import ContentTradeCircleList from './pages/ContentTradeCircle/ContentTradeCircleList';
import Person from './pages/Person';
import Dashboard from './pages/Dashboard';

import { getToken, getLocalUserName, getLocalUserPermissions } from './static/sessionKey';

const admin = ['系统管理'];
const { Content, Footer } = Layout;
const breadcrumbNameMap = {
    '/': { name: '首页', accessible: true },
    '/audit': { name: '审核', accessible: false },
    '/content': { name: '内容分类管理', accessible: false },
    '/activity': { name: '活动', accessible: false },
    '/system': { name: '系统', accessible: false },
    '/feedback': { name: '用户反馈', accessible: true },
    '/accusation': { name: '举报', accessible: true },
    '/audit/article': { name: '专栏审核', accessible: true },
    '/audit/idcard': { name: '身份证审核', accessible: true },
    '/audit/idcard/:id': { name: '身份证详情', accessible: true },
    '/audit/career': { name: '名片审核', accessible: true },
    '/audit/product': { name: '产品审核', accessible: true },
    '/audit/refund': { name: '退款审核', accessible: true },
    '/audit/report': { name: '举报审核', accessible: true },
    '/audit/tradeCircleAudit': { name: '生意圈审核', accessible: true },
    '/audit/tradeCirclePush': { name: '生意圈推送', accessible: true },
    '/audit/person': { name: '客户审核', accessible: true },
    '/audit/person/add': { name: '客户信息录入', accessible: false },
    '/content/contentProduct': { name: '产品', accessible: true },
    '/content/contentArticle': { name: '专栏', accessible: true },
    '/content/contentTradeCircle': { name: '生意圈', accessible: true },
    '/activity/list': { name: '活动列表', accessible: true },
    '/system/operators': { name: '操作员列表', accessible: true },
    '/system/roles': { name: '角色列表', accessible: true }
}

class Layouts extends Component {
    state = {
        collapsed: false,
        marginLeft: 256
    };

    handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            marginLeft: !this.state.collapsed ? 80 : 256
        });
    }

    render() {
        const currentUserName = `${getLocalUserName()}`;
        const currentUserPermissions = `${getLocalUserPermissions()}`;
        const { location, match } = this.props;
        const RedirectToLogin = <Redirect to={{ pathname: "/login", state: { from: location } }} />;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            if (!breadcrumbNameMap[url]) return null;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={breadcrumbNameMap[url].accessible ? url : '#'}>
                        {breadcrumbNameMap[url].name}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [(
            <Breadcrumb.Item key="home">
                <Link to="/">首页</Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);

        if (!getToken() && getLocalUserName()) {
            message.warning("您的登录已过期，请重新登录...");
            return RedirectToLogin;
        }

        if (!getToken()) {
            message.warning("您还未登陆，已跳转至登录页...");
            return RedirectToLogin;
        }

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar
                    collapsed={this.state.collapsed}
                    onCollapse={this.handleClick}
                    currentUserPermissions={currentUserPermissions}
                />
                <Layout style={{ marginLeft: this.state.marginLeft, zIndex: 1 }}>
                    <Header
                        currentUser={currentUserName}
                        collapsed={this.state.collapsed}
                        onCollapse={this.handleClick}
                        {...this.props}
                    />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '22px 0' }}>
                            {breadcrumbItems}
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }} className='Fade'>
                            <Route path={"/dashboard"} component={Dashboard} />
                            <PrivateRoute path={"/audit/article"} component={UserArticle} allow={['文章审核', '专栏审核']} />
                            <PrivateRoute path={"/audit/idcard"} component={UserIDCard} allow={['身份证审核']} />
                            <PrivateRoute path={"/audit/career"} component={UserCareerList} allow={['名片审核']} />
                            <PrivateRoute path={"/audit/product"} component={UserProductList} allow={['产品审核']} />
                            <PrivateRoute path={"/audit/refund"} component={UserRefundList} allow={['退款审核']} />
                            <PrivateRoute path={"/audit/report"} component={UserReportList} allow={admin} />
                            <PrivateRoute path={"/activity/list"} component={Activity} allow={['活动管理']} />
                            <PrivateRoute path={"/system/operators"} component={SystemOperatorList} allow={admin} />
                            <PrivateRoute path={"/system/roles"} component={SystemRoleList} allow={admin} />
                            <PrivateRoute path={"/feedback"} component={UserFeedBack} allow={['反馈管理']} />
                            <PrivateRoute path={"/audit/tradeCircleAudit"} component={TradeCircleAuditList} allow={['生意圈管理']} />
                            <Route path={"/audit/tradeCirclePush"} component={TradeCirclePushList} />
                            <PrivateRoute path={"/audit/person"} component={Person} allow={['客户审核']}/>
                            <PrivateRoute path={"/content/contentProduct"} component={ContentProductList} allow={['产品内容管理']} />
                            <PrivateRoute path={"/content/contentArticle"} component={ContentArticleList} allow={['专栏内容管理']} />
                            <PrivateRoute path={"/content/contentTradeCircle"} component={ContentTradeCircleList} allow={['生意圈内容管理']} />
                            <Route path={"/forbidden"} component={Forbidden} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Zhuan Dao ©2019 UI by Ant Design
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Layouts;