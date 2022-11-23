import * as React from "react";

import { Row } from "antd";
import CurrencyInput from "../../../../../components/CurrencyInput";
import PercentageInput from "../../../../../components/PercentageInput";
import Select from "../../../../../components/Select";
import Radio from "../../../../../components/Radio";
import Checkbox from "../../../../../components/Checkbox";
import Slider from "../../../../../components/Slider";
import Input from "../../../../../components/Input";
import InputTag from "../../../../../components/Input-tag";

import { textInputTypes, optionTypes } from "../../../constants/input-types";

const formType = {
  range: Slider,
  checkbox: Checkbox,
  select: Select,
  multi_select: Select,
  radio: Radio,
  input: Input,
  number: Input,
  input_tag: InputTag,
};

const Forms = ({ index, data, form, setForm, onChange, onChangeInput }) => {
  const change = (val) => {
    let opt = {};

    if (typeof data.value === "object") {
      onChangeInput(index, val, data.label);
    } else {
      if (val != "none") {
        opt = data.options.filter((o) => o.value == val)[0];
      }

      onChange(index, data.label, opt);
    }
  };

  const changeText = (e) => {
    onChangeInput(index, e.target.value);
  };

  const changeValue = (e) => {
    onChangeInput(index, e);
  };

  const changeCurrency = (e) => {
    // let val = e.target.value.replace(/[^0-9.]+/g, "");
    onChangeInput(index, e.target.value.replace(/\$|,/g, ""));
  };

  const changePercentage = (e) => {
    let val = e.target.value.replace(/[^0-9.]+/g, "");
    onChangeInput(index, val);
  };

  return (
    <React.Fragment>
      <div className="flex-1 dynamic-form" style={{ marginBottom: 20 }}>
        {data.question.map((qstn, q_i) => {
          return (
            <p key={`question-${q_i}`} className="flex-1">
              <td dangerouslySetInnerHTML={{ __html: qstn }} />
            </p>
          );
        })}

        {optionTypes.includes(data.type) && (
          <React.Fragment>
            {typeof data.value === "object"
              ? React.createElement(formType[data.type], {
                  index: index,
                  mode: "multiple",
                  value: data.value || [],
                  options: data.options,
                  onChange: change,
                })
              : React.createElement(formType[data.type], {
                  index: index,
                  value: data.value || [],
                  options: data.options,
                  onChange: change,
                })}
          </React.Fragment>
        )}

        {data.type === "range" &&
          React.createElement(formType[data.type], {
            value: data.value || 1,
            range: [1, 10],
            options: data.options,
            onChange: changeValue,
          })}

        {textInputTypes.includes(data.type) &&
          React.createElement(formType[data.type], {
            type: data.type == "number" ? "number" : "text",
            value: data.value || ``,
            onChange: changeText,
          })}

        {data.type === "currency" && (
          <CurrencyInput
            type="text"
            value={data.value || ``}
            onChange={changeCurrency}
          />
        )}

        {data.type === "percentage" && (
          <PercentageInput
            type="text"
            value={data.value || ``}
            onChange={changePercentage}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Forms;

// import * as React from 'react'

// import { Row } from 'antd';

// import Select from '../../../../../components/Select'
// import Radio from '../../../../../components/Radio'
// import Checkbox from '../../../../../components/Checkbox'
// import Slider from '../../../../../components/Slider'
// import Input from '../../../../../components/Input'

// const formType = {
//     range: Slider,
//     checkbox: Checkbox,
//     select: Select,
//     radio: Radio,
//     input: Input,
//     number: Input
// }

// const type_inputs = [
//     'input',
//     'number'
// ]

// const type_options = [
//     'radio',
//     'checkbox',
//     'select'
// ]

// const Forms = ({ index, data, form, setForm, onChange, onChangeInput }) => {
//     console.log(typeof data.value)

//     const change = (val) => {
//         let opt = {}

//         if (val != 'none') {
//             opt = data.options.filter(o => o.value == val)[0]
//         }

//         onChange(index, data.label, opt)
//     }

//     const changeText = (e) => {
//         onChangeInput(index, e.target.value)
//     }

//     const changeValue = (e) => {
//         onChangeInput(index, e)
//     }

//     return (
//         <React.Fragment>
//             <div className='flex-1' style={{ marginBottom: 20 }}>
//                 {data.question.map((qstn, q_i) => {
//                     return (
//                         <p key={`question-${q_i}`} className='flex-1'>
//                             {qstn}
//                         </p>
//                     )
//                 })}

//                 {type_options.includes(data.type) &&
//                     React.createElement(formType[data.type], {
//                         index: index,
//                         value: data.value || 'none',
//                         options: data.options,
//                         onChange: change
//                     })
//                 }

//                 {data.type === 'range' &&
//                     React.createElement(formType[data.type], {
//                         value: data.value || 1,
//                         range: [1, 10],
//                         options: data.options,
//                         onChange: changeValue
//                     })
//                 }

//                 {type_inputs.includes(data.type) &&
//                     React.createElement(formType[data.type], {
//                         type: data.type == 'number' ? 'number' : 'text',
//                         value: data.value || ``,
//                         onChange: changeText
//                     })
//                 }
//             </div>
//         </React.Fragment >
//     )
// }

// export default Forms
