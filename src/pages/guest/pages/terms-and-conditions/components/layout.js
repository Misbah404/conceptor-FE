import React, {useState, useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';

import { Link } from 'react-router-dom'
import { Button, Layout, Menu, Row, Col, Input } from "antd";

import Logo from "../../../../../assets/svgs/logo";
import LogoImg from "../../../../../assets/images/logo.png";
import BgLines from '../../../../../assets/svgs/bg-lines'

import Cookie from 'js-cookie'
import { Select } from 'antd';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const { Option } = Select;
const { Header, Content } = Layout;


const MainLayout = ({ state, setState, ...props }) => {
    function useOutsideAlerter(ref, setOpenNav) {
        useEffect(() => {
      
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenNav(false);
                }
            }
      
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

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

    const [openNav, setOpenNav] = useState(false);

    const open = (e) => {
        console.log('click')
        setOpenNav(true)        
        // let active = [`${e.key}`]
        // setState({ ...state, menu: active })
    }    

    const close = (e) => {
        console.log('click')
        setOpenNav(false)        
        // let active = [`${e.key}`]
        // setState({ ...state, menu: active })
    }        

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setOpenNav);   
    

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    return (
        <Layout className="landing-third-layout">
            <div className="landing-third-layout-background z-0">
                <div className="header-bg-gradient z-0"></div>
                <BgLines />
            </div>
            { isMobile ?
            <Header>

                <div className="flex flex-row items-center justify-between h-28 z-20">
                    <div className="logo">
                        <Link to="/" style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 30 }}>Conceptor</Link>
                    </div>

                    {/* Mobile Nav */}
                    {openNav ? <CloseIcon tw="w-6 h-6" className="landing-menu sm:absolute lg:invisible" onClick={close}/> : <MenuIcon tw="w-6 h-6" className="landing-menu sm:absolute lg:invisible" onClick={open}/>}                    

                    {
                        openNav &&
                        <div ref={wrapperRef} className="mobile-navlinks-container">                      
                            <nav className="items-center justify-around h-full pt-5">
                                <ul style={{ listStyle: 'none', paddingInlineStart: 0}}>                                                                            
                                    <li>
                                        <Link
                                            to={{
                                                pathname: "/",
                                                hash: "#whyAI",
                                            }}
                                            style={{ color: 'black' }}
                                        >Why A.I.?</Link>
                                    </li>        
                                    <li>
                                        <Link
                                            to={{
                                                pathname: "/",
                                                hash: "#feature",
                                            }}
                                            style={{ color: 'black' }}
                                        >Features</Link>
                                    </li>
                                    <li><Link to="/terms-and-conditions" onClick={onChangeContactState} style={{ color: 'black' }}>Contact</Link></li>    
                                    {!Cookie.get('token_leads') &&
                                        <li>
                                            <Link to="/" style={{ color: 'black' }}>Login</Link>
                                        </li>
                                    }
                                    <li>
                                        <Button className="btn btn-primary" size={"large"} onClick={onChangeTryState}>
                                            Try it out
                                        </Button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    }                                        
                </div>
            </Header>
            :
            <Header className="relative flex items-center">
                <div className="flex flex-row items-center">
                    <div className="logo">
                        <Link to="/" style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 30 }}>Conceptor</Link>
                    </div>
                </div>
                <div className="flex-1"></div>
                <div className="flex flex-row items-center">
                    <nav className="menu menu-footer">
                        <ul>
                            <li>
                                <Link
                                    to={{
                                        pathname: "/",
                                        hash: "#whyAI",
                                    }}
                                >Why A.I.?</Link>
                            </li>        
                            <li>
                                <Link
                                    to={{
                                        pathname: "/",
                                        hash: "#feature",
                                    }}
                                >Features</Link>
                            </li>
                            <li><Link to="/terms-and-conditions" onClick={onChangeContactState}>Contact</Link></li>    
                            {!Cookie.get('token_leads') &&
                                <li>
                                    <Link to="/">Login</Link>
                                </li>
                            }
                            <li>
                                <Button className="btn btn-primary" size={"large"} onClick={onChangeTryState}>
                                    Try it out
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Header>
            }            
            <Layout className="landing-third-layout">
                <Content
                    style={{
                        paddingTop: 24,
                        minHeight: '100vh',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout >

        /** second layout */
        // <Layout className="landing-layout">
        //     <Header className="flex">
        //         <div className="flex flex-row items-center">
        //             <strong>
        //                 <h1 style={{ fontSize: 20 }}>Conceptor</h1>
        //             </strong>
        //         </div>
        //         <div className="flex-1"></div>
        //         <div className="flex flex-row items-center">
        //             <nav className="menu">
        //                 <ul>
        //                     <li>
        //                         {Cookie.get('token_leads') ?
        //                             <Link to="/leads/home">
        //                                 Home
        //                             </Link>
        //                             :
        //                             <Link to="/">
        //                                 Home
        //                             </Link>
        //                         }
        //                     </li>
        //                     <li><Link to="/">About</Link></li>
        //                     <li><Link to="/">Features</Link></li>
        //                     <li><Link to="/">Contact</Link></li>
        //                     {!Cookie.get('token_leads') && <li><Link to="/login">Login</Link></li>}
        //                     <li>
        //                         <Button className="btn btn-primary" size={"large"} component={Link} to="/login">
        //                             Try it out
        //                         </Button>
        //                     </li>
        //                 </ul>
        //             </nav>
        //         </div>
        //     </Header>
        //     <Layout className="landing-layout">
        //         <Content
        //             style={{
        //                 paddingTop: 24,
        //                 minHeight: 735,
        //             }}
        //         >
        //             {props.children}
        //         </Content>
        //     </Layout>
        // </Layout >

        /** first layout */
        // <Layout className="landing-layout">
        //     <Header className="flex">
        //         <div className="flex flex-row items-center">
        //             <Logo />
        //             <strong style={{ marginLeft: 10 }}>
        //                 <h1>Conceptor</h1>
        //             </strong>
        //         </div>
        //         <div className="flex-1"></div>
        //         <div className="flex flex-row items-center">
        //             <nav className="menu">
        //                 <ul>
        //                     <li>
        //                         {Cookie.get('token_leads') ?
        //                             <Link to="/leads/home">
        //                                 <Button type="link" size="large">Home</Button>
        //                             </Link>
        //                             :
        //                             <Link to="/#">
        //                                 <Button type="link" size="large">Home</Button>
        //                             </Link>
        //                         }
        //                     </li>
        //                     <li><Button type="link" size="large">About</Button></li>
        //                     <li><Button type="link" size="large">Contact</Button></li>
        //                     <li><Button className='btn' size="large">Call to Action</Button></li>
        //                 </ul>
        //             </nav>
        //         </div>
        //     </Header>
        //     <Layout className="landing-layout">
        //         <Content
        //             style={{
        //                 paddingTop: 24,
        //                 minHeight: 735,
        //             }}
        //         >
        //             {props.children}
        //         </Content>
        //     </Layout>
        // </Layout >
    );
}

export default MainLayout;
