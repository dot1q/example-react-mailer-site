import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { App } from '../navigation/nav';
import { global } from '../../config';

const MODULE_PREFIX = '/';


class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulePrefix: MODULE_PREFIX,
    };

    document.title = global.header.siteTitleAbv + ' :: Homepage';
  }

  render() {
    const { modulePrefix, nav } = this.state;

    return (
      <App nav={nav}>
        <Container>
          <Row>
            Lol, what up?
          </Row>
        </Container>
      </App>
    );
  }
}

export default Homepage;
