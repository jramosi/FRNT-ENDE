import React from 'react'
import { Alert } from 'antd';

import Loading from '../../common/Loading';
import TurnosDefault from './TurnosDefault';
import HeaderWave from '../../common/HeaderWave';
import MultimediaFooter from './MultimediaFooter';
import MultimediaDefault from './MultimediaDefault';
import { getDispensadorByMac } from '../../services/DispensadorService';
import { getAllUrlsMultimedia } from '../../services/MultimediaService';
import { useGetDataService, useGetDataServiceByParam } from '../../hooks/useDataService';
import FullScreen from '../../common/FullScreen';

const MonitorDefault = ({ numeroPinLocal = null }) => {
    const { data: agencia, error: errorAgencia, loading: loadingAgencia } = useGetDataServiceByParam(getDispensadorByMac, numeroPinLocal)
    const { data: urlsVideos = [], error, loading } = useGetDataService(getAllUrlsMultimedia)

    if (loadingAgencia) { return <Loading /> }
    if (errorAgencia) { return <Alert message="Error al obtener datos de la Agencia" type="error" showIcon /> }

    return (
        <section className='monitor_default_container'>
            <TurnosDefault agencia={agencia} />
            <FullScreen />
            <section className='multimedia_default_content '>
                <div className='wave_container_monitor_default' style={{ background: 'rgba(0, 0, 0, 0)' }}>
                    <HeaderWave agenciaDescripcion={agencia.descripcion} monitor={true} />
                </div>
                {urlsVideos.length > 0 ? <MultimediaDefault urlsVideos={urlsVideos} /> : <></>}
                {urlsVideos.length > 0 ? <MultimediaFooter /> : <></>}
            </section>
        </section>
    )
}

export default MonitorDefault