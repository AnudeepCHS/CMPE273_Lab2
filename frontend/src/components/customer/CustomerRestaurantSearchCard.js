import React, { Component } from "react";
import { Card, Row, Col, Carousel  } from "react-bootstrap";
import { Link } from "react-router-dom";
import yelp_logo from "../../images/yelp_logo.png";
import backend from '../common/serverDetails';

class CustomerRestaurantSearchCard extends Component {

    constructor(props) {
        super(props);
        this.setState({});
    }
    
    getImageCarouselItem = (imageId) => {
        let imageSrcUrl = `${backend}/images/restaurants/${this.props.restaurant._id}/profile/${imageId}`;
        console.log(imageSrcUrl);
        return <Carousel.Item>
            <img
            style = {{width:'15rem', height:'7rem'}}
            src={imageSrcUrl}
            alt="First slide"
            />
        </Carousel.Item>
    }

  render() {
    var resData = this.props.restaurant;
    let carouselList = [], carousel;

    if (resData && resData.rest_images[0]) {
        for (var i = 0; i < resData.rest_images.length; i++) {
            carousel = this.getImageCarouselItem(resData.rest_images[i]);
            carouselList.push(carousel);
        }
    } else {
        carousel = <Carousel.Item>
                        <img
                        style = {{width:'15rem', height:'7rem'}}
                        src={yelp_logo}
                        alt="First slide"
                        />
                    </Carousel.Item>
        carouselList.push(carousel);
    }
    console.log(carouselList);

    return (
    <Link to={{pathname: `/customer/restaurant/${resData._id}`, state: resData}}>
        <Card style={{ width:'40rem', height: '10rem', margin: '1rem' }}>
            <Card.Body>
                <Row>
                    <Col>    
                        <Carousel>
                            {carouselList}
                        </Carousel>
                    </Col>
                    <Col align="top" >
                    
                    <Card.Text style={{color:'black',height: '1rem'}}><b>{resData.name}</b></Card.Text>
                    <Card.Text style={{color:'black',height: '1rem'}}>{resData.cuisine}</Card.Text>
                    <Card.Text style={{color:'black',height: '1rem'}}>{resData.location}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </Link>
    );
  }
}

export default CustomerRestaurantSearchCard;