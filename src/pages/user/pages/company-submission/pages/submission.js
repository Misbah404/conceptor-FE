import React, { useState } from 'react';
import { Card, Button, Typography } from 'antd';

import Input from '../../../../../components/Input'

import FormControl from '@mui/material/FormControl';
import AddModal from '../components/modal/add-modal';

const { Text } = Typography;

const CompanySubmission = ({ company, setCompany }) => {

    const [name, setName] = useState(null)

    const [isModalVisible, setIsModalVisible] = useState(false);

    const changeStateModal = () => {
        setIsModalVisible(!isModalVisible)
    }

    const changeText = props => (e) => {
        setName(e.target.value)
    }

    const submit = () => {
        if (name) {
            setName(null)
            setCompany(name)
            changeStateModal()
        }
    }

    const onDelete = () => {
        setCompany(null)
    }

    return (
        <div className='flex-1'>
            <AddModal
                title="Form"
                show={isModalVisible}
                onClose={changeStateModal}
                onSubmit={submit}
            >
                <p>Please type the name of the comapny that you would like to add. </p>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <Input
                        label="name"
                        value={name}
                        onChange={changeText}
                        error={name ? false : true}
                        id={name ? "standard-textarea" : "standard-error"}
                        variant="standard"
                    />
                </FormControl>
            </AddModal>

            <Card bordered={false} style={{ width: '100%' }}>
                <p className="font-semibold">Company Submission</p>

                <Button type="primary" onClick={changeStateModal}>Add Company</Button>
                <Button onClick={onDelete} danger>Delete Company</Button>
                <div className="spacer"></div>
                {company &&
                    <div className="flex flex-row mt-8 space-x-2">
                        <Text type="danger">* </Text>
                        <Text>{company}</Text>
                    </div>
                }
            </Card>
        </div>
    )
}

export default CompanySubmission