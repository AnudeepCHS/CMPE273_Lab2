import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Alert, Form, Button, ButtonGroup, Row, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllCustomerMessages } from "../../redux/action/messageActions";
import PropTypes from 'prop-types';

class CustomerMessages extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAllCustomerMessages();        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customerAllMessages) {
            var { customerAllMessages } = nextProps;

            if(customerAllMessages === 'NO_MESSAGES'){
                this.setState({
                    noRecord: true,
                    customerAllMessages: [],
                });
            } else {
                console.log('CustomerMessages -> componentWillReceiveProps -> customerAllMessages : ', customerAllMessages);
                this.setState({
                    customerAllMessages: customerAllMessages,
                    noRecord: false,
                });
            }
        }
    }

    restaurantMessageCard = (messageDetails) => {
        return (
            <Link to={{pathname: `/customer/messages/${messageDetails.restaurant_id._id}`, state: messageDetails}}>
                <Card style={{ width:'40rem', height: '5rem', margin: '1rem' }}>
                    <Card.Body>
                        <Row>
                            <Card.Text><b>{messageDetails.restaurant_id.name}</b></Card.Text>
                        </Row>
                    </Card.Body>
                </Card>
            </Link>
            );
    } 

    render() {
        let noRecordMessage = null,
            restaurantMessageCards = [],
            restaurantMessageCard = null;

        if (this.state && this.state.noRecord) {
            noRecordMessage = (
                <Alert variant="warning">
                    No Messages Yet.
                </Alert>
            );
        }

        if (this.state && this.state.customerAllMessages
            && this.state.customerAllMessages.length > 0) {
            var messages = this.state.customerAllMessages;
            console.log('Messages: ', messages);
            for (var i = 0; i < messages.length; i++) {
                restaurantMessageCard = this.restaurantMessageCard(messages[i]);
                restaurantMessageCards.push(restaurantMessageCard);
            }
        }

        return (
            <Container className="justify-content">
                <br />
                <h3>Messages</h3>
                {noRecordMessage}
                {restaurantMessageCards}
            </Container>
        );
    }
}

CustomerMessages.propTypes = {
    customerAllMessages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    customerAllMessages: state.messageState.customerAllMessages,
});

function mapDispatchToProps(dispatch) {
    return {
        getAllCustomerMessages: () => dispatch(getAllCustomerMessages()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMessages);
