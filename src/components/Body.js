import React, { Component } from "react";
import ShipmentLogTable from "./ShipmentLogTable";

class Body extends Component {
  state = {
    loading: true,
    response: [],
  };

  componentWillMount() {
    this.DispatchToDrivers()
      .then(res => this.setState({ response: res.express, loading: false }))
      .catch(err => console.log(err));
  }

  DispatchToDrivers = async () => {
    const response = await fetch("/api/dispatch");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    if (this.state.loading) {
    return (
      <div className="Body">
        <br/>
        Dispatching... 
        <br/><br/>(Please check server log for details)
      </div>
    );
  }
  return <ShipmentLogTable response={this.state.response}/>
}
}

export default Body;
