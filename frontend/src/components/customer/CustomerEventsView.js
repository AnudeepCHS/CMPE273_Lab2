// View list of upcoming events in the order of increasing date

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Alert, InputGroup, FormControl, Button, Form, Row, Col, Pagination } from "react-bootstrap";
import Event from "./Event";
import { getCustomerEvents, getCustomerRegisteredEvents, registerToEvent } from '../../redux/action/eventActions'


class CustomerEventsView extends Component {
    

    constructor(props) {
        super(props);
        this.setState({
            search_input: '',
            order: 'asc',
        });
        this.onChange = this.onChange.bind(this);
        this.onChangeOrder = this.onChangeOrder.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.props.getCustomerEvents("", "asc");
        this.props.getCustomerRegisteredEvents(localStorage.getItem('customer_id'));
        this.changePage = this.changePage.bind(this);
    }

    componentDidUpdate() {
        if (this.state && this.state.customerRegisterToEvent && this.state.customerRegisterToEvent === 'REGISTERED_EVENT') {
            this.setState({
                customerRegisterToEvent: null,
            })
        }
    }

    componentDidMount() {
        this.setState({
            search_input: '',
            order: 'asc',
        });
        if (!this.state || !(this.state.events && this.state.noRecord)) {
            this.props.getCustomerEvents("", "asc");
            this.props.getCustomerRegisteredEvents(localStorage.getItem('customer_id'));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.events) {
            var { events } = nextProps;

            if(events.noRecord){
                this.setState({
                    noRecord: events.noRecord,
                    events: [],
                });
            } else {
                console.log('CustomerEventsView -> componentWillReceiveProps -> events : ', events);
                this.setState({
                    events: events,
                    noRecord: false,
                    activePage: 1
                });
            }
        }

        if (nextProps.registered_events) {
            var { registered_events } = nextProps;
            this.setState({
                registered_events: registered_events,
            });
        }

        if (nextProps.customerRegisterToEvent) {
            var { customerRegisterToEvent } = nextProps;
            this.setState({
                customerRegisterToEvent: customerRegisterToEvent
            });
            this.props.getCustomerRegisteredEvents(localStorage.getItem('customer_id'));
        }
    }

    changePage = (e) => {
        let page = this.state.activePage;
        if (e.target.text === ">" && page !== parseInt(e.target.name)) {
            page += 1;
        } else if (e.target.text === "<" && page !== parseInt(e.target.name)) {
            page -= 1;
        } else {
            page = parseInt(e.target.name);
        }
        this.setState({
            activePage: page
        });
    };

    onSearchSubmit = (e) => {
        e.preventDefault();
        this.props.getCustomerEvents(this.state.search_input, this.state.order);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onChangeOrder = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        e.preventDefault();
        this.props.getCustomerEvents(this.state.search_input, e.target.value);
    }

    registerCustomer = (e) => {
        console.log("Event:", e);
        let customer_id = localStorage.getItem("customer_id");
        let data= {
            event_id: e.target.name,
            customer_id: customer_id,
        }
        console.log('______ Trying to register to : ', data);
        this.props.registerToEvent(data);
        this.props.getCustomerEvents(this.state.search_input, this.state.order);
        this.props.getCustomerRegisteredEvents(localStorage.getItem('customer_id'));
    }

    eventsView = (inputEvent) => {
        let index = -1;
        if (this.state.registered_events && this.state.registered_events === 'NO_EVENTS_REGISTERED') {
            console.log("No registered events, so no need to find index!");
        }
        else if (this.state.registered_events && this.state.registered_events[0]) {
            index = this.state.registered_events.findIndex(e => e.event_id === inputEvent.event_id)
        }
        console.log(index)
        let returnEvent = <Event registerYourself={this.registerCustomer} event={inputEvent} showRegister={index >= 0}/>;
        return returnEvent;
    };

    render() {
        let message = null,
            restEvent,
            eventRender = [],
            pagesBar = null,
            itemsToShow = 5,
            active = 1;

        if (this.state && this.state.activePage) {
            active = this.state.activePage;
        }
    
        if (this.state && !this.state.events) {
            message = <Alert variant="warning">No Events</Alert>;
        }

        if (this.state && this.state.noRecord) {
            message = <Alert variant="warning">No Events for the search</Alert>;
        }

        if (this.state && this.state.events && this.state.events.length > 0) {

            let events = this.state.events;
            let cardCount = 0;

            for (let i = (active - 1) * itemsToShow; i < events.length; i++) {
                console.log('**************** events : ', events[i]);
                restEvent = this.eventsView(this.state.events[i]);
                eventRender.push(restEvent);
                cardCount++;
                if (cardCount === itemsToShow)
                    break;
            }

            let pages = [];
            let pageCount = Math.ceil(events.length / itemsToShow);

            for (let i = 1; i <= pageCount; i++) {
                pages.push(
                    <Pagination.Item key={i} active={i === active} name={i} onClick={this.changePage}>
                        {i}
                    </Pagination.Item>
                );
            }
            pagesBar = (
                <div>
                    <br />
                    <Pagination>
                        <Pagination.Prev name="1" onClick={this.changePage} />
                        {pages}
                        <Pagination.Next name={pageCount} onClick={this.changePage} />
                    </Pagination>
                </div>
            );
        }

        return (
            <Container className="justify-content">
            <br />
            <center>
            <h3>Events</h3>
            <br />
            
            <form onSubmit={this.onSearchSubmit}>
                <InputGroup style={{ width: '50%' }} size="lg">
                    <FormControl
                        placeholder="Search Event By Name"
                        aria-label="Search Events"
                        aria-describedby="basic-addon2"
                        name="search_input"
                        onChange={this.onChange}
                    />
                    <InputGroup.Append>
                        <Button variant="primary" type="submit">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <br/>
                    <Form.Group as={Row} controlId="order"  style={{marginLeft:'30%'}}>
                        <Form.Label column sm="1">Order:</Form.Label>
                        <Col sm="4">
                            <Form.Control as="select" onChange={this.onChangeOrder} name="order" required>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
            </form>
            {message}
            <br />
            {eventRender}
            {pagesBar}
            </center>
        </Container>
        );
    }
}

const mapStateToProps = state => ({
    events: state.eventState.customerEvents,
    registered_events: state.eventState.customerRegisteredEvents,
    customerRegisterToEvent: state.eventState.customerRegisterToEvent, 
});

function mapDispatchToProps(dispatch) {
    return {
        getCustomerEvents: (search, order) => dispatch(getCustomerEvents(search, order)),
        getCustomerRegisteredEvents: (customer_id) => dispatch(getCustomerRegisteredEvents(customer_id)),
        registerToEvent:(data) => dispatch(registerToEvent(data)),
    };
}
      
export default connect(mapStateToProps, mapDispatchToProps)(CustomerEventsView);