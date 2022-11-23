import React from "react";
import { Link } from 'react-router-dom'
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  SettingOutlined,
  InsertRowLeftOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import Cookie from 'js-cookie'

const { Header, Sider, Content } = Layout;

class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    Object.keys(Cookie.get()).forEach(function(cookieName) {
      Cookie.remove(cookieName);
    });

    window.location.href = '/'
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{
            minHeight: "100vh",
          }}
          width={270}
        >
          <div className="logo">
            {/* <img src={logo} />  */}
            Conceptor
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]} className="menu-sidebar">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
              <Link to="/home" />
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Investor
            </Menu.Item>
            <Menu.Item key="3" icon={<InsertRowLeftOutlined />}>
              Companies
              <Link to="/companies" />
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Menu.Item key="5" icon={<UploadOutlined />} onClick={this.logout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header> */}
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
