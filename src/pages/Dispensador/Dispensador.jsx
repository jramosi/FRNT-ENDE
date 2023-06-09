
import { Alert } from 'antd';
import { getDispensadorByMac } from '../../services/DispensadorService';
import { useGetDataServiceByParam } from '../../hooks/useDataService';
import Loading from '../../common/Loading';
import DispensadorAgencia from './DispensadorAgencia';

/**
 * Obtencion de datos de la Agencia por medio del PIN en L.S
 * @param {numeroPinLocal} param0 
 * @returns 
 */
const Dispensador = ({ numeroPinLocal = null }) => {

    const { data: agencia, error: errorAgencia, loading: loadingAgencia } = useGetDataServiceByParam(getDispensadorByMac, numeroPinLocal)

    if (loadingAgencia) { return <Loading /> }

    if (errorAgencia && agencia != null) { return <Alert message="Error al obtener datos de la Agencia" type="error" showIcon /> }
    return (
        <DispensadorAgencia agencia={agencia} />
    )
}

export default Dispensador