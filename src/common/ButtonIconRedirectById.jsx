import React from 'react'
import { Button, Tooltip } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import RedirectTo from './RedirectTo';
import { matchPathId } from '../util/helpers';

const ButtonIconRedirectById = (props) => {
  const {id,path,label=''}=props
  return (
    <Tooltip placement="bottom" title="Ver detalle" {...props}>
      <RedirectTo to={matchPathId(path,id)}>
        <Button icon={<ArrowRightOutlined />} >{label}</Button>
      </RedirectTo>
    </Tooltip>
  )
}

export default ButtonIconRedirectById