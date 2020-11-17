import React, { Component } from 'react';
import { Container, Alert, Form, Button, ButtonGroup, Row } from "react-bootstrap";
import Message from "./Message";
import { connect } from "react-redux";
import { getCustomerMessages, putCustomerMessage } from "../../redux/action/messageActions";
import PropTypes from 'prop-types';

class CustomerMessage extends Component {
    constructor(props) {
        super(props);
        this.onMessageChange = this.onMessageChange.bind(this);
    }

    componentWillMount() {
        console.log("CustomerMessage, Participant: ", this.props.location.state);
        if ( this.state && this.state.restaurant_id ) {
            this.props.getCustomerMessages(this.state.restaurant_id);
            this.setState({
                newMessage: null,
                noRecord: true,
                customerMessages: [],
            });
        } else {
            this.props.getCustomerMessages(this.props.location.state.restaurant_id);
            this.setState({
                newMessage: null,
                noRecord: true,
                customerMessages: [],
                restaurant_id: this.props.location.state.restaurant_id,
                restaurant_name: this.props.location.state.restaurant_id.name,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customerMessages) {
            var { customerMessages } = nextProps;

            if(customerMessages === 'NO_MESSAGES'){
                this.setState({
                    noRecord: true,
                    customerMessages: [],
                });
            } else {
                console.log('CustomerMessage -> componentWillReceiveProps -> customerMessages : ', customerMessages);
                this.setState({
                    customerMessages: customerMessages,
                    noRecord: false,
                    newMessage: null,
                });
            }
        }
        
        if( nextProps.customerMessageUpdateStatus ) {
            var { customerMessageUpdateStatus } = nextProps;
            console.log('CustomerMessage -> componentWillReceiveProps -> customerMessageUpdateStatus : ', customerMessageUpdateStatus);
            if(customerMessageUpdateStatus === 'CUSTOMER_MESSAGE_UPDATE_SUCCESS') {
                this.props.getCustomerMessages(this.state.restaurant_id);
                this.setState({
                    customerMessageUpdateStatusFail: false,
                });
            } else {
                console.log('CustomerMessage -> componentWillReceiveProps -> customerMessageUpdateStatus : ', customerMessageUpdateStatus);
                this.setState({
                    customerMessageUpdateStatusFail: true
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
            restaurant_id : this.state.restaurant_id,
            message_content : this.state.newMessage
        }
        this.props.putCustomerMessage(data);
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

        let restaurantName = null;
        if (this.state && this.state.restaurant_name) {
            restaurantName = this.state.restaurant_name;
        }
        
        if (this.state && this.state.customerMessageUpdateStatusFail) {
            messageSendError = <Alert variant="warning">Unable to send message, please try in sometime.</Alert>;
        }

        if (this.state && this.state.customerMessages && this.state.customerMessages.length > 0) {
            for(var j = 0; j < this.state.customerMessages.length; j++) {
                if(this.state.restaurant_id._id === this.state.customerMessages[j].restaurant_id._id) {
                    var messages = this.state.customerMessages[j].messages;
                    console.log('Messages: ', messages);
                    for (var i = 0; i < messages.length; i++) {
                        messageCard = (
                            <Message key={messages[i]._id} current_id={localStorage.getItem('customer_id')} message={messages[i]}/>
                        );
                        messageCards.push(messageCard);
                    }
                }
            }
        }

        var messageText = this.messageTextBox();

        return (
            <Container className="justify-content">
                <br />
                <h3>Message {restaurantName}</h3>
                {noRecordMessage}
                {messageCards}
                {messageText}
                {messageSendError}
            </Container>
        );
    }
}

CustomerMessage.propTypes = {
    getCustomerMessages: PropTypes.object.isRequired,
    putCustomerMessage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    customerMessages: state.messageState.customerMessages,
    customerMessageUpdateStatus: state.messageState.customerMessageUpdateStatus,
});

function mapDispatchToProps(dispatch) {
    return {
        getCustomerMessages: (restaurant_id) => dispatch(getCustomerMessages(restaurant_id)),
        putCustomerMessage: (data) => dispatch(putCustomerMessage(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMessage);
