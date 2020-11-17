// 1. Post events(event name, description, time, date, location, hashtags)
// 2. View list of people who registered for the events.
// 3. Click on name and view another’s person profile.

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import RestaurantEventsView from "../restaurant/RestaurantEventsView";
import RestaurantEventsAdd from "../restaurant/RestaurantEventsAdd";
import RestaurantEventsDetails from '../restaurant/RestaurantEventsDetails';
import RestaurantMessage from './RestaurantMessage';

class RestaurantEvents extends Component {
    constructor(props) {
        super(props);
        this.setState({
        activeTab: ""
        });
    
        this.onTabClick = this.onTabClick.bind(this);
    }
    
    componentWillMount(){
        document.title = "Your Events"
    }
    onTabClick = e => {
        this.setState({
        activeTab: e.target.eventKey
        });
    };
    
    render() {
        let redirectVar = null;
        if (!localStorage.getItem("restaurant_id")) {
            redirectVar = <Redirect to="/" />
        }
    
        return (
        <div>
            {redirectVar}
            <div>
                <div>
                    <Nav defaultActiveKey="/r_events/view" className="flex-column">
                        <Nav.Link eventKey="1" as={NavLink} to="/r_events/view">Restaurant Events</Nav.Link>
                        <Nav.Link eventKey="2" as={NavLink} to="/r_events/add">Add Event</Nav.Link>
                    </Nav>
                </div>
            </div>
        </div>
        );
    }
}
      
export default RestaurantEvents;