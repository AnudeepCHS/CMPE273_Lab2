// Update restaurant profile (name, location, description, contact information, pictures of restaurant and dishes, timings)
// TODO: Update the restaurant Image

import React, {Component} from 'react';
import PropTypes from "prop-types";
import '../../App.css';
import { Carousel, Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { updateRestaurant, getRestaurant } from "../../redux/action/restaurantActions";
import { uploadRestaurantImage } from '../../redux/action/imageUploadActions';
import { Redirect } from 'react-router';
import yelp_logo from "../../images/yelp.png";
import backend from '../common/serverDetails';

class RestaurantProfileForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fileName: "Browse Image To Upload",
            rest_images: []
        };
        this.onChange = this.onChange.bind(this);
        this.onImageChoose = this.onImageChoose.bind(this);
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
                rest_images: nextProps.restaurant.rest_images,
                cuisine: nextProps.restaurant.cuisine,
            })
        }

        if (nextProps.rest_image_new && this.props.rest_image_new !== nextProps.rest_image_new) {
            var { rest_image_new } = nextProps;

            if (typeof rest_image_new === "string") {
                var rest_images_in_state = this.state.rest_images;
                this.setState({
                    fileName: "Browse Image To Upload",
                    rest_images: [ ...rest_images_in_state, rest_image_new]
                });
            }
        }
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onImageChoose = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name
        });
    }

    onRestaurantUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();
        console.log("on update of restaurant profile");
        let data = Object.assign({}, this.state);
        this.props.updateRestaurant(data);
    };

    onPictureUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.file);
        const imageConfig = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        this.props.uploadRestaurantImage(formData, imageConfig);
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
        let carouselList = [], carousel;

        console.log("State: ", this.state);

        let redirectVar = null;
        if (!localStorage.getItem("token") || !localStorage.getItem("restaurant_id")) {
            redirectVar = <Redirect to="/home" />
        }

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

        console.log("State: ", this.state);
        let message = null;

        if(this.props.status && this.props.status === 'RESTAURANT_UPDATE_SUCCESSFUL') {
            message = (
                <div>
                    <p style={{ color: "green" }}> Update Successful. </p>
                </div>
            );
        } else if(this.props.status && this.props.status === 'RESTAURANT_UPDATE_FAILED') {
            message = (
                <div>
                    <p style={{ color: "red" }}> Error Updating Customer. Please try again later. </p>
                </div>
            );
        }
        return (
            <div>
            {redirectVar}
            <br/><br/>
            <center><b>{message}</b></center>
            <br/>
                <Container style={{ marginLeft:'3rem', marginRight:'3rem' }} fluid={true}>
                    <Row>
                        <Col xs={6} md={4}>
                        <center>
                        <Card style={{ width: '30rem' }}>
                        <Carousel>
                            {carouselList}
                        </Carousel>
                        </Card>
                        <form onSubmit={this.onPictureUpload}><br /><br /><br />
                            <div class="custom-file" style={{width: "80%"}}>
                                <input type="file" multiple class="custom-file-input" name="image" accept="image/*" onChange={this.onImageChoose} required/>
                                <label class="custom-file-label" for="image">{this.state.fileName}</label>
                            </div><br/><br/>
                            <Button type="submit" variant="primary">Upload Image</Button>
                        </form>
                        </center>
                        </Col>
                        <Col xs={2} md={1}></Col>
                        <Col style={{ width: '55rem' }}>
                            <h4>Update {this.state.name}'s Profile</h4>
                            <br />
                            <Form onSubmit={this.onRestaurantUpdate} >
                                <Form.Row>
                                    <Form.Group as={Row} controlId="name">
                                        <br/>
                                        <Form.Label style={{ width: '15rem' }}>Restaurant Name</Form.Label>
                                        <Form.Control name="name"
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.name}
                                            pattern="^[A-Za-z0-9 ]+$"
                                            required={true}
                                            placeholder="Update Restaurant Name" 
                                            style={{ width: '30rem' }}
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="description">
                                        <Form.Label style={{ width: '15rem' }}>Description</Form.Label>
                                        <Form.Control name="description"
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.description}
                                            pattern="^[A-Za-z0-9 ,.]+$"
                                            required={true}
                                            placeholder="Update Restaurant Description" 
                                            style={{ width: '30rem' }}
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="location">
                                        <Form.Label style={{ width: '15rem' }}>Location</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="location"
                                            onChange={this.onChange}
                                            value={this.state.location}
                                            pattern="^[A-Za-z0-9 ,.]+$"
                                            required={true}
                                            placeholder="Update Location"
                                            style={{ width: '30rem' }}
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="email_id">
                                        <Form.Label style={{ width: '15rem' }}>Email</Form.Label>
                                        <Form.Control 
                                            type="email"
                                            name="email_id"
                                            value={this.state.email_id}
                                            disabled 
                                            readonly
                                            style={{ width: '30rem' }}
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="phone">
                                        <Form.Label style={{ width: '15rem' }}>Phone Number</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="phone"
                                            onChange={this.onChange}
                                            value={this.state.phone}
                                            required={true}
                                            pattern="^[0-9]+$"
                                            placeholder="Update Phone Number"
                                            style={{ width: '30rem' }}
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="timings">
                                        <Form.Label style={{ width: '15rem' }}>Timings</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="timings"
                                            onChange={this.onChange}
                                            value={this.state.timings}
                                            required={true}
                                            pattern="^[0-9 :-]+$"
                                            placeholder="Update Timings"
                                            style={{ width: '30rem' }}
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="timings">
                                        <Form.Label style={{ width: '15rem' }}>Cuisine</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="cuisine"
                                            onChange={this.onChange}
                                            value={this.state.cuisine}
                                            required={true}
                                            pattern="^[A-Za-z0-9 ,.]+$"
                                            placeholder="Update Cuisine"
                                            style={{ width: '30rem' }}
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="delivery_method">
                                        <Form.Label style={{ width: '15rem' }}>Delivery Method</Form.Label>
                                        <Form.Control as="select" 
                                            onChange={this.onChange} 
                                            name="delivery_method" 
                                            defaultValue={this.state.delivery_method} 
                                            required
                                            value={this.state.delivery_method}
                                            style={{ width: '30rem' }}
                                            >
                                                <option>Home Delivery</option>
                                                <option>Pick Up</option>
                                                <option>Dine In</option>
                                                <option>Home Delivery, Pick Up</option>
                                                <option>Home Delivery, Dine In</option>
                                                <option>Pick Up, Dine In</option>
                                                <option>Home Delivery, Pick Up, Dine In</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="map_location">
                                        <Form.Label style={{ width: '15rem' }}>Location in Longitude and Latitude</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="map_location"
                                            onChange={this.onChange}
                                            value={this.state.map_location}
                                            required={true}
                                            pattern="^[0-9 .:- N S E W]+$"
                                            placeholder="Update Latitude and Longitude"
                                            style={{ width: '30rem' }}
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Button style={{marginLeft:"31rem"}} variant="danger"  href="/r_home">Cancel</Button> {' '}
                                <Button type="submit" variant="primary">Update Details</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

RestaurantProfileForm.propTypes = {
    updateRestaurant: PropTypes.func.isRequired,
    restaurant: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
      restaurant: state.profileState.restaurantProfile,
      status: state.profileState.status,
      rest_image_new: state.imageState.rest_image,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getRestaurant: restaurant_id => dispatch(getRestaurant(restaurant_id)),
        updateRestaurant: data => dispatch(updateRestaurant(data)),
        uploadRestaurantImage: (formData, uploadConfig) => dispatch(uploadRestaurantImage(formData,uploadConfig)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantProfileForm);