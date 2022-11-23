import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Input, Avatar, Row, Col, Card } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import ModalSuccess from "../../../../components/modal/success";
import SuccessCheckIcon from "../../../../assets/svgs/success-check";

import InvestorsList from "./pages/investors-list";
import InvestorsScore from "./pages/investors-score";
import SynergiesAndGoals from "./pages/synergies-and-goals";
import InvestorProfile from "./pages/investors-profile";
import {
  countryState,
  countryStateAbbrev,
} from "../../constants/country-state";

const AIRecommendation = () => {
  const { http } = global.services;

  const selectedCompany = useSelector(
    (state) => state.CompanyReducer.selected_company
  );

  const [state, setState] = useState({
    selectedRowKeys: [0],
    profile: {},
  });

  const [investors, setInvestors] = useState([]);
  const [visible, setVisible] = useState(false);

  const history = useHistory();

  useEffect(() => {
    init();
  }, [selectedCompany]);

  const init = () => {
    const { programx_output } = selectedCompany;

    let newState = { ...state };
    newState.selectedRowKeys = [0];
    newState.profile =
      programx_output && programx_output.length > 0 ? programx_output[0] : {};

    if (programx_output) setInvestors(programx_output);

    setState(newState);
  };

  const changeSelected = (index) => {
    const { programx_output } = selectedCompany;

    setState({
      ...state,
      selectedRowKeys: index,
      profile: programx_output[index[0]],
    });
  };

  const convertToStateName = (country, stateAbbreviation) => {
    let index = countryStateAbbrev[country].findIndex(
      (sa) => sa === stateAbbreviation
    );
    return countryState[country][index];
  };

  const addToLeadsManager = async () => {
    let profile_state =
      state.profile.country && state.profile.state
        ? convertToStateName(state.profile.country, state.profile.state)
        : "NA";
    let profile_country =
      state.profile.country && state.profile.state
        ? convertToStateName(state.profile.country, state.profile.state)
        : "NA";

    let params = {
      user_company_id: selectedCompany.id,
      company_name: selectedCompany.company_name,
      lead_name: state.profile.company_name,
      url: state.profile.url,
      email: "",
      contact_number: "",
      is_recommended: 1,
      user_notes: "",
      status: "new lead",
      state: profile_state,
      country: profile_country,
      location: state.profile.hq_address,
      recommended_lead_notes: {
        financial_synergies: state.profile.financial_synergies,
        misc_synergies: state.profile.misc_synergies,
        operating_synergies: state.profile.operating_synergies,
      },
    };

    try {
      let { data } = await http.post(`user-lead`, params);
      setVisible(true);
    } catch (err) {
      console.log(`Something went wrong in the server! Please try again.`);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const redirect = () => {
    history.push("/leads-manager");
  };

  return (
    <React.Fragment>
      <strong>
        <h2 className="dashboard-header">AI Recommendations</h2>
      </strong>
      {visible && (
        <ModalSuccess
          className="program-x-modal"
          show={visible}
          onClose={handleClose}
        >
          <div className="program-x-modal-success-content">
            <SuccessCheckIcon />
            <h1 className="title">Successfully added</h1>
            {/* <p className='description'>{company}</p> */}
            {/* <Button className='btn btn-primary' type="primary" onClick={redirect}>
                            Ok
                        </Button> */}
            <Button
              className="btn btn-primary"
              type="primary"
              onClick={handleClose}
            >
              Ok
            </Button>
          </div>
        </ModalSuccess>
      )}
      <Row gutter={[32, 32]}>
        {console.log("investors", investors)}
        <Col span={14}>
          <InvestorsList
            data={investors || []}
            selected={state.profile}
            state={state}
            onChange={changeSelected}
            onAdd={addToLeadsManager}
          />
          <div className="spacer"></div>
          <SynergiesAndGoals data={state.profile} />
        </Col>
        <Col span={10}>
          <InvestorProfile data={state.profile} />
        </Col>
      </Row>
      {/* <div className="spacer"></div>
                <div className="flex">
                    <div className='flex-1'></div>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#605BFF",
                            borderWidth: 1,
                            borderColor: "#605BFF",
                            marginRight: 2,
                            width: 120
                        }}
                    >
                        Back
                    </Button>

                    <Button variant="contained" sx={{ width: 120, background: "#605BFF" }}>
                        Next
                    </Button>
                </div> */}
    </React.Fragment>
  );
};

export default AIRecommendation;
