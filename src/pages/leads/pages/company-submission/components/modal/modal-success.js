import React from 'react'
import { Modal, Button } from 'antd';

const ModalSuccess = ({ show, onClose, ...props }) => {

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

export default ModalSuccess