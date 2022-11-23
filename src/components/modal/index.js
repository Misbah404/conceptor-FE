import React from 'react'
import { Modal, Button } from 'antd';

const CustomModal = ({ show, onClose, ...props }) => {

    return (
        <Modal
            visible={show}
            onCancel={onClose}
            footer={null}
            {...props}
        >
            {props.children}
        </Modal >
    )
}

export default CustomModal