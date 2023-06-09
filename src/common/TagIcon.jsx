import React from 'react'
import { Tag } from 'antd';

const TagIcon = (props) => {
    const {  label = '', icon, color = 'blue' ,style=''} = props
    return (
        <Tag className={style} icon={icon} color={color} style={{ fontSize: 16, padding: 3 }}>
            {label}
        </Tag >
    )
}

export default TagIcon
