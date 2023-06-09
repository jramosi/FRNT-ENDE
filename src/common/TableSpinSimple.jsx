import React from 'react'
import { Table, Spin } from 'antd';

const TableSpinSimple = (props) => {
    const { isLoading, columns = [], data = [] } = props
    return (
        <Spin spinning={isLoading}>
            <Table columns={columns} dataSource={data} rowKey="id" {...props}/>
        </Spin>

    )
}

export default TableSpinSimple