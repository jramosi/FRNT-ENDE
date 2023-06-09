import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Col, Row } from 'antd';
import { useDataMutate } from '../hooks/useQueryData';
import GenerateField from './GenerateField';
import { notifySimple } from './NotifyToast';

const ModalFormCreateSimple = (props) => {
    const { keyQuery = '', methodService = '', titleModal = '', fieldsForm = [], appendData = {} } = props
    const [form] = Form.useForm();
    const { isLoading, mutateAsync } = useDataMutate(keyQuery, methodService)

    const [visibleModal, setVisibleModal] = useState(false)

    const openModal = () => {
        setVisibleModal(true);
    }
    const closeModal = () => {
        setVisibleModal(false);
    }

    const handleCancel = () => {
        form.resetFields();
        closeModal();
    }

    const handleSubmit = () => {
        form
            .validateFields()
            .then(valuesForm => {
                handleMutateData(valuesForm);
            })
            .catch(info => {
                // console.log('Validación Fallida:', info);
            });
    }
    const handleMutateData = async (data) => {

        const dataToSend = { ...data, ...appendData };
        if (verifyFilesInData(dataToSend)) {
            dataToSend.files = data.files.file.originFileObj
        }
        const { error, message } = await mutateAsync(dataToSend);

        error ? notifySimple('error', message) : notifySimple('success', message)
        handleCancel();
    }

    const verifyFilesInData = (dataToSend) => {
        //Se verifica la existencia de la propiedad FILES(TODO:hacerlo dinamico)
        if (dataToSend.files)
            return true;
        return false;
    }

    return (
        <>
            <Button type="primary" onClick={openModal} icon={<PlusOutlined />}>
                Agregar
            </Button>
            <Modal
                open={visibleModal}
                title={titleModal}
                okText="Crear"
                cancelText="Cancelar"
                onCancel={handleCancel}
                onOk={handleSubmit}
                confirmLoading={isLoading}
                destroyOnClose={true}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal_create_simple"
                >
                    <Row justify="" gutter={24}>
                        {fieldsForm.map(field =>
                            <Col xs={{ span: 24 }} lg={{ span: 24 }} key={field.name}>
                                <GenerateField field={field} />
                            </Col>
                        )}
                    </Row>
                </Form>

            </Modal>
        </>
    )
}

export default ModalFormCreateSimple