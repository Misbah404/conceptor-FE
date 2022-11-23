import React from 'react'
import { Button, Input, Avatar, Row, Col, Card } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import MainLayout from '../../../../components/user-layout'
import '../../../../assets/css/index.css';

const UserDashboardPage = () => {

    return (
        <React.Fragment>
            <MainLayout>
               <div className="flex">
                   <div className="flex-1"> <h1 className="title-1">Leady Summary</h1></div>
                   <div className="search-input">
                       <Input size={90} placeholder="Search" prefix={<SearchOutlined />} />
                   </div>
                   <div className="flex user-avatar">
                      <div><Avatar style={{ backgroundColor: '#eab8ff' }} icon={<UserOutlined />} /></div>
                      <div className="flex flex-column user-position"><span><b>Jhon</b></span><span>Project Manager</span></div>
                   </div>
               </div>
               <div className="spacer"></div>
               <Row gutter={[32, 32]}>
                    <Col span={12}>
                       <Card title="Investor List" bordered={false} >
                            <p>Content Here</p>
                        </Card>
                        <div className="spacer"></div>
                        <Card title="Investor Score" bordered={false} >
                            <p>Content Here</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Investor Profile" bordered={false} >
                            <p>Content Here</p>
                        </Card>
                    </Col>
                </Row>
            </MainLayout>
        </React.Fragment>
    )
}

export default UserDashboardPage