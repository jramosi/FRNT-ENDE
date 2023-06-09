import { useState } from 'react';
import { format } from 'date-fns'
import { Card, Table } from 'antd';
import generatePicker from "antd/es/date-picker/generatePicker";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

import Loading from '../../common/Loading'
import { ESTADO } from '../../constants/Ticket';
import KEYQUERY from '../../constants/KeyQueries'
import { useData } from '../../hooks/useQueryData'
import { getQuantityTicketByAgencia } from '../../services/TicketEstadoTicketService'

const DatePicker = generatePicker(dateFnsGenerateConfig);

const AgenciaDetailEstadoTicket = (props) => {

    const { agenciaId } = props
    const today = format(new Date(), 'yyyy-MM-dd');
    const [fecha, setFecha] = useState(today)

    const { isLoading: isLoading1, data: dataEstadosTicket } = useData(KEYQUERY.ESTADOTICKET_QUANTITY, () => getQuantityTicketByAgencia(agenciaId, fecha), { refetchInterval: 2000 })

    if (isLoading1) return <Loading />

    const { data } = dataEstadosTicket || {}

    const columns = [
        {
            title: 'codigo',
            dataIndex: 'codigoTicket',
            key: 'codigoTicket',
        },
        {
            title: 'descripcion',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'En espera',
            dataIndex: 'estadosTicket',
            key: 'esp-index',
            render: (estadosTicket, record) => {
                const found = record.estadosTicket.find(estadoTicket => estadoTicket.codigo ===ESTADO.ESPERA);
                if (found)
                    return <>{found.cantidad}</>
                return <>-</>
            }
        },
        {
            title: 'En Atención',
            dataIndex: 'estadosTicket',
            key: 'ate-index',
            render: (estadosTicket, record) => {
                let total = 0
                estadosTicket.forEach(estadoTicket => {
                    if (estadoTicket.codigo === ESTADO.ASIGNADO || estadoTicket.codigo === ESTADO.LLAMADO || estadoTicket.codigo === ESTADO.ATENDIENDO) {
                        total += estadoTicket.cantidad;
                    }
                });
                return <>{total}</>
            }
        },
        {
            title: 'Atendidos',
            dataIndex: 'estadosTicket',
            key: 'ate-index',
            render: (estadosTicket, record) => {
                const found = record.estadosTicket.find(estadoTicket => estadoTicket.codigo === ESTADO.FINALIZADO);
                if (found)
                    return <>{found.cantidad}</>
                return <>-</>
            }
        },
        {
            title: 'Anulados',
            dataIndex: 'estadosTicket',
            key: 'ate-index',
            render: (estadosTicket, record) => {
                const found = record.estadosTicket.find(estadoTicket => estadoTicket.codigo === ESTADO.ANULADO);
                if (found)
                    return <>{found.cantidad}</>
                return <>-</>
            }
        },
    ]

    const onChange = (date, dateString) => {
        setFecha(dateString ? dateString : today)
    };

    return (
        <Card>
            <DatePicker onChange={onChange} defaultValue={new Date()} />
            <Table columns={columns} dataSource={data} pagination={false} rowKey='codigo'/>
        </Card>
    )
}

export default AgenciaDetailEstadoTicket
