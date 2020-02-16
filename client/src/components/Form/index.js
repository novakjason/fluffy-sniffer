import React from "react";

// This file exports form elements

export function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input className="form-control" {...props} >
      </input>
    </div>
  );
};

export function Radio(props) {
  return (
    <div className="form-check">
      <input className="form-check-input" type="radio" {...props} />
      <label className="form-check-label" htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export function TextArea(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <textarea className="form-control" rows="10" {...props} />
    </div>
  );
};

export function Button(props) {
  return (
    <button {...props} style={{ display: "block", clear: "both", margin: "30px auto 0", background: "#721D1B", color: "#FFF" }} className="btn">
      {props.children}
    </button>
  );
};

