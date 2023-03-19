import React from "react";

const Alert = (props) => {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: "30px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible show`}
          role="alert"
        >
          {capitalize(props.alert.message)}
          {/* <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button> */}
        </div>
      )}
    </div>
  );
};

export default Alert;
