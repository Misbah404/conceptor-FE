import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Avatar, Card, Typography } from 'antd';

import FileIcon from '../../../../../assets/svgs/file'
import BagIcon from '../../../../../assets/svgs/bag'
import BuildingIcon from '../../../../../assets/svgs/building'
import ProductIcon from '../../../../../assets/svgs/product'
import ToolIcon from '../../../../../assets/svgs/tool'
import RibbonIcon from '../../../../../assets/svgs/ribbon'
import ChainIcon from '../../../../../assets/svgs/chain'
import UserTieIcon from '../../../../../assets/svgs/user-tie'

const { Meta } = Card;
const { Title } = Typography

const CompanyAttributes = ({ attributes }) => {

    return (
        <React.Fragment>
            <Title level={5}>Attributes</Title>
            <div className='flex-1'>
                <Card bordered={false} className='home-card'>
                    <Meta
                        avatar={
                            <Avatar
                                icon={<FileIcon />}
                                size={'large'}
                                shape='square'
                                style={{ backgroundColor: '#EAB8FF', borderRadius: 8 }}
                            />
                        }
                        title={(
                            <>
                                <strong><span>NAICS Industry:</span></strong> <br />
                                <span style={{fontSize: 14}}>{attributes['NAICS-Master-Dropdown'] || `none`}</span> <br /><br />
                                <strong>NAICS Sub-Industry:</strong> <br />
                                <span style={{fontSize: 14}}>{attributes['NAICS-Sub-Dropdown'] || `none`}</span> <br />
                            </>
                        )}
                        style={{ marginBottom: 12, marginTop: 2 }}
                    />
                    <Meta
                        avatar={
                            <Avatar
                                icon={<RibbonIcon />}
                                size={'large'}
                                shape='square'
                                style={{ backgroundColor: '#5B93FF', borderRadius: 8 }}
                            />
                        }
                        title={(
                            <>
                                <strong>Specialty:</strong> <br />
                                <span style={{fontSize: 14}}>{attributes['speciality_input'] || `none`}</span> <br />
                            </>
                        )}
                        style={{ marginBottom: 12 }}
                    />    
                    <Meta
                        avatar={
                            <Avatar
                                icon={<ToolIcon />}
                                size={'large'}
                                shape='square'
                                style={{ backgroundColor: '#D0BBFE', borderRadius: 8 }}
                            />
                        }
                        title={(
                            <>
                                <strong>Functional Descriptors:</strong> <br />
                                <span style={{fontSize: 14}}>{attributes['descriptor_input'] ? attributes['descriptor_input'].join(', ') : `none`}</span> <br />

                            </>
                        )}
                        style={{ marginBottom: 12 }}
                    />       
                    <Meta
                        avatar={
                            <Avatar
                                icon={<ChainIcon />}
                                size={'large'}
                                shape='square'
                                style={{ backgroundColor: '#BDC1FE', borderRadius: 8 }}
                            />
                        }
                        title={(
                            <>
                                <strong>Position within Supply Chain:</strong> <br />
                                <span style={{fontSize: 14}}>{attributes['supply_chain_dropdown'] || `none`}</span> <br />
                            </>
                        )}
                        style={{ marginBottom: 12 }}
                    />   
                    <Meta
                        avatar={
                            <Avatar
                                icon={<BagIcon />}
                                size={'large'}
                                shape='square'
                                style={{ backgroundColor: '#EAB8FF', borderRadius: 8 }}
                            />
                        }
                        title={(
                            <>
                                <strong>Area(s) of Operation:</strong> <br />
                                <span style={{fontSize: 14}}>{attributes['area_of_operations_dropdown'] ? attributes['area_of_operations_dropdown'].join(', ') : `none`}</span> <br />
                            </>
                        )}
                        style={{ marginBottom: 12 }}
                    />       
                    <Meta
                        avatar={
                            <Avatar
                                icon={<ProductIcon />}
                                size={'large'}
                                shape='square'
                                style={{ backgroundColor: '#5B93FF', borderRadius: 8 }}
                            />
                        }
                        title={(
                            <>
                                <strong>Products:</strong> <br />
                                <span style={{fontSize: 14}}>{attributes['product_input'] ? attributes['product_input'].join(', ') : `none`}</span> <br />
                            </>
                        )}
                        style={{ marginBottom: 12 }}
                    />       
                    <Meta
                        avatar={
                            <Avatar
                                icon={<UserTieIcon />}
                                size={'large'}
                                shape='square'
                                style={{ backgroundColor: '#D0BBFE', borderRadius: 8 }}
                            />
                        }
                        title={(
                            <>
                                <strong>Services:</strong> <br />
                                <span style={{fontSize: 14}}>{attributes['service_input'] ? attributes['service_input'].join(', ') : `none`}</span> <br />
                            </>
                        )}
                        style={{ marginBottom: 12 }}
                    />  
                    {/* <Meta
                        avatar={
                            <Avatar
                                icon={<UserTieIcon />}
                                size={'large'}
                                shape='square'
                                style={{ backgroundColor: '#D0BBFE', borderRadius: 8 }}
                            />
                        }
                        title={(
                            <>
                                <strong>Cultural Strengths:</strong> <br />
                                <span style={{fontSize: 14}}>{attributes['culture_and_values_input'] ? attributes['culture_and_values_input'].join(', ') : `none`}</span> <br />
                            </>
                        )}
                        style={{ marginBottom: 12 }}
                    />      */}
                    <Meta
                        avatar={
                            <Avatar
                                icon={<BuildingIcon />}
                                size={'large'}
                                shape='square'
                                style={{ backgroundColor: '#BDC1FE', borderRadius: 8 }}
                            />
                        }
                        title={(
                            <>
                                <strong>Workplace Culture Type:</strong> <br />
                                <span style={{fontSize: 14}}>{attributes['workplace_culture_dropdown'] ? attributes['workplace_culture_dropdown'].join(', ') : `none`}</span> <br />
                            </>
                        )}
                    />                                                                                                                         
                </Card>
            </div>
        </React.Fragment>
    )
}

export default CompanyAttributes