import React from 'react';
import { Button, Steps, Card, Typography, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { usePanelOperadorDispatch, usePanelOperadorState } from '../../contexts/PanelOperadorContext';
import { useAuthState } from '../../security/authentication/AuthContext';
import PuntoAtencionSelect from './PuntoAtencionSelect';
import UbicacionConfirm from './UbicacionConfirm';
import AgenciaSelected from './AgenciaSelected';
import AgenciaSelect from './AgenciaSelect';
import types from '../../types';

const { Step } = Steps;
const { Title } = Typography;

const AsignacionPuntoAtencion = () => {

  const { withAgenciaAssigned } = useAuthState()
  const { currentStepAsignacion: current, usuarioUbicacion } = usePanelOperadorState();
 
  const steps = [
    {
      title: 'Agencia',
      content: withAgenciaAssigned ? <AgenciaSelected /> : <AgenciaSelect />,
    },
    {
      title: 'Punto de atención',
      content: <PuntoAtencionSelect />,
    },
    {
      title: 'Confirmar',
      content: <UbicacionConfirm />,
    },
  ];

  const panelDispatch = usePanelOperadorDispatch();

  const handleCancel = () => {
    panelDispatch({ type: types.cancelAssignment })
  }
  const next = () => { panelDispatch({ type: types.nextStepAsignacion }) };
  const prev = () => { panelDispatch({ type: types.prevStepAsignacion }) };

  return (
    <div >
      <Card className='card_list mt_1'>
        <Title className='text_center' level={4}>SELECCIÓN DE PUNTO DE ATENCIÓN</Title>
        <Steps className='mt_2' current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </Card>

      <div className="steps-content" >{steps[current].content}</div>

      <div className="steps-action">
        <Space size='middle'>
          {!usuarioUbicacion && <Button type="text" danger onClick={handleCancel}>Cancelar</Button>}
          {(current > 0 && usuarioUbicacion === null) && (
            <Button onClick={() => prev()} icon={<ArrowLeftOutlined />}>
              Anterior
            </Button>
          )}
        </Space>
      </div>

    </div>
  )
}

export default AsignacionPuntoAtencion