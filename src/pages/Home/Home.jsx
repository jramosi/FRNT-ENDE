import React from 'react'
import { Link } from "react-router-dom";
import ROUTE from '../../constants/Routes';
import { useAuthState } from '../../security/authentication/AuthContext';
// import logo from '../../assets/logo-delpz.png'
import logo from '../../assets/img/logo-delpz-bl.png'
import { Card, Space, Typography, Button, Tooltip } from 'antd';
import { LoginOutlined, FileDoneOutlined ,FundProjectionScreenOutlined} from '@ant-design/icons';

const { Title } = Typography;
const NAME_APP = import.meta.env.VITE_APP_NAME

const Home = () => {
  const { isAuthenticated } = useAuthState()
  return (
    <div className='home_container'>
      <figure className='home_logo_container'>
        <img src={logo} alt="logo-delapaz" />
      </figure>

      <Space direction="vertical" size="middle" >
        <Title italic level={2} className='home_text'>Distribuidora De Electricidad La Paz</Title>
        <Title className='home_text' level={3}>{NAME_APP}</Title>
      </Space>

      <Space size="middle" >
        <Tooltip title="Iniciar Sesión">
          <Link to={ROUTE.LOGIN}>
            <Button shape="circle" icon={<LoginOutlined />} />
          </Link>
        </Tooltip>
        <Tooltip title="Dispensador">
          <Link to={ROUTE.DISPENSADOR}>
            <Button shape="circle" icon={<FileDoneOutlined />} />
          </Link>
        </Tooltip>
        <Tooltip title="Monitor">
          <Link to={ROUTE.MONITOR}>
            <Button shape="circle" icon={<FundProjectionScreenOutlined />} />
          </Link>
        </Tooltip>
      </Space>
    </div>
  )
}

export default Home