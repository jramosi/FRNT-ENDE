import { useState } from 'react';
import { Button, Layout } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import { LOCAL_STORAGE } from '../../constants/KeyLocalStorage';
import IdentifyDevice from '../../common/IdentifyDevice';
import Dispensador from './Dispensador';

const DispensadorPanel = () => {

    const [numeroPinLocal, setNumeroPinLocal] = useState(localStorage.getItem(LOCAL_STORAGE.PIN_DISPENSADOR) || null)

    const handleQuitAgencia = () => {
        localStorage.removeItem(LOCAL_STORAGE.PIN_DISPENSADOR);
        setNumeroPinLocal(null)
    }

    return (
        <>
            {numeroPinLocal && <Button className='quit_agencia' type='text' icon={<PoweroffOutlined />} onClick={handleQuitAgencia} />}
            <Layout className="container animate__animated animate__fadeIn">
                {numeroPinLocal ?
                    <Dispensador numeroPinLocal={numeroPinLocal} />
                    :
                    <IdentifyDevice setNumeroPinLocal={setNumeroPinLocal} keyLocalStorage={LOCAL_STORAGE.PIN_DISPENSADOR} />
                }
            </Layout>
        </>
    )
}

export default DispensadorPanel

