import React, { Component } from "react";
import { LinearProgress } from "@material-ui/core";

export class LoaderBar extends Component {
  constructor(props) {
    super(props);
    this.enableMessage = this.enableMessage.bind(this);

    this.state = {
      displayMessage: false
    };

    this.timer = setTimeout(this.enableMessage, 300);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableMessage() {
    this.setState({ displayMessage: true });
  }

  render() {
    const { displayMessage } = this.state;

    if (!displayMessage) {
      return null;
    }

    return <LinearProgress color="primary" variant="indeterminate" />;
  }
}

export default LoaderBar;
