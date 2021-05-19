import React, { Component } from 'react';

export class CustomRedirect extends Component {
  constructor(props) {
    super();
    this.state = { ...props };
    console.log(this.props);
  }

  componentWillMount() {
    window.location = this.state.route.loc;
  }

  render() {
    return (<section>Redirecting...</section>);
  }
}

export default CustomRedirect;
