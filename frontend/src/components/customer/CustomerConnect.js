import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import CustomerConnectView from "./CustomerConnectView";
import CustomerConnectFollowing from "./CustomerConnectFollowing";

class CustomerConnect extends Component {
    constructor(props) {
        super(props);
        this.setState({
        activeTab: ""
        });
    
        this.onTabClick = this.onTabClick.bind(this);
    }
    
    componentWillMount(){
        document.title = "Connect to Yelpers"
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
                    <Nav defaultActiveKey="/c_connect/view" className="flex-column">
                        <Nav.Link eventKey="1" as={NavLink} to="/c_connect/view">All Yelpers</Nav.Link>
                        <Nav.Link eventKey="2" as={NavLink} to="/c_connect/follow">Following</Nav.Link>
                    </Nav>
                        <Route path="/c_connect/view" component={CustomerConnectView}/>
                        <Route path="/c_connect/follow" component={CustomerConnectFollowing} exact/>
                </div>
            </Router>
            <center><Button href="/customer/home">Home</Button></center>
        </div>
        </div>
        );
    }
}
      
export default CustomerConnect;
