// Restaurant page (Dashboard – Landing page):
// 1. View restaurant profile – having all basic information about restaurant (name, location, description, contact information, pictures of restaurant and dishes, timings)
// 2. TODO: Update the restaurant Image
// 3. View orders list

import React, {Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import { Card, Container, Table,Row, Col, Carousel} from "react-bootstrap";
import backend from '../common/serverDetails';
import { getRestaurant } from "../../redux/action/restaurantActions";
import yelp_logo from "../../images/yelp.png";
import { connect } from "react-redux";

class RestaurantHome extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {};
    }

    componentWillMount() {
        this.props.getRestaurant(localStorage.getItem("restaurant_id"));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.restaurant) {
            this.setState({
                id: nextProps.restaurant.restaurnt_id,
                name: nextProps.restaurant.name,
                phone: nextProps.restaurant.phone,
                email_id: nextProps.restaurant.email_id,
                description: nextProps.restaurant.description,
                location: nextProps.restaurant.location,
                timings: nextProps.restaurant.timings,
                delivery_method: nextProps.restaurant.delivery_method,
                map_location: nextProps.restaurant.map_location,
                rest_images: nextProps.restaurant.rest_images
            })
        }
    }

    getImageCarouselItem = (imageId) => {
        let rest_id = localStorage.getItem("restaurant_id");
        let imageSrcUrl = `${backend}/images/restaurants/${rest_id}/profile/${imageId}`;
        console.log(imageSrcUrl);
        return <Carousel.Item>
            <img
            style = {{width:'30rem', height:'20rem'}}
            src={imageSrcUrl}
            alt="First slide"
            />
        </Carousel.Item>
    }

    render() {
        console.log("State: ", this.state);
        var restaurantDetailsTable = null;
        let redirectVar = null;
        let carouselList = [], carousel;

        if (this.state && this.state.rest_images && this.state.rest_images[0]) {
            for (var i = 0; i < this.state.rest_images.length; i++) {
                carousel = this.getImageCarouselItem(this.state.rest_images[i]);
                carouselList.push(carousel);
            }
        } else {
            carousel = <Carousel.Item>
                            <img
                            style = {{width:'30rem', height:'20rem'}}
                            src={yelp_logo}
                            alt="First slide"
                            />
                        </Carousel.Item>
            carouselList.push(carousel);
        }
        console.log(carouselList);

        if(this.props.restaurant) {
            restaurantDetailsTable = (<center>
                <Card>
                <Row>
                <Col>
                <br/><br/>
                    <Card.Title>
                        <h1>{this.props.restaurant.name}</h1>
                    </Card.Title>

                    <Carousel>
                        {carouselList}
                    </Carousel>
                    <br/><br/>
                    </Col>
                    <Col>
                    <Card.Body>
                        <Table style={{ width: "100%", fontSize:"18px" }}>
                            <tbody>
                                <tr>
                                    <td >Email Id</td>
                                    <td></td>
                                    <td align="left">{this.props.restaurant.email_id}</td>
                                </tr>
                                <tr>
                                    <td >Location</td>
                                    <td></td>
                                    <td align="left">{this.props.restaurant.location}</td>
                                </tr>
                                <tr>
                                    <td >Phone Number</td>
                                    <td></td>
                                    <td align="left">{this.props.restaurant.phone}</td>
                                </tr>
                                <tr>
                                    <td >Description</td>
                                    <td></td>
                                    <td align="left">{this.props.restaurant.description}</td>
                                </tr>
                                <tr>
                                    <td >Timings</td>
                                    <td></td>
                                    <td align="left">{this.props.restaurant.timings}</td>
                                </tr>
                                <tr>
                                    <td >Delivery Method</td>
                                    <td></td>
                                    <td align="left">{this.props.restaurant.delivery_method}</td>
                                </tr>
                            </tbody>
                        </Table>
                        
                    </Card.Body>
                    </Col>
                    </Row>
                    <Link align="center" style={{ width: "20%", marginLeft: '2rem', fontSize:"18px" }} to="/r_profile" class="btn btn-primary">Edit Profile</Link>
                    <br/>
                    <br/>
                </Card>
                <br/>
                <br/>
            </center>
            
            );
        }
        return (
            <div>
                {redirectVar}
                <Container className="justify-content">
                <br/><br/>
                    {restaurantDetailsTable}
                </Container>
            </div>
        );    
    }
}

const mapStateToProps = state => {
    return {
      restaurant: state.profileState.restaurantProfile,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getRestaurant: restaurant_id => dispatch(getRestaurant(restaurant_id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantHome);