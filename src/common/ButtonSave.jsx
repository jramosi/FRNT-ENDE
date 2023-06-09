import React from 'react'
import { Button } from 'antd';

const ButtonSave = (props) => {
    const { loading, label = 'Guardar' } = props
    return (
        <Button type="primary" htmlType="submit" loading={loading}>
            {label}
        </Button>
    )
}
export default ButtonSave