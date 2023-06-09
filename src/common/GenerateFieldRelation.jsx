import { Form, Select, Spin, Checkbox, Row, Col, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { useGetDataService } from '../hooks/useDataService'

/*Componente para inputs con informacion de base de datos  */
const GenerateFieldRelation = (props) => {
    /**recordSelected, util para edicion */
    const { field, recordSelected } = props
    const [idSelect, setIdSelect] = useState(0)
    const [listValuesCheckBox, setListValuesCheckBox] = useState([])
    const { data, error, message, loading } = useGetDataService(field.methodService)
    useEffect(() => {
        if (idSelect > 0) {
            valuesCheckBox()
        }
    }, [idSelect])

    /**Util al realizar la edicion */
    useEffect(() => {
        if (field.type === 'selectAndCheckBox' && recordSelected !== undefined) {
            setIdSelect(recordSelected[field.name])
        }
    }, [])

    const valuesCheckBox = async () => {
        const { data, error } = await field.fieldDependet.methodService(idSelect);
        if (!error) {
            setListValuesCheckBox(data)
        }
    }

    if (loading) { return <div style={{ textAlign: 'center' }}><Spin /></div> }
    if (error) { return <p>Campo sin datos.Vuelva a intentarlo mas tarde.</p> }

    if (field.type === 'select') {
        return (
            <Form.Item label={field.label} name={field.name} rules={field.rules}>
                <Select>
                    {data?.map(option =>
                        <Select.Option value={option.id} key={option.id}>{option.descripcion}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        )
    }

    if (field.type === 'selectAndCheckBox') {
        return (
            <>
                <Form.Item label={field.label} name={field.name} rules={field.rules}>
                    <Select onChange={(value) => setIdSelect(value)}>
                        {data?.map(option =>
                            <Select.Option value={option.id} key={option.id}>{option.descripcion}</Select.Option>
                        )}
                    </Select>
                </Form.Item>
                {listValuesCheckBox.length > 0 ?
                    <Form.Item name={field.fieldDependet.name} label={field.fieldDependet.label} rules={field.rules}>
                        <Checkbox.Group>
                            <Row>
                                {listValuesCheckBox.map((item, index) => {
                                    return (
                                        <Col xs={24} key={'item-check-' + index} >
                                            <Checkbox value={item.id} style={{ lineHeight: '32px', }}>
                                                <strong>{item.nameRoleDisplay ? item.nameRoleDisplay : item.codigo}: </strong>
                                                {item.description ? item.description : item.descripcion}
                                            </Checkbox>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    : idSelect > 0 ? <Alert message="La agencia aun no cuenta con tipos de tickets asociados. " type="warning" showIcon /> : <></>
                }
            </>
        )
    }


    if (field.type === 'checkbox.group') {
        return (
            <Form.Item name={field.name} label={field.label} rules={field.rules}>
                <Checkbox.Group>
                    <Row>
                        {data.map((item, index) => {
                            return (
                                <Col xs={24} key={'item-check-' + index} >
                                    <Checkbox value={item.id} style={{ lineHeight: '32px', }}>
                                        <strong>{item.nameRoleDisplay ? item.nameRoleDisplay : item.codigo}: </strong>
                                        {item.description ? item.description : item.descripcion}
                                    </Checkbox>
                                </Col>
                            )
                        })}
                    </Row>
                </Checkbox.Group>
            </Form.Item>
        )
    }
    return (
        <></>
    )
}

export default GenerateFieldRelation