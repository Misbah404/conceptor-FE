import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import { Card, Avatar, Button, Row, Col, List, Input, Space, Divider } from 'antd'
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import MainLayout from './components/layout'
import Footer from './components/footer'

import SuccessCheckIcon from '../../../../assets/svgs/success-check'
import ModalTryItOut from '../../../../components/modal'
import SuccessModal from '../../../../components/modal/success'

import BgImg from '../../../../assets/images/bg.png'
import Logo from '../../../../assets/images/logo.png'
import EmptyFileIcon from '../../../../assets/svgs/empty-file'
import ExampleImg from '../../../../assets/images/augmented-example.png'
import AIPageImg from '../../../../assets/images/ai-page.png'
import LeadsPageImg from '../../../../assets/images/leads-page.png'
import BgLinesTwo from '../../../../assets/svgs/bg-lines-2'
import BgLinesThree from '../../../../assets/svgs/bg-lines-3'
import MotionVideo from '../../../../assets/video/Motion.mp4'

import AILoader from '../../../../assets/images/loader.gif'

const { TextArea } = Input;

const PrivacyPolicyPage = () => {

    const { http } = global.services

    const [state, setState] = useState({
        name: null,
        email: null,
        message: null,
        showTryModal: false,
        showContactModal: false,
        showTrySuccessModal: false,
        showContactSuccessModal: false
    })

    useEffect(() => {
        window.scrollTo(0, 0)        
        return () => state
    }, [])

    const handleModal = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }

    const changeText = key => e => {
        let data = { ...state }
        data[key] = e.target.value
        setState(data)
    }

    const sendTryEmail = async () => {
        if (!state.email) return null

        let { data } = await http.post('email', {
            email: state.email,
            type: 'try'
        })

        setState({
            ...state,
            email: null,
            showTryModal: false,
            showContactModal: false,
            showTrySuccessModal: true
        })
    }

    const sendContactEmail = async () => {
        if (!state.name) return null
        if (!state.email) return null
        if (!state.message) return null

        let { data } = await http.post('email', {
            name: state.name,
            email: state.email,
            message: state.message,
            type: 'contact'
        })

        setState({
            ...state,
            name: null,
            email: null,
            message: null,
            showTryModal: false,
            showContactModal: false,
            showTrySuccessModal: false,
            showContactSuccessModal: true,
        })
    }

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    return (
        <React.Fragment>
            <MainLayout state={setState} setState={setState}>
                <section>
                    {state.showTryModal &&
                        <ModalTryItOut className="program-x-modal" style={{ margin: isMobile ? 8 : 'auto' }} show={state.showTryModal} onClose={() => handleModal('showTryModal', false)}>
                            <div className='flex-column text-center' style={{ padding: 40 }}>
                                <strong>
                                    <h1 className='title'>Try it out</h1>
                                </strong>
                                <p>Enter your email and we will send you the details</p>
                                <Input
                                    value={state.email}
                                    className="inputs"
                                    placeholder="Your email"
                                    onChange={changeText('email')}
                                />
                                <br />
                                <Button
                                    block
                                    type="primary"
                                    className="btn"
                                    onClick={sendTryEmail}
                                    style={{ backgroundColor: '#605BFF', borderColor: '#605BFF' }}
                                >
                                    Send
                                </Button>
                                <br />
                            </div>
                        </ModalTryItOut>
                    }

                    {state.showContactModal &&
                        <ModalTryItOut className="program-x-modal" style={{ margin: isMobile ? 8 : 'auto' }} show={state.showContactModal} onClose={() => handleModal('showContactModal', false)}>
                            <div className='flex-column text-center' style={{ padding: 40 }}>
                                <strong>
                                    <h1 className='title'>Contact Us</h1>
                                </strong>
                                <p>What can we help you with?</p>
                                <Input
                                    value={state.name}
                                    className="inputs"
                                    placeholder="Your name"
                                    onChange={changeText('name')}
                                />
                                <br />
                                <Input
                                    value={state.email}
                                    className="inputs"
                                    placeholder="Your email"
                                    onChange={changeText('email')}
                                />
                                <br />
                                <TextArea
                                    value={state.message}
                                    className="inputs"
                                    placeholder="Your message"
                                    onChange={changeText('message')}
                                />
                                <br />
                                <Button
                                    block
                                    type="primary"
                                    className="btn"
                                    onClick={sendContactEmail}
                                    style={{ backgroundColor: '#605BFF', borderColor: '#605BFF' }}
                                >
                                    Send
                                </Button>
                                <br />
                            </div>
                        </ModalTryItOut>
                    }

                    {state.showTrySuccessModal &&
                        <SuccessModal show={state.showTrySuccessModal} style={{ margin: isMobile ? 8 : 'auto' }} onClose={() => handleModal('showTrySuccessModal', false)}>
                            <div className='program-x-modal-success-content'>
                                <SuccessCheckIcon />
                                <p>
                                    Thanks for registering your interest. Someone from Conceptor will email you shortly
                                </p>
                                <Button className='btn btn-primary' type="primary" onClick={() => handleModal('showTrySuccessModal', false)}>
                                    Ok
                                </Button>
                            </div>
                        </SuccessModal>
                    }

                    {state.showContactSuccessModal &&
                        <SuccessModal show={state.showContactSuccessModal} style={{ margin: isMobile ? 8 : 'auto' }} onClose={() => handleModal('showContactSuccessModal', false)}>
                            <div className='program-x-modal-success-content'>
                                <SuccessCheckIcon />
                                <p>
                                    Thanks for contacting us. Someone from Conceptor will email you shortly
                                </p>
                                <Button className='btn btn-primary' type="primary" onClick={() => handleModal('showContactSuccessModal', false)}>
                                    Ok
                                </Button>
                            </div>
                        </SuccessModal>
                    }
                    <div className='flex items-center' style={{ paddingBottom: 60 }}>
                        <div className='flex-1 flex-column items-center text-center'>
                            <div>
                                <Button
                                    size={'large'}
                                    style={{
                                        color: '#fff',
                                        borderRadius: 8,
                                        borderColor: '#EAB8FF',
                                        backgroundColor: '#EAB8FF',
                                        marginBottom: 20
                                    }}
                                >Privacy Policy</Button>
                            </div>
                            <strong>
                                <h1 style={{ fontSize: 40, letterSpacing: 2 }}>
                                    Privacy Policy
                                </h1>
                            </strong>
                            <br />
                            <br />
                            <div className='flex flex-column text-left' style={{ width: isMobile ? 'calc(100vw - 7)': 777, margin: 13 }}>
                                <Divider />
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    Last updated: (Apr-09-2022)
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify', zIndex: 100 }}>
                                    Conceptor AI ("us", "we", or "our") operates <Link to={{ pathname: 'https://conceptor.ai' }} target="_blank">https://conceptor.ai</Link> (the "Site"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF', textAlign: 'justify' }}>
                                    Information Collection And Use
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name ("Personal Information").
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    We will also ask for your company goals, attributes and financials which we will use as inputs to generate the Leads Recommendations from our proprietary AI leads recommendations engine. This data will be stored on our database against your profile. Any leads that you manually enter in the Leads Manager will also be stored in the database against your profile
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF', textAlign: 'justify' }}>
                                    Log Data
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics. In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this …
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    The Log Data section is for businesses that use analytics or tracking services in websites or apps, like Google Analytics. For the full disclosure section, create your own Privacy Policy.
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Communications
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that ...
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    The Communications section is for businesses that may contact users via email (email newsletters) or other methods. For the full disclosure section, create your own Privacy Policy.
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Cookies
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive. Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Security
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Changes To This Privacy Policy
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    This Privacy Policy is effective as of (Apr-09-2022) and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Contact Us
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    If you have any questions about this Privacy Policy, please contact us.
                                </p>
                                <Divider />
                            </div>
                        </div>
                        <br />
                    </div>
                    <Footer state={state} setState={setState} />
                </section>
            </MainLayout>
        </React.Fragment>

        /*** second layout */

        // <React.Fragment>
        //     <MainLayout>
        //         <div className='relative flex'>
        //             <div className='relative flex-1' style={{ marginTop: 10 }}>
        //                 <img src={Logo} style={{ width: 450 }} />
        //             </div>
        //             <div className='relative flex flex-column' style={{ width: 400, marginTop: 70 }}>
        //                 <h1 style={{ fontSize: 30, letterSpacing: 2 }}>Empower your investment bank with A.I.</h1>
        //                 <p>Our dashboard houses artificially intelligent algorithmns made to drive actionable insights</p>
        //                 <br />
        //                 <div>
        //                     <Button
        //                         size='large'
        //                         style={{
        //                             color: '#000',
        //                             borderColor: '#000',
        //                             borderRadius: 16,
        //                             borderWidth: 3,
        //                             marginRight: 12
        //                         }}>
        //                         Why A.I.?
        //                     </Button>
        //                     <Button
        //                         size='large'
        //                         style={{
        //                             color: '#000',
        //                             borderColor: '#000',
        //                             borderWidth: 3,
        //                             borderRadius: 16
        //                         }}>
        //                         Features
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className='flex flex-column' style={{marginTop: 50, marginBottom: 50}}>
        //             <div className='flex-column items-center'>
        //                 <img src={ExampleImg} style={{ width: 700 }} />
        //                 <div style={{ width: 400, textAlign: 'center' }}>
        //                     Artificial Intelligence (A.I.) enables us to answer questions that
        //                     require human intuition. Capable of replicating every decision-making
        //                     processes, A.I. can be taught to make predictions with
        //                     tangible levels of accuracy. This allows us to craft intelligent systems
        //                     that serve to provide intuitive answers, elegantly complimenting the
        //                     knowledge of the investment banker and exponentially increasing
        //                     the value of service provided of the client.
        //                 </div>
        //             </div>
        //         </div>
        //     </MainLayout >
        // </React.Fragment >



        /*** first layout */

        // <React.Fragment>
        //     <MainLayout>
        //         <div className='flex' style={{ paddingLeft: 50, paddingBottom: 80 }}>
        //             <div className='flex items-center'>
        //                 <div style={{ width: "70%" }}>
        //                     <h1 style={{ fontSize: 56 }}>This is the title that you need to change.</h1>
        //                     <p style={{ marginBottom: 50 }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

        //                     <Button
        //                         size='large'
        //                         style={{
        //                             color: '#fff',
        //                             backgroundColor: '#DD97E9',
        //                             borderRadius: 8,
        //                             marginRight: 12
        //                         }}>
        //                         Call to Action
        //                     </Button>
        //                     <Button
        //                         size='large'
        //                         style={{
        //                             color: '#DD97E9',
        //                             borderColor: '#DD97E9',
        //                             borderRadius: 8
        //                         }}>
        //                         Try it out
        //                     </Button>
        //                 </div>
        //             </div>
        //             <div className='relative flex'>
        //                 <img src={BgImg} />

        //                 <Card bordered={false} style={{ position: 'absolute', right: 90, top: -12, width: 250 }}>
        //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        //                 </Card>
        //                 <Card bordered={false} style={{ position: 'absolute', left: 0, bottom: -12, width: 250 }}>
        //                     <Avatar size={'large'} shape={'square'} icon={null} />
        //                     <br />
        //                     <br />
        //                     <span>
        //                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        //                     </span>
        //                 </Card>
        //             </div>
        //         </div>

        //         <div className='flex flex-row' style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', paddingTop: 80, paddingBottom: 80, paddingLeft: 50, paddingRight: 50 }}>
        //             <div className='flex items-center' style={{ width: '100%' }}>
        //                 <Card className="relative" style={{ backgroundColor: '#E7E8EC', height: 545, width: 400 }}>
        //                     <EmptyFileIcon />

        //                     <div style={{ position: 'absolute', right: -80, bottom: 30 }}>
        //                         <div className='flex'>
        //                             <Card bordered={false} style={{ width: 200 }}>
        //                                 <h1>100%</h1>
        //                                 <br />
        //                                 <br />
        //                                 <p>
        //                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        //                                 </p>
        //                             </Card>
        //                         </div>
        //                     </div>
        //                 </Card>
        //             </div>
        //             <div className='flex items-center'>
        //                 <div style={{ marginLeft: 100 }}>
        //                     <Button
        //                         size='large'
        //                         style={{
        //                             color: '#fff',
        //                             borderColor: '#D0BBFE',
        //                             backgroundColor: '#D0BBFE',
        //                             borderRadius: 8
        //                         }}>
        //                         About Product
        //                     </Button>
        //                     <br />
        //                     <br />
        //                     <div style={{ width: '70%' }}>
        //                         <h1 style={{ fontSize: 35 }}>This is one more title. </h1>
        //                         <p>
        //                             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        //                         </p>
        //                         <br />
        //                         <p>
        //                             It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised.
        //                         </p>
        //                         <br />
        //                     </div>
        //                     <Button
        //                         size='large'
        //                         style={{
        //                             color: '#DD97E9',
        //                             borderColor: '#DD97E9',
        //                             borderRadius: 8
        //                         }}>
        //                         Call to Action
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className='flex flex-column' style={{ minHeight: '100vh', paddingTop: 80, paddingLeft: 50, paddingRight: 50 }}>
        //             <div className='flex-column items-center'>
        //                 <Button
        //                     size='large'
        //                     style={{
        //                         color: '#fff',
        //                         borderColor: '#D0BBFE',
        //                         backgroundColor: '#D0BBFE',
        //                         borderRadius: 8
        //                     }}>
        //                     Product Features
        //                 </Button>
        //                 <br />
        //                 <div style={{ width: '45%', textAlign: 'center' }}>
        //                     <h1 style={{ fontSize: 35 }}>This is title that needs to provoke interest in your product.</h1>
        //                 </div>
        //             </div>
        //             <br />
        //             <br />
        //             <Row justify="center">
        //                 <Col>
        //                     <Card
        //                         bordered={false}
        //                         style={{ width: 400, borderWidth: 1, borderColor: 'black' }}
        //                         cover={
        //                             <img
        //                                 alt="example"
        //                                 src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //                             />
        //                         }
        //                     >
        //                         <strong>Value proposition 1</strong>
        //                         <br />
        //                         <br />
        //                         <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</span>
        //                         <br />
        //                         <br />
        //                         <Link to="#" style={{ color: '#DD97E9' }}>
        //                             Call to Action <RightOutlined />
        //                         </Link>
        //                     </Card>
        //                     <br />
        //                     <Card
        //                         bordered={false}
        //                         style={{ width: 400 }}
        //                         cover={
        //                             <img
        //                                 alt="example"
        //                                 src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //                             />
        //                         }
        //                     >
        //                         <strong>Value proposition 3</strong>
        //                         <br />
        //                         <br />
        //                         <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</span>
        //                         <br />
        //                         <br />
        //                         <Link to="#" style={{ color: '#DD97E9' }}>
        //                             Call to Action <RightOutlined />
        //                         </Link>
        //                     </Card>
        //                 </Col>
        //                 <Col span={1}></Col>
        //                 <Col>
        //                     <Card
        //                         bordered={false}
        //                         style={{ width: 400 }}
        //                         cover={
        //                             <img
        //                                 alt="example"
        //                                 src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //                             />
        //                         }
        //                     >
        //                         <strong>Value proposition 2</strong>
        //                         <br />
        //                         <br />
        //                         <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</span>
        //                         <br />
        //                         <br />
        //                         <Link to="#" style={{ color: '#DD97E9' }}>
        //                             Call to Action <RightOutlined />
        //                         </Link>
        //                     </Card>
        //                     <br />
        //                     <Card
        //                         bordered={false}
        //                         style={{ width: 400 }}
        //                         cover={
        //                             <img
        //                                 alt="example"
        //                                 src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //                             />
        //                         }
        //                     >
        //                         <strong>Value proposition 4</strong>
        //                         <br />
        //                         <br />
        //                         <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</span>
        //                         <br />
        //                         <br />
        //                         <Link to="#" style={{ color: '#DD97E9' }}>
        //                             Call to Action <RightOutlined />
        //                         </Link>
        //                     </Card>
        //                 </Col>
        //             </Row>
        //             <br />
        //         </div>

        //         <div className='flex flex-column' style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', paddingTop: 80, paddingBottom: 80, paddingLeft: 50, paddingRight: 50 }}>
        //             <div className='flex-column items-center'>
        //                 <Button
        //                     size='large'
        //                     style={{
        //                         color: '#fff',
        //                         borderColor: '#D0BBFE',
        //                         backgroundColor: '#D0BBFE',
        //                         borderRadius: 8
        //                     }}>
        //                     Features
        //                 </Button>
        //                 <br />
        //                 <div style={{ width: '45%', textAlign: 'center' }}>
        //                     <h1 style={{ fontSize: 35 }}>This is the title that need to provoke desire to use your product.</h1>
        //                 </div>
        //             </div>
        //             <br />
        //             <br />
        //             <div className='flex'>
        //                 <div className='flex items-center' style={{ width: '100%' }}>
        //                     <Card className="relative" style={{ backgroundColor: '#E7E8EC', height: 545, width: 400 }}>
        //                         <EmptyFileIcon />

        //                         <div style={{ position: 'absolute', right: -60, bottom: -50 }}>
        //                             <div className='flex'>
        //                                 <Card bordered={false} style={{ width: 350 }}>
        //                                     <Avatar size={'large'} shape={'square'} icon={null} style={{ backgroundColor: '#DD97E9' }} />
        //                                     <br />
        //                                     <br />
        //                                     <span>
        //                                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        //                                     </span>
        //                                 </Card>
        //                             </div>
        //                         </div>
        //                     </Card>
        //                 </div>
        //                 <div className='flex items-center' style={{ width: '100%' }}>
        //                     <div className="flex-column">
        //                         <div style={{ marginBottom: 20 }}>
        //                             <strong><h2>What user gets 1</h2></strong>
        //                             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        //                         </div>
        //                         <br />
        //                         <div style={{ marginBottom: 20 }}>
        //                             <strong><h2>What user gets 2</h2></strong>
        //                             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        //                         </div>
        //                         <br />
        //                         <div style={{ marginBottom: 20 }}>
        //                             <strong><h2>What user gets 3</h2></strong>
        //                             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        //                         </div>
        //                         <br />
        //                         <div style={{ marginBottom: 20 }}>
        //                             <strong><h2>What user gets 4</h2></strong>
        //                             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className='flex flex-column' style={{ minHeight: '50vh', backgroundColor: '#fff', paddingTop: 80, paddingBottom: 80, paddingLeft: 50, paddingRight: 50 }}>
        //             <div className='flex-column items-center'>
        //                 <div style={{ width: '45%', textAlign: 'center' }}>
        //                     <h1 style={{ fontSize: 35 }}>This is the ultimate emphasis that will force user to take the action.</h1>
        //                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting </p>
        //                 </div>
        //                 <div className='flex flex-row'>
        //                     <Space size={'small'}>
        //                         <Input className="inputs" placeholder="Tell us your work email" style={{ width: 300, height: 40 }} />
        //                         <Button
        //                             size='large'
        //                             style={{
        //                                 color: '#fff',
        //                                 borderColor: '#DD97E9',
        //                                 backgroundColor: '#DD97E9',
        //                                 borderRadius: 8
        //                             }}>
        //                             Call to Action
        //                         </Button>
        //                     </Space>
        //                 </div>
        //             </div>
        //         </div>
        //     </MainLayout>
        // </React.Fragment >
    )
}

export default PrivacyPolicyPage