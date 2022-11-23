import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Input, Avatar, Row, Col, Card } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import LeadsCard from './pages/card'
import LeadsContent from './pages/content';

const LeadsManager = () => {

    const { http } = global.services

    const company = useSelector(state => state.CompanyReducer.selected_company)

    const [state, setState] = useState({
        companies: [],
        items: [
            { title: 'New Lead', value: 0, icon: 'users' },
            { title: 'Contacted', value: 0, icon: 'file' },
            { title: 'Communicating', value: 0, icon: 'chat' }
        ]
    })

    useEffect(() => {
        initialization()
    }, [company])

    const initialization = async () => {
        if (company && !company.id) return null

        let { data } = await http.get(`user-lead`, {
            "user_company_id": company.id
        });

        const { leads, total_per_type } = data

        let list = []
        let lead = total_per_type && total_per_type['new lead'] ? total_per_type['new lead'] : 0
        let contacted = total_per_type && total_per_type.contacted ? total_per_type.contacted : 0
        let communicating = total_per_type && total_per_type.communicating ? total_per_type.communicating : 0

        leads.map((val, index) => {
            list.push({
                key: val.id,
                number: index + 1,
                ...val
            })
        })

        setState({
            ...state,
            companies: list,
            items: [
                { title: 'New Lead', value: lead, icon: 'users' },
                { title: 'Contacted', value: contacted, icon: 'file' },
                { title: 'Communicating', value: communicating, icon: 'chat' }
            ]
        })
    }

    return (
        <React.Fragment>
            <strong>
                <h2 className='dashboard-header'>Leads Details</h2>
            </strong>
            <div className='flex-1'>
                <LeadsCard 
                    data={state.items} 
                />
            </div>
            <div className='spacer'></div>
            <div className='flex-1'>
                <LeadsContent
                    companies={state.companies}
                    onReload={initialization}
                />
            </div>
        </React.Fragment>
    )
}

export default LeadsManager