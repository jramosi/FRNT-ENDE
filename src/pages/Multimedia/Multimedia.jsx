import React, { useState } from 'react'
import { Button, Space } from 'antd';
import { PlayCircleOutlined, CheckOutlined } from '@ant-design/icons';

import fieldsForm from './fieldsForm';
import VideoPlayer from './VideoPlayer';
import CrudPage from '../../common/CrudPage';
import KEYQUERY from '../../constants/KeyQueries';
import { createMultimedia, deleteMultimedia, getAllMultimedia, updateMultimedia } from '../../services/MultimediaService';

const Multimedia = () => {
    const columnsTable = [
        {
            title: 'Código',
            dataIndex: 'codigo',
            key: 'codigo',
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
            responsive: ['md'],
        },
        {
            title: 'Reproducir',
            key: 'play',
            align: 'center',
            responsive: ['md'],
            render: (_, record) => {
                if (record.play) {
                    return <CheckOutlined style={{ fontSize: 20, color: record.play ? '#14B8A6' : '', textAlign: 'center' }} />
                }
                return <></>
            }
        },
        {
            title: 'Previa',
            key: 'ver-video',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type='text'
                        onClick={() => handleRecordSelected(record)}
                        icon={<PlayCircleOutlined style={{ fontSize: 20, color: '#14B8A6' }} />}
                    />
                </Space>
            ),
        }

    ];

    const [recordSelected, setRecordSelected] = useState(null)
    const handleRecordSelected = (record = null) => {
        setRecordSelected(record)
    }
    const appendDataToSend = { activo: true };

    return (
        <>
            <CrudPage
                titleHeader='Multimedia'
                methodServiceList={getAllMultimedia}
                methodServiceCreate={createMultimedia}
                methodServiceDelete={deleteMultimedia}
                methodServiceUpdate={updateMultimedia}
                keyQuery={KEYQUERY.MULTIMEDIA}
                columnsTable={columnsTable}
                titleModalCreate="Adicionar Multimedia"
                titleModalEdit="Editar Multimedia"
                fieldsForm={fieldsForm}
                appendData={appendDataToSend}
                fieldRelation=''
            />
            <VideoPlayer
                recordSelected={recordSelected}
                handleRecordSelected={handleRecordSelected}
            />
        </>
    )
}

export default Multimedia