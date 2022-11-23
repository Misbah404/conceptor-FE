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

const TermsAndConditionsPage = () => {

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
                        <ModalTryItOut className="program-x-modal" show={state.showTryModal} onClose={() => handleModal('showTryModal', false)}>
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
                        <ModalTryItOut className="program-x-modal" show={state.showContactModal} onClose={() => handleModal('showContactModal', false)}>
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
                        <SuccessModal show={state.showTrySuccessModal} onClose={() => handleModal('showTrySuccessModal', false)}>
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
                        <SuccessModal show={state.showContactSuccessModal} onClose={() => handleModal('showContactSuccessModal', false)}>
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
                                >Terms & Conditions</Button>
                            </div>
                            <strong>
                                <h1 style={{ fontSize: 40, letterSpacing: 2 }}>
                                    Terms & Conditions
                                </h1>
                            </strong>
                            <br />
                            <br />
                            <div className='flex flex-column text-left' style={{ width: isMobile ? 'calc(100vw - 7)': 777, margin: 13 }}>
                                <Divider />
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    Conceptor LLC Terms and Conditions
                                </p>
                                <p style={{ color: '#9197B3', textAlign: 'justify' }}>
                                    The Conceptor platform will be made available to authorised and subscribed users as per the terms and conditions of the platform.
                                </p>
                                <Divider />
                                <p style={{ color: '#605BFF', textAlign: 'justify' }}>
                                    The Platform​
                                </p>
                                <ol style={{ zIndex: 100 }}>
                                    <li style={{ color: '#9197B3', textAlign: 'justify', zIndex: 100 }}>
                                        The website <Link to={{ pathname: 'https://conceptor.ai' }} target="_blank">conceptor.ai</Link>, (the "Platform") is owned, operated, and controlled by Conceptor LLC,  who along with its associated entities, and each of their directors, affiliates, or employees (as appropriate) are referred to as “we”, “us” or “our” in these Terms of Use.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        The Platform is provided and operated by Conceptor LLC to allow Users to gather insights (collectively “Services”)
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        By opening an account to use the Services provided by Conceptor LLC, you expressly represent and warrant that you have accepted our Terms of Use, and any additional terms and conditions displayed on the Platform (including without limitation our Privacy Policy and AML-CTF Policy) as they apply from time to time.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        We grant you a non-exclusive, revocable, non-transferable licence to use the software on a server controlled by us for the sole purpose of accessing and obtaining the material on the Platform.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        We may amend, modify, add to, or delete these Terms of Use at our discretion and those amendments, modifications, additions, or deletions apply to your use of the Platform and Services as soon as they are displayed on the Platform (whether you are aware of those amendments, modifications, additions, or deletions). All subsequent transactions by you will be subject to the amended and most current Terms of Use.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        Your eligibility and use of our Platform and Services is dependent upon your country of residence. The Services provided by Conceptor AI are limited to the following jurisdiction: USA.
                                    </li>                                    
                                </ol>
                                <Divider />
                                <p style={{ color: '#605BFF', textAlign: 'justify' }}>
                                    Your Obligations
                                </p>
                                <ol>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        You warrant to us that you are a bona fide user of the Conceptor Platform and Services for the purposes of managing your companies leads and goals
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        You must not:
                                        <ol type='a'>
                                            <li>
                                                Engage in any restricted or criminal activities, including but not limited to:
                                                <ol type='i'>
                                                    <li>Terrorist Financing;</li>
                                                    <li>Money Laundering;</li>
                                                    <li>Malicious Hacking;</li>
                                                </ol>
                                            </li>
                                            <li>
                                                Knowingly or recklessly provide us with inaccurate information through the Platform
                                            </li>
                                            <li>
                                                Use Conceptor’s Platform and Services for the purpose of obtaining, processing, distributing, viewing, assessing, analysing, copying or replicating any information, methods or processes related to the Platform (including without limitation by way of data scraping, the use of collection or accumulation tools and robotic or scripted responses);
                                            </li>  
                                            <li>
                                                Reverse engineer, disassemble or otherwise attempt to construct, copy or replicate the Platform’s source code, formulas or processes;
                                            </li>
                                            <li>
                                                Interfere with the security of the Platform or the safe use of the Platform by others (including without limitation by way of distributing viruses, corrupted files or other similar software or programs that may damage the operation of any computer hardware or software or which are otherwise directed at the Website or its users);
                                            </li>  
                                            <li>
                                                Use this Platform for any purpose that is unlawful or prohibited or in a way which infringes the intellectual property rights or other rights of any person (including us);
                                            </li>
                                            <li>
                                                Knowingly or recklessly use and/or take advantage of a technical or technological error, loophole or glitch on Conceptor’s Platform and Services;
                                            </li>  
                                            <li>
                                                Use the Platform or the information contained in it for commercial purposes which are competitive to the Platform or our business or which would otherwise be detrimental or prejudicial to our interests in any way;
                                            </li>
                                            <li>
                                                Use systematic, repetitive or other related methods which are designed to generate or obtain repetitive and repeated amounts of data or other information from or to the Platform or which may otherwise place an unreasonable load on the infrastructure of the Platform;
                                            </li>  
                                            <li>
                                                Publish, post, distribute, disseminate or send ‘spam material’ or engage in any communication that is offensive, false, unlawful, defamatory, indecent, unfair or inappropriate in any way to others, which would reasonably be considered ‘spam’ or which is deliberately false, misleading, or deceptive (or likely to mislead or deceive);
                                            </li>
                                            <li>
                                                Collect or store personal data about other users of the Platform; or
                                            </li>  
                                            <li>
                                                Do anything else which may interfere with or negatively affect the operation of our Platform, Services or others users.
                                            </li>                                                                                                                                                                    
                                        </ol>
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        Any user of Conceptor’s Platform who violates or breaches our Terms of Use may have their membership and account terminated. You may also be held liable for any losses incurred by Conceptor or any other user of the Platform.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        Conceptor encourages users to report any problems or vulnerabilities with our Platform and Services by submitting a support request on our website or emailing us on info@conceptor.ai. If you notify us in good faith, we will not restrict your use of our Platform or Services.
                                    </li>                                  
                                </ol>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Termination
                                </p>
                                <ol>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        Conceptor may suspend, limit, restrict, deactivate or terminate your access to Conceptor’s Platform and Services if:
                                        <ol type='a'>
                                            <li>
                                                You gain or attempt to gain unauthorised access to the Platform or another Conceptor members account;
                                            </li>
                                            <li>
                                                There is a technical or operational difficulty;
                                            </li>  
                                            <li>
                                                You use the Conceptor Platform in order to perform illegal or criminal activities;
                                            </li>
                                            <li>
                                                Your use of the Conceptor Platform is subject to any pending investigation, litigation or government proceeding;
                                            </li>  
                                            <li>
                                                You fail to pay or fraudulently pay for any transactions;
                                            </li>
                                            <li>
                                                We are unable to support your use;
                                            </li>  
                                            <li>
                                                You breach any terms of this Terms of Use Agreement or Privacy Policy; or
                                            </li>
                                            <li>
                                                Conceptor receives a request from a law enforcement or government agency to do so.
                                            </li>                                                                                                                                                                   
                                        </ol>
                                    </li>                               
                                </ol>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Indemnity
                                </p>
                                <ol>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        To the maximum extent permitted by law, you agree to indemnify, defend and hold harmless Conceptor LLC (and each of its associated entities, directors, officers, affiliates, employees, service providers, members, representatives and agents, collectively the “Indemnified Parties”) from and against all claims, demands, actions, suits, proceedings, liabilities, losses, damages, penalties, fines, expenses and costs (including reasonable legal costs awarded by a court) which arise out of or relate to:
                                        <ol type='a'>
                                            <li>
                                                your conduct and use of our Platform and Services;
                                            </li>
                                            <li>
                                                your breach of these Terms of Use, Conceptor’s Privacy Policy and/or AML-CTF Policy;
                                            </li>  
                                            <li>
                                                your breach of any law, regulation or rule;
                                            </li>
                                            <li>
                                                your violation or breach of Conceptor’s copyright, intellectual property, trade secrets, patents, trademarks, service marks or any other proprietary right under law;
                                            </li>  
                                            <li>
                                                any information that you provide to us via our Platform and Services; or
                                            </li>
                                            <li>
                                                any damage that you may cause to our Platform and Services, to any Conceptor user or any other person or entity.
                                            </li>                                                                                                                                                                   
                                        </ol>
                                    </li> 
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        This indemnity includes without limitation, liability relating to intellectual property rights, defamation, and breaches of privacy.
                                    </li>                              
                                </ol>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Liability
                                </p>
                                <ol>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        To the maximum extent permitted by law, Conceptor does not guarantee the quality, performance or fitness for purpose of the Platform and Services or the completeness, accuracy or currency of statements, representations and information of others (including without limitation data, reports and analyses) provided via the Platform and Services and Conceptor  will not be liable to any person or entity for any direct, indirect, consequential or other loss, damage, liability, claim or expense (however caused, including due to negligence or breach of contract) which may arise out of, or in connection with, the use of the Platform and Services or the use of or reliance on information contained on or linked to the Platform and Services.
                                    </li>
                                </ol>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Use of our Platform and Services
                                </p>
                                <ol>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        The transmission of information over the Internet (including to or from the Platform) is not completely secure or error free. In particular, emails to or from us and information submitted to or accessed via this Platform may not be secure and you should use discretion in deciding what information you send to us via these means.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        Emails to and from us may undergo email filtering and virus scanning, including by third party contractors. We do not warrant that such filters and scans will be effective in removing viruses or other potentially harmful code.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        You acknowledge that you use the Platform and Services (and obtain and transmit data to it) entirely at your own risk, that it is provided on an ‘as is’ basis and that we do not make any representations or warranties as to the security, availability of our Platform and Services or that your access or use will be uninterrupted, timely or secure.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        We cannot guarantee the identity of any other user, receiver or other party you engage with.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        You must notify Conceptor immediately of any unauthorised access or use of your account, password or any other applicable breach of our Platform and Services by submitting a support request on our website.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        We may use cookies to identify your computer on our server and so we can track your use on our Platform. In some instances, cookies may collect and store personal information about you. Such personal information will only be used by us in accordance with our Privacy Policy.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        All information, graphics, data, prices, charts, video, audio and any other material (Platform Material) displayed on or available on the Platform, and all the underlying source code and software, is owned or used under license by us, except where expressly stated in these Terms of Use or elsewhere on the Platform.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        This Platform, all Platform Material and any intellectual property which vests in either of them is protected by copyright. You may download and print content from this Platform for your own personal or internal business purposes only. You must not publish, adapt, communicate to the public, distribute to third parties, amend or make any other copy of information on this Platform without our prior written consent or otherwise do anything which would infringe our intellectual property rights in the Platform or the Platform Material.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        All trademarks, registered trademarks, product names, logos and company names mentioned on this Platform are either owned by us or are displayed under licence or with permission from the owner. Those third-party marks, logos and names remain the property of their respective owners.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        Reference on the Platform to any companies, products, services, branding, offers or other information, by trade name, trademark or otherwise does not constitute or imply endorsement, sponsorship or recommendation by us or the respective trademark owner.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        Any personal information we collect about you via this Platform will only be used and disclosed by us in accordance with our Privacy Policy.
                                    </li>                                                                                                                                         
                                </ol>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    General
                                </p>
                                <ol>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        The Terms of Use published on the date you view them on the Platform supersede all prior versions.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        If any provision of the Terms of Use are held to be invalid, unenforceable or illegal for any reason, the remaining parts of the Terms of Use will be in full force and effect.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        If we are unable to perform our Services as stipulated in the Terms of Use due to circumstances out of our control, including but not limited to, change of law, regulations or policy, or an event of Force Majeure, we will not be held liable.
                                    </li>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        These Terms of Use are governed by the laws of the State of Florida and in the event that we have a legal dispute relating to this Platform or these Website Terms and Conditions, the Courts of Florida will have non-exclusive jurisdiction.
                                    </li>                                                                                                                                        
                                </ol>
                                <Divider />
                                <p style={{ color: '#605BFF' }}>
                                    Availability
                                </p>
                                <ol>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        The Conceptor platform will be available for you to use 24 hours a day unless updates or patches are applied on the platform. In this case prior notifications will be sent out and system will be upgraded during the time that’s the least busy to avoid any service obstructions to you and your participants.
                                    </li>                                                                                                                                       
                                </ol>
                                <Divider />   
                                <p style={{ color: '#605BFF' }}>
                                    Complaints and Enquiries
                                </p>
                                <ol>
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        If you have any queries or complaints about this Privacy Statement, please lodge them to us using the email and phone options below:
                                        <ol type='a'>
                                            <li style={{ color: '#9197B3', textAlign: 'justify' }}>By email <a href='mailto:grayson@conceptor.ai'>grayson@conceptor.ai</a></li>
                                        </ol>
                                    </li>     
                                    <li style={{ color: '#9197B3', textAlign: 'justify' }}>
                                        Any complaints will be responded to within seven days. If you are not satisfied with the outcome you are entitled to contact the office of the privacy commissioner.
                                    </li>                                                                                                                                  
                                </ol>
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

export default TermsAndConditionsPage