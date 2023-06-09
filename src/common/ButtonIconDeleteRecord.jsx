import React from 'react'
import { Button, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useDataMutate } from '../hooks/useQueryData'
import { notifySimple } from './NotifyToast';

const ButtonIconDeleteRecord = (props) => {

    const { id, keyQuery = '', methodService } = props

    const { mutateAsync, isLoading } = useDataMutate(keyQuery, methodService)

    const confirm = async () => {
        const { error, message } = await mutateAsync(id);
        error ? notifySimple('error', message) : notifySimple('success', message)

    }
    return (
        <Popconfirm
            title="¿Estás seguro de eliminar este registro?"
            onConfirm={confirm}
        >
            <Tooltip placement="bottom" title="Eliminar">
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    disabled={isLoading}
                />
            </Tooltip>
        </Popconfirm>
    )
}

export default ButtonIconDeleteRecord