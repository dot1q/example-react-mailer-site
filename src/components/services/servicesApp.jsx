import React from 'react';
import { Route } from 'react-router-dom';

import { App } from '../navigation/nav';
import { global } from '../../config';
import SignUp from './signUp';

const MODULE_PREFIX = '/services';

class Systems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulePrefix: MODULE_PREFIX,
    };

    document.title = global.header.siteTitleAbv + ' :: Services';
  }

  render() {
    const { modulePrefix, nav } = this.state;

    return (
      <App nav={nav}>
        <div>
          <Route exact path={modulePrefix + '/getservice'} component={SignUp} />
        </div>
      </App>
    );
  }
}

export default Systems;
