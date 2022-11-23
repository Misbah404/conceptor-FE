import React, { useEffect, useState } from "react";

import { Card, Tabs } from "antd";
import Form from "../components/form";

import DataSet from "../../../../../dataset.json";
import DataSetOutput from "../../../../../dataset_output.json";

import Button from "@mui/material/Button";

const Questionaire = ({
  title,
  questions,
  sets = {},
  state = [],
  setState,
}) => {
  const handleChange = (index, label, option) => {
    let data = state;
    data[index].value = option.value;

    let newQuestions = questions.filter((g) => g.label === option.label);
    let filteredQuestions = data.filter(
      (q) => q.parent.includes(label) === false
    );

    data = [...filteredQuestions, ...newQuestions];

    setState({ ...sets, [title]: data });
  };

  const changeValue = (index, val, label) => {
    let data = state;
    data[index].value = val;

    let item = questions.filter((g) => g.label === label)[0];
    if (item) {
      if ("target" in item) {
        let filteredQuestions = data.filter(
          (q) => q.parent.includes(item["label"]) === false
        );

        if (val.includes(item["target"][0].value)) {
          let newQuestions = questions.filter(
            (g) => g.label === item["target"][0].label
          );
          data = [...filteredQuestions, ...newQuestions];
        } else {
          data = [...filteredQuestions];
        }
      }
    }

    setState({ ...sets, [title]: data });
  };

  return (
    <Card bordered={false} sx={{ width: "100%" }}>
      {state.map((question, index) => {
        console.log("q", question);
        if (!question.options && !question.type) return null;

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
        );
      })}
    </Card>
  );
};

export default Questionaire;
