import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom'

import { Button, Avatar, Space } from 'antd'
import { LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';

import FacebookIcon from '../../../../../assets/svgs/facebook'
import TwitterIcon from '../../../../../assets/svgs/twitter'
import YoutubeIcon from '../../../../../assets/svgs/youtube'

const Footer = ({ state, setState, ...props}) => {

    const onChangeTryState = () => {
        setState({
            ...state,
            showTryModal: true
        })
    }

    const onChangeContactState = () => {
        setState({
            ...state,
            showContactModal: true
        })
    }

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    return (
        <React.Fragment>
            <div className="relative" style={{ height: isMobile ? 'inherit' : 200, backgroundColor: '#3E3D53', paddingTop: isMobile ? 0 : 40, paddingLeft: isMobile ? 0 : 30, paddingRight: isMobile ? 0 : 30 }}>
                <div className='flex items-center'>
                    {!isMobile &&
                    <div className='flex-1'>
                        <strong>
                            <h1 style={{ color: '#fff', fontSize: 20 }}>
                                <Link to="/" style={{ color: '#fff' }}>Conceptor</Link>
                            </h1>
                        </strong>
                    </div>
                    }
                    <div className='flex-2 flex-row'>
                        <nav className="menu footer">
                            <ul style={{ paddingInlineStart: isMobile ? 0 : 40 }}>
                                <li><a href="#whyAI">Why A.I.?</a></li>
                                <li><a href="#feature">Features</a></li>
                                <li><Link to="/" onClick={onChangeContactState}>Contact</Link></li>
                                <li><Link to="/" onClick={onChangeTryState}>Try it out</Link></li>
                            </ul>
                        </nav>
                    </div>
                    {!isMobile &&
                    <div className='flex-1'>
                        <div className='flex items-center justify-end'>
                            <Space size={'large'}>
                                {/* <Avatar shape='circle' size={42} icon={<FacebookIcon />} style={{ backgroundColor: "#53526C" }} /> */}
                                <Link to={{ pathname: 'https://www.instagram.com/conceptor.ai/' }} target="_blank">
                                    <Avatar shape='circle' size={42} icon={<InstagramOutlined />} style={{ backgroundColor: "#53526C" }} />
                                </Link>
                                {/* <Avatar shape='circle' size={42} icon={<TwitterIcon />} style={{ backgroundColor: "#53526C" }} /> */}
                                {/* <Avatar shape='circle' size={42} icon={<YoutubeIcon />} style={{ backgroundColor: "#53526C" }} /> */}
                                <Link to={{ pathname: 'https://www.linkedin.com/company/conceptorai' }} target="_blank">
                                    <Avatar shape='circle' size={42} icon={<LinkedinOutlined />} style={{ backgroundColor: "#53526C" }} />
                                </Link>
                            </Space>
                        </div>
                    </div>
                    }
                </div>
            </div>
            {isMobile &&
            <div className="relative" style={{ backgroundColor: '#3E3D53', paddingBottom: 13}}>
                <div className='flex items-center justify-center'>
                    <Space size={'large'}>
                        {/* <Avatar shape='circle' size={42} icon={<FacebookIcon />} style={{ backgroundColor: "#53526C" }} /> */}
                        <Link to={{ pathname: 'https://www.instagram.com/conceptor.ai/' }} target="_blank">
                            <Avatar shape='circle' size={42} icon={<InstagramOutlined />} style={{ backgroundColor: "#53526C" }} />
                        </Link>
                        {/* <Avatar shape='circle' size={42} icon={<TwitterIcon />} style={{ backgroundColor: "#53526C" }} /> */}
                        {/* <Avatar shape='circle' size={42} icon={<YoutubeIcon />} style={{ backgroundColor: "#53526C" }} /> */}
                        <Link to={{ pathname: 'https://www.linkedin.com/company/conceptorai' }} target="_blank">
                            <Avatar shape='circle' size={42} icon={<LinkedinOutlined />} style={{ backgroundColor: "#53526C" }} />
                        </Link>
                    </Space>
                </div>
            </div> 
            }            
            <div className="flex flex-row text-white" style={{ backgroundColor: '#323144', padding: 30 }}>
                <Space size={'large'}>
                    <span>© 2022 Conceptor</span>
                    <Link to="/privacy-policy" style={{ color: '#fff' }}>Privacy Policy</Link>
                    <Link to="/terms-and-conditions" style={{ color: '#fff' }}>Terms & Conditions</Link>
                </Space>
            </div>
        </React.Fragment>
    )
}

export default Footer