import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons'

const ButtonFloatingSubmit = (props) => {

    const { loading, label = 'Guardar' } = props

    return (
        <Button
            htmlType="submit"
            className='button_success'
            type="primary"
            style={{ position: 'absolute', zIndex: 1, right: 0, border: 0 }}
            loading={loading}
            icon={<SaveOutlined />}
        >
            {label}
        </Button>
    )
}

export default ButtonFloatingSubmit