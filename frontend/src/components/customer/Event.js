import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

class Event extends Component {
  render() {

    let showButton;
    if (this.props.showRegister) {
      showButton = <p style={{ margin:'1rem', color:'green'}} >Already Registered!</p>
    } else {
      showButton = <Button style={{ margin:'1rem'}}  onClick={this.props.registerYourself} name={this.props.event.event_id}>Register</Button>
    }
    
    return (
      <Card bg="light" style={{ width: "50rem", margin: "2%" }}>
        <Row>
          <Col align="left">
            <Card.Body>
              <Card.Title>{this.props.event.name}</Card.Title>
              <Card.Text>{this.props.event.description}</Card.Text>
              
              <Card.Text>{this.props.event.hashtags}</Card.Text>
            </Card.Body>
          </Col>
          
          <Col align="left">
              <br/><br/><br/>
              <Card.Text>On: {this.props.event.date.slice(0,10)} Time: {this.props.event.time}</Card.Text>
              <Card.Text>At: {this.props.event.location}</Card.Text>
          </Col>
          <Col align="right">
              {showButton}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Event;