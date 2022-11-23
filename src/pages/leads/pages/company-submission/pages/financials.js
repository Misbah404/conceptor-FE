import React, { useEffect, useState } from 'react'

import { Card, Col, Row, Space } from 'antd';

import Form from '../components/form'

const Financials = ({ questions, sets = {}, state = [], setState }) => {

    const handleChange = (index, label, option) => {
        let data = state
        data[index].value = option.value

        let newQuestions = questions.filter(g => g.label == option.label)
        let filteredQuestions = data.filter(q => q.parent.includes(label) == false)

        data = [...filteredQuestions, ...newQuestions]

        setState({ ...sets, financials: data })
    }

    const changeValue = (index, val) => {
        let data = state
        data[index].value = val
        setState({ ...sets, financials: data })
    }

    return (
        <React.Fragment>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="Ebitda" bordered={false}>
                            {state.map((question, index) => {
                                if ((!question.options && !question.type) ||
                                    !question.key.includes('ebitda')
                                ) return null

                                return (
                                    <Form
                                        key={`form-${index}`}
                                        index={index}
                                        data={question}
                                        form={state}
                                        setForm={setState}
                                        onChange={handleChange}
                                        onChangeInput={changeValue}
                                    />
                                )
                            })}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Expenses" bordered={false}>
                            {state.map((question, index) => {
                                if ((!question.options && !question.type) ||
                                    !question.key.includes('expenses')
                                ) return null

                                return (
                                    <Form
                                        key={`form-${index}`}
                                        index={index}
                                        data={question}
                                        form={state}
                                        setForm={setState}
                                        onChange={handleChange}
                                        onChangeInput={changeValue}
                                    />
                                )
                            })}
                        </Card>
                    </Col>
                </Row>
                <br />
                <Card bordered={false}>
                    {/* <div className='flex'> */}
                        {state.map((question, index) => {
                            if ((!question.options && !question.type) ||
                                question.key.includes('ebitda') ||
                                question.key.includes('expenses')
                            ) return null

                            return (
                                // <div className='flex-1 space-x'>
                                    <Form
                                        key={`form-${index}`}
                                        index={index}
                                        data={question}
                                        form={state}
                                        setForm={setState}
                                        onChange={handleChange}
                                        onChangeInput={changeValue}
                                    />
                                // </div>
                            )
                        })}
                    {/* </div> */}
                </Card>
            </div>
        </React.Fragment>
    )
}

export default Financials