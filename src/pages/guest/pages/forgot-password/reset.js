import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Cookie from 'js-cookie'
import axios from 'axios'

import { api_base_url } from '../../../../config/api'

import * as UserProfileActions from '../../../../store/actions/user'

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Card, Input, Button, Divider, Alert } from 'antd'
import MainLayout from '../login/components/layout'

const ResetPassword = (props) => {

    const { http } = global.services
    const { uidb64, token } = useParams();

    const [accessToken, setAccessToken] = useState(null)
    const [form, setForm] = useState({
        new_password: '',
        confirm_password: '',
        showPassword: false
    })

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        (async () => {
            try {
                let { data } = await http.get(`reset-password/${uidb64}/${token}`)
                if (data.error) {
                    window.location.href = '/'
                } else {
                    setAccessToken(data.token)
                }
            } catch (err) {
                window.location.href = '/'
            }
        })()

        return () => form
    }, [token])

    const submit = async () => {
        setShowSuccessMessage(false)

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

            let { data } = await http.put(`${api_base_url}change-password`, params, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            setShowSuccessMessage(true)
            Cookie.set('role', 'leads')
            Cookie.set('token_leads', accessToken)
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
                            <div className='flex flex-column'>
                                <strong>
                                    <h1 style={{ fontSize: 25 }}>Change your password</h1>
                                </strong>
                                {showSuccessMessage && <Alert message="Password successully changed." type="success" />}
                                <br />
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
                            </div>
                        </div>
                    </Card>
                </div>
            </MainLayout>
        </React.Fragment>
    )
}

export default ResetPassword