import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as CompanyActions from '../../store/actions/company'

import { Link } from 'react-router-dom'
import { Layout, Menu, Input, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  SettingOutlined,
  FileTextOutlined,
  PullRequestOutlined,
} from "@ant-design/icons";

import logo from "../../assets/images/logo.png";
import loader from "../../assets/images/loader.gif";
import MotionVideo from "../../assets/video/Motion.mp4";
import Loader from '../Loader'
import Cookie from 'js-cookie'

import { Select } from 'antd';

const { Option } = Select;
const { Header, Sider, Content } = Layout;

const MainLayout = (props) => {

  const { http } = global.services

  const loading = useSelector(state => state.AppReducer.loading)
  const companies = useSelector(state => state.CompanyReducer.companies)
  const selected = useSelector(state => state.CompanyReducer.selected_company)

  const [collapsed, setCollapsed] = useState(false)

  const [state, setState] = useState({
    menu: ["/"],
    profile: null
  })

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    initUser()
    initMenu()
    initialization()

    return () => state
  }, [])

  useEffect(() => {
      let menuListener = history.listen((location, action) => {
        initMenu()
      });

      return () => menuListener
  }, [])

  useEffect(() => {
    if (props && props.menu)
      setState({ ...state, menu: props.menu })
  }, [props?.menu])

  const initUser = async () => {
    let { data } = await http.get(`user`)
    setState({ ...state, profile: data })
  }

  const initialization = async () => {
    let { data } = await http.get(`user-company`)
    if (!selected.id && data.length > 0) {
      dispatch(CompanyActions.setCompanies(data))
      dispatch(CompanyActions.setSelectedCompany(data[0]))
    }
  }

  const initMenu = async () => {
    console.log("init menu")
    let activeMenu = history.location.pathname == '/' || history.location.pathname == '/home'
      ? '/'
      : history.location.pathname
    setState({ ...state, menu: [activeMenu] })
  }

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  const logout = () => {
    Object.keys(Cookie.get()).map(function (cookieName) {
      Cookie.remove(cookieName);
    });

    window.location.href = '/'
  }

  const click = (e) => {
    let active = [`${e.key}`]
    setState({ ...state, menu: active })
  }

  const changeSelected = (e) => {
    let company = companies.filter(c => c.id === e)[0]
    dispatch(CompanyActions.setSelectedCompany(company))
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
        }}
        width={270}
      >
        <div className="logo logo-nav">
          {/* <img src={logo} />  */}
          Conceptor
        </div>
        
        <Menu 
          theme="light" 
          mode="inline" 
          defaultSelectedKeys={history.location.pathname == '/' || history.location.pathname == '/home' ? '/' : history.location.pathname} 
          selectedKeys={history.location.pathname == '/' || history.location.pathname == '/home' ? '/' : history.location.pathname} 
          className="menu-sidebar" 
          onClick={click}
          >
          <Menu.Item key="/" icon={<HomeOutlined />} style={{ zIndex: 100}}>
            Home
            <Link to="/home" />
          </Menu.Item>
          <Menu.Item key="/company-submission" icon={<FileTextOutlined />} style={{ zIndex: 100}}>
            Company Submission
            <Link to="/company-submission" />
          </Menu.Item>
          <Menu.Item key="/ai-recommendation" icon={<PullRequestOutlined />} style={{ zIndex: 100}}>
            AI Recommendations
            <Link to="/ai-recommendation" />
          </Menu.Item>
          <Menu.Item key="/leads-manager" icon={<UserOutlined />} style={{ zIndex: 100}}>
            Leads Manager
            <Link to="/leads-manager" />
          </Menu.Item>
          <Menu.Item key="/logout" icon={<UploadOutlined />} onClick={logout} style={{ zIndex: 100}}>
            Logout
          </Menu.Item>
        </Menu>

        <div className="absolute logo-container" >
          <img src={logo} className='z-10'/>
        </div>
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

        {loading ? (
          // <div className='flex justify-center items-center'>
          //   <div className='relative'>
          //     <img src={loader} width={800} />
          //   </div>
          // </div>
          <div className='flex min-h-screen justify-center' style={{ backgroundColor: '#fff', padding: 24 }}>
            <video autoPlay muted loop>
              <source src={MotionVideo} type="video/mp4" />
            </video>
          </div>
        ) : (
          <Content
            className="site-layout-background overflow-scroll"
            style={{
              // margin: "24px 16px",
              padding: 24,
              height: '100vh',
            }}
          >
            <div className="flex items-center">
              <div className="flex-1"></div>
              <div className="flex items-center select-company">
                <Select defaultValue={''} value={selected.id || ``} style={{ width: "100%" }} onChange={changeSelected}>
                  {companies.map((company, index) => (
                    <Option key={index} value={company.id}>{company.company_name}</Option>
                  ))}
                </Select>
              </div>
              <div className="flex user-avatar">
                <div>
                  <Avatar shape="square" size="medium" style={{ backgroundColor: '#eab8ff' }} icon={<UserOutlined />} />
                </div>
                <div className="flex flex-column user-position">
                  {state.profile &&
                    <span><b>{state.profile.first_name}</b></span>
                  }
                  {/* <span>Project Manager</span> */}
                </div>
              </div>
            </div>

            {props.children}
          </Content>
        )}
      </Layout>
    </Layout>
  )
}

export default MainLayout;
