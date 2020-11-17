import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";

class Message extends Component {
  render() {
    let alignmentVariable = 'left';
    let bgVariable = 'secondary';
    if (this.props.current_id === this.props.message.sender_id) {
      alignmentVariable = 'right';
      bgVariable = 'light';
    }
    return (
      <center>
      <Card bg={bgVariable} style={{ width: "50rem", margin: "2%"}}>
        <Row>
          <Col align={alignmentVariable}>
            <Card.Body>
              <Card.Text>{this.props.message.message_content}</Card.Text>
              <Card.Text>{this.props.message.message_time}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      </center>
    );
  }
}

export default Message;