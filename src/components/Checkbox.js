import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckBox = ({ options, onChange, ...props }) => {

    return (
        <FormGroup fullWidth>
            {options.map((opt, i) => (
                <FormControlLabel
                    key={`checkbox-option-${i}`}
                    control={
                        <Checkbox
                            value={opt.value}
                            onChange={onChange}
                        />
                    }
                    label={opt.value}
                />
            ))}
        </FormGroup>
    )
}

export default CheckBox