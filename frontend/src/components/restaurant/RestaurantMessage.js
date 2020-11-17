import React, { Component } from 'react';
import { Container, Alert, Form, Button, ButtonGroup, Row } from "react-bootstrap";
import Message from "./Message";
import { connect } from "react-redux";
import { getRestaurantMessages, putRestaurantMessage } from "../../redux/action/messageActions";
import PropTypes from 'prop-types';

class RestaurantMessage extends Component {
    constructor(props) {
        super(props);
        this.onMessageChange = this.onMessageChange.bind(this);
    }

    componentWillMount() {
        console.log("RestaurantMessage, Participant: ", this.props.location.state);
        if ( this.state && this.state.customer_id ) {
            this.props.getRestaurantMessages(localStorage.getItem("restaurant_id"), this.state.customer_id);
            this.setState({
                newMessage: null,
                noRecord: true,
                restaurantMessages: [],
            });
        } else {
            this.props.getRestaurantMessages(localStorage.getItem("restaurant_id"), this.props.location.state._id);
            this.setState({
                newMessage: null,
                noRecord: true,
                restaurantMessages: [],
                customer_id: this.props.location.state._id,
                customer_name: this.props.location.state.name,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.restaurantMessages) {
            var { restaurantMessages } = nextProps;

            if(restaurantMessages === 'NO_MESSAGES'){
                this.setState({
                    noRecord: true,
                    restaurantMessages: [],
                });
            } else {
                console.log('RestaurantMessage -> componentWillReceiveProps -> restaurantMessages : ', restaurantMessages);
                this.setState({
                    restaurantMessages: restaurantMessages,
                    noRecord: false,
                    newMessage: null,
                });
            }
        }
        
        if( nextProps.restaurantMessageUpdateStatus ) {
            var { restaurantMessageUpdateStatus } = nextProps;
            console.log('RestaurantMessage -> componentWillReceiveProps -> restaurantMessageUpdateStatus : ', restaurantMessageUpdateStatus);
            if(restaurantMessageUpdateStatus === 'RESTAURANT_MESSAGE_UPDATE_SUCCESS' || restaurantMessageUpdateStatus === 'RESTAURANT_MESSAGE_CREATE_SUCCESS'){
                this.props.getRestaurantMessages(localStorage.getItem("restaurant_id"), this.state.customer_id);
                this.setState({
                    restaurantMessageUpdateStatusFail: false,
                });
            } else {
                console.log('RestaurantMessage -> componentWillReceiveProps -> restaurantMessageUpdateStatus : ', restaurantMessageUpdateStatus);
                this.setState({
                    restaurantMessageUpdateStatusFail: true
                });
            }
        }
    }

    onMessageChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onMessageSubmit = (e) => {
        e.preventDefault();
        let data = {
            customer_id : this.state.customer_id,
            message_content : this.state.newMessage
        }
        this.props.putRestaurantMessage(data);
    }

    messageTextBox() {
        return <Form onSubmit={this.onMessageSubmit} align="center" className="justify-content">
            <Form.Row fluid>
                <Form.Group as={Row} controlId="reviews.rating" >
                    <Form.Control style={{marginLeft:'12rem', height:'3rem', width:'40rem'}}
                        name="newMessage"
                        type="text"
                        onChange={this.onMessageChange}
                        value={this.state.newMessage}
                        required={true}
                        placeholder="Type Text here..." />
                </Form.Group>
                
                <ButtonGroup aria-label="Third group">
                    <Button style={{height:'3rem', marginLeft:'1rem'}} type="submit" variant="success">Send Message</Button>
                </ButtonGroup>
            </Form.Row>
            <br/>
        </Form>
    }
    
    render() {
        let noRecordMessage = null,
            messageCards = [],
            messageCard = null,
            messageSendError = null;

        if (this.state && this.state.noRecord) {
            noRecordMessage = (
                <Alert variant="warning">
                    No Messages Yet.
                </Alert>
            );
        }

        let customerName = null;
        if (this.state && this.state.customer_name) {
            customerName = this.state.customer_name;
        }
        
        if (this.state && this.state.restaurantMessageUpdateStatusFail) {
            messageSendError = <Alert variant="warning">Unable to send message, please try in sometime.</Alert>;
        }

        if (this.state && this.state.restaurantMessages && this.state.restaurantMessages.messages
            && this.state.restaurantMessages.messages.length > 0) {
            var messages = this.state.restaurantMessages.messages;
            console.log('Messages: ', messages);
            for (var i = 0; i < messages.length; i++) {
                messageCard = (
                    <Message key={messages[i]._id} current_id={localStorage.getItem('restaurant_id')} message={messages[i]}/>
                );
                messageCards.push(messageCard);
            }
        }

        var messageText = this.messageTextBox();

        return (
            <Container className="justify-content">
                <br />
                <h3>Message {customerName}</h3>
                {noRecordMessage}
                {messageCards}
                {messageText}
                {messageSendError}
            </Container>
        );
    }
}

RestaurantMessage.propTypes = {
    restaurantMessages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    restaurantMessages: state.messageState.restaurantMessages,
    restaurantMessageUpdateStatus: state.messageState.restaurantMessageUpdateStatus,
});

function mapDispatchToProps(dispatch) {
    return {
        getRestaurantMessages: (restaurant_id, customer_id) => dispatch(getRestaurantMessages(restaurant_id, customer_id)),
        putRestaurantMessage: (data) => dispatch(putRestaurantMessage(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMessage);
