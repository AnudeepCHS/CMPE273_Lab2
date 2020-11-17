// 1. View Restaurant Page
// 2. Add insightful reviews( date, ratings, comments)
// 3. Order food from the page, select delivery method.

import React, { Component } from 'react';
import { Card, Container, ListGroup, Row, Col, Form, Button, ButtonGroup, Carousel, Pagination } from "react-bootstrap";
import CustomerMenuDish from './CustomerMenuDish';
import yelp_logo from "../../images/yelp_logo.png";
import backend from '../common/serverDetails';
import { postRestaurantReview } from "../../redux/action/reviewsAction";
import { customerMenuGet } from "../../redux/action/menuActions";
import { connect } from "react-redux";

class CustomersRestaurantView extends Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
    }

    componentWillMount () {
        this.setState({
            resData: this.props.location.state,
            reviews: {
            },
            activePage: 1
        });
    }

    onReviewSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        let reviewPayload = {
            restaurant_id : this.state.resData._id,
            customer_id : localStorage.getItem('customer_id'),
            rating : this.state.reviews.rating,
            review : this.state.reviews.review,
        }
        console.log("on update of review : ", reviewPayload);
        this.props.postRestaurantReview(reviewPayload);
    };

    onReviewChange = e => {
        let newReview = Object.assign({}, this.state.reviews, {[e.target.name]:  e.target.value});
        this.setState({
            reviews: newReview,
        });
    };

    dishesView = (inputDish) => {
        return <CustomerMenuDish dish={inputDish} rest_id={this.state.resData._id}/>;
    };

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
    
    getImageCarouselItem = (imageId) => {
        let imageSrcUrl = `${backend}/images/restaurants/${this.props.location.state.id}/profile/${imageId}`;
        console.log(imageSrcUrl);
        return <Carousel.Item style = {{width:'20rem', height:'20rem'}}>
            <img
            style = {{width:'20rem', height:'20rem'}}
            src={imageSrcUrl}
            alt="First slide"
            />
        </Carousel.Item>
    }

    render() {

        let restaurantDetails = null;
        let reviewForm = null;
        let dish, menuRender = [];
        let carouselList = [], carousel;
        let pagesBar = null, itemsToShow = 5, active = 1;

        if (this.state && this.state.activePage) {
            active = this.state.activePage;
        }

        if (this.state && this.state.resData && this.state.resData.rest_images[0]) {
            for (var i = 0; i < this.state.resData.rest_images.length; i++) {
                carousel = this.getImageCarouselItem(this.state.resData.rest_images[i]);
                carouselList.push(carousel);
            }
        } else {
            carousel = <Carousel.Item style = {{width:'20rem', height:'20rem'}}>
                            <img
                            style = {{width:'20rem', height:'20rem'}}
                            src={yelp_logo}
                            alt="First slide"
                            />
                        </Carousel.Item>
            carouselList.push(carousel);
        }
        console.log(carouselList);

        if (this.state && this.state.resData) {
            restaurantDetails = 
                <Card style={{ width: '65rem'}}>
                    <Row>
                        <Col align="left" style = {{ width:'30rem'}}>
                             <Carousel style = {{margin:'1rem', width:'20rem', height:'20rem'}}>
                                {carouselList}
                            </Carousel>  
                        </Col>
                        <Col align="left">
                            <Card.Body>
                                <ListGroup horizontal style={{ width: '35rem' }}>
                                    <ListGroup.Item variant="dark"  className="col-md-3">Name</ListGroup.Item>
                                    <ListGroup.Item variant="info"  className="col-md-7">{this.state.resData.name}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal style={{ width: '35rem' }}>
                                    <ListGroup.Item variant="dark" className="col-md-3">Description</ListGroup.Item>
                                    <ListGroup.Item variant="info" className="col-md-7">{this.state.resData.description}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal style={{ width: '35rem' }}>
                                    <ListGroup.Item variant="dark" className="col-md-3">Cuisine</ListGroup.Item>
                                    <ListGroup.Item variant="info" className="col-md-7">{this.state.resData.cuisine}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal style={{ width: '35rem' }}>
                                    <ListGroup.Item variant="dark" className="col-md-3">Location</ListGroup.Item>
                                    <ListGroup.Item variant="info" className="col-md-7">{this.state.resData.location}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal style={{ width: '35rem' }}>
                                    <ListGroup.Item variant="dark" className="col-md-3">Timings</ListGroup.Item>
                                    <ListGroup.Item variant="info" className="col-md-7">{this.state.resData.timings}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal style={{ width: '35rem' }}>
                                    <ListGroup.Item variant="dark" className="col-md-3">Phone</ListGroup.Item>
                                    <ListGroup.Item variant="info" className="col-md-7">{this.state.resData.phone}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>;

            reviewForm = 
                <div> 
                <Row fluid>

                <center>
                <Col></Col>
                <Col align="right">
                <br/>
                    <Form onSubmit={this.onReviewSubmit} align="center" className="justify-content">
                        <Form.Row fluid>
                            <Form.Group as={Row} controlId="reviews.rating" >
                                <Form.Label style={{marginLeft:'10rem'}}>Rating</Form.Label>
                                    <Form.Control style={{marginLeft:'10rem'}}
                                        name="rating"
                                        type="number"
                                        min="1"
                                        max="5"
                                        onChange={this.onReviewChange}
                                        value={this.state.reviews.rating}
                                        required={true}
                                        placeholder="Rating" />
                            </Form.Group>
                        </Form.Row>
                        <br/>
                        <Form.Row >
                            <Form.Group as={Row} controlId="reviews.review">
                                <Form.Label style={{marginLeft:'10rem'}}>Review</Form.Label>
                                    <textarea
                                        name="review"
                                        type="box"
                                        onChange={this.onReviewChange}
                                        value={this.state.reviews.review}
                                        pattern="^[A-Za-z0-9. ]+$"
                                        required={true}
                                        placeholder="Please write a Review" 
                                        rows="5" cols="50"
                                        style={{marginLeft:'-3rem', marginTop:'2rem'}}/>
                            </Form.Group>
                        </Form.Row>
                        <br/>
                        <ButtonGroup aria-label="Third group">
                            <Button style={{marginRight:'5rem'}} type="submit" variant="success">Submit Review</Button>
                        </ButtonGroup>
                    </Form>
                    </Col>
                    </center>
                    
                </Row>
                </div>
                
        }

        if (this.state && this.state.resData && this.state.resData.rest_dishes && this.state.resData.rest_dishes.length > 0) {

            let dishes = this.state.resData.rest_dishes;
            let cardCount = 0;

            for (let i = (active - 1) * itemsToShow; i < dishes.length; i++) {
                console.log('**************** dishes : ', dishes[i]);
                dish = this.dishesView(this.state.resData.rest_dishes[i]);
                menuRender.push(dish);
                cardCount++;
                if (cardCount === itemsToShow)
                    break;
            }

            let pages = [];
            let pageCount = Math.ceil(dishes.length / itemsToShow);

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

        let reviewSubmissionStatus;
        if(this.props.status && this.props.status === 'RESTAURANT_REVIEW_POST_SUCCESSFUL') {
            reviewSubmissionStatus = <div style={{marginLeft:'5rem'}}>
            <br/>
            <p style={{color:"green"}}>
            Review Submitted Successfully!
            </p>
            </div>
        }
        if(this.props.status && this.props.status === 'RESTAURANT_REVIEW_POST_FAILED') {
            reviewSubmissionStatus = <div style={{marginLeft:'5rem'}}>
            <br/>
            <p style={{color:"red"}}>
            Review Submit Failed!
            </p>
            </div>
        }

        return(
            <Container fluid max-width='100%'>
            <br/>
            <center><h4 style={{color:'blue'}}>Welcome To {this.state.resData.name} </h4>
            <br/>
                {restaurantDetails}
                <br/><br/>
                <h3> Menu</h3>
                <br/>
                </center>
                {menuRender}
                <div style ={{marginLeft:'35%'}} >{pagesBar}</div>
                <br/>
                <Button style ={{marginLeft:'10rem'}} href="/c_cart">Go To Cart</Button>
                <br/><br/><br/>
                <h3> <center>Review Restaurant</center></h3>
                <br/>
                {reviewForm}
                {reviewSubmissionStatus}                
                <center><Button href="/customer/home">Home</Button></center>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
      status: state.reviewsState.status,
      
    };
};

function mapDispatchToProps(dispatch) {
    return {
        postRestaurantReview: data => dispatch(postRestaurantReview(data)),
        customerMenuGet: (rest_id) => dispatch(customerMenuGet(rest_id)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersRestaurantView);