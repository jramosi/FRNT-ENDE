import { Button, PageHeader, Card, Row, Col, Alert, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom'

import { useGetDataServiceByParam } from '../../hooks/useDataService';
import { getUsuarioById } from '../../services/UsuarioService';
import { ROLE } from '../../constants/RolPermission';
import UsuarioUbicacion from './UsuarioUbicacion';
import UsuarioRegistro from './UsuarioRegistro';
import UsuarioEdit from './UsuarioEdit';

const { Title } = Typography;

const UsuarioDetail = () => {

    const { IdParam: usuarioId } = useParams()

    /**Obtenemos datos del usuario de la bd */
    const { data: dataUsuario, message, error, status, loading, handleData } = useGetDataServiceByParam(getUsuarioById, usuarioId)

    if (error) { return <Alert message={message} type="warning" showIcon /> }

    const renderUbicacionUsuario = () => {
        /**Verificamos si el usuario cuenta con el rol de admin de agencia y/o operador */
        const role = dataUsuario.roles.filter(role => role.nameRole === ROLE.ADMINISTRATION || role.nameRole === ROLE.OPERATOR);
        if (role.length > 0) {
            return <UsuarioUbicacion dataUsuario={dataUsuario} handleData={handleData} />
        }
        return <Alert message="No corresponde para usuarios con roles distintos a Administrador de Agencia u Operador." type="warning" showIcon />

    }

    return (
        <>
            <PageHeader
                className='card_list'
                ghost={false}
                title='Detalle de usuario'
                extra={[<Button key="3" type='text' icon={<ArrowLeftOutlined />} onClick={() => window.history.back()} >Regresar</Button>]}
            />

            <Row gutter={4} className="mt_2">
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <UsuarioEdit dataUsuario={dataUsuario} loading={loading} error={error} handleData={handleData} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <Card>
                        <Title className='text_center' italic level={5}>Agencia </Title>
                        {loading ? <></> : renderUbicacionUsuario()}
                    </Card>
                    <Card className='mt_1'>
                        <Title className='text_center' italic level={5}>Registro de sesiones</Title>
                        <UsuarioRegistro usuarioId={usuarioId}/>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default UsuarioDetail