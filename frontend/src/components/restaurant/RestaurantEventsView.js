// View list of upcoming events in the order of increasing date

import React, { Component } from 'react';
import { Container, Alert, Pagination } from "react-bootstrap";
import Event from "./Event";
import { connect } from "react-redux";
import { getRestaurantEvents } from "../../redux/action/eventActions";
import PropTypes from 'prop-types';

class RestaurantEventsView extends Component {
    constructor(props) {
        super(props);
        this.setState({
            noRecord: false,
        });
        this.changePage = this.changePage.bind(this);
    }

    componentWillMount() {
        this.props.getRestaurantEvents(localStorage.getItem("restaurant_id"));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.events) {
            var { events } = nextProps;

            if(events.noRecord){
                this.setState({
                    noRecord: events,
                    eventsList: [],
                });
            } else {
                console.log('RestaurantEventsView -> componentWillReceiveProps -> events : ', events);
                this.setState({
                    eventsList: events.eventsList,
                    activePage: 1
                });
            }
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
    
    render() {
        let noRecordMessage = null,
            eventCards = [],
            eventCard = null,
            pagesBar = null,
            itemsToShow = 5,
            active = 1;

        if (this.state && this.state.activePage) {
            active = this.state.activePage;
        }

        if (this.state && this.state.noRecord) {
            noRecordMessage = (
                <Alert variant="warning">
                    No events created.
                </Alert>
            );
        }
        
        if (this.state && this.state.eventsList.length > 0) {

            let events = this.state.eventsList;
            let cardCount = 0;

            for (let i = (active - 1) * itemsToShow; i < events.length; i++) {
                console.log('**************** events : ', events[i]);
                eventCard = (
                    <Event key={events[i]._id} event={events[i]}/>
                );
                eventCards.push(eventCard);
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
                <h3>Events</h3>
                {noRecordMessage}

                {eventCards}
                {pagesBar}
            </Container>
        );
    }
}

RestaurantEventsView.propTypes = {
    events: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    events: state.eventState.restaurantEvents,
});

function mapDispatchToProps(dispatch) {
    return {
        getRestaurantEvents: restaurant_id => dispatch(getRestaurantEvents(restaurant_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantEventsView);
