import * as React from 'react';

import { Input } from 'antd';

const TextInput = ({ type = 'text', value, onChange, ...props }) => {

    return (
        <Input
            defaultValue={value}
            type={type}
            value={value}
            placeholder=""
            className='inputs'
            onChange={onChange}
            {...props}
        />
    )
}

export default TextInput