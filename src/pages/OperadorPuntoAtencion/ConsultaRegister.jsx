import React, { useEffect } from 'react'
import { Form, Col, Row, Button, Input } from 'antd';

import { useAtencionDispatch, useAtencionState } from '../../contexts/AtencionContext';
import { fieldsFormConsulta, initialFormConsulta } from './fieldsClienteRegister';
import { createConsultaCliente } from '../../services/ConsultaService';
import { notifySimple } from '../../common/NotifyToast';
import GenerateField from '../../common/GenerateField';
import types from '../../types';

const ConsultaRegister = () => {

    const [form] = Form.useForm();
    const { clienteCurrent, consultaCurrent } = useAtencionState();
    const attentionDispatch = useAtencionDispatch();

    useEffect(() => {
        if (consultaCurrent) { form.setFieldsValue({ ...consultaCurrent }) }
        else { form.setFieldsValue(initialFormConsulta) }
    }, [consultaCurrent])

    const handleSubmitForm = async (values) => {
        values.idCliente = clienteCurrent.id
        const { data: consulta, error, message } = await createConsultaCliente(values)
        if (!error) {
            attentionDispatch({ type: types.consultaRegistered, consulta })
            notifySimple('success', message)
        } else {
            notifySimple('error', message)
        }
    }

    if (!clienteCurrent) return <></>

    return (
        <Form
            form={form}
            layout="vertical"
            name="form_consulta"
            onFinish={handleSubmitForm}
            className='animate__animated animate__fadeInUp'
            initialValues={{ ...initialFormConsulta }}
        >
            <Row gutter={16}>
                <Col span={24}>
                    {fieldsFormConsulta.map((field, index) => <GenerateField field={field} />)}
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={consultaCurrent}>
                    Guardar Consulta
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ConsultaRegister