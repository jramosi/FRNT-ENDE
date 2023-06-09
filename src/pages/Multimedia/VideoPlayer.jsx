import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { Modal } from 'antd';

const VideoPlayer = (props) => {

    const { recordSelected, handleRecordSelected } = props
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (recordSelected) {
            showModal()
        }
    }, [recordSelected])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        handleRecordSelected();
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            width={1000}
            centered
            destroyOnClose={true}
            footer={null}
            bodyStyle={{ margin: 0, padding: 0 }}
        >
            {recordSelected ?
                <>
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        playing={true}
                        loop={true}
                        controls={true}
                        url={recordSelected.url}
                    />
                </>
                :
                <></>
            }
        </Modal>
    );
}

export default VideoPlayer