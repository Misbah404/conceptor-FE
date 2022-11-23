import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Cookie from 'js-cookie'
import axios from 'axios'

import * as UserProfileActions from '../../../../../store/actions/user'

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Card, Input, Button, Divider, Alert } from 'antd'
import MainLayout from '../components/layout'

import AppleIcon from '../../../../../assets/svgs/apple'
import GoogleIcon from '../../../../../assets/svgs/google'

import { role, token_leads, token_user } from '../../../../../helpers/auth'

const SetPassword = (props) => {

    const { http } = global.services
    const { token } = useParams();

    const [form, setForm] = useState({
        new_password: '',
        confirm_password: '',
        showPassword: false
    })

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        (async () => {
            let is_logged_once = Cookie.get('is_logged_once')

            if (Cookie.get('token_leads')) {
                if (typeof is_logged_once === 'undefined') {
                    window.location.href = '/leads'
                }

                if (is_logged_once) {
                    let firstTime = JSON.parse(is_logged_once)

                    if (firstTime === 1) {
                        window.location.href = '/leads'
                    }
                }
            } else {
                window.location.href = '/login'
            }
        })()

        return () => form
    }, [])

    const submit = async () => {
        let error = ''
        if (!form.new_password)
            return setErrors({ newPassword: ['The field new password is required.'] })

        if (form.new_password !== form.confirm_password)
            return setErrors({ confirmPassword: ['Confirm password did not match.'] })

        try {
            let params = {
                new_password: form.new_password,
                confirm_password: form.confirm_password,
                type: 'change'
            }

            let { data } = await http.put(`change-password`, params)

            setShowSuccessMessage(true)
            Cookie.set('token_leads', data.token)
            Cookie.set('is_logged_once', JSON.parse(1))

            setTimeout(() => {
                window.location.href = '/leads'
            }, 1000)
        } catch (err) {
            let { data, status } = err.response
            if (status === 400) {
                error = { newPassword: data.new_password }
            }
        }

        setErrors(error || {})
    }

    const change = props => e => {
        let data = { ...form }
        data[props] = e.target.value
        setForm(data)
    }

    return (
        <React.Fragment>
            <MainLayout>
                <div className='flex justify-center items-center'>
                    <Card bordered={false} style={{ width: 400 }}>
                        <div className='flex-column items-center' style={{ padding: 40 }}>
                            <strong>
                                <h1 style={{ fontSize: 25 }}>Change your password</h1>
                            </strong>
                            {showSuccessMessage && <Alert message="Password successully changed." type="success" />}
                            <br />
                            <div className='flex flex-column'>
                                <div className='flex justify-between'>
                                    <span>New Password</span>
                                </div>
                                <Input.Group compact>
                                    <Input
                                        value={form.new_password}
                                        type={form.showPassword ? "text" : "password"}
                                        className="inputs"
                                        onChange={change("new_password")}
                                        suffix={
                                            form.showPassword ?
                                                <EyeInvisibleOutlined onClick={() => setForm({ ...form, showPassword: false })} />
                                                : <EyeOutlined onClick={() => setForm({ ...form, showPassword: true })} />
                                        }
                                    />
                                </Input.Group>
                                {errors.newPassword &&
                                    <p style={{ color: 'red' }}>
                                        <em>{errors.newPassword[0]}</em>
                                    </p>
                                }
                                <br />
                                <div>
                                    <div className='flex justify-between'>
                                        <span>Confirm Password</span>
                                    </div>
                                    <Input.Group compact>
                                        <Input
                                            value={form.confirm_password}
                                            type={form.showPassword ? "text" : "password"}
                                            className="inputs"
                                            onChange={change("confirm_password")}
                                        />
                                    </Input.Group>
                                    {errors.confirmPassword &&
                                        <p style={{ color: 'red' }}>
                                            <em>{errors.confirmPassword[0]}</em>
                                        </p>
                                    }
                                </div>
                                <br />
                                <br />
                                <Button
                                    type="primary"
                                    block
                                    style={{
                                        color: '#fff',
                                        borderColor: '#605BFF',
                                        backgroundColor: '#605BFF',
                                        borderRadius: 8
                                    }}
                                    onClick={submit}
                                    disabled={showSuccessMessage}
                                >
                                    Save Password
                                </Button>
                                {/* <br />
                                <div className='text-center'>
                                    Not a member? <Link to="/signup" style={{ color: '#605BFF' }}>Sign up</Link>
                                </div> */}
                            </div>
                        </div>
                    </Card>
                </div>
            </MainLayout>
        </React.Fragment>
    )
}

export default SetPassword