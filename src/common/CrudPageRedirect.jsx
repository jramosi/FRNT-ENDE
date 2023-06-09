import { Button, PageHeader, Card, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import ButtonIconRedirectById from './ButtonIconRedirectById';
import { addItemtoArrayOnce } from '../util/helpers';
import { useData } from '../hooks/useQueryData';
import TableSpinSimple from './TableSpinSimple';
import RedirectTo from './RedirectTo';
import Loading from './Loading';

const TableLoading = (props) => {
    const { data, columnsTable, actionsTable, isFetching } = props
    /**Adicionamos las acciones pordefecto a las columnas personalizadas de la tabla */
    addItemtoArrayOnce(columnsTable, actionsTable)
    return <Card className='card_list mt_1' ><TableSpinSimple columns={columnsTable} data={data} isLoading={isFetching} /></Card>
}

const CrudPageRedirect = (props) => {
    const { titleHeader = '', methodServiceList, keyQuery, columnsTable = [], redirectToNewRecord = '', redirectToRecord = '' } = props

    /**TABLA. Obteniedo los registros  */
    const { isLoading, data: dataFetch, isFetching } = useData(keyQuery, methodServiceList)

    /**TABLA. Acciones en la tabla por defecto: editar y eliminar de la tabla */
    const actionsTable = redirectToRecord !== '' ? {
        title: 'Acciones',
        key: 'action-table',
        align: 'right',
        render: (_, record) => (
            <Space size="middle">
                <ButtonIconRedirectById id={record.id} path={redirectToRecord} />
            </Space>
        ),
    } : {}

    return (
        <>
            <PageHeader
                className='card_list'
                ghost={false}
                title={titleHeader}
                extra={[
                    redirectToNewRecord !== '' ? <RedirectTo key='new-record' to={redirectToNewRecord}><Button type='primary' icon={<PlusOutlined />}>Agregar</Button></RedirectTo> : null
                ]}
            >
            </PageHeader>
            {isLoading ? <Loading /> : <TableLoading data={dataFetch.data ? dataFetch.data : []} columnsTable={columnsTable} actionsTable={actionsTable} isFetching={isFetching} />}
        </>
    )
}

export default CrudPageRedirect