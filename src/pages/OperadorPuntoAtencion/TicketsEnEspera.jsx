
import { Badge, Collapse, Tag, Space } from 'antd';
import { useSocket } from '../../hooks/useSocket';

const { Panel } = Collapse;

const TicketsEnEspera = (props) => {

    const { puntoAtencion } = props
    const { isConnected, data: dataSocket } = useSocket(`/channel/punto_atencion/${puntoAtencion.id}`)

    const genExtra = () => (
        <Badge
            className="site-badge-count-109 "
            count={dataSocket.length > 0 ? dataSocket.length : 0}
            style={{ backgroundColor: '#172a4f' }}
            onClick={(event) => {
                event.stopPropagation();
            }}
        />
    );

    return (
        <Collapse defaultActiveKey={['1']}>
            <Panel header="Tickets en Espera" key="1" extra={genExtra()}>
                <Space size={[8, 16]} wrap>
                    {dataSocket.map((data, index) => <Tag key={index} color="volcano">{data.numeroTicket}</Tag>)}
                </Space>
            </Panel>
        </Collapse>
    );
};

export default TicketsEnEspera;