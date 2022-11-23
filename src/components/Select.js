import React from 'react';

import { Select } from 'antd';

const { Option } = Select;

const Dropdown = ({ index, value, options, onChange, ...props }) => {

    return (
        <Select 
            defaultValue={value} 
            value={value} 
            style={{ width: '100%' }} 
            onChange={onChange} 
            className="dropdown"
            {...props}
        >
            {props.mode === 'undefined' && <Option value="none">None</Option>}
            {options.map((option, i) => (
                <Option 
                    key={`form-question-${index}-option-${i}`} 
                    title={typeof option.title === 'string' ? option.title : ``} 
                    value={option.value}
                >
                    {option.value}
                </Option>
            ))}
        </Select>
    )
}

export default Dropdown