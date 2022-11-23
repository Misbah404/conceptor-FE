import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const RadioButton = ({ options, onChange, ...props }) => {

    return (
        <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={onChange}
                {...props}
            >
                {options.map((option, i) => (
                    <FormControlLabel 
                        key={`radio-option-${i}`}
                        value={option.value} control={<Radio />} 
                        label={option.value} 
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButton