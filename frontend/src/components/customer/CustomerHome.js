

import React, { Component } from 'react';
import { InputGroup, FormControl, Button, DropdownButton, ListGroup, Row, Col, Dropdown, Alert, Pagination} from 'react-bootstrap';
import CustomerRestaurantSearchCard from './CustomerRestaurantSearchCard';
import ReactGoogleMaps from "./ReactGoogleMaps";
import { getRestaurantSearch } from "../../redux/action/customerActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class CustomerHome extends Component {
    constructor(props) {
        super(props);
        this.setState({
            search_input: "",
            noRecord: false
        });

        this.onChange = this.onChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
        this.onLocationSelect = this.onLocationSelect.bind(this);
        this.onDeliveryMethodSelect = this.onDeliveryMethodSelect.bind(this);
    }

    
    componentDidMount() {
        this.props.getRestaurantSearch("_");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchResult) {
            var { searchResult } = nextProps;

            if(searchResult.noRecord){
                this.setState({
                    noRecord: searchResult.noRecord,
                    displayRestaurants: [],
                    locationsList: [],
                    deliverMethodsList: []
                });
            } else {
                console.log('CustomerHome -> componentWillReceiveProps -> searchResult : ', searchResult);
                this.setState({
                        restaurantList: searchResult.restaurantList,
                        displayRestaurants: searchResult.restaurantList,
                        locationsList: searchResult.locationsList,
                        deliverMethodsList: searchResult.deliverMethodsList
                });
            }
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            noRecord: false
        });
    }

    onSearchSubmit = (e) => {
        e.preventDefault();
        if (this.state) {
            var searchInput = typeof this.state.search_input === "undefined" || this.state.search_input === "" ? "_" : this.state.search_input;
            this.props.getRestaurantSearch(searchInput);
            this.setState({
                activePage: 1
            });
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

    onLocationSelect = (e) => {
        var filteredList = this.state.restaurantList.filter(restaurant => restaurant.location === e.target.text);
        this.setState({
            displayRestaurants: filteredList,
            activePage: 1
        });
        console.log('CustomerHome -> onLocationSelect -> filteredList of restaurants : ', filteredList);
    }

    onDeliveryMethodSelect = (e) => {
        var filteredList = this.state.restaurantList
            .filter(restaurant => restaurant.delivery_method !== null)
            .filter(restaurant => restaurant.delivery_method.includes(e.target.text));
        this.setState({
            displayRestaurants: filteredList,
            activePage: 1
        });
        console.log('CustomerHome -> onDeliveryMethodSelect -> filteredList of restaurants : ', filteredList);
    }

    render() {

        var locationDropdown = null,
            deliveryMethodDropdown = null,
            restaurantCards = [],
            resCard = null,
            pagesBar = null,
            active = 1,
            itemsToShow = 5,
            noRecordMessage = null;

        if (this.state && this.state.activePage) {
            active = this.state.activePage;
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

        if (this.state && this.state.deliverMethodsList) {
            console.log("deliveryList for Delivery Dropdown in Customer Home Page : ", this.state.deliverMethodsList);
            deliveryMethodDropdown = this.state.deliverMethodsList.map(deliveryType => {
                console.log("deliveryMethodDropdown");
                return (
                    <Dropdown.Item href="#" onClick={this.onDeliveryMethodSelect}>{deliveryType}</Dropdown.Item>
                )
            })
        }

      if (this.state && this.state.noRecord) {
            noRecordMessage = (
                <Alert variant="warning">
                    No restaurants have partnered with us.
                </Alert>
            );
        }
        else {
            noRecordMessage = null;
        }

        if (this.state && this.state.displayRestaurants) {
            let restaurants = this.state.displayRestaurants;
            let cardCount = 0;
            for (let i = (active - 1) * itemsToShow; i < restaurants.length; i++) {
                resCard = (
                    <Col sm={3} >
                        <CustomerRestaurantSearchCard key={restaurants[i]._id} restaurant={restaurants[i]} />
                    </Col>
                );
                restaurantCards.push(resCard);
                cardCount++;
                if (cardCount === itemsToShow)
                    break;
            }

            let pages = [];
            let pageCount = Math.ceil(restaurants.length / itemsToShow);

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

            var locations=[];
            this.state.displayRestaurants
                .filter(restaurantToDisplay => restaurantToDisplay.map_location !== null)
                .map(restaurantToDisplay => {
                    locations.push({
                        lat: parseFloat(restaurantToDisplay.map_location.split(",")[0]), 
                        lng: parseFloat(restaurantToDisplay.map_location.split(",")[1]), 
                    });
                })
            
            console.log("Google Maps Location Pins", locations)
        }

        let googleMaps =null;
        if(this.state && locations && locations[0]) {
            googleMaps = <ReactGoogleMaps locations={locations}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCSEcpgPEGOEYcnDe4N68Ptex96GKMtOLE&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} 
                    />}
                />
        }
        
        return (
            <div>
                <center>
                <form onSubmit={this.onSearchSubmit}>
                <br/><br/>
                    <InputGroup style={{ width: '70%' }} size="lg">
                        <FormControl
                            placeholder="Enter Restaurant Name"
                            aria-label="Search Restaurants"
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
                        <DropdownButton
                            as={InputGroup.Append}
                            variant="outline-secondary"
                            title="Delivery Method"
                            id="input-group-dropdown-2"
                        >
                        {deliveryMethodDropdown}
                        </DropdownButton>
                    </InputGroup>
                </form>
                {noRecordMessage}
                </center>
                <Row>
                <Col style={{ margin: '2rem', width: '20rem' }}>
                <ListGroup style={{ width: '20rem',hieght: '10rem' }}>
                    {restaurantCards}
                </ListGroup>
                </Col>
                <Col align='right' style={{ margin: '4rem', width: '20rem' }}>
                    <div style={{ width: '70%' }}>
                {googleMaps}</div>
                </Col>
               </Row>
               <Row>
                    <Col sm={5}></Col>
                    <Col>{pagesBar}</Col>
               </Row>
            </div>

        )
    }
}

CustomerHome.propTypes = {
    getRestaurantSearch: PropTypes.func.isRequired,
    searchResult: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    searchResult: state.restaurantSearchState.restaurant_data
});

export default connect(mapStateToProps, { getRestaurantSearch })(CustomerHome);


/*  if (this.state && this.state.noRecord && this.state.search_input === "") {
            noRecordMessage = (
                <Alert variant="warning">
                    No restaurants have partnered with us.
                </Alert>
            );
        }
        else */
