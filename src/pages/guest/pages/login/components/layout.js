import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Layout, Menu, Input, Avatar, Card } from "antd";
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

import Cookie from 'js-cookie'
import { Select, Row, Col } from 'antd';
import HomeImg from '../../../../../assets/images/leads-homepage.png'

const { Option } = Select;
const { Header, Sider, Content } = Layout;

const MainLayout = (props) => {

    return (
        <Layout style={{ maxHeight: '100vh', overflow: 'hidden' }}>
            <Row>
                <Col span={10} style={{ backgroundColor: '#FFFFFF' }}>
                    <Header>
                        <div className="logo">
                            <Link to="/" style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 30 }}>Conceptor</Link>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 735,
                        }}
                    >
                        {props.children}
                    </Content>
                </Col>
                <Col span={14} style={{ backgroundColor: '#D0BBFE', maxHeight: '100vh', minHeight: '100vh'}}>
                    <div style={{ position: 'absolute', right:'0px', bottom: '0px', maxHeight: '75%', maxWidth: '90%'}}>
                        <div style={{ backgroundColor: '#DECFFF', borderRadius:'10px 0 0 0', paddingTop:'14px', paddingLeft:'14px'}}>
                            <img src={HomeImg}/>
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default MainLayout;
