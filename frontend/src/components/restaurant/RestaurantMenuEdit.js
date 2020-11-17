// 4. Add/Edit Dishes in menu (with Dish name, Main Ingredients, Dish Images, Dish Price,
// description, dish category – Appetizer, Salads, Main Course , Desserts, Beverages)
// 5. View list of dishes added by them.

import React, { Component } from 'react';
import { Carousel, Form, Col, Row, Button, Alert} from "react-bootstrap";
import yelp_logo from "../../images/yelp.png";
import backend from '../common/serverDetails';
import { putDish } from "../../redux/action/menuActions";
import { uploadDishImage } from "../../redux/action/imageUploadActions";
import { connect } from "react-redux";

class RestaurantMenuEdit extends Component {
    constructor(props) {
        super(props);
        this.setState({
            errorFlag : false,
            successFlag : false,
        });
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount () {
        let dish = this.props.location.state.dish;
        this.setState({
            id: dish._id, 
            name: dish.name,
            ingredients: dish.ingredients,
            description: dish.description,
            price: dish.price,
            category: dish.category,
            dishImageIds: dish.dish_image
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateDishStatus && nextProps.updateDishStatus !== this.props.updateDishStatus) {
            var { updateDishStatus } = nextProps;
            this.setState({
                updateDishStatus: updateDishStatus
            });
        }
        if (nextProps.dish_image && nextProps.dish_image !== this.props.dish_image) {
            var { dish_image } = nextProps;
            var { dishImageIds } = this.state;
            if (dishImageIds && dishImageIds[0]) {
                dishImageIds.push(dish_image);
            } else {
                dishImageIds = [dish_image];
            }
            this.setState({
                dishImageIds: dishImageIds
            });
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const data = {
            rest_id: localStorage.getItem("restaurant_id"),
            dish_id: this.state.id,
            name: this.state.name,
            ingredients: this.state.ingredients,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category,
        };
        this.props.updateDish(data);
    };

    getImageCarouselItem = (imageId) => {
        let imageSrcUrl = `${backend}/images/dishes/${this.state.id}/details/${imageId}`;
        console.log(imageSrcUrl);
        return <Carousel.Item>
            <img
            style = {{width:'30rem', height:'20rem'}}
            src={imageSrcUrl}
            alt="First slide"
            />
        </Carousel.Item>
    }

    onImageChoose = (e) => {
        this.setState({
            successImageUpload: false,
            file: e.target.files[0],
            fileName: e.target.files[0].name
        });
    }

    onUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.file);
        const headers = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        this.props.uploadDishImage(this.state.id, formData, headers);
    }

    render() {

        let carouselList = [], carousel;
        let successImageUploadMessage;

        if (this.state && this.state.dishImageIds && this.state.dishImageIds[0]) {
            for (var i = 0; i < this.state.dishImageIds.length; i++) {
                carousel = this.getImageCarouselItem(this.state.dishImageIds[i]);
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

        if (this.state && this.state.successImageUpload) {
            successImageUploadMessage = <Alert variant="success">Successfully Uploaded Image</Alert>
        }

        var errorMessage = null;
        if(this.state && this.state.updateDishStatus) {
            if (this.state.updateDishStatus === 'DISH_EDITED') {
                errorMessage = <Alert variant="success">Dish Updated Successfully</Alert>;
            } else {
                errorMessage = <Alert variant="error">Dish Update Failed</Alert>;
            }
        }
        return(
            
            <div>
            <center><h2>Update A Dish</h2></center>
                <Row>
                    <Col xs={6} md={4}>
                     <Carousel style={{marginLeft : '5rem'}}>
                        {carouselList}
                    </Carousel>   
                    <form style={{marginLeft : '5rem'}} onSubmit={this.onUpload}><br /><br /><br />
                            <div class="custom-file" style={{width: "80%"}}>
                                <input type="file" multiple class="custom-file-input" name="image" accept="image/*" onChange={this.onImageChoose} required/>
                                <label class="custom-file-label" for="image">{this.state.fileName}</label>
                            </div><br/><br/>
                            <Button type="submit" variant="primary">Upload Image</Button>
                        </form>
                    </Col>
                    <Col>
                        <br />
                        {errorMessage}
                        
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="name">
                                <Form.Label column sm="3">
                                    Name:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" name="name" placeholder="Enter Dish Name" onChange={this.onChange} defaultValue={this.state.name} pattern="^[A-Za-z0-9 ]+$" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="description">
                                <Form.Label column sm="3">
                                    Description:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" name="description" placeholder="Description of the dish" onChange={this.onChange} defaultValue={this.state.description} pattern="^[A-Za-z0-9 ,.-]+$" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="ingredients">
                                <Form.Label column sm="3">
                                    Ingredients:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" name="ingredients" placeholder="Ingredients in the dish" onChange={this.onChange} defaultValue={this.state.ingredients} pattern="^[A-Za-z ,.-]+$" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="price">
                                <Form.Label column sm="3">Price: </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" name="price" placeholder="Enter Dish Price" onChange={this.onChange} defaultValue={this.state.price} pattern="^(\d*\.)?\d+$" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="category">
                                <Form.Label column sm="3">Category:</Form.Label>
                                <Col sm="4">
                                    <Form.Control as="select" onChange={this.onChange} defaultValue={this.state.category} name="category" required>
                                        <option>Appetizer</option>
                                        <option>Salads</option>
                                        <option>Main Course</option>
                                        <option>Desserts</option>
                                        <option>Beverages</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <br/>
                            <Button style={{marginLeft:"22rem"}} variant="danger" href="/r_menu/view">Cancel</Button>  {''}
                            <Button type="sumbit">Update Dish</Button>
                            <br/>
                            <br/>   
                        </Form>
                    </Col>
                </Row>
                {successImageUploadMessage}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    updateDishStatus: state.menuState.updateDishStatus,
    dish_image: state.imageState.dish_image,
});

function mapDispatchToProps(dispatch) {
    return {
        updateDish: data => dispatch(putDish(data)),
        uploadDishImage: (dish_id, formData, uploadImageConfig) => 
            dispatch(uploadDishImage(dish_id, formData, uploadImageConfig))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (RestaurantMenuEdit);