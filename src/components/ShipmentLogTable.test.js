import React from "react";
import ReactDOM from "react-dom";
import ShipmentLogTable from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ShipmentLogTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
