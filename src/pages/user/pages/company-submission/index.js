import React, { useEffect, useState } from 'react'

import { Button, Input, Avatar, Card, Tabs } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import GoalsContent from './pages/goals'
import AttributesContent from './pages/attributes'
import FinancialsContent from './pages/financials'
import Submission from './pages/submission';

import MainLayout from '../../../../components/user-layout'
import '../../../../assets/css/index.css';

import DataSet from '../../../../dataset.json'
import DataSetOutput from '../../../../dataset_output.json'

const { TabPane } = Tabs;

const CompanySubmission = () => {

    const { http } = global.services

    const [company, setCompany] = useState(null)
    const [inputs, setInputs] = useState([])

    const [currentTab, setCurrentTab] = useState('goals')

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        console.log(Object.keys(DataSet))
        let inp = []
        Object.keys(DataSet).map((k, index)=> {
            inp[index] = {}
            DataSet[k].map(q => {
                inp[index][q.key] = ['none']
            })
        })
        setInputs(inp)
    }

    const submit = async (params) => {
        let inps = inputs
        let keys = Object.keys(params)

        inputs.map((inp,index) => {
            Object.keys(inp).map(k => {
                if (keys.includes(k)) {
                    if (index == 0) {
                        if (params[k]) {
                            inps[index][k] = ['block', params[k]]
                        }
                    } else {
                        if (params[k]) {
                            inps[index][k] = [params[k]]
                        }
                    }
                }
            })
        })

        let { data } = await http.post('programx', {
                company_name: company,
                user_input: inps
            })
    }

    const callback = (key) => {
        console.log(key);
    }

    return (
        <React.Fragment>
            <MainLayout>
                <div className="flex">
                    <div className="flex-1"> <h1 className="title-1">Companies</h1></div>
                    <div className="search-input">
                        <Input size={90} placeholder="Search" prefix={<SearchOutlined />} />
                    </div>
                    <div className="flex user-avatar">
                        <div><Avatar style={{ backgroundColor: '#eab8ff' }} icon={<UserOutlined />} /></div>
                        <div className="flex flex-column user-position"><span><b>Jhon</b></span><span>Project Manager</span></div>
                    </div>
                </div>
                <div className="spacer"></div>
                <Submission 
                    company={company} 
                    setCompany={setCompany} 
                />
                <div className="spacer"></div>
                <div className='flex-1'>
                    <Card bordered={false} style={{ width: '100%' }}>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Goals" key="1">
                                <GoalsContent
                                    company={company}
                                    inputs={inputs}
                                    onSubmit={submit}
                                />
                            </TabPane>
                            <TabPane tab="Attributes" key="2">
                                <AttributesContent
                                    company={company}
                                    inputs={inputs}
                                    onSubmit={submit}
                                />
                            </TabPane>
                            <TabPane tab="Financials" key="3">
                                <FinancialsContent
                                    company={company}
                                    inputs={inputs}
                                    onSubmit={submit}
                                />
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </MainLayout>
        </React.Fragment>
    )
}

export default CompanySubmission