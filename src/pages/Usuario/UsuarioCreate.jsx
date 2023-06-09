import React, { useState } from 'react'
import { Button, PageHeader, Card, Form, Col, Row, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import fieldsForm, { fieldsFormRol, fieldsFormUser } from './fieldsFormUsuario';
import { createUsuarioUbicacion } from '../../services/UsuarioUbicacionService';
import { useAuthState } from '../../security/authentication/AuthContext';
import { createUsuario } from '../../services/UsuarioService';
import { notifySimple } from '../../common/NotifyToast';
import GenerateField from '../../common/GenerateField';
import { ROLE } from '../../constants/RolPermission';
import { matchPathId } from '../../util/helpers';
import ButtonSave from '../../common/ButtonSave';
import ROUTE from '../../constants/Routes';

const UsuarioCreate = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false)
  const { authorityCurrent, withAgenciaAssigned, agenciaAssigned } = useAuthState()

  const handleSubmitForm = async (values) => {

    setLoadingForm(true)
    //Creamos al usuario
    const { data: dataUsuario, error: errorCreateUsuario, message } = await createUsuario(values)
    setLoadingForm(false)

    if (!errorCreateUsuario) {
      /**Verificamos si el usuario que hace el registro es ADMIN DE AGENCIA */
      if (withAgenciaAssigned && authorityCurrent === ROLE.ADMINISTRATION) {
        const { error: errorUsuarioUbicacion, message: messageUsuarioUbicacion } = await createUsuarioUbicacion(
          {
            "usuario": { "id": dataUsuario.id },
            "agencia": { "id": agenciaAssigned.id },
            "activo": true
          }
        )
        if (!errorUsuarioUbicacion) {
          notifySimple('success', messageUsuarioUbicacion)
        }
        else {
          notifySimple('error', messageUsuarioUbicacion)
        }
      }
      /** */
      notifySimple('success', message)
      navigate(matchPathId(ROUTE.USUARIO_BY_ID, dataUsuario.id, true), { replace: true });
    } else {
      notifySimple('error', message)
    }

  }

  return (
    <>
      <PageHeader
        className='card_list'
        ghost={false}
        title='Usuario nuevo'
        extra={[<Button key="3" type='text' icon={<ArrowLeftOutlined />} onClick={() => window.history.back()} >Regresar</Button>]}
      />
      <Card className='card_list mt_1'>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal_create_simple"
          onFinish={handleSubmitForm}
        >
          <Divider orientation="left" plain>Datos personales</Divider>
          <Row justify="" gutter={24} >
            {fieldsForm.map(field =>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} key={field.name}>
                <GenerateField field={field} />
              </Col>
            )}
          </Row>

          <Divider orientation="left" plain>Datos de usuario</Divider>
          <Row justify="" gutter={24} >
            {fieldsFormUser.map(field =>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} key={field.name}>
                <GenerateField field={field} />
              </Col>
            )}
          </Row>
          <Row justify="" gutter={24} >
            {fieldsFormRol.map(field =>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} key={field.name}>
                <GenerateField field={field} />
              </Col>
            )}
          </Row>

          <div className='text_center mt_3'>
            <ButtonSave loading={loadingForm} />
          </div>

        </Form>
      </Card>
    </>
  )
}

export default UsuarioCreate