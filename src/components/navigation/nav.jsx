import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';
import { global } from '../../config';
import { UserContext } from '../context/global';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      headerTitle: global.header.siteTitle,
    };
  }

  render() {
    const {
      userData,
      headerTitle,
    } = this.state;

    return (
      <div className="wrapper">
        <UserContext.Provider value={userData}>
          <React.Fragment>
            <Navbar className="bg-white" expand="lg">
              <Container>
                <Navbar.Brand>
                  <Link to="/">
                    <img src="../../assets/img/brand.svg" className="navbar-brand-img" alt="..." />
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarCollapse" />

                <Navbar.Collapse id="navbarCollapse">

                  <Navbar.Toggle aria-controls="navbarCollapse">
                    <i className="fe fe-x"></i>
                  </Navbar.Toggle>

                  <Nav className="ml-auto">
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" id="navbarLandings" data-toggle="dropdown" to="/services/residential" aria-haspopup="true" aria-expanded="false">
                        Residential
                      </Link>
                      <div className="dropdown-menu dropdown-menu-xl p-0" aria-labelledby="navbarLandings">
                        <div className="row no-gutters">
                          <div className="col-12 col-lg-6">
                            <div className="dropdown-img-left" style={{ backgroundImage: 'url(../../assets/img/photos/photo-14.jpg)' }}>

                              <h4 className="font-weight-bold text-white mb-0">
                                The bird is the word
                              </h4>

                              <p className="font-size-sm text-white">
                                Learn why it&apos;s a big deal
                              </p>

                              <a href="/overview.html" className="btn btn-sm btn-white shadow-dark fonFt-size-sm">
                                View
                              </a>

                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="dropdown-body">
                              <div className="row no-gutters">
                                <div className="col-6">
                                  <h6 className="dropdown-header">
                                    Fiber Optic
                                  </h6>
                                  <Link className="dropdown-item" to="/services/residential#internet">
                                    Internet
                                  </Link>
                                  <Link className="dropdown-item" to="/services/residential#phone">
                                    Phone
                                  </Link>
                                  <Link className="dropdown-item" to="/services/residential#video">
                                    Video
                                  </Link>

                                </div>
                                <div className="col-6">
                                  <h6 className="dropdown-header">
                                    Wireless
                                  </h6>
                                  <a className="dropdown-item" href="/index.html">
                                    Rural WiFi
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" id="navbarPages" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">
                        Business
                      </a>
                      <div className="dropdown-menu dropdown-menu-lg" aria-labelledby="navbarPages">
                        <div className="row no-gutters">
                          <div className="col-4 col-lg-4">

                            <h6 className="dropdown-header">
                              Column 1
                            </h6>

                            <a className="dropdown-item" href="/careers.html">
                              Internet
                            </a>
                            <a className="dropdown-item mb-5" href="/career-single.html">
                              Phone
                            </a>

                          </div>
                          <div className="col-4 col-lg-4">

                            <h6 className="dropdown-header">
                              Column 2
                            </h6>

                            <a className="dropdown-item" href="/help-center.html">
                              Internet
                            </a>
                            <a className="dropdown-item" href="/help-center.html">
                              Service Level
                              <br />
                              Agreements
                            </a>

                          </div>
                          <div className="col-4 col-lg-4">

                            <h6 className="dropdown-header">
                              Column 3
                            </h6>

                            <a className="dropdown-item" href="/blog.html">
                              Dope menu my dude!
                            </a>

                          </div>
                        </div>
                      </div>
                    </li>
                  </Nav>

                  <Link className="navbar-btn btn btn-sm btn-primary lift ml-auto" to="/services/getservice">
                    Request Spam
                  </Link>

                </Navbar.Collapse>

              </Container>
            </Navbar>
            <div id="page-wrapper" className="content-wrapper" onClick={this.clickContentWrapper}>
              {this.props.children}
            </div>
          </React.Fragment>

        </UserContext.Provider>
      </div>
    );
  }
}

export { App };
