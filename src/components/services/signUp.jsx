import React from 'react';
// import { Link } from 'react-router-dom';
import { Button, Row, Col, Form, Card, Container } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { jsonRequest } from '../../js/common';
import { global } from '../../config';
import GenericAlert from '../common/alerts';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      fname: '',
      lname: '',
      phone: '',
      email: '',
      details: '',
      emailAlerts: false,
      smsAlerts: false,
      loading: false,
      alertVariant: null,
      alertMessage: null,
      alertSubmitVariant: null,
      alertSubmitMesage: null,
      submitButtonEnabled: false,
      successfulOrder: false,
    };
    document.title = global.header.siteTitleAbv + ' :: Sign Up';

    this.onlyNumbersReg = new RegExp('[^0-9]+');


    this.setAlert = this.setAlert.bind(this);
    this.setCheckBox = this.setCheckBox.bind(this);
    this.setText = this.setText.bind(this);
    this.processOrder = this.processOrder.bind(this);
  }

  componentDidMount() {
    this.checkOrder();
  }

  setText(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, () => {
      this.checkOrder();
    });
  }

  setCheckBox(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [target.name]: value,
    }, () => {
      this.checkOrder();
    });
  }

  setAlert(alertVariant, alertMessage) {
    this.setState({
      alertVariant,
      alertMessage,
    });
  }

  setSubmitAlert(alertSubmitMesage, alertSubmitVariant) {
    this.setState({
      alertSubmitVariant,
      alertSubmitMesage,
    });
  }

  checkOrder() {
    const {
      fname,
      lname,
      phone,
      email,
    } = this.state;

    const modifiedPhone = phone.replace(this.onlyNumbersReg, '');

    let alertMessage = 'Please correct the following invalid entries: ';
    const alertMessageArr = [];
    if (fname && lname && phone && email) {
      this.setSubmitAlert(null, null);
      this.setState({
        submitButtonEnabled: true,
      });
    } else {
      if (fname === '') {
        alertMessageArr.push('First Name');
      }

      if (lname === '') {
        alertMessageArr.push('Last Name');
      }
      if (modifiedPhone === '') {
        alertMessageArr.push('Phone');
      }

      if (email === '') {
        alertMessageArr.push('Email');
      }
      this.setSubmitAlert(alertMessage += alertMessageArr.join(', '), 'danger');
      this.setState({
        submitButtonEnabled: false,
      });
    }
  }

  processOrder(event) {
    event.preventDefault();
    const {
      lname,
      fname,
      phone,
      email,
      smsAlerts,
      emailAlerts,
      details,
    } = this.state;

    const modifiedPhone = phone.replace(this.onlyNumbersReg, '');

    const compiledDetails = `--- Auto Generated Data ---
    Here are something things that might only show up on the db side or the backend. Items such as additional information, etc that isn't gathered by the end user!
      ${details}
      `;

    const serviceOptions = {
      toaddress: email,
      subject: 'Your new sign up!',
      text: `Hello, ${fname} ${lname}, we know your phone number lol, we're very creepy! ${phone}. Other details: ${details}`,
      html: `Hello, <b>${fname} ${lname}<b>, we know your phone number lol, we're very creepy! <br /> ${phone}. <br /> Other details: ${details}`,

      // fname,
      // lname,
      // phone: modifiedPhone,
      // email: email === '' ? null : email,
      // smsAlerts,
      // emailAlerts,
      // details: compiledDetails,
    };


    jsonRequest('/send-mail', 'post', serviceOptions).then(() => {
      this.setSubmitAlert(null, null);
      this.setState({
        successfulOrder: true,
      });
    }, (fail) => {
      this.setSubmitAlert('Failed to add record, please get help! ' + fail, 'danger');
    });
  }

  render() {
    const {
      alertMessage,
      alertVariant,
      alertSubmitVariant,
      alertSubmitMesage,
      fname,
      lname,
      phone,
      email,
      smsAlerts,
      emailAlerts,
      loading,
      details,
      submitButtonEnabled,
      successfulOrder,
    } = this.state;

    return (
      <React.Fragment>
        {!successfulOrder ? (
          <Form onSubmit={this.processOrder}>
            <section className="pt-4 pt-md-11">
              <Container>
                <h2>Sign up for my junk!</h2>
              </Container>
              <Container>
                <Card className="card shadow-dark">
                  <Card.Body>
                    <Row>
                      <h3><strong>Name and Contact Information</strong></h3>
                    </Row>
                    <GenericAlert variant={alertVariant} message={alertMessage} />
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="orderForm.FirstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control className="form-control" type="text" placeholder="John" name="fname" onChange={this.setText} value={fname} required />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="orderForm.LastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control className="form-control" type="text" placeholder="Doe" name="lname" onChange={this.setText} value={lname} required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group controlId="orderForm.Phone">
                          <Form.Label>Phone Number</Form.Label>
                          <InputMask mask="+1 (999) 999-9999" onChange={this.setText} value={phone} numericInput="true" greedy="false">
                            {() => <Form.Control className="form-control" type="text" placeholder="+1 (555) 555-5555" name="phone" required /> }
                          </InputMask>
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <Form.Group controlId="orderForm.Email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control className="form-control" type="text" placeholder="user@example.com" name="email" onChange={this.setText} value={email} />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Container>
            </section>
            <section className="pt-4 pt-md-6">
              <Container>
                <Card className="card shadow-dark">
                  <Card.Body>
                    <Row>
                      <h3>Order Alerts</h3>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group controlId="smsAlertsCheckbox">
                          <Form.Check type="checkbox" label="I would like to receive email alerts regarding my order" name="emailAlerts" checked={emailAlerts} onChange={this.setCheckBox} disabled={!email} />
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <Form.Group controlId="emailAlertsCheckbox">
                          <Form.Check type="checkbox" label="I would like to receive text alerts regarding my order" name="smsAlerts" checked={smsAlerts} onChange={this.setCheckBox} />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Container>
            </section>
            <section className="pt-4 pt-md-6">
              <Container>
                <Card className="card shadow-dark">
                  <Card.Body>
                    <Row>
                      <h3>Review Order</h3>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group controlId="comments">
                          <Form.Label>Additional Comments</Form.Label>
                          <Form.Control as="textarea" rows="3" name="details" onChange={this.setText} value={details} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Button type="submit" variant="primary" disabled={!submitButtonEnabled}>Complete Order</Button>
                        <br />
                        <GenericAlert variant={alertSubmitVariant} message={alertSubmitMesage} />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Container>
            </section>
          </Form>
        ) : (
          <section className="pt-4 pt-md-6">
            <Container>
              <Card className="card shadow-dark">
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      <center>
                        <h2>Success!</h2>
                      </center>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <h3>
                        <center>
                          Your order has been added, a confirmation email will be sent to your shortly.
                        </center>
                      </h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default SignUp;
