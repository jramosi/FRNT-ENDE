import React, { useState } from 'react'
import { Form, Input, InputNumber, Select, Switch, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GenerateFieldRelation from './GenerateFieldRelation';

const GenerateField = (props) => {
    const { field,disabled=false,recordSelected } = props
    /**cammpo con informacion de base de datos */
    if (field.originDB) {
        return <GenerateFieldRelation field={field} recordSelected={recordSelected}/>
    }

    if (field.type == null) {
        return (
            <Form.Item label={field.label} name={field.name} rules={field.rules} >
                <Input placeholder={`Por favor ingrese: ${field.label}`} disabled={field.disabled || disabled} />
            </Form.Item>
        )
    }

    if (field.type === 'select') {
        return (
            <Form.Item label={field.label} name={field.name} rules={field.rules}>
                <Select>
                    {field.options?.map(option =>
                        <Select.Option value={option.id} key={option.id}>{option.descripcion}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        )
    }

    if (field.type === 'switch') {
        return (
            <Form.Item label={field.label} name={field.name} valuePropName={field.valuePropName} initialValue={false}>
                <Switch />
            </Form.Item>
        )
    }

    if (field.type === 'textArea') {
        return (
            <Form.Item name={field.name} label={field.label} rules={field.rules}>
                <Input.TextArea rows={6} placeholder={field.placeholder} />
            </Form.Item>
        )
    }

    if (field.type === 'number') {
        return (
            <Form.Item name={field.name} label={field.label} rules={field.rules}>
                <InputNumber min={10} max={100} style={{ width: '100%', }} />
            </Form.Item>
        )
    }

    if (field.type === 'upload') {
        const labelUploadDefault = 'Selecciona un archivo .mp4';
        const [labelUpload, setLabelUpload] = useState(labelUploadDefault);
        const handleChange = (info) => {
            if (info.file) {
                setLabelUpload(info.file.name);
            } else {
                setLabelUpload(labelUploadDefault)
            }
        }
        return (
            <Form.Item name={field.name}  label={<label style={{ color: labelUpload!==labelUploadDefault?'#14B8A6':'' }}>{labelUpload}</label>} >
                <Upload onChange={handleChange} customRequest={() => { }} showUploadList={true} fileList={[]}>
                    <Button icon={<PlusOutlined />}>Clic para cargar un archivo</Button>
                </Upload>
            </Form.Item>
        )
    }

    if (field.type === 'switch2') {
        return (
            <Form.Item label={field.label} name={field.name} valuePropName="checked" initialValue={true}>
                <Switch />
            </Form.Item>
        )
    }

    return (
        <div></div>
    )
}

export default GenerateField