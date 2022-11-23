import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Row, Col, Card, Space, Button, Input } from 'antd'

import AddModal from '../../../../../components/modal/add'
import ModalSuccess from '../../../../../components/modal/success'

import { LeadsManagerData } from '../../../constants/mock-list'

import AddIcon from '../../../../../assets/svgs/add'
import UsersIcon from '../../../../../assets/svgs/users'
import FileIcon from '../../../../../assets/svgs/file2'
import ChatIcon from '../../../../../assets/svgs/chat'
import SuccessCheckIcon from '../../../../../assets/svgs/success-check'

const LeadsCard = ({ data = [] }) => {

    const { http } = global.services

    const company = useSelector(state => state.CompanyReducer.selected_company)

    const [name, setName] = useState(null)
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [successModalVisible, setSuccessModalVisible] = useState(false)

    const submit = async () => {
        if (!name || (company && !company.id)) return null

        let { data } = await http.post('communication', {
                user_company_id: company.id,
                status: name
            })

        setAddModalVisible(false)
        setSuccessModalVisible(true)
    }

    const changeText = (e) => {
        setName(e.target.value)
    }

    const handleClose = () => {
        setAddModalVisible(false)
        setSuccessModalVisible(false)
    }

    return (
        <React.Fragment>
            {successModalVisible &&
                <ModalSuccess className="program-x-modal" show={successModalVisible} onClose={handleClose}>
                    <div className='program-x-modal-success-content'>
                        <SuccessCheckIcon />
                        <h1 className='title'>Successfully added</h1>
                        <Button className='btn btn-primary' type="primary" onClick={handleClose}>
                            Ok
                        </Button>
                    </div>
                </ModalSuccess>
            }

            {addModalVisible &&
                <AddModal
                    title="Add Communication Type"
                    show={addModalVisible}
                    onClose={handleClose}
                    onSubmit={submit}
                >
                    <p>Please type the name that you would like to add. </p>
                    <Input
                        value={name}
                        onChange={changeText}
                        className="inputs"
                    />
                </AddModal>
            }

            <div className='leads-card'>
                {data.map((d, i) => (
                    <div key={i} className='flex-1 flex-row leads-card-content'>
                        <Card bordered={false}>
                            <div className='flex flex-row'>
                                <div className='leads-card-icon'>
                                    {d.icon == 'users' && <UsersIcon />}
                                    {d.icon == 'file' && <FileIcon />}
                                    {d.icon == 'chat' && <ChatIcon />}
                                </div>
                                <div className='flex flex-column'>
                                    <span className='leads-card-value'>{d.value}</span>
                                    <span>{d.title}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}

                <div className='flex flex-row cursor-pointer'>
                    <Card bordered={false} onClick={() => setAddModalVisible(true)}>
                        <div className='flex flex-row items-center'>
                            <div className='leads-card-icon-add'>
                                <AddIcon />
                            </div>
                            <span>Add</span>
                        </div>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LeadsCard