import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { Input, Typography } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import LeadsList from './list'

const { Title } = Typography

const LeadsContent = (props) => {

    const [search, setSearch] = useState('')

    const history = useHistory()

    const add = () => {
        history.push('/leads-manager/create')
    }

    return (
        <React.Fragment>
            <div className='flex flex-row justify-between items-center'>
                <Title level={5}>Leads List</Title>
                <div className="search-input">
                    <Input
                        value={search}
                        size={90}
                        placeholder="Search by name"
                        prefix={<SearchOutlined />}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <br />
            <LeadsList search={search} {...props} />
            <div className='spacer'></div>
            <div className="flex">
                <div className="flex-1"></div>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#605BFF" }}
                    startIcon={<AddIcon />}
                    onClick={add}
                >
                    Add New
                </Button>
            </div>

        </React.Fragment>
    )
}

export default LeadsContent