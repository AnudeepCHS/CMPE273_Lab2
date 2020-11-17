// 4. Add/Edit Dishes in menu (with Dish name, Main Ingredients, Dish Images, Dish Price,
// description, dish category – Appetizer, Salads, Main Course , Desserts, Beverages)
// 5. View list of dishes added by them.

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import RestaurantMenuView from "../restaurant/RestaurantMenuView";
import RestaurantMenuAdd from "../restaurant/RestaurantMenuAdd";
import RestaurantMenuEdit from '../restaurant/RestaurantMenuEdit';

class RestaurantMenu extends Component {
    constructor(props) {
        super(props);
        this.setState({
        activeTab: ""
        });
    
        this.onTabClick = this.onTabClick.bind(this);
    }
    
    componentWillMount(){
        document.title = "Your Menu"
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
            <Router>
                <div>
                    <Nav defaultActiveKey="/r_menu/view" className="flex-column">
                        <Nav.Link eventKey="1" as={NavLink} to="/r_menu/view">Restaurant Menu</Nav.Link>
                        <Nav.Link eventKey="2" as={NavLink} to="/r_menu/add">Add Dish</Nav.Link>
                    </Nav>
                        <Route path="/r_menu/view" component={RestaurantMenuView} exact/>
                        <Route path="/r_menu/add" component={RestaurantMenuAdd} exact/>
                        <Route path="/r_menu/update" component={RestaurantMenuEdit} exact/>
                </div>
            </Router>
            
        </div>
        </div>
        );
    }
}
      
export default RestaurantMenu;