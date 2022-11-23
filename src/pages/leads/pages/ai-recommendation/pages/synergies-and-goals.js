import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Space, Avatar } from 'antd';

import { SynergiesAndGoalsData } from '../../../constants/mock-list'

import SignalIcon from '../../../../../assets/svgs/signal'
import FileIcon from '../../../../../assets/svgs/file'
import DollarCurrecyIcon from '../../../../../assets/svgs/dollar-currency'

const { Title, Text } = Typography;

const SynergiesAndGoals = ({ data }) => {

    const [state, setState] = useState({
        operating_synergies: [],
        financial_synergies: [],
        misc_synergies: [],
    })

    useEffect(() => {
        init()
    }, [data])

    const init = () => {
        if (data.operating_synergies || data.financial_synergies || data.misc_synergies) {
            setState({
                operating_synergies: data.operating_synergies,
                financial_synergies: data.financial_synergies,
                misc_synergies: data.misc_synergies
            })
        } else {
            setState({
                operating_synergies: [],
                financial_synergies: [],
                misc_synergies: [],
            })
        }
    }

    return (
        <React.Fragment>
            <Title level={5}>Synergies & Goals</Title>
            <div className='flex flex-row'>
                <div className="flex synergies-goal">
                    <Card bordered={false}>
                        <Avatar className='synergies-goal-icon-0' shape="square" size={50} icon={<SignalIcon />} />
                        <br />
                        <strong>
                            <span>Client’s Goals & Buyer Incentives</span>
                        </strong>
                        <br />
                        <br />
                        {state.misc_synergies && (
                            <ul style={{paddingLeft: 15}}>
                                {state.misc_synergies.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>
                <div className="flex synergies-goal">
                    <Card bordered={false}>
                        <Avatar className='synergies-goal-icon-1' shape="square" size={50} icon={<FileIcon />} />
                        <br />
                        <strong>
                            <span>Operating Synergies</span>
                        </strong>
                        <br />
                        <br />
                        {state.operating_synergies && (
                            <ul style={{paddingLeft: 15}}>
                                {state.operating_synergies.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>
                <div className="flex synergies-goal">
                    <Card bordered={false}>
                        <Avatar className='synergies-goal-icon-2' shape="square" size={50} icon={<DollarCurrecyIcon />} />
                        <br />
                        <strong>
                            <span>Financial Synergies</span>
                        </strong>
                        <br />
                        <br />
                        {state.financial_synergies && (
                            <ul style={{paddingLeft: 15}}>
                                {state.financial_synergies.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SynergiesAndGoals