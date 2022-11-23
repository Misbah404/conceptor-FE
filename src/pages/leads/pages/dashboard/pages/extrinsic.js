import React from "react";

import { Avatar } from "antd";

import CurrencyIcon from "../../../../../assets/svgs/extrinsic";

const ExtrinsicContent = ({ attributes }) => {
  let extrinsic_input =
    attributes.extrinsic_input != "none" && Object.keys(attributes).length > 0
      ? attributes.extrinsic_input
      : 0;
  if (extrinsic_input >= 1000000) {
    if (extrinsic_input % 1000000 === 0) {
      extrinsic_input = extrinsic_input / 1000000 + "mm";
    } else {
      extrinsic_input = parseFloat(extrinsic_input / 1000000).toFixed(2) + "mm";
    }
  } else if (extrinsic_input >= 100000 || extrinsic_input <= -100000) {
    if (extrinsic_input % 1000 === 0) {
      extrinsic_input = extrinsic_input / 1000 + "k";
    } else {
      extrinsic_input = parseFloat(extrinsic_input / 1000).toFixed(2) + "k";
    }
  } else if (extrinsic_input >= 10000 || extrinsic_input <= 10000) {
    if (extrinsic_input % 1000 === 0) {
      extrinsic_input = extrinsic_input / 1000 + "k";
    } else {
      extrinsic_input = parseFloat(extrinsic_input / 1000).toFixed(2) + "k";
    }
  } else if (extrinsic_input >= 1000 || extrinsic_input <= 1000) {
    if (extrinsic_input % 10000 === 0) {
      extrinsic_input = extrinsic_input / 10000 + "k";
    } else {
      extrinsic_input = parseFloat(extrinsic_input / 10000).toFixed(2) + "k";
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
        icon={<CurrencyIcon width={20} height={20} />}
        style={{ backgroundColor: "#89B1FF", opacity: 0.4 }}
      />
      <span style={{ fontSize: 14, fontStyle: "italic", color: "#c3c3c3" }}>
        Extrinsic
      </span>
      <strong>
        <h2 className="metrics">
          {extrinsic_input.toString().includes("-") && "-"}$
          {formatValue(extrinsic_input.toString().replaceAll("-", ""))}
          <span style={{ fontSize: 14, fontStyle: "italic", color: "#c3c3c3" }}>
            {" "}
            {formatSuffix(extrinsic_input)}
          </span>
        </h2>
      </strong>
    </div>
  );
};

export default ExtrinsicContent;
