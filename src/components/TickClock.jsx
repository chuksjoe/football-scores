import React, { Component } from 'react';

import { getCurrentDateTime } from '../utilities/utilities';

export default class TickClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.TimerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.TimerId);
  }

  tick = () => {
    this.setState({
      date: new Date()
    });
  }

  render() {
    const { date } = this.state;

    return (
      <span className="current-date">
        {getCurrentDateTime(date)}
      </span>
    );
  }
}
