import React, { useEffect, useState } from 'react'
import { ClockCircleOutlined, } from '@ant-design/icons';
import { Tag } from 'antd';

/**Cronometro con tiempo inicial de 00:00,controlado por un intervalo de tiempo en front */
const StopWatch = (props) => {
    const { start=false } = props
    const [time, setTime] = useState(0)

    useEffect(() => {
        let interval = null

        if (start) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1000)
            }, 1000)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [start])

    return (
        <div className='animate__animated animate__fadeInUp' style={{ margin: '0 auto', textAlign: 'end' }}>
            <Tag icon={<ClockCircleOutlined />} color="processing" style={{ fontSize: 18, padding: 3 }}>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>:
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            </Tag>
        </div>
    )
}

export default StopWatch