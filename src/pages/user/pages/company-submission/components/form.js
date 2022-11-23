import * as React from 'react'

import FormControl from '@mui/material/FormControl';
import { Row } from 'antd';

import Select from '../../../../../components/Select'
import Radio from '../../../../../components/Radio'
import Checkbox from '../../../../../components/Checkbox'
import Slider from '../../../../../components/Slider'
import Input from '../../../../../components/Input'

const formType = {
    range: Slider,
    checkbox: Checkbox,
    select: Select,
    radio: Radio,
    input: Input,
    number: Input
}

const type_inputs = [
    'input',
    'number'
]

const type_options = [
    'radio',
    'checkbox',
    'select'
]

const Forms = ({ data, form, setForm, onChange }) => {
    const change = (e) => {
        let opt = {}
        let val = e.target.value
        if (val != 'none') {
            opt = data.options.filter(val => val.value == e.target.value)[0]
        }
        onChange(data.label, opt)
    }

    const changeText = props => (e) => {
        setForm({ 
            ...form, 
            inputs: {
                ...form.inputs, 
                [props]: e.target.value
            }
        })
    }

    return (
        <React.Fragment>
            <Row>
                {data.question.map((qstn, q_i) => {
                    return (
                        <p key={`question-${q_i}`}>
                            {qstn}
                        </p>
                    )
                })}
            </Row>
            <Row style={{ marginBottom: 20 }}>
                {data.type === 'range' &&
                    <FormControl sx={{ width: '40%' }} variant="outlined">
                        {React.createElement(formType[data.type], {
                            label: data.label,
                            value: 1,
                            range: [1, 10],
                            options: data.options,
                            onChange: changeText
                        })}
                    </FormControl>
                }
                {type_options.includes(data.type) &&
                    React.createElement(formType[data.type], {
                        defaultValue: 'none',
                        options: data.options,
                        onChange: change
                    })
                }
                {type_inputs.includes(data.type) &&
                    <FormControl sx={{ width: '40%' }} variant="outlined">
                        {React.createElement(formType[data.type], {
                            type: data.type == 'number' ? 'number' : 'text',
                            label: data.key,
                            value: form.inputs[data.key],
                            onChange: changeText
                        })}
                    </FormControl>
                }
            </Row>
        </React.Fragment>
    )
}

export default Forms