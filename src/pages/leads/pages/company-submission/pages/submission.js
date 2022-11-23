import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as CompanyActions from '../../../../../store/actions/company'

import { Card, Button, Typography, Badge, Space, Popconfirm } from 'antd'
import {
    PlusOutlined,
} from '@ant-design/icons';

import Input from '../../../../../components/Input'

import FormControl from '@mui/material/FormControl'
import AddModal from '../components/modal/add-modal'
import ModalSuccess from '../components/modal/modal-success'
import SuccessCheckIcon from '../../../../../assets/svgs/success-check'

const { Text } = Typography;

const CompanySubmission = ({ currentCompany, company, setCompany }) => {

    const { http } = global.services

    const [name, setName] = useState(null)
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [successDeleteModalVisible, setSuccessDeleteModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch()

    const changeText = (e) => {
        setName(e.target.value)
    }

    const submit = async () => {
        if (!name) return null

        let { data } = await http.post('user-company', {
            company_name: name
        })

        dispatch(CompanyActions.addCompany(data))
        dispatch(CompanyActions.setSelectedCompany(data))


        setName(null)
        setCompany(name)
        handleClose()
        setSuccessModalVisible(true)
    }

    const onDelete = async () => {
        let { data } = await http.delete('user-company', {
            id: currentCompany.id
        })

        setSuccessDeleteModalVisible(true)
    }

    const handleClose = () => {
        setIsModalVisible(false)
        setSuccessModalVisible(false)
        setSuccessDeleteModalVisible(false)
    }

    const reload = () => {
        window.location.reload()
    }

    return (
        <div className='flex-1'>
            {successModalVisible &&
                <ModalSuccess className="program-x-modal" show={successModalVisible} onClose={handleClose}>
                    <div className='program-x-modal-success-content'>
                        <SuccessCheckIcon />
                        <h1 className='title'>Company added</h1>
                        <p className='description'>{company}</p>
                        <Button className='btn btn-primary' type="primary" onClick={handleClose}>
                            Ok
                        </Button>
                    </div>
                </ModalSuccess>
            }

            {successDeleteModalVisible &&
                <ModalSuccess className="program-x-modal" show={successDeleteModalVisible} onClose={handleClose}>
                    <div className='program-x-modal-success-content'>
                        <SuccessCheckIcon />
                        <h1 className='title'>Company Deleted</h1>
                        <p className='description'>{currentCompany.company_name}</p>
                        <Button className='btn btn-primary' type="primary" onClick={reload}>
                            Ok
                        </Button>
                    </div>
                </ModalSuccess>
            }

            {isModalVisible &&
                <AddModal
                    title="Form"
                    show={isModalVisible}
                    onClose={handleClose}
                    onSubmit={submit}
                >
                    <p>Please type the name of the company that you would like to add. </p>
                    <Input
                        value={name}
                        onChange={changeText}
                    />
                </AddModal>
            }

            <Space size={'middle'}>
                <Button
                    type="primary"
                    className="btn btn-primary"
                    onClick={() => setIsModalVisible(true)}
                    icon={<PlusOutlined />}
                >Add Company</Button>

                {currentCompany && currentCompany.id ? (
                    <Popconfirm
                        title="Are you sure to delete this company?"
                        onConfirm={onDelete}
                        onCancel={(e) => console.log(e)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className='btn'
                            danger>Delete Company</Button>
                    </Popconfirm>
                ) : (
                    <Button
                        className='btn'
                        danger>Delete Company</Button>
                )}
            </Space>
        </div>
    )
}

export default CompanySubmission