import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class Event extends Component {
  render() {
    return (
      <Card bg="light" style={{ width: "50rem", margin: "2%" }}>
        <Row>
          <Col align="left">
            <Card.Body>
              <Card.Title>{this.props.event.name}</Card.Title>
              <Card.Text>{this.props.event.description}</Card.Text>
              <Card.Text>At: {this.props.event.location}</Card.Text>
              <Card.Text>{this.props.event.hashtags}</Card.Text>
            </Card.Body>
          </Col>
          
          <Col align="right" >
            <Link to={{ pathname: "/r_events/participants", state: { event: this.props.event } }}>
              <Button style={{ margin:'1rem'}} name={this.props.event._id}>View Participants</Button>&nbsp;
              </Link>
              <Card.Text style={{ marginRight:'5rem'}} >Time: {this.props.event.time}</Card.Text>
              <Card.Text style={{ marginRight:'5rem'}} >On: {this.props.event.date.slice(0,10)}</Card.Text>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Event;