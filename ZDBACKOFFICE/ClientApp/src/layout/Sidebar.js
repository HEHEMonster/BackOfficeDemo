import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import zdLogo from '../images/ZDlogo.svg';
import './Sidebar.css';
import data from '../static/menu.json';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const menus = [...data.menus];

class Sidebar extends Component {
    state = {
        collapsed: false,
        openKey: [],
        currentOpenMenu: [],
        menus: []
    };
    currentUserPermissions = [];

    componentWillMount() {
        this.getWillOpenMenuKey();
    }

    componentDidMount() {
        this.setState({
            menus: menus,
        });
        this.currentUserPermissions = this.props.currentUserPermissions ? `${this.props.currentUserPermissions}`.split(',') : [];
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    handleClick = ({ keyPath }) => {
        this.setState({
            openKey: [keyPath[1]]
        })
    }

    getWillOpenMenuKey = () => {
        const { location } = this.props;
        let paths = location.pathname.split('/').filter(i => i);
        this.setState({
            currentOpenMenu: [`/${paths[0]}`]
        });
    }

    includePermissions = (menuPermissions) => {
        if ([...menuPermissions].length === 0) return true;
        return this.currentUserPermissions.some(x => [...menuPermissions].includes(x));
    }

    menuVisable = ({ items }) => {
        let arr = [];
        [...items].map(item => arr = arr.concat(item.permissions));
        arr = Array.from(new Set(arr));
        return !this.includePermissions(arr);
    }

    render() {
        const { location, collapsed, onCollapse } = this.props;

        return (
            <Sider
                className='sidebar'
                width={256}
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
            >
                <div className="brand">
                    <div className="logo">
                        <img src={zdLogo} alt="logo" className={collapsed ? 'imgcollapsed' : ''} />
                        {collapsed ? null : <h1>赚道后台</h1>}
                    </div>
                </div>
                <div className='menuContainer'>
                    <Menu theme="dark" mode="inline" inlineCollapsed="true"
                        selectedKeys={[location.pathname]}
                        defaultOpenKeys={this.state.currentOpenMenu}
                        onClick={this.handleClick}>
                        {
                            this.state.menus.map(menu => {
                                return menu.hasSub ? <SubMenu
                                    key={menu.key}
                                    hidden={this.menuVisable(menu)}
                                    title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}
                                >
                                    {
                                        [...menu.items].map(item => {
                                            return this.includePermissions(item.permissions) ? <Menu.Item
                                                key={item.key}
                                            >
                                                <Link to={item.to}>{item.title}</Link>
                                            </Menu.Item> : null
                                        })
                                    }
                                </SubMenu> : <Menu.Item key={menu.key}>
                                        <Link to={menu.key}>
                                            <Icon type={menu.icon} />
                                            <span>{menu.title}</span>
                                        </Link>
                                    </Menu.Item>
                            })
                        }
                    </Menu>
                </div>
            </Sider>
        );
    }
}

export default withRouter(Sidebar);