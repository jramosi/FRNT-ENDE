import { Descriptions, PageHeader } from 'antd';
import { CalendarOutlined, HomeFilled } from '@ant-design/icons';
import { format } from 'date-fns'

import AgenciaTicketsEnEspera from './AgenciaTicketsEnEspera';
import TagIcon from '../../common/TagIcon';

const AgenciaDetalle = (props) => {

    const { agencia } = props
    const today = format(new Date(), 'dd/MM/yyyy');

    return (
        <PageHeader
            className='card_list mb_1'
            ghost={false}
            onBack={() => window.history.back()}
            title={agencia.descripcion}
            extra={[
                <TagIcon key='tag-icon-1' label={today} icon={<CalendarOutlined />} color='#14B8A6' />,
                <AgenciaTicketsEnEspera key='ticket-espera-2' agencia={agencia} />,
            ]}
            avatar={{ style: { backgroundColor: '#14B8A6' }, icon: <HomeFilled /> }}
        >
            <Descriptions size="small" column={1}>
                <Descriptions.Item label="Dirección">{agencia.direccion}</Descriptions.Item>
            </Descriptions>
        </PageHeader>
    )
}

export default AgenciaDetalle