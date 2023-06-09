import { List, Row, Col, PageHeader, Button, Alert, Result } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom'

import AgenciaDetailEstadoTicket from './AgenciaDetailEstadoTicket';
import { getAgenciaFull } from '../../services/AgenciaService';
import PuntoAtencionDetail from './PuntoAtencionDetail';
import { useData } from '../../hooks/useQueryData';
import KEYQUERY from '../../constants/KeyQueries';
import RedirectTo from '../../common/RedirectTo';
import ROUTE from '../../constants/Routes';
import Loading from '../../common/Loading';

const AgenciaDetail = (props) => {

    let agenciaId = 0

    /**El IdAgencia lo podemos obtener del path (admin-gral) o de props (admin agencia)*/
    const { IdParam: agenciaIdPath = null } = useParams()
    const { agenciaId: agenciaIdProps = null, withRedirect = true } = props
    if (agenciaIdPath) { agenciaId = agenciaIdPath }
    if (agenciaIdProps) { agenciaId = agenciaIdProps }

    const { isLoading, data } = useData(KEYQUERY.AGENCIA_DETAIL, () => getAgenciaFull(agenciaId), { refetchInterval: 1000 })

    if (isLoading) return <Loading />
    if (data.error) { return <Alert message={data.message} type="warning" showIcon /> }
    const { data: agenciaSelected } = data

    return (
        <>
            <PageHeader
                className='card_list mb_2'
                ghost={false}
                title={agenciaSelected.descripcion}
                extra={withRedirect ? [
                    <RedirectTo key='new-record' to={ROUTE.ADMIN_HOME}><Button type='text' icon={<ArrowLeftOutlined />}>Regresar</Button></RedirectTo>
                ] : []}
            >
            </PageHeader>

            {agenciaSelected.puntoAtencion.length > 0 ?
                <Row className='menu_content'>
                    <Col xs={24} sm={24} md={12} lg={24} xl={24} style={{ margin: '0 auto' }}>
                        <div>
                            <List
                                grid={{ gutter: 16, xs: 1, }}
                                dataSource={agenciaSelected.puntoAtencion}
                                renderItem={(puntoAtencion) => (
                                    <PuntoAtencionDetail puntoAtencion={puntoAtencion} />
                                )}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={24} xl={24} style={{ margin: '0 auto' }}>
                        <AgenciaDetailEstadoTicket agenciaId={agenciaId} />
                    </Col>
                </Row>
                :
                <Result
                    status="warning"
                    title="La agencia aún no cuenta con puntos de atención."
                />
            }

        </>
    )
}

export default AgenciaDetail