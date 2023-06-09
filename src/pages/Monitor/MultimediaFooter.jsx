import React from 'react'
import { Typography } from 'antd';
import { format } from "date-fns";
import es from 'date-fns/locale/es'

import ClockMonitor from '../../common/ClockMonitor';

const { Title } = Typography;

const MultimediaFooter = () => {
    return (
        <div className='footer_default_content py_1'>
            <Title level={3} className='text_center text_light m_0 p_0'>Distribuidora de Electricidad La Paz S.A. DELAPAZ</Title>
            <Title level={3} className='text_center text_light m_0 p_0'>
                FonoLuz 800-17-3333
            </Title>
            <Title level={4} className='text_center text_light m_0 p_0'>
                {format(new Date(), " dd 'de' MMMM 'de' yyyy", { locale: es })}
            </Title>
            <ClockMonitor />
        </div>
    )
}

export default MultimediaFooter