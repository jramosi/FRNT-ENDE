import { useState } from 'react';
import { Button, PageHeader, Card, Space } from 'antd';

import { useAuthState } from '../security/authentication/AuthContext';
import ModalFormCreateRelation from './ModalFormCreateRelation';
import ButtonIconDeleteRecord from './ButtonIconDeleteRecord';
import ModalFormCreateSimple from './ModalFormCreateSimple';
import ModalFormEditRelation from './ModalFormEditRelation';
import { PERMISSION } from '../constants/RolPermission';
import ModalFormEditSimple from './ModalFormEditSimple';
import { addItemtoArrayOnce } from '../util/helpers';
import { EditOutlined } from '@ant-design/icons';
import { useData } from '../hooks/useQueryData';
import TableSpinSimple from './TableSpinSimple';
import Loading from './Loading';

const ModalEdit = (props) => {
    if (props.fieldRelation === '') { return <ModalFormEditSimple {...props} /> }
    return (<ModalFormEditRelation {...props} />)
}
const ModalCreate = (props) => {
    if (props.fieldRelation === '') { return <ModalFormCreateSimple {...props} /> }
    return (<ModalFormCreateRelation  {...props} />)
}

const TableLoading = (props) => {
    const { data, columnsTable, actionsTable, isFetching } = props
    /**Adicionamos las acciones por defecto a las columnas personalizadas de la tabla */
    addItemtoArrayOnce(columnsTable, actionsTable)
    return <Card className='card_list mt_1' ><TableSpinSimple columns={columnsTable} data={data} isLoading={isFetching} /></Card>
}
/**
 * 
 * @param  appendData object, informacion extra  al formulario para adjuntarse e la peticion
 * @param  fieldRelation string , campo con informacion de base de datos
 * @param  fieldRelationToSendAsList boolean , un recurso(input select) relacional o varios (inpu grupo de checkbox)
 * @returns 
 */
const CrudPage = (props) => {
    const { titleHeader = '', methodServiceList, methodServiceCreate, methodServiceDelete, methodServiceUpdate
        , keyQuery, columnsTable = [], titleModalCreate, titleModalEdit, fieldsForm, appendData = {}, fieldRelation = '',fieldRelationToSendAsList=false } = props

    /**Obtenmos los permisos con los que cuenta el usuario */
    const { permissions } = useAuthState()

    /**TABLA. Obteniedo los registros  */
    const { isLoading, data: dataFetch, isFetching } = useData(keyQuery, methodServiceList)

    /**TABLA. Acciones en la tabla por defecto: editar y eliminar de la tabla */
    const actionsTable = {
        title: 'Acciones',
        key: 'action-table',
        align: 'right',
        render: (_, record) => (
            <Space size="middle">
                <Button
                    onClick={() => handleRecordSelected(record)}
                    icon={<EditOutlined />}
                />
                <ButtonIconDeleteRecord
                    id={record.id}
                    keyQuery={keyQuery}
                    methodService={methodServiceDelete}
                />
            </Space>
        ),
    }

    /**EDITAR. EStado y metodo para registro seleccionado  */
    const [recordSelected, setRecordSelected] = useState(null)
    const handleRecordSelected = (record = null) => {
        setRecordSelected(record)
    }

    const filterFieldsForm = (fieldsForm, isCreate = true) => {
        return fieldsForm.filter(field => {
            // Verificar permisos 
            if (field.permission === PERMISSION.ANY || field.permission === undefined) {
                //Verificar campos de solo edicion o creacion
                if (field.onlyEdit || field.onlyCreate) {
                    if (!isCreate && field.onlyEdit)
                        return true
                    if (isCreate && field.onlyCreate)
                        return true
                    return false
                }
                return true
            }
            return permissions.includes(field.permission)
        })
    }

    return (
        <>
            <PageHeader
                className='card_list'
                ghost={false}
                title={titleHeader}
                extra={[
                    // <Search key="2"
                    //     placeholder="input search text"
                    //     allowClear
                    //     onSearch={onSearch}
                    //     style={{
                    //         width: 200,
                    //     }}
                    // />,
                    // <Button key="3" onClick={handleChangeView}>Vista</Button>,
                    <ModalCreate
                        key="modal-create"
                        keyQuery={keyQuery}
                        methodService={methodServiceCreate}
                        titleModal={titleModalCreate}
                        fieldsForm={filterFieldsForm(fieldsForm)}
                        appendData={appendData}
                        fieldRelation={fieldRelation}
                        fieldRelationToSendAsList={fieldRelationToSendAsList}
                    />
                ]}
            >
            </PageHeader>
            {isLoading ? <Loading /> : <TableLoading data={dataFetch.data ? dataFetch.data : []} columnsTable={columnsTable} actionsTable={actionsTable} isFetching={isFetching} />}
            <ModalEdit
                recordSelected={recordSelected}
                handleRecordSelected={handleRecordSelected}
                keyQuery={keyQuery}
                methodService={methodServiceUpdate}
                titleModal={titleModalEdit}
                fieldsForm={filterFieldsForm(fieldsForm, false)}
                appendData={appendData}
                fieldRelation={fieldRelation}
                fieldRelationToSendAsList={fieldRelationToSendAsList}
            />
        </>
    )
}

export default CrudPage