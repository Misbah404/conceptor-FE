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
import Logo from '../../../../assets/images/logo-landing.png'
import EmptyFileIcon from '../../../../assets/svgs/empty-file'
import ExampleImg from '../../../../assets/images/augmented-example.png'
import AIPageImg from '../../../../assets/images/ai-rec.png'
import LeadsPageImg from '../../../../assets/images/leads-page.png'
import BgLinesTwo from '../../../../assets/svgs/bg-lines-2'
import BgLinesThree from '../../../../assets/svgs/bg-lines-3'
import MotionVideo from '../../../../assets/video/Motion.mp4'
// import MotionVideo from '../../../../assets/video/Conceptor.mp4'

import AILoader from '../../../../assets/images/loader.gif'

const { TextArea } = Input;

const LandingPage = () => {

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

                    <div className={`${isMobile ? "flex-1 items-center text-center" : "flex min-h-screen landing-third-layout-first-section"}`}>
                        <div className='footer-bg-gradient'></div>
                        <div className='flex-1'>
                            <div className='flex justify-center'>
                                <img src={Logo} style={{ width: isMobile ? 320: 450 }} />
                            </div>
                        </div>
                        <div className='flex items-center' style={{ marginBottom: 80, paddingLeft: isMobile ? 0 : 20, paddingRight: isMobile ? 0 : 20 }}>
                            <div className='relative flex-column'>
                                <h1 style={{ fontSize: 50, }}>{`Empower Your `}</h1>
                                <h1 style={{ fontSize: 50, }}>{`Investment Bank with A.I.`}</h1>
                                <div className={'dashboard-text'} style={{ maxWidth: 400 }}>
                                    <p>Our dashboard houses artificially intelligent algorithmns made to drive actionable insights</p>
                                </div>
                                <br />
                                <div>
                                    <Space>
                                        <Button
                                            size='large'
                                            className='btn btn-primary'
                                            onClick={() => handleModal('showTryModal', true)}>
                                            Try it out
                                        </Button>
                                        <Button
                                            href="#whyAI"
                                            size='large'
                                            className='btn btn-default'
                                            style={{ borderWidth: 0 }}>
                                            Why A.I.?
                                        </Button>
                                    </Space>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${isMobile ? "relative flex flex-column justify-center items-center whyAI" : "relative flex flex-column justify-center items-center whyAI"}`} id="whyAI">
                        <Button style={{
                            color: '#fff',
                            borderRadius: 8,
                            borderColor: '#BABEFF',
                            backgroundColor: '#BABEFF',
                        }}>TECHNOLOGY</Button>
                        <br />
                        <h1
                            style={{
                                fontSize: 40,
                                letterSpacing: 2
                            }}>
                            Why A.I.?
                        </h1>
                    </div>


                    <div className={`${isMobile ? "flex-1 items-center text-center":"flex justify-center min-h-screen items-center"}`}>

                    {
                        isMobile ?
                        <div dangerouslySetInnerHTML={{ __html: `
                        <video className="" width=320 height=320 playsinline autoPlay muted loop>
                        <source src=${MotionVideo} type="video/mp4" />
                    </video>  ,
                    ` }}></div>

                        :
                        <div dangerouslySetInnerHTML={{ __html: `
                        <video className="z-10" width=1200 height=1200 playsinline autoPlay muted loop>
                        <source src=${MotionVideo} type="video/mp4" />
                    </video>  ,
                    ` }}></div>
                    }

                         
                        <Card bordered={false} className={`${isMobile ? "text-center":"z-20 text-center"}`} style={{ position: isMobile ? 'inherit': 'absolute', left: isMobile ? 'auto': 25, width: isMobile ? 'auto':400,  color: '#9197B3', fontSize: 16, lineHeight: 2, backgroundColor: 'transparent' }}>
                            <span className='text-center'>
                                Artificial Intelligence (A.I.) enables us to answer questions that require human intuition. Capable of replicating everyday decision-making processes, A.I. can be taught to make predictions with tangible levels of accuracy.
                            </span>
                        </Card>  
                        <Card bordered={false} className={`${isMobile ? "text-center":"z-20 text-center"}`} style={{ position: isMobile ? 'inherit': 'absolute', right: isMobile ? 'auto': 25, width: isMobile ? 'auto':400,  color: '#9197B3', fontSize: 16, lineHeight: 2, backgroundColor: 'transparent' }}>
                            <span className='text-center'>
                                This allows us to craft intelligent systems that serve to provide intuitive answers, elegantly complimenting the knowledge of the investment banker and exponentially increasing the value of service provided to their client.
                            </span>
                        </Card> 
                    </div>

                    <div className='relative flex flex-column feature' id="feature" style={{ overflow: 'hidden' }}>
                        <div className='bg-gradient-right'></div>
                        <div className='landing-third-layout-third-section-background'>
                            <BgLinesTwo />
                        </div>

                        <div className={`${isMobile ? "relative flex flex-column items-center text-center":"relative flex flex-row"}`} style={{ paddingLeft: isMobile ? 'inherit': 30, paddingTop: 250, paddingBottom: 80 }}>
                            <div className={`${isMobile ? "flex-1 items-center text-center":"flex-1"}`}>
                                <div>
                                    <Button style={{
                                        color: '#fff',
                                        borderRadius: 8,
                                        borderColor: '#D0BBFE',
                                        backgroundColor: '#D0BBFE',
                                    }}>ABOUT PRODUCT</Button>
                                </div>
                                <div style={{ width: isMobile ? 350 : 700 }}>
                                    <h1 style={{ fontSize: isMobile ? 35 : 50 }}>Intelligent Synergy Predictor (I.S.P)</h1>
                                </div>
                                <div style={{ width: isMobile ? 350 : 400 }}>
                                    <p style={{ marginBottom: 20, textAlign: isMobile ? 'justify' : 'inherit' }}>
                                        Our starship feature is the Intelligent Synergy Predictor. This artificially intelligent algorithm provides intuitive recommendations to you and your client based on an array of factors to best suit your clients’ goals.
                                    </p>
                                    <p style={{ marginBottom: 20, textAlign: isMobile ? 'justify' : 'inherit' }}>
                                        Whether your client is looking to maximize their sale value and find those that will pay the most money or your client would like to find a strategic partner to recapitalize their business and drive growth, the I.S.P will supercharge this effort to reach you and your client’s goals.
                                    </p>
                                    <p style={{ marginBottom: 20, textAlign: isMobile ? 'justify' : 'inherit' }}>
                                        In a matter of minutes, you will have the answers you need as the program analyzes 20 potential synergistic relationships amounting to 5,000 potential synergies between your client’s company and an investor.
                                    </p>
                                </div>
                            </div>
                            {isMobile ?
                            <div className="flex-1 items-center text-center">
                                <img src={AIPageImg} width={320} height={320}/>

                                <Card bordered={false} style={{ color: '#fff', background: '#EAB8FF', width: 320, marginBottom: 5}}>
                                    <p style={{ textAlign: 'justify' }}>
                                        Switch back and forth between your covered companies to be able to immediately change gears if needed
                                    </p>
                                </Card>
                                <Card bordered={false} style={{ color: '#fff', background: '#BDC1FE', width: 320, marginBottom: 5}}>
                                    <p style={{ textAlign: 'justify'}}>
                                        Visualize the potential synergies and incentives buyers will have with your client to help you provide a strategic plan of action for them
                                    </p>
                                </Card>
                            </div>   
                            :
                            <div className='flex justify-end'>
                                <div className='relative'>
                                    <img src={AIPageImg} width={640} height={640}/>

                                    <Card bordered={false} style={{ position: 'absolute', right: 50, top: -80, width: 250, color: '#fff', background: '#EAB8FF', }}>
                                        <p style={{ textAlign: 'justify' }}>
                                            Switch back and forth between your covered companies to be able to immediately change gears if needed
                                        </p>
                                    </Card>
                                    <Card bordered={false} style={{ position: 'absolute', left: -50, bottom: 50, width: 300, color: '#fff', background: '#BDC1FE' }}>
                                        <p style={{ textAlign: 'justify'}}>
                                            Visualize the potential synergies and incentives buyers will have with your client to help you provide a strategic plan of action for them
                                        </p>
                                    </Card>
                                </div>
                            </div>                                                     
                            }

                        </div>

                        <br />
                    </div>

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
                                >FAQS</Button>
                            </div>
                            <strong>
                                <h1 style={{ fontSize: 40, letterSpacing: 2 }}>
                                    Popular Questions
                                </h1>
                            </strong>
                            <br />
                            <br />
                            <div className='flex flex-column text-left' style={{ width: isMobile ? 350: 500, margin: isMobile ? 10: 'inherit' }}>
                                <Divider />
                                <p style={{ color: '#605BFF', textAlign: 'justify' }}>
                                    How does Conceptor AI work?
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    Conceptor AI uses advanced AI and matching algorithms to match your Company goals, attributes and financials with future Leads that you should pursue to achieve your objectives
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF', textAlign: 'justify' }}>
                                    Can I manage all my company details and leads in Conceptor AI?
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    Yes you can safely and securely create and store all your company details and leads within Conceptor AI.
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Can I add my own Leads to the AI generated Leads?
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    Yes you can manually add and manage your own leads together with the AI generated leads and keep all information together in the same place. In addition you can also keep personalised notes for each lead against your company
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Is my data secure?
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    At Conceptor AI we understand how important data security and privacy is for you and your company. We never share your private data with anyone else without your approval and also ensure its safe from hackers and malware so you can be rest assured that your data is safe with us.
                                </p>
                                <Divider />
                            </div>
                        </div>
                        <br />
                    </div>

                    <div className='relative flex items-center landing-fifth-section contact' id="contact" style={{ height: 700 }}>
                        <div style={{ position: 'absolute', right: 0, top: 20 }}>
                            <BgLinesThree />
                        </div>
                        <div className='flex-1 flex-column items-center text-center'>
                            <Button
                                size={'large'}
                                style={{
                                    color: '#fff',
                                    borderRadius: 8,
                                    borderColor: '#BABEFF',
                                    background: '#BABEFF',
                                    marginBottom: 20
                                }}
                            >YOUR QUESTIONS</Button>
                            <br />
                            <strong>
                                <h1 style={{ color: '#fff', fontSize: 40, letterSpacing: 2 }}>
                                    Need more help?
                                </h1>
                            </strong>
                            <p style={{ color: '#fff' }}>
                                Is the answer to your question missing? Get in touch with us.
                            </p>
                            <br />
                            <Button
                                size={'large'}
                                style={{
                                    color: '#000',
                                    borderRadius: 8,
                                    borderColor: '#fff',
                                    backgroundColor: '#fff',
                                    marginBottom: 20
                                }}
                                onClick={() => handleModal('showContactModal', true)}
                            >CONTACT US</Button>
                        </div>
                    </div>

                    <Footer state={state} setState={setState} />
                </section>
            </MainLayout>
        </React.Fragment>

    )
}

export default LandingPage