import React, { Component } from "react";

class ShipmentLogTable extends Component {

  render() {
    return (
      <div className="Body">
      <br/>
      Dispatched to All Available Drivers!
      <br/>
      <br/>
      Shipment Log:
      <br/>
        <table style={{ display: "inline" }}>
          <tr>
            <th>Driver ID</th>
          </tr>
          {Object.keys(this.props.response).map(key => <tr>{key}</tr>)}
        </table>
        <table style={{ display: "inline" }}>
          <tr>
            <th>Shipment ID</th>
          </tr>
          {Object.values(this.props.response).map(value => (
            <tr>{value.toString()}</tr>
          ))}
        </table>
      </div>
);

  }
}

export default ShipmentLogTable;
