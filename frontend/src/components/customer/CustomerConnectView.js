import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Alert, InputGroup, FormControl, Button, DropdownButton, Dropdown, Pagination } from "react-bootstrap";
import Connection from "./Connection";
import { getCustomers, followCustomer, getCustomersFollowing} from '../../redux/action/followActions'


class CustomerConnectView extends Component {
    

    constructor(props) {
        super(props);
        this.setState({
            search_input: '',
        });
        this.onChange = this.onChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.props.getCustomers('');
        this.props.getCustomersFollowing(localStorage.getItem('customer_id'));
        this.onLocationSelect = this.onLocationSelect.bind(this);
    }

    componentDidUpdate() {
        if (this.state && this.state.customerToFollow && this.state.customerToFollow === 'FOLLOWING_SUCCESSFULLY') {
            this.setState({
                customerToFollow: null,
            })
        }
    }

    componentDidMount() {
        this.setState({
            search_input: '',
        });
        if (!this.state || !(this.state.customers && this.state.noRecord)) {
            this.props.getCustomers('');
            this.props.getCustomersFollowing(localStorage.getItem('customer_id'));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customers) {
            var { customers } = nextProps;

            if(customers.noRecord){
                this.setState({
                    noRecord: customers.noRecord,
                    customers: [],
                    locationsList: [],
                    displayCustomers:[],
                });
            } else {
                console.log('CustomerConnectView -> componentWillReceiveProps -> customers : ', customers);
                this.setState({
                    customers: customers,
                    noRecord: false,
                    locationsList: nextProps.locationsList,
                    displayCustomers:customers,
                });
            }
        }

        if (nextProps.customersFollowing) {
            var { customersFollowing } = nextProps;
            this.setState({
                customersFollowing: customersFollowing,
            });
        }

        if (nextProps.customerToFollow) {
            var { customerToFollow } = nextProps;
            this.setState({
                customerToFollow: customerToFollow
            });
            this.props.getCustomersFollowing(localStorage.getItem('customer_id'));
        }
    }

    onSearchSubmit = (e) => {
        e.preventDefault();
        this.props.getCustomers(this.state.search_input);
        this.setState({
            activePage: 1
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    followCustomer = (e) => {
        console.log("Event e:", e);
        let customer_id = localStorage.getItem("customer_id");
        let data= {
            following_id: e.target.name,
            customer_id: customer_id,
        }
        console.log('______Trying to register to : ', data);
        this.props.followCustomer(data);
        this.props.getCustomers(this.state.search_input);
        this.props.getCustomersFollowing(localStorage.getItem('customer_id'));
    }

    customersView = (inputCustomer) => {
        console.log('###################### inputCustomer : ', inputCustomer)
        let index = -1;
        if (this.state.customersFollowing && this.state.customersFollowing === 'NO_FOLLOWING') {
            console.log("No registered customers, so no need to find index!");
        }
        else if (this.state.customersFollowing && this.state.customersFollowing[0]) {
            console.log('###################### customersFollowing : ', this.state.customersFollowing)
            index = this.state.customersFollowing.findIndex(e => e._id === inputCustomer.customer_id)
        }
        console.log(index)
        let returnCustomer = <Connection followUser={this.followCustomer} customer={inputCustomer} showFollow={index >= 0}/>;
        return returnCustomer;
    };

    onLocationSelect = (e) => {
        var filteredList = this.state.customers.filter(customer => customer.city === e.target.text);
        this.setState({
            displayCustomers: filteredList,
            activePage: 1
        });
        console.log('CustomerConnectView -> onLocationSelect -> filteredList of customers : ', filteredList);
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
        let message = null,
            customerRender = [],
            custCard = null,
            locationDropdown = null,
            pagesBar = null,
            active = 1,
            itemsToShow = 5;

        if (this.state && this.state.activePage) {
            active = this.state.activePage;
        }

        if (this.state && !this.state.customers) {
            message = <Alert variant="warning">No Yelpers have registered yet.</Alert>;
        }

        if (this.state && this.state.noRecord) {
            message = <Alert variant="warning">No Yelpers for the search</Alert>;
        }

        if (this.state && this.state.displayCustomers && this.state.displayCustomers.length > 0) {
            let cust = this.state.displayCustomers;
            let cardCount = 0;

            for (let i = (active - 1) * itemsToShow; i < cust.length; i++) {
                custCard = this.customersView(this.state.displayCustomers[i]);
                customerRender.push(custCard);
                cardCount++;
                if (cardCount === itemsToShow)
                    break;
            }

            let pages = [];
            let pageCount = Math.ceil(cust.length / itemsToShow);

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

        if (this.state && this.state.locationsList) {
            console.log("LocationList for Location Dropdown in Customer Home Page : ", this.state.locationsList);
            locationDropdown = this.state.locationsList.map(location => {
                console.log("locationDropdown");
                return (
                    <Dropdown.Item href="#" onClick={this.onLocationSelect}>{location}</Dropdown.Item>
                )
            })
        }

        return (
            <Container className="justify-content">
            <br />
            <center>
            <h3>Connect to Yelpers</h3>
            <br />
            <form onSubmit={this.onSearchSubmit}>
                <InputGroup style={{ width: '50%' }} size="lg">
                    <FormControl
                        placeholder="Search Yelper By Name"
                        aria-label="Search Yelpers"
                        aria-describedby="basic-addon2"
                        name="search_input"
                        onChange={this.onChange}
                    />
                    <InputGroup.Append>
                        <Button variant="primary" type="submit">Search</Button>
                    </InputGroup.Append>
                
                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title="Location"
                        id="input-group-dropdown-2"
                    >
                    {locationDropdown}
                    </DropdownButton>
                </InputGroup>
            </form>
            <br />
            {customerRender}
            <br/>
            {message}
            {pagesBar}
            </center>
        </Container>
        );
    }
}

const mapStateToProps = state => ({
    customers: state.followState.customers.customersList,
    customersFollowing: state.followState.customersFollowing,
    customerToFollow: state.followState.customerToFollow,
    locationsList: state.followState.customers.locationsList,
});

function mapDispatchToProps(dispatch) {
    return {
        getCustomers: (search) => dispatch(getCustomers(search)),
        getCustomersFollowing: (customer_id) => dispatch(getCustomersFollowing(customer_id)),
        followCustomer:(data) => dispatch(followCustomer(data)),
    };
}
      
export default connect(mapStateToProps, mapDispatchToProps)(CustomerConnectView);