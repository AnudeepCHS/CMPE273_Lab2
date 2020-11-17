import React, { Component } from "react";
import { Card, Button, Col, Row, Modal, Table } from "react-bootstrap";
import backend from '../common/serverDetails';

class Connection extends Component {

  onDetailsClick = (e) => {
    this.setState({
        modalParticipantId: e.target.name,
    });
  }

  handleDetailsModalClose = () => {
    this.setState({
        modalParticipantId: "",
    });
  }

  getLocaleTime = (join_date) => {
    if(join_date !== null)
      return join_date.slice(0,10);
  }

  getAddress = (city, state, country) => {
    let address = null;
    if(city !== null) {
      address = city + ', ';
    } else {
      address='';
    }

    if(state !== null) {
      address = address + state + ', ';
    } else {
      address = address + '';
    }
    
    if(country !== null) {
      address = address + country;
    } else {
      address = address + '';
    }

    return address;
  }

  render() {
    let detailsModal, modalParticipant, modalParticipantImgSrc;

    let showButton;
    if (this.props.showFollow) {
      console.log('Connection.js -> this.props.showFollow : ', this.props.showFollow);
      showButton = <p style={{ margin:'1rem', color:'green'}}>Following!</p>
    } else {
      console.log('Connection.js -> this.props.customer : ', this.props.customer);
      showButton = <Button style={{ margin:'1rem'}}  onClick={this.props.followUser} name={this.props.customer.customer_id}>Follow</Button>
    }
    
    let profile = <Button name={this.props.customer.customer_id} onClick={this.onDetailsClick}>{this.props.customer.name}'s Profile</Button>

    if (this.state && this.state.modalParticipantId) {
      modalParticipant = this.props.customer;
      modalParticipantImgSrc = `${backend}/images/customers/${modalParticipant._id}/profile/${modalParticipant.profile_picture}`;
      detailsModal = <Modal
                          show={true}
                          backdrop="static"
                          onHide={this.handleDetailsModalClose}
                          keyboard={false}
                          centered={true}
                      >
                          <Modal.Header closeButton>
                          <Modal.Title>{modalParticipant.name}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                              
                              <img src={modalParticipantImgSrc} style = {{width:'29rem', height:'20rem'}} />
                              
                              <Table striped bordered hover>
                                  <tbody>
                                      <tr>
                                          <td>Name</td>
                                          <td>{modalParticipant.name}</td>
                                      </tr>
                                      <tr>
                                          <td>Phone</td>
                                          <td>{modalParticipant.phone}</td>
                                      </tr>
                                      <tr>
                                          <td>Email Id</td>
                                          <td>{modalParticipant.email_id}</td>
                                      </tr>
                                      <tr>
                                          <td>Address</td>
                                          <td>{this.getAddress(modalParticipant.city, modalParticipant.state, modalParticipant.country)}</td>
                                      </tr>
                                      <tr>
                                          <td>Birth Date</td>
                                          <td>{modalParticipant.dob}</td>
                                      </tr>
                                      <tr>
                                          <td>About</td>
                                          <td>{modalParticipant.about}</td>
                                      </tr>
                                      <tr>
                                          <td>Yelping Since</td>
                                          <td>{this.getLocaleTime(modalParticipant.join_date)}</td>
                                      </tr>
                                      <tr>
                                          <td>Blog</td>
                                          <td>{modalParticipant.blog_url}</td>
                                      </tr>
                                      <tr>
                                          <td>Nick Name</td>
                                          <td>{modalParticipant.nick_name}</td>
                                      </tr>
                                  </tbody>
                              </Table>
                              
                          </Modal.Body>
                          <Modal.Footer>
                              <Button variant="secondary" onClick={this.handleDetailsModalClose}>
                                  Close
                              </Button>
                          </Modal.Footer>
                      </Modal>
  }

    return (
      <Card bg="light" style={{ width: "50rem", margin: "2%" }}>
        <Row>
          <Col align="left">
            <Card.Body>
              <Card.Title>{this.props.customer.name}</Card.Title>
              <Card.Text>{this.props.customer.about}</Card.Text>
              <Card.Text>{this.props.customer.city}</Card.Text>
              <Card.Text>{this.props.customer.nick_name}</Card.Text>
            </Card.Body>
          </Col>
          <Col align="right">
          <br/>
            <div style={{ marginRight: "4%" }}>{profile}</div>
            <br/>
            {detailsModal}
            <div style={{ marginRight: "4%" }}>{showButton}</div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Connection;