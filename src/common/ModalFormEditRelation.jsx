import React, { useEffect, useState } from 'react'
import { Modal, Form, Col, Row, message } from "antd";
import { useDataMutate } from '../hooks/useQueryData';
import GenerateField from './GenerateField';
import { notifySimple } from './NotifyToast';
import { getIds } from '../util/helpers';

const ModalFormEditRelation = (props) => {
    const { keyQuery = '', methodService = '', titleModal = '', fieldsForm = [], recordSelected, handleRecordSelected, appendData = {}, fieldRelation = '' ,fieldRelationToSendAsList = false} = props;

    const [form] = Form.useForm();
    const { mutateAsync, isLoading } = useDataMutate(keyQuery, methodService);

    const [visibleModal, setVisibleModal] = useState(false)
    useEffect(() => {
        if (recordSelected) {            
            /**Valores por defecto,verificamos si el campo relacional es un array(gropucheackbox) o un select */
            form.setFieldsValue({
                ...recordSelected, [fieldRelation]: Array.isArray(recordSelected[fieldRelation]) ? getIds(recordSelected[fieldRelation], fieldRelation, true) : recordSelected[fieldRelation].id
            });
            openModal()
        }

    }, [recordSelected])

    const openModal = () => {
        setVisibleModal(true);
    }
    const closeModal = () => {
        setVisibleModal(false);
    }

    const handleCancel = () => {
        form.resetFields();
        closeModal();
        handleRecordSelected(null)
    }

    const handleSubmit = () => {
        form
            .validateFields()
            .then(valuesForm => {
                handleMutateData(valuesForm);
            })
            .catch(info => {
                // console.log('Validate Failed:', info);
            });
    }

    const handleMutateData = async (data) => {

        const dataToSend = { ...data, ...appendData, id: recordSelected.id, [fieldRelation]: fieldRelationToSendAsList?data[fieldRelation]:{ id: data[fieldRelation] } };
        const { error, message } = await mutateAsync(dataToSend);

        error ? notifySimple('error', message) : notifySimple('success', message)
        handleCancel();
    }
    return (
        <Modal
            open={visibleModal}
            title={titleModal}
            okText="Actualizar"
            cancelText="Cancelar"
            onOk={handleSubmit}
            onCancel={handleCancel}
            confirmLoading={isLoading}
            centered
            destroyOnClose={true}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Row justify="" gutter={24}>
                    {fieldsForm.map((field =>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }} key={field.name}>
                            <GenerateField field={field} recordSelected={recordSelected}/>
                        </Col>
                    ))}
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalFormEditRelation