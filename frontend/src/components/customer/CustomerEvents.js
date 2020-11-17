// View list of upcoming events in the order of increasing date
// 2. Search for event (using event name)
// 3. Click and view event details
// 4. Register for an event.
// 5. View list of registered events

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import CustomerEventsView from "../customer/CustomerEventsView";
import CustomerEventsRegistered from "../customer/CustomerEventsRegistered";

class CustomerEvents extends Component {
    constructor(props) {
        super(props);
        this.setState({
        activeTab: ""
        });
    
        this.onTabClick = this.onTabClick.bind(this);
    }
    
    componentWillMount(){
        document.title = "All Events"
    }
    onTabClick = e => {
        this.setState({
        activeTab: e.target.eventKey
        });
    };
    
    render() {
        let redirectVar = null;
        if (!localStorage.getItem("customer_id")) {
            redirectVar = <Redirect to="/" />
        }
    
        return (
        <div>
        
        {redirectVar}
            <div>
            <Router>
                <div>
                    <Nav defaultActiveKey="/c_events/view" className="flex-column">
                        <Nav.Link eventKey="1" as={NavLink} to="/c_events/view">All Events</Nav.Link>
                        <Nav.Link eventKey="2" as={NavLink} to="/c_events/register">Registered Events</Nav.Link>
                    </Nav>
                        <Route path="/c_events/view" component={CustomerEventsView}/>
                        <Route path="/c_events/register" component={CustomerEventsRegistered} exact/>
                </div>
            </Router>
            <center><Button href="/customer/home">Home</Button></center>
        </div>
        </div>
        );
    }
}
      
export default CustomerEvents;
