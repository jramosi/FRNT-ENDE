import React, { useEffect, useState } from 'react'
import { ClockCircleOutlined, } from '@ant-design/icons';
import { Tag } from 'antd';

/**Cronometro con tiempo definido,controlado desde back */
const StopWatchSimple = (props) => {

    const { timeCurrent = 0 } = props
    const [time, setTime] = useState(timeCurrent)

    useEffect(() => {
        if (timeCurrent) {
            setTime(timeCurrent * 1000)
        }
    }, [timeCurrent])

    return (
        <div className='animate__animated animate__fadeInUp' style={{position:'absolute',bottom:5,right:0}}>
            <Tag icon={<ClockCircleOutlined />} color="processing" style={{ fontSize: 18, padding: 3 }}>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>:
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            </Tag>
        </div>
    )
}

export default StopWatchSimple