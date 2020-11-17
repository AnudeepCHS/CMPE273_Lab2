import React, { Component } from 'react';
import { connect } from "react-redux";
import { getCustomersFollowing } from '../../redux/action/followActions'
import { Container, Alert, Button } from "react-bootstrap";
import Connection from "./Connection";

class CustomerConnectFollowing extends Component {
    constructor(props) {
        super(props);
        this.setState({
        });
    }

    componentWillMount() {
        this.props.getCustomersFollowing(localStorage.getItem("customer_id"))
        this.setState({
            customersFollowing: null
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customersFollowing) {
            var { customersFollowing } = nextProps;

            console.log('CustomerConnectFollowing -> componentWillReceiveProps -> customersFollowing : ', customersFollowing);
            this.setState({
                customersFollowing: customersFollowing,
            });
        }
    }

    customersView = (inputCustomer) => {
        console.log('CustomerConnectFollowing.js -> customersView -> inputCustomer : ', inputCustomer);
        let returnCustomer = <Connection followUser={this.followCustomer} customer={inputCustomer} showFollow={true}/>;
        return returnCustomer;
    };
    
    render() {
        let message = null,
            yelpCustomers,
            customerRender = [];

        if (this.state && this.state.noRecord) {
            message = <Alert variant="warning">Unable to Fetch Events. PLease retry in sometime</Alert>;
        }

        if (this.state && !this.state.customersFollowing) {
            message = <Alert variant="warning">No Yelpers have Registered yet.</Alert>;
        }
        
        if (this.state && this.state.customersFollowing && this.state.customersFollowing === 'NO_FOLLOWING') {
            message = <Alert variant="warning">Not Following any Yelper so far.</Alert>;
        } else if (this.state && this.state.customersFollowing && this.state.customersFollowing.length > 0) {
            console.log('this.state.customersFollowing', this.state.customersFollowing);
            for (var i = 0; i < this.state.customersFollowing.length; i++) {
                yelpCustomers = this.customersView(this.state.customersFollowing[i]);
                customerRender.push(yelpCustomers);
            }
        }

        return (
            <Container className="justify-content">
            <center>
            <br />
            <h3>Following Yelpers</h3>
            {message}
            
            {customerRender}
            <Button href="/c_connect/view"> View All Yelpers List</Button>
            <br/>
            <br />
            </center>
        </Container>
        );
    }
}

const mapStateToProps = state => ({
    customersFollowing: state.followState.customersFollowing,
});

function mapDispatchToProps(dispatch) {
    return {
        getCustomersFollowing: customer_id => dispatch(getCustomersFollowing(customer_id))
    };
}
      
export default connect(mapStateToProps, mapDispatchToProps)(CustomerConnectFollowing);