import { Table, Button ,Alert} from 'antd';
import { RedoOutlined } from '@ant-design/icons';

import { usuarioRegistroByIdUser } from '../../services/UsuarioRegistroService'
import KEYQUERY from '../../constants/KeyQueries'
import { useData } from '../../hooks/useQueryData'
import Loading from '../../common/Loading'

const UsuarioRegistro = (props) => {

    const { usuarioId } = props

    const { isLoading, data,  refetch } = useData(KEYQUERY.USUARIO_REGISTRO, () => usuarioRegistroByIdUser(usuarioId))
    if (isLoading) { return <Loading /> }
    //TODO:agregar error para 404 
    if (data.error) { return <Alert message={data.message} type="info" showIcon /> }
    
    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'fechaRegistro',
            key: 'fechaRegistro',
        },
        {
            title: 'Inicio',
            dataIndex: 'horaInicio',
            key: 'horaInicio',
        },
        {
            title: 'Fin',
            dataIndex: 'horaFin',
            key: 'horaFin',
        },
    ]
    return (
        <>
            <div style={{ position: 'relative' }}>
                <Button onClick={refetch} shape="circle" icon={<RedoOutlined />} size='middle' style={{ marginTop: '-10px' }} />
            </div>

            <Table columns={columns} dataSource={data.data} rowKey="id"/>
        </>
    )
}

export default UsuarioRegistro