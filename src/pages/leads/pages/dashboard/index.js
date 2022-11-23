import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Row, Col, Card, Typography, Space, Breadcrumb, Tag } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import '../../../../assets/css/index.css';

import CurrencyIcon from '../../../../assets/svgs/dollar-currency'
import FileIcon from '../../../../assets/svgs/file'
import BagIcon from '../../../../assets/svgs/bag'
import ToolIcon from '../../../../assets/svgs/tool'
import RibbonIcon from '../../../../assets/svgs/ribbon'
import ChainIcon from '../../../../assets/svgs/chain'
import CompanyAttributes from './pages/attributes';

import Report from './pages/report'
import FinanceReport from './pages/finance'
import EbitdaContent from './pages/ebitda';
import IntrinsicContent from './pages/intrinsic';
import ExtrinsicContent from './pages/extrinsic';
const { Title } = Typography

const LeadsDashboard = () => {

    const { http } = global.services

    const company = useSelector(state => state.CompanyReducer.selected_company)

    const [attributes, setAttributes] = useState({})
    const [state, setState] = useState({
        tree: []
    })

    useEffect(() => {
        init()

        return () => attributes
    }, [company])

    useEffect(() => {
        initGoals()
    }, [attributes])

    const init = async () => {

        const { user_input } = company
        if (user_input && user_input.length > 0) {
            let attr = {}
            user_input.map((u, i) => {
                Object.keys(u).map(k => {
                    if (i == 0 && u[k].length > 1)
                        attr[k] = u[k][1]
                    else
                        if (u[k].length > 0) {
                            attr[k] = u[k]
                        } else {
                            attr[k] = u[k][0]
                        }
                })
            })
            setAttributes(attr)
        } else {
            setAttributes({})
            setState({ ...state, tree: [] })
        }
    }

    const initGoals = async () => {
        let tree = []

        let { data } = await http.get('question')

        const { goals } = data.data
        goals.map(g => {
            let isValidNumber = typeof attributes[g.key] === 'number'
            let isValidString = typeof attributes[g.key] === 'string' && attributes[g.key] !== 'none'
            let isValidObject = typeof attributes[g.key] === 'object' && attributes[g.key].length > 0 && !attributes[g.key].includes('none')
            if (isValidNumber || isValidString || isValidObject) {
                let goal = g
                let value = typeof attributes[g.key] === 'object' ? attributes[g.key].join(', ') : attributes[g.key]

                if (goal.type === 'currency') {
                    value = '$' + formatValue(value)
                } else if (goal.type === 'percentage') {
                    value = value + '%'
                }

                goal.value = value
                tree.push(goal)
            }
        })

        // if (attributes['question-one'] === 'Recapitalize') {
        //     goals.map(g => {
        //         if (['question-one', 'recap-one', 'recap-two'].includes(g.key)) {
        //             let goal = g
        //             goal.value = attributes[g.key]
        //             tree.push(goal)
        //         }
        //     })
        // } else {
        //     goals.map(g => {
        //         if (['question-one', 'sale-one'].includes(g.key)) {
        //             let goal = g
        //             goal.value = attributes[g.key]
        //             tree.push(goal)
        //         }
        //     })
        // }

        setState({ ...state, tree: tree })
    }

    const formatValue = (val) => {
        let value = Number(val)
        if (value >= 1000000) {
            if (value % 1000000 === 0) {
                val = (value / 1000000) + 'mm'
            } else {
                val = parseFloat((value / 1000000)).toFixed(2) + 'mm'
            }
        }

        return val
    }

    return (
        <React.Fragment>
            <strong>
                <h2 className='dashboard-header'>Home</h2>
            </strong>
            <Row gutter={[32, 32]}>
            <Col span={8}>
                    <React.Fragment>
                        <Title level={5}>{company.company_name || 'Company Name'}</Title>
                    </React.Fragment>
                    {attributes.description_input &&
                        <React.Fragment>
                            <Card bordered={false} className='home-card'>
                                {attributes.description_input}
                            </Card>
                            <div className='spacer'></div>
                        </React.Fragment>
                    }
                </Col>
                <Col span={16}>
                    <div className='spacer'></div>
                    <div className='flex flex-row'>
                        <div className='flex-1 space-x'>
                            <Card bordered={false} className='home-card'>
                                <EbitdaContent attributes={attributes} />
                            </Card>
                        </div>
                        <div className='flex-1 space-x'>
                            <Card bordered={false} className='home-card'>
                                <IntrinsicContent attributes={attributes} />
                            </Card>
                        </div>
                        <div className='flex-1 space-x'>
                            <Card bordered={false} className='home-card'>
                                <ExtrinsicContent attributes={attributes} />
                            </Card>
                        </div>
                        {/* <div className='flex-1'>
                            <Card bordered={false}>
                                <Report attributes={attributes} />
                            </Card>
                        </div> */}
                    </div>                   
                </Col>
            </Row>
            <div className='spacer'></div>
            <Row gutter={[32, 32]}>
                <Col span={14}>
                    {/* {company && company.company_name &&
                        <React.Fragment>
                            <Title level={5}>{company.company_name || 'Company Name'}</Title>
                        </React.Fragment>
                    } */}
                    {/* {attributes.description_input &&
                        <React.Fragment>
                            <Card bordered={false}>
                                {attributes.description_input}
                            </Card>
                            <div className='spacer'></div>
                        </React.Fragment>
                    } */}
                    {/* <div className='flex flex-row'>
                        <div className='flex-1 space-x'>
                            <Card bordered={false}>
                                <EbitdaContent attributes={attributes} />
                            </Card>
                        </div>
                        <div className='flex-1 space-x'>
                            <Card bordered={false}>
                                <IntrinsicContent attributes={attributes} />
                            </Card>
                        </div>
                        <div className='flex-1 space-x'>
                            <Card bordered={false}>
                                <ExtrinsicContent attributes={attributes} />
                            </Card>
                        </div>
                        <div className='flex-1'>
                            <Card bordered={false}>
                                <Report attributes={attributes} />
                            </Card>
                        </div>
                    </div> */}
                    {/* <div className='spacer'></div> */}
                    {/* <div className='flex flex-row'>
                        {attributes.vision_input &&
                            <div className='flex-1 space-x'>
                                <Card bordered={false}>
                                    <strong>
                                        <h1>Vision</h1>
                                    </strong>
                                    <p>
                                        {attributes.vision_input}
                                    </p>
                                </Card>
                            </div>
                        }
                        {attributes.mission_input &&
                            <div className='flex-1'>
                                <Card bordered={false}>
                                    <strong>
                                        <h1>Mission</h1>
                                    </strong>
                                    <p>
                                        {attributes.mission_input}
                                    </p>
                                </Card>
                            </div>
                        }
                    </div>
                    <div className='spacer'></div> */}
                    {attributes && attributes['question-one'] && !attributes['question-one'].includes('none') && (
                        <React.Fragment>
                            <Title level={5}>Goals</Title>
                            <Card bordered={false} className='home-card'>
                                {state.tree.map(t => (
                                    <div key={t.question} style={{ marginBottom: 12 }}>
                                        <span>{t.question}</span> <br />
                                        <p className='goal-value'>{t.value}</p>
                                    </div>
                                ))}
                            </Card>
                            <div className='spacer'></div>
                        </React.Fragment>
                    )}
                    {/* <div>
                        <Title level={5}>Financials</Title>
                        <div className='flex-1'>
                            <Card bordered={false}>
                                <FinanceReport
                                    attributes={attributes}
                                />
                            </Card>
                        </div>
                    </div> */}
                </Col>
                <Col span={10}>
                    <CompanyAttributes attributes={attributes} />
                </Col>                
            </Row>
        </React.Fragment >
    )
}

export default LeadsDashboard