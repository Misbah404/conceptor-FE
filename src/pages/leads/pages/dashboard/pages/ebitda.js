import React from "react";

import { Avatar } from "antd";

import CurrencyIcon from "../../../../../assets/svgs/dollar-currency";

const EbitdaContent = ({ attributes }) => {
  let ebitda_year_one =
    attributes.ebitda_year_one != "none" && Object.keys(attributes).length > 0
      ? attributes.ebitda_year_one
      : 0;
  if (ebitda_year_one >= 1000000 || ebitda_year_one <= -1000000) {
    if (ebitda_year_one % 1000000 === 0) {
      ebitda_year_one = ebitda_year_one / 1000000 + "mm";
    } else {
      ebitda_year_one = parseFloat(ebitda_year_one / 1000000).toFixed(2) + "mm";
    }
  } else if (ebitda_year_one >= 100000 || ebitda_year_one <= -100000) {
    if (ebitda_year_one % 1000 === 0) {
      ebitda_year_one = ebitda_year_one / 1000 + "k";
    } else {
      ebitda_year_one = parseFloat(ebitda_year_one / 1000).toFixed(2) + "k";
    }
  } else if (ebitda_year_one >= 10000 || ebitda_year_one <= 10000) {
    if (ebitda_year_one % 1000 === 0) {
      ebitda_year_one = ebitda_year_one / 1000 + "k";
    } else {
      ebitda_year_one = parseFloat(ebitda_year_one / 1000).toFixed(2) + "k";
    }
  } else if (ebitda_year_one >= 1000 || ebitda_year_one <= 1000) {
    if (ebitda_year_one % 10000 === 0) {
      ebitda_year_one = ebitda_year_one / 10000 + "k";
    } else {
      ebitda_year_one = parseFloat(ebitda_year_one / 10000).toFixed(2) + "k";
    }
  }

  const formatValue = (val) => {
    let value = val;

    if (typeof val === "string") {
      value = value ? value.replaceAll(/[mmk]/g, "") : value;
    }

    return value;
  };

  const formatSuffix = (val) => {
    let value = "";

    if (typeof val === "string") {
      value = val.includes("mm") ? "mm" : val.includes("k") ? "k" : "";
    }

    return value;
  };

  return (
    <div className="flex-column items-center">
      <Avatar
        size={50}
        icon={<CurrencyIcon width={20} height={20} stroke="#605BFF" />}
        style={{ backgroundColor: "#EFF4FE", opacity: 0.4 }}
      />
      <span style={{ fontSize: 14, fontStyle: "italic", color: "#c3c3c3" }}>
        EBITDA
      </span>
      <strong>
        <h2 className="metrics">
          {ebitda_year_one.toString().includes("-") && "-"}$
          {formatValue(ebitda_year_one.toString().replaceAll("-", ""))}
          <span style={{ fontSize: 14, fontStyle: "italic", color: "#c3c3c3" }}>
            {" "}
            {formatSuffix(ebitda_year_one)}
          </span>
        </h2>
      </strong>
    </div>
  );
};

export default EbitdaContent;
