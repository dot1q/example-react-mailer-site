import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom';
import AOS from 'aos';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoadingScreen from './components/initalLoad/loading';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fonts/Feather/feather.css';
import './assets/css/theme.css';
import 'flickity/dist/flickity.min.css';
import 'flickity-fade/flickity-fade.css';
import 'aos/dist/aos.css';
import 'jarallax/dist/jarallax.css';
import 'highlightjs/styles/vs2015.css';
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';

import * as HttpStatuses from './components/errorMessages/httpStatus';
import * as ErrPages from './components/errorMessages/errPages';

// Common libraries
import { global } from './config';

// Modules
const Homepage = lazy(() => import('./components/homepage/homepageApp'));
const Services = lazy(() => import('./components/services/servicesApp'));
// const AppPrivacyPolicy = lazy(() => import('./components/about/appPrivacyPolicy'));
AOS.init();

document.title = global.header.siteTitleAbv + ' :: Landing Page';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => <Component {...props} />
      }
    />
  );
};

const CsrRouter = () => (
  <Router>
    <Suspense fallback={LoadingScreen}>
      <Switch>
        <PrivateRoute path="/services" component={Services} />
        <PrivateRoute exact path="/" component={Homepage} />
        {/* <PrivateRoute path="/about/app-privacy-policy" component={AppPrivacyPolicy} /> */}

        <Route path="/lockout" component={ErrPages.lockout} />
        <Route path="/blockedip" component={ErrPages.blockedip} />
        <Route path="/denied" component={ErrPages.denied} />
        <Route path="/incompatible" component={ErrPages.incompatible} />
        <Route path="/400" component={HttpStatuses.status400} />
        <Route path="/401" component={HttpStatuses.status401} />
        <Route path="/403" component={HttpStatuses.status403} />
        <Route path="/404" component={HttpStatuses.status404} />
        <Route path="/500" component={HttpStatuses.status500} />
        <Route component={HttpStatuses.status404} />
      </Switch>
    </Suspense>
  </Router>
);

render(
  <CsrRouter />,
  document.getElementById('app'),
);
