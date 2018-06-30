import React, { Component } from "react";
import { Button } from "@material-ui/core";
// import testApi from "api/testApi";

export class Test extends Component {
  static propTypes = {};

  handleClick = () => {
    // testApi();
  };

  render() {
    return (
      <Button variant="raised" onClick={this.handleClick}>
        Test Api
      </Button>
    );
  }
}

export default Test;
