import * as React from 'react';

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const InputTag = ({ type = 'text', value, onChange, ...props }) => {

    return (
        <ReactTagInput
            tags={value}
            placeholder='Type and press enter'
            onChange={onChange}
        />
    )
}

export default InputTag