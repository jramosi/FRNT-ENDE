import React, { useEffect, useState } from 'react'
import { Card, Form, Divider, Row, Col, Spin } from 'antd';

import fieldsForm, { fieldsFormRol, fieldsFormUser } from './fieldsFormUsuario';
import { ButtonFloatingEdit } from '../../common/ButtonFloatingEdit';
import ButtonFloatingSubmit from '../../common/ButtonFloatingSubmit';
import { updateUsuarioRole } from '../../services/UsuarioService';
import GenerateField from '../../common/GenerateField';
import { notifySimple } from '../../common/NotifyToast';
import { getIds, isObject } from '../../util/helpers';

const UsuarioEdit = (props) => {

    const { dataUsuario, loading, error, handleData } = props
    const [form] = Form.useForm();
    const [loadingForm, setLoadingForm] = useState(false)
    const [disabledForm, setDisabledForm] = useState(true)

    useEffect(() => {
        if (isObject(dataUsuario) && !error) {
            form.setFieldsValue({
                ...dataUsuario, ['idTipoUsuario']: dataUsuario['tipoUsuario'].id, roles: getIds(dataUsuario.roles, 'id')
            });
        }
    }, [dataUsuario])

    const handleSubmitForm = async (values) => {
        setLoadingForm(true)

        /**Actualizamos datos del usuario */
        values.id = dataUsuario.id
        const { data: dataUsuarioEdit, error: errorUsuarioEdit, message: messageUsuarioEdit } = await updateUsuarioRole(values)
        setLoadingForm(false)
        setDisabledForm(true)
        if (!errorUsuarioEdit) {
            handleData()
            notifySimple('success', messageUsuarioEdit)
        } else {
            notifySimple('error', messageUsuarioEdit)
        }
    }

    const handleEdit = (edit) => {
        //TODO:Adicionar la logica al momento de cancelar la edicion, para volver al formulario original 
        setDisabledForm(edit)
    }

    return (
        <>
            <ButtonFloatingEdit handleEdit={handleEdit} edit={disabledForm} />

            <Spin spinning={loading} tip="Obteniendo datos...">
                <Card className='card_list '>
                    <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal_create_simple"
                        onFinish={handleSubmitForm}
                        disabled={disabledForm}
                    >
                        {!disabledForm && <ButtonFloatingSubmit loading={loadingForm} label='Actualizar' />}

                        <Divider orientation="left" plain>Datos de usuario</Divider>
                        <Row justify="" gutter={24} >
                            {fieldsFormUser.map(field =>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12} key={field.name}>
                                    <GenerateField field={field} disabled={disabledForm}/>
                                </Col>
                            )}
                        </Row>
                        <Row justify="" gutter={24} >
                            {fieldsFormRol.map(field =>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} key={field.name}>
                                    <GenerateField field={field} disabled={disabledForm}/>
                                </Col>
                            )}
                        </Row>

                        <Divider orientation="left" plain>Datos personales</Divider>
                        <Row justify="" gutter={24} >
                            {fieldsForm.map(field =>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12} key={field.name}>
                                    <GenerateField field={field} disabled={disabledForm}/>
                                </Col>
                            )}
                        </Row>
                    </Form>
                </Card>
            </Spin>
        </>
    )
}

export default UsuarioEdit