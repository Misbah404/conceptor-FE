import React from "react";

import { Avatar } from "antd";

import CurrencyIcon from "../../../../../assets/svgs/intrinsic";

const IntrinsicContent = ({ attributes }) => {
  let intrinsic_input =
    attributes.intrinsic_input != "none" && Object.keys(attributes).length > 0
      ? attributes.intrinsic_input
      : 0;
  if (intrinsic_input >= 1000000) {
    if (intrinsic_input % 1000000 === 0) {
      intrinsic_input = intrinsic_input / 1000000 + "mm";
    } else {
      intrinsic_input = parseFloat(intrinsic_input / 1000000).toFixed(2) + "mm";
    }
  } else if (intrinsic_input >= 100000 || intrinsic_input <= -100000) {
    if (intrinsic_input % 1000 === 0) {
      intrinsic_input = intrinsic_input / 1000 + "k";
    } else {
      intrinsic_input = parseFloat(intrinsic_input / 1000).toFixed(2) + "k";
    }
  } else if (intrinsic_input >= 10000 || intrinsic_input <= 10000) {
    if (intrinsic_input % 1000 === 0) {
      intrinsic_input = intrinsic_input / 1000 + "k";
    } else {
      intrinsic_input = parseFloat(intrinsic_input / 1000).toFixed(2) + "k";
    }
  } else if (intrinsic_input >= 1000 || intrinsic_input <= 1000) {
    if (intrinsic_input % 10000 === 0) {
      intrinsic_input = intrinsic_input / 10000 + "k";
    } else {
      intrinsic_input = parseFloat(intrinsic_input / 10000).toFixed(2) + "k";
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
        style={{ backgroundColor: "#EAB8FF", opacity: 0.4 }}
      />
      <span style={{ fontSize: 14, fontStyle: "italic", color: "#c3c3c3" }}>
        Intrinsic
      </span>
      <strong>
        <h2 className="metrics">
          {intrinsic_input.toString().includes("-") && "-"}$
          {formatValue(intrinsic_input.toString().replaceAll("-", ""))}
          <span style={{ fontSize: 14, fontStyle: "italic", color: "#c3c3c3" }}>
            {" "}
            {formatSuffix(intrinsic_input)}
          </span>
        </h2>
      </strong>
    </div>
  );
};

export default IntrinsicContent;
