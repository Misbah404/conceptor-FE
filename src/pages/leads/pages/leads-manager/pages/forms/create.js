import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Input, Card, Button, Alert, Select } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { countryState } from '../../../../constants/country-state'

const { TextArea } = Input;
const { Option } = Select;

const LeadsManager = () => {

    const { http } = global.services

    const company = useSelector(state => state.CompanyReducer.selected_company)

    const [form, setForm] = useState({})
    const [types, setTypes] = useState([])

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const history = useHistory()

    useEffect(() => {
        init()
        initTypes()
    }, [company])

    const init = () => {
        setForm({
            email: "",
            contact_number: "",
            is_recommended: 0,
            user_notes: '',
            recommended_lead_notes: '',
            state: '',
            country: ''
        })
    }

    const initTypes = async () => {
        let { data } = await http.get('communication', {
            user_company_id: company.id
        })
        setTypes(data)
    }

    const change = props => (e) => {
        let data = { ...form }
        data[props] = e.target.value
        setForm(data)
    }

    const select = props => val => {
        let data = { ...form }
        if (props === 'country')
            data['state'] = ''
        data[props] = val
        setForm(data)
    }

    const submit = async () => {
        let params = {
            ...form,
            user_company_id: company.id,
            company_name: company.company_name
        }

        try {
            let { data } = await http.post(`user-lead`, params);
            init()
            setSuccess(true)
            setError(false)

            setTimeout(() => {
                history.push('/leads-manager')
            }, 500)
        } catch (err) {
            setError(true)
        }
    }

    const states = countryState[form.country]

    return (
        <React.Fragment>
            <strong>
                <h2>Create Leads</h2>
            </strong>
            {success && <Alert message="Successfully saved" type="success" closable />}
            {error && <Alert message="Fill all required fields!" type="error" closable />}
            <br />
            <Card bordered={false}>
                <div style={{ marginBottom: 20 }}>
                    <p>Name *</p>
                    <Input
                        value={form.lead_name}
                        placeholder="Enter name"
                        className='inputs'
                        onChange={change('lead_name')}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <p>Url *</p>
                    <Input
                        value={form.url}
                        className='inputs'
                        placeholder="e.g https://www.example.com"
                        onChange={change('url')}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <p>Contact Number</p>
                    <Input
                        type='number'
                        value={form.contact_number}
                        className='inputs'
                        placeholder="Enter contact number"
                        onChange={change('contact_number')}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <p>Email</p>
                    <Input
                        type="email"
                        value={form.email}
                        className='inputs'
                        placeholder="Enter email"
                        onChange={change('email')}
                    />
                </div>
                {/* <div style={{ marginBottom: 20 }}>
                    <p>Location *</p>
                    <Input
                        value={form.location}
                        className='inputs'
                        placeholder="Enter location"
                        onChange={change('location')}
                    />
                </div> */}
                <div style={{ marginBottom: 20 }}>
                    <p>Country *</p>
                    <Select
                        className="dropdown"
                        defaultValue={form.country}
                        value={form.country}
                        style={{ width: '100%' }}
                        onChange={select('country')}
                    >
                        {Object.keys(countryState).map((value) => {
                            return (
                                <Option value={value}>{value}</Option>
                            );
                        })}                        
                        {/* <Option value="USA">USA</Option> */}
                    </Select>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <p>State *</p>
                    <Select
                        className="dropdown"
                        defaultValue={form.state}
                        value={form.state}
                        style={{ width: '100%' }}
                        onChange={select('state')}
                    >
                        {states?.map((value) => {
                            return (
                                <Option value={value}>{value}</Option>
                            );
                        })}                                                                                             
                    </Select>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <p>Status *</p>
                    <Select
                        className="dropdown capitalize"
                        defaultValue={form.status}
                        value={form.status}
                        style={{ width: '100%' }}
                        onChange={select('status')}
                    >
                        {types.map((type, index) => (
                            <Option key={index} value={type.status} className="capitalize">{type.status}</Option>
                        ))}
                    </Select>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <p>Custom user notes</p>
                    <TextArea className='inputs' value={form.user_notes} onChange={change('user_notes')}></TextArea>
                </div>
            </Card>
            <div className='spacer'></div>
            <div className='flex'>
                <div className='flex-1'></div>
                <Button className='btn btn-primary' onClick={submit}>
                    Submit
                </Button>
            </div>
        </React.Fragment>
    )
}

export default LeadsManager