import React, { useEffect, useState } from 'react'

import { Card, Tabs } from 'antd';
import Form from '../components/form'

import DataSet from '../../../../../dataset.json'
import DataSetOutput from '../../../../../dataset_output.json'

import Button from '@mui/material/Button';

const FinancialsContent = ({
    company,
    onSubmit
}) => {

    const { financials } = DataSet

    const [state, setState] = useState({
        questions: [],
        inputs: {}
    })

    useEffect(() => {
        initQuestion()
    }, [])

    const initQuestion = () => {
        let questions = []
        let inputs = {}

        financials.map(f => {
            if (f.parent.length == 0) {
                questions.push(f)
                inputs[f.key] = null
            }
        })

        setState({
            ...state,
            questions,
            inputs
        })
    }

    const handleChange = (label, option) => {
        let data = {...state}
        let newQuestions = financials.filter(f => f.label == option.label)
        let filteredQuestions = state.questions.filter(q => q.parent.includes(label) == false)
        
        data = {
            ...state,
            questions: [...filteredQuestions, ...newQuestions],
            inputs: {...state.inputs, [label]: option.value}
        }

        newQuestions.map(nq => {
            data = {
                ...data,
                questions: data.questions,
                inputs: {
                    ...data.inputs,
                    [nq.label]: null
                }
            }
        })

        setState(data)
    }

    return (
        <Card bordered={false}>
            {state.questions.map((question, index) => {
                if (!question.options && !question.type) return null

                return (
                    <Form
                        key={`form-${index}`}
                        data={question}
                        form={state}
                        setForm={setState}
                        onChange={handleChange}
                    />
                )
            })}

            {company && (
                <Button
                    sx={{ marginTop: 5, width: "30%" }}
                    variant="outlined"
                    onClick={() => onSubmit(state.inputs)}
                >Submit Financials</Button>
            )}
        </Card>
    )
}

export default FinancialsContent