import { List } from 'antd';

import { getAgencias } from '../../services/AgenciaService'
import AgenciaDetailCompact from './AgenciaDetailCompact';
import { useData } from '../../hooks/useQueryData'
import KEYQUERY from '../../constants/KeyQueries'
import Loading from '../../common/Loading';

const AdminHome = () => {

    /**Obtenemos todas las agencias cada 3 segundos */
    const { isLoading, data, isFetching } = useData(KEYQUERY.AGENCIA, getAgencias, { refetchInterval: 3000 })
    if (isLoading) return <Loading />

    return (
        <div>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={data.data}
                renderItem={(item) => (
                    <AgenciaDetailCompact item={item} />
                )}
            />
        </div>
    )
}

export default AdminHome