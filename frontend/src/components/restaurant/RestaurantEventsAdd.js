// 1. Post events(event name, description, time, date, location, hashtags)

import React, { Component } from 'react';
import { Form, Col, Row, Button, Alert} from "react-bootstrap";
import { connect } from "react-redux";
import { postRestaurantEvent } from "../../redux/action/eventActions";

class RestaurantEventsAdd extends Component {
    constructor(props) {
        super(props);
        this.setState({});    
    }

    componentWillMount () {
        this.setState({});
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const data = {
            restaurant_id: localStorage.getItem("restaurant_id"),
            name: this.state.name,
            description: this.state.description,
            time: this.state.time,
            date: this.state.date,
            location: this.state.location,
            hashtags: this.state.hashtags,
        };

        this.props.postRestaurantEvent(data);
    };
    
    render() {
        let  eventCreationStatus = null;
        if(this.props.status && this.props.status === 'RESTAURANT_EVENT_POST_SUCCESSFUL')
            eventCreationStatus = <Alert variant="success"> Event Created Successfully! </Alert>
            
        if(this.props.status && this.props.status === 'RESTAURANT_EVENT_POST_FAILED')
            eventCreationStatus = <Alert variant="warning"> Event Creation Failed! </Alert>

        return (
            <div>
            <center><h3>Create An Event</h3></center>
            <Row>
                <Col xs={6} md={4}>
                </Col>
                <Col>
                <br/><br/>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group 
                        as={Row} 
                        controlId="name">
                            <Form.Label column sm="3">
                                Name:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control 
                                type="text" 
                                name="name" 
                                placeholder="Enter Event Name" 
                                onChange={this.onChange} 
                                pattern="^[A-Za-z0-9 ,.']+$" 
                                required/>
                            </Col>
                        </Form.Group>
                        <Form.Group 
                        as={Row} 
                        controlId="description">
                            <Form.Label column sm="3">
                                Description:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" 
                                name="description" 
                                placeholder="Description of the event" 
                                onChange={this.onChange} 
                                pattern="^[A-Za-z0-9 ,.-']+$" 
                                required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="time">
                            <Form.Label column sm="3">
                                Time:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="time" 
                                name="time" 
                                placeholder="Enter Event Time" 
                                onChange={this.onChange} 
                                required/>
                            </Col>
                        </Form.Group>
                        <Form.Group 
                        as={Row} 
                        controlId="date">
                            <Form.Label column sm="3">Date: </Form.Label>
                            <Col sm="4">
                                <Form.Control type="date" 
                                name="date" 
                                placeholder="Enter Event Date" 
                                onChange={this.onChange} 
                                required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="location">
                            <Form.Label column sm="3">Location: </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" 
                                name="location" 
                                placeholder="Enter Event Location" 
                                onChange={this.onChange} 
                                pattern="^[A-Za-z0-9 ,.-':]+$"  
                                required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="hashtags">
                            <Form.Label column sm="3">Hashtags: </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" 
                                name="hashtags" 
                                placeholder="Enter Hashtags for the Event" 
                                onChange={this.onChange} 
                                pattern="^[A-Za-z0-9 ,#]+$"
                                required/>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Button type="sumbit">Add Event</Button>
                        <Button  style={{marginLeft:"23rem"}}  href="/r_events/view">Back</Button>
                        <br/>
                        <center>{eventCreationStatus}</center>
                        <br/>
                    </Form>
                </Col>
            </Row>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    eventsAdd: state.eventState.restaurantEventsAdd,
    status: state.eventState.status,
});

function mapDispatchToProps(dispatch) {
    return {
        postRestaurantEvent: data => dispatch(postRestaurantEvent(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantEventsAdd);
