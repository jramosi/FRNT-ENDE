
import { Button, Col, Drawer, Form, Row, Space } from 'antd';

import { useAtencionDispatch, useAtencionState } from '../../contexts/AtencionContext';
import { fieldsFormCliente, initialFormCliente } from './fieldsClienteRegister';
import { createCliente } from '../../services/ClienteService';
import { notifySimple } from '../../common/NotifyToast';
import GenerateField from '../../common/GenerateField';
import ConsultaRegister from './ConsultaRegister';
import types from '../../types';
import { useEffect } from 'react';


const ClienteRegister = () => {
  const [form] = Form.useForm();
  const { openRegister, ticketCurrent, clienteCurrent } = useAtencionState();
  const attentionDispatch = useAtencionDispatch();

  useEffect(() => {
    if (clienteCurrent) {
      form.setFieldsValue({ ...clienteCurrent })
    }
    else {
      form.setFieldsValue(initialFormCliente)
    }
  }, [clienteCurrent])

  const onClose = () => {
    attentionDispatch({ type: types.openRegister, open: false })
  };

  const handleSubmit = async (values) => {
    const { data: cliente, error, message } = await createCliente({ ...values, idTicket: ticketCurrent.idTicket })
    if (!error) {
      attentionDispatch({ type: types.clienteRegistered, cliente })
      notifySimple('success', message)
    } else {
      notifySimple('error', message)
    }
  };

  return (
    <Drawer
      title="Registro del cliente"
      width={500}
      onClose={onClose}
      open={openRegister}
      bodyStyle={{
        paddingBottom: 80,
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" form="myFormCliente" key="submit" htmlType="submit" hidden={clienteCurrent}>Registrar</Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
        id="myFormCliente"
        initialValues={{ ...initialFormCliente }}
      >
        <Row gutter={16}>
          <Col span={24}>
            {fieldsFormCliente.map((field, index) => <GenerateField key={index} field={field} />)}
          </Col>
        </Row>
      </Form>
      <ConsultaRegister />
    </Drawer>
  );
};

export default ClienteRegister;