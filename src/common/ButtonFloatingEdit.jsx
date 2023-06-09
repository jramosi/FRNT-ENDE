import { Button, Tooltip } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

export const ButtonFloatingEdit = (props) => {

    const { handleEdit, edit } = props

    if (!edit) {
        return (
            <Tooltip title="Cancelar">
                <Button
                    danger
                    shape="circle"
                    icon={<CloseOutlined />}
                    onClick={() => handleEdit(true)}
                    style={{ position: 'absolute', zIndex: 1, right: 5 }}
                />
            </Tooltip>
        )
    }

    return (
        <Tooltip title="Editar">
            <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                size='large'
                onClick={() => handleEdit(false)}
                style={{ position: 'absolute', zIndex: 1, right: 5 }}
            />
        </Tooltip>
    )
}
