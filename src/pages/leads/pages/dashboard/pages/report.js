import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { Badge, Select } from 'antd'

import RadialChart from '../../../../../components/charts/radial-chart'

const { Option } = Select

const Report = ({ attributes }) => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        data: [],
        meta: {
            keys: ["name", "percent", "value"],
            colors: ["#5B93FF", "#EAB8FF"]
        }
    })

    const months = moment.monthsShort()

    useEffect(() => {
        init()
    }, [attributes])

    const init = () => {
        setLoading(true)
        setState({
            ...state,
            data: [
                {
                    name: "Estimated market value",
                    value: attributes.extrinsic_input,
                    percent: (Math.floor((Math.random() * 100)) / 100).toFixed(2)
                },
                {
                    name: "Estimated real value cost",
                    value: attributes.intrinsic_input,
                    percent: (Math.floor((Math.random() * 100)) / 100).toFixed(2)
                }
            ]
        })
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    return (
        <div className='flex flex-row items-center'>
            <div className='flex flex-wrap' style={{ width: 100, height: 200 }}>
                {/* <Select defaultValue="Mar" style={{ width: 120, marginBottom: 30 }}>
                    {months.map((m, i) => (
                        <Option key={i} value={m}>{m}, 2022</Option>
                    ))}
                </Select> */}
                {state.data.map((d, i) => (
                    <div key={i}>
                        <Badge key={i} color={state.meta.colors[i]} text={d.name} style={{ marginBottom: 6 }} />
                        <strong>
                            <p>{d.value || 0}</p>
                        </strong>
                    </div>
                ))}
            </div>

            <div className='flex-1' style={{ height: "30vh" }}>
                {!loading && <RadialChart data={state.data} meta={state.meta} />}
            </div>
        </div>
    )
}

export default Report