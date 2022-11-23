import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import axios from 'axios'

import * as UserProfileActions from '../../../../store/actions/user'

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Card, Input, Button, Divider, Alert } from 'antd'
import MainLayout from '../login/components/layout'

import AppleIcon from '../../../../assets/svgs/apple'
import GoogleIcon from '../../../../assets/svgs/google'

import { role, token_leads, token_user } from '../../../../helpers/auth'

const ForgotPasswordPage = () => {

    const { http } = global.services

    const [email, setEmail] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({})

    const submit = async () => {
        setSubmitted(true)

        if (!email) {
            return setErrors({ message: ['The email address field is required.'] })
        }

        let error = ''
        try {
            let { data } = await http.post('forgot-password', { email: email })
            if (data.error) {
                error = { message: ['The email address does not exist.'] }
            }
            setSuccess(true)
            setSubmitted(false)
        } catch (err) {
            const { data, status } = err.response
            if (status === 400) {
                error = { message: [data.error] }
            }
            setSubmitted(false)
        }

        setErrors(error || {})
    }

    return (
        <React.Fragment>
            <MainLayout>
                <div className='flex justify-center items-center'>
                    <Card bordered={false}>
                        <div className='flex-column items-center' style={{ padding: 40 }}>
                            <strong>
                                <h1 style={{ fontSize: 25 }}>Forgot Password</h1>
                            </strong>

                            <div className='flex flex-column flex-grow'>
                                <p style={{ opacity: 0.7 }}>
                                    No worries, we will send you reset instructions.
                                </p>
                                {success && (
                                    <>
                                        <Alert
                                            message="Someone from Conceptor will email you shortly"
                                            type="success"
                                        />
                                        <br />
                                    </>
                                )}
                                {errors.message && (
                                    <>
                                        <Alert message={errors.message[0]} type="error" />
                                        <br />
                                    </>
                                )}
                                <div>
                                    <span>Email address</span>
                                    <Input
                                        value={email}
                                        className="inputs"
                                        placeholder=''
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
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
                                    loading={submitted}
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </MainLayout>
        </React.Fragment>
    )
}

export default ForgotPasswordPage