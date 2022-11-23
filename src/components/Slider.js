import * as React from 'react';

import { Slider } from 'antd';

const marks = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
}

const Range = ({ value, range = [0, 10], onChange, ...props }) => {

    return (
        <Slider
            value={value}
            step={value}
            marks={marks}
            min={1}
            max={10}
            defaultValue={value}
            onChange={onChange}
        />
    )
}

export default Range