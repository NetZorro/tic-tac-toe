import React from "react";

import ReactDOM from "react-dom";

import App from "./App";

const hostElement = document.getElementById("root");

if (hostElement) {
  ReactDOM.render(<App />, hostElement);
} else {
  console.warn("root is null");
}
