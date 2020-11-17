import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../redux/action/commonActions'
import '../../App.css';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import logo from '../../images/yelp_logo.png';

//create the Navbar Component
class HeaderNavbar extends Component {
    constructor(){
        super();
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        window.localStorage.clear();
        this.props.logout();
    }

    render(){

        //if Cookie is set render Logout Button
        let navOptions = null;

        if (localStorage.getItem("token")) {
            console.log("I am in Navbar. I have a JWT Token.");
            var id;
            if (localStorage.getItem("customer_id")) {
                console.log('Local Storage Value of Customer: ',localStorage.getItem("customer_id"));
                id  = localStorage.getItem("customer_id");
            }

            if(localStorage.getItem("restaurant_id")) {
                console.log('Local Storage Value of Restaurant: ',localStorage.getItem("restaurant_id"));
                id = localStorage.getItem("restaurant_id");
            }
            
            if(localStorage.getItem("restaurant_id")) {
                navOptions = (
                    <div class="collapse navbar-collapse navbar-right">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav.Link>
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="dropdown-basic">
                                    Hi Restaurant!
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item><Link to="/r_home">Home</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/r_profile">Profile</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/r_menu/view">Menu</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/r_events/view">Events</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/r_orders">Orders</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/r_reviews">Reviews</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/" onClick = {this.handleLogout}>Logout</Link></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Link>   
                    </div>
                );
            }
            if(localStorage.getItem("customer_id")) {
                  navOptions = (
                    <div class="collapse navbar-collapse navbar-right">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav.Link>
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="dropdown-basic">
                                    Hi, Customer!
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item><Link to="/customer/home">Home</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/c_profile">Profile</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/c_cart">Cart</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/c_orders">Order History</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/c_events/view">Events</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/c_connect/view">Connections</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/c_messages">Messages</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to="/" onClick = {this.handleLogout}>Logout</Link></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Link>   
                    </div>
                );
            }
        } 
        else {
            //Else display login button
            this.handleLogout();
            console.log("I am in Navbar. I dont have any JWT Token.");
            navOptions = (
                <div class="collapse navbar-collapse navbar-right" id="navbarNav">
            <Nav className="mr-auto">
            </Nav>
            <Nav.Link>
                <Link class= "btn btn-primary" to="/c_login"><span class="glyphicon glyphicon-log-in"></span> Log In</Link>
            </Nav.Link>
            <Nav.Link>
                <Link class= "btn btn-primary" to="/r_login"><span class="glyphicon glyphicon-log-in"></span> Log In as Restautant </Link>
            </Nav.Link>
            <Nav.Link> 
                <Link class= "btn btn-primary" to="/c_signup">New to yelp? Signup here
                </Link>
            </Nav.Link>

          </div>
            )
        }
        let redirectVar = null;
        if(!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/home"/>
        }
        return(
            <div>
            {redirectVar}
            <Navbar bg="light" variant="light">    
                <Navbar.Brand>
                    <img src={logo} width="100" height="auto" class="d-inline-block align-top" alt="Yelp" />
                </Navbar.Brand>
                {navOptions}
            </Navbar>
        </div>
        )
    }
}

export default connect(null, { logout }) (HeaderNavbar);