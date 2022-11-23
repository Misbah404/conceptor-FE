import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { Badge, Select, Avatar, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import LineChart from '../../../../../components/charts/line-chart'

const { Option } = Select

const FinanceReport = () => {

    const company = useSelector(state => state.CompanyReducer.selected_company)

    const [state, setState] = useState({
        loading: false,
        filter: null,
        toggle: '%'
    })

    const [expense, setExpense] = useState([])
    const [ebitda, setEbitda] = useState([])

    useEffect(() => {
        init()
    }, [company])

    const init = () => {
        setState({ ...state, loading: true })
        let ebitdaList = []
        let expenseList = []

        const { user_input } = company
        if (user_input && user_input.length > 0) {
            Object.keys(user_input[2]).map(async k => {
                if (k.includes('ebitda')) {
                    let key = await searchKey(k)
                    if (key) {
                        ebitdaList.push({
                            value: parseFloat(user_input[2][k]),
                            key
                        })
                    }
                } else if (k.includes('expenses')) {
                    let key = await searchKey(k)
                    if (key) {
                        expenseList.push({
                            value: parseFloat(user_input[2][k]),
                            key
                        })
                    }
                }
            })
        }

        setEbitda(ebitdaList)
        setExpense(expenseList)

        setTimeout(() => {
            setState({ ...state, loading: false })
        }, 1000)
    }

    const searchKey = (key) => {
        if (key.includes('year_one'))
            return 1
        else if (key.includes('year_two'))
            return 2
        else if (key.includes('year_three'))
            return 3
        else if (key.includes('year_four'))
            return 4
        else if (key.includes('year_five'))
            return 5
    }

    return (
        <div className='flex flex-coumn'>
            <div className='flex-1' style={{ height: 350 }}>
                <div className='linechart-nav'>
                    <div>
                        {/* <Space>
                            <Avatar
                                className={state.toggle == '%' ? 'toggle-inactive' : 'toggle-active'}
                                shape="square"
                                onClick={() => setState({ ...state, toggle: '$' })}
                            >%</Avatar>
                            <Avatar
                                className={state.toggle == '$' ? 'toggle-inactive' : 'toggle-active'}
                                shape="square"
                                onClick={() => setState({ ...state, toggle: '%' })}
                            >$</Avatar>
                        </Space> */}
                    </div>
                    <div>
                        <Space size={'large'}>
                            <Badge color="#5B93FF" text="Expense" />
                            <Badge color="#DD97E9" text="Ebitda" />
                        </Space>
                    </div>
                    <div>
                        <Select defaultValue="" style={{ width: 150 }}>
                            <Option value="">All time period</Option>
                        </Select>
                    </div>
                </div>

                {!state.loading && <LineChart expense={expense} ebitda={ebitda} />}
            </div>
        </div>
    )
}

export default FinanceReport