import React, { useEffect, useState } from 'react'
import { ClockCircleOutlined, } from '@ant-design/icons';
import { Tag } from 'antd';
import { format } from "date-fns";
import es from 'date-fns/locale/es'

/**
 * Reloj simple para la vista del monitor
 */
const ClockMonitor = () => {

    const [time, setTime] = useState("")

    useEffect(() => {
        let interval = null
        interval = setInterval(() => {
            const _time = format(new Date(), " H:mm:ss  ", { locale: es });
            setTime(_time)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='animate__animated animate__fadeInUp text_center' style={{ position: 'absolute', bottom: 5, right: 0 }}>
            <Tag icon={<ClockCircleOutlined />} color="default" style={{ fontSize: 18, padding: 3 }}>
                <span>{time}</span>
            </Tag>
        </div>
    )
}

export default ClockMonitor