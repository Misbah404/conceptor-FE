import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as AppActions from "../../../../store/actions/app";
import * as CompanyActions from "../../../../store/actions/company";

import { Button, Input, Avatar, Card, Tabs, Steps } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

import Questionaire from "./pages/questionaire";
import Financials from "./pages/financials";
import Submission from "./pages/submission";

import ModalSuccess from "./components/modal/modal-success";

import SuccessCheckIcon from "../../../../assets/svgs/success-check";

import DataSet from "../../../../dataset.json";

import { multipleTypes } from "../../constants/input-types";

const { Step } = Steps;
const { TabPane } = Tabs;

const CompanySubmissionPage = (props) => {
  const { http } = global.services;

  const selectedCompany = useSelector(
    (state) => state.CompanyReducer.selected_company
  );

  const [dataSet, setDataSet] = useState({});
  const [company, setCompany] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [state, setState] = useState({});

  const [currentStep, setCurrentStep] = useState(0);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setInputs([]);
    setState({});
    initQuestions();
  }, [selectedCompany]);

  const initQuestions = async () => {
    let { data } = await http.get("question");
    console.log("data", data.data);
    setDataSet(data.data);

    init(data.data);
  };

  const init = (params) => {
    let inp = [];
    let questions = {};

    const { user_input } = selectedCompany;
    console.log("user_input", user_input);
    if (user_input && user_input.length > 0) {
      Object.keys(params).map((k, index) => {
        inp[index] = {};
        questions[k] = [];
        params[k].map((q, i) => {
          let question = q;
          inp[index][q.key] = ["none"];
          if (index == 0) {
            if (question.parent.length == 0) {
              console.log("user_input[index][q.key]", user_input[index][q.key]);
              if (user_input[index][q.key]?.includes("none")) {
                if (multipleTypes.includes(q.type)) {
                  question.value = [];
                }

                questions[k].push(question);
              } else {
                if (multipleTypes.includes(q.type)) {
                  question.value = user_input[index][q.key];
                } else {
                  question.value = user_input[index][q.key][1];
                }

                questions[k].push(question);
              }
            } else {
              if (!user_input[index][q.key].includes("none")) {
                // if (multipleTypes.includes(q.type))
                //     question.value = user_input[index][q.key]
                // else
                //     question.value = user_input[index][q.key][1]
                question.value = user_input[index][q.key][1];
                questions[k].push(question);
              }
            }
          } else {
            if (user_input[index][q.key]?.includes("none")) {
              if (multipleTypes.includes(q.type)) question.value = [];

              questions[k].push(question);
            } else {
              if (multipleTypes.includes(q.type))
                question.value = user_input[index][q.key];
              else question.value = user_input[index][q.key][0];
              questions[k].push(question);
            }
          }
        });
      });
    } else {
      Object.keys(params).map((k, index) => {
        inp[index] = {};
        questions[k] = [];
        params[k].map((q) => {
          let question = q;
          inp[index][q.key] = ["none"];
          if (q.parent.length == 0) {
            questions[k].push(question);
          }
        });
      });
    }

    setState(questions);
    setInputs(inp);
  };

  // const changeInputs = (params) => {
  //     let inps = inputs
  //     let keys = Object.keys(params)

  //     inputs.map((inp, index) => {
  //         Object.keys(inp).map(k => {
  //             if (keys.includes(k)) {
  //                 if (index == 0) {
  //                     if (params[k]) {
  //                         inps[index][k] = ['block', params[k]]
  //                     }
  //                 } else {
  //                     if (params[k]) {
  //                         inps[index][k] = [params[k]]
  //                     }
  //                 }
  //             }
  //         })
  //     })

  //     setInputs(inps)
  // }

  const submit = async () => {
    Object.keys(state).map((k, i) => {
      state[k].map((q) => {
        if (i == 0) {
          if (q.value) {
            inputs[i][q.key] = ["block", q.value];
            // if (multipleTypes.includes(q.type)) {
            //     inputs[i][q.key] = ['block', ...q.value]
            // } else {
            //     inputs[i][q.key] = ['block', q.value]
            // }
          }
        } else {
          if (typeof q.value == "object") {
            inputs[i][q.key] = q.value;
          } else if (q.value) {
            inputs[i][q.key] = [q.value];
          }
        }
      });
    });
    try {
      dispatch(AppActions.setLoader(true));

      let { data } = await http.put("user-company", {
        id: selectedCompany.id,
        company_name: selectedCompany.company_name,
        user_input: inputs,
      });

      dispatch(CompanyActions.setSelectedCompany(data));
      dispatch(CompanyActions.updateCompany(data));

      dispatch(AppActions.setLoader(false));
      history.push("/home");
    } catch (err) {
      dispatch(AppActions.setLoader(false));
    }
  };

  const onClickAction = (action) => {
    if (action === "next") {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <React.Fragment>
      <strong>
        <h2 className="dashboard-header">Company Submission</h2>
      </strong>
      <Submission
        currentCompany={selectedCompany}
        company={company}
        setCompany={setCompany}
      />
      <div className="spacer"></div>
      <Steps size="small" current={currentStep}>
        <Step key={"Goals"} title="Goals" />
        <Step key={"Attributes"} title="Attributes" />
        <Step key={"Financials"} title="Financials" />
      </Steps>

      <div className="steps-content">
        {currentStep == 0 && (
          <Questionaire
            title="goals"
            questions={dataSet.goals || []}
            sets={state}
            state={state.goals}
            setState={setState}
          />
        )}
        {currentStep == 1 && (
          <Questionaire
            title="attributes"
            questions={dataSet.attributes || []}
            sets={state}
            state={state.attributes}
            setState={setState}
          />
        )}
        {currentStep == 2 && (
          <Financials
            questions={dataSet.financials || []}
            sets={state}
            state={state.financials}
            setState={setState}
          />
          // <Questionaire
          //     title="financials"
          //     questions={dataSet.financials || []}
          //     sets={state}
          //     state={state.financials}
          //     setState={setState}
          // />
        )}
      </div>

      <div className="steps-action">
        <div className="flex-1"></div>
        {selectedCompany && selectedCompany.id && (
          <div>
            {currentStep > 0 && (
              <Button
                className="btn"
                type="text"
                style={{ margin: "0 8px" }}
                onClick={() => onClickAction("prev")}
              >
                Back
              </Button>
            )}
            {currentStep < 2 && (
              <Button
                className="btn btn-primary"
                onClick={() => onClickAction("next")}
              >
                Next
              </Button>
            )}
            {currentStep === 2 && (
              <Button
                className="btn btn-primary"
                type="primary"
                onClick={submit}
              >
                Done
              </Button>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default CompanySubmissionPage;
