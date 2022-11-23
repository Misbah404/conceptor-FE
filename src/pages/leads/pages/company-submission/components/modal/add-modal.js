import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const AddModal = ({ title, show, onSubmit, onClose, ...props }) => {

    return (
        <Modal
            title="Add Company"
            visible={show}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" onClick={onSubmit}>
                    Create
                </Button>
            ]}
        >
            {props.children}
        </Modal >
    );
};

export default AddModal