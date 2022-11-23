import React, { useEffect } from 'react'

import { Row, Col, Card, Typography, Input } from 'antd';
import TextField from '@mui/material/TextField';

import { SynergiesAndGoalsData } from '../../../constants/mock-list'

import SignalIcon from '../../../../../assets/svgs/signal'
import FileIcon from '../../../../../assets/svgs/file'
import DollarCurrecyIcon from '../../../../../assets/svgs/dollar-currency'

const { Title, Text } = Typography;
const { TextArea } = Input;

const InvestorProfile = ({ data = {} }) => {
    return (
        <React.Fragment>
            <Title level={5}>Investors Profile</Title>
            <Card bordered={false}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <div className='investor-profile-container'>
                            <span>Investor Name</span>
                            <div className='investor-profile-content-multiline'>
                                {data.company_name || 'N/A'}
                            </div>
                        </div>

                        <div className='investor-profile-container'>
                            <span>Type</span>
                            <div className='investor-profile-content-multiline'>
                                {data.type || 'N/A'}
                            </div>
                        </div>

                        <div className='investor-profile-container'>
                            <span>Speciality</span>
                            <div className='investor-profile-content-multiline'>
                                {data.specialty || 'N/A'}
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='investor-profile-container'>
                            <span>Website</span>
                            <div className='investor-profile-content-multiline'>
                                {data.url || 'N/A'}
                            </div>
                        </div>

                        <div className='investor-profile-container'>
                            <span>NAICS industry</span>
                            <div className='investor-profile-content-multiline'>
                                {data.naics_six_digit_industry || 'N/A'}
                            </div>
                        </div>

                        <div className='investor-profile-container'>
                            <span>Sector Focus</span>
                            <div className='investor-profile-content-multiline'>
                                {data.sector_focus || 'N/A'}
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className='investor-profile-container'>
                    <span>Description</span>
                    <div className='investor-profile-content-multiline'>
                        {data.description || 'N/A'}
                    </div>
                </div>

                <div className='investor-profile-container'>
                    <span>Headquarter Address</span>
                    <div className='investor-profile-content-multiline'>
                        {data.hq_address || 'N/A'}
                    </div>
                </div>
            </Card>

            <div className="flex flex-row investor-profile-item">
                <span>Preferred EBITDA Range (Millions):</span>
                {data.preferred_ebitda ?
                    <strong>{data.preferred_ebitda} USD</strong>
                    : <span>N/A</span>
                }
            </div>

            <div className="flex flex-row investor-profile-item">
                <span>Preferred Revenue Range (Millions):</span>
                {data.preferred_revenue ?
                    <strong>{data.preferred_revenue} USD</strong>
                    : <span>N/A</span>
                }
            </div>

            <div className="flex flex-row investor-profile-item">
                <span>Preferred EV Range (Millions):</span>
                {data.preferred_ev ?
                    <strong>{data.preferred_ev} USD</strong>
                    : <span>N/A</span>
                }
            </div>

            {/* <div className="flex flex-row investor-profile-item">
                <span>Typical Equity Investment (Millions):</span>
                {data.typical_equity_investments ?
                    <strong>{data.typical_equity_investments} USD</strong>
                    : <span>N/A</span>
                }
            </div> */}
        </React.Fragment>
    )
}

export default InvestorProfile