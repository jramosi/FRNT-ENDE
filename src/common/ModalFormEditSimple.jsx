import React, { useEffect, useState } from 'react'
import { Modal, Form, Col, Row } from "antd";
import { useDataMutate } from '../hooks/useQueryData';
import GenerateField from './GenerateField';
import { notifySimple } from './NotifyToast';

const ModalFormEditSimple = (props) => {

    const { keyQuery = '', methodService = '', titleModal = '', fieldsForm = [], recordSelected, handleRecordSelected, appendData = {} } = props;

    const [form] = Form.useForm();
    const { mutateAsync, isLoading } = useDataMutate(keyQuery, methodService);

    const [visibleModal, setVisibleModal] = useState(false)

    useEffect(() => {
        if (recordSelected) {
            form.setFieldsValue({
                ...recordSelected
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
        handleRecordSelected(null)
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
                // console.log('Validate Failed:', info);
            });
    }

    const handleMutateData = async (data) => {
        const dataToSend = { ...data, ...appendData, id: recordSelected.id };
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
                            <GenerateField field={field} />
                        </Col>
                    ))}
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalFormEditSimple