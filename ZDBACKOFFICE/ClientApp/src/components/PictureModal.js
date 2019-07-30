import React from 'react';
import { Modal } from 'antd';

const PictureModal = ({ visible, onCancel, imageUrl, alt }) => {
    return (
        <Modal visible={visible} footer={null} onCancel={onCancel}>
            <img alt={alt} style={{ width: '100%' }} src={imageUrl} />
        </Modal>
    );
}

PictureModal.defaultProps = {
    alt: "图片"
}

export default PictureModal;