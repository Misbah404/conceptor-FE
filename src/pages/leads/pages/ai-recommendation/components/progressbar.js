import React from "react";

const ProgressBar = ({ data = [] }) => {
  return (
    <div className="progress-bar">
      {data.map((d, i) => (
        <div key={i} className="flex flex-row items-center">
          <div className="flex-1">
            <div
              style={{
                width: `${d.value * 10}%`,
                height: 10,
                backgroundColor: d.color,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                maxWidth: "95%",
              }}
            ></div>
          </div>
          <span>{d.value}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
