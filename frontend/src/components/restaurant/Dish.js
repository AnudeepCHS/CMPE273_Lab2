import React, { Component } from "react";
import { Card, Button, Col, Row, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import yelp_logo from "../../images/yelp.png";
import backend from '../common/serverDetails';

class Dish extends Component {

  constructor(props) {
    super(props);
    this.state = {};
}

  getImageCarouselItem = (imageId) => {
    let imageSrcUrl = `${backend}/images/dishes/${this.props.dish._id}/details/${imageId}`;
    console.log("Individual Image",imageSrcUrl);
    return <Carousel.Item>
        <img
        style = {{width:'15rem', height:'15rem'}}
        src={imageSrcUrl}
        alt="First slide"
        />
    </Carousel.Item>
}

  render() {
    let carouselList = [], carousel;

  if (this.props && this.props.dish && this.props.dish.dish_image && this.props.dish.dish_image[0]) {
    for (var i = 0; i < this.props.dish.dish_image.length; i++) {
        carousel = this.getImageCarouselItem(this.props.dish.dish_image[i]);
        carouselList.push(carousel);
    }
  } else {
      carousel = <Carousel.Item>
                      <img
                      style = {{width:'15rem', height:'14.5rem'}}
                      src={yelp_logo}
                      alt="First slide"
                      />
                  </Carousel.Item>
      carouselList.push(carousel);
  }
  console.log(carouselList);

    return (
      <div>
        <Card bg="light" style={{width:'55rem', height:'18rem'}}>
          <Row>
            <Col  align="left" style={{width:'15rem', height:'15rem'}}>
              <Carousel style={{width:'15rem', height:'15rem'}}>
                {carouselList}
              </Carousel>
            </Col>
            <Col align="left" style={{width:'20rem', height:'15rem'}}>
              <Card.Body>
                <Card.Title><h4><i>{this.props.dish.name}</i></h4></Card.Title>
                <Card.Text>{this.props.dish.description}</Card.Text>
                <Card.Text>Category: {this.props.dish.category}</Card.Text>
                <Card.Text>Price: $ {this.props.dish.price}</Card.Text>
                <Link to={{ pathname: "/r_menu/update", state: { dish: this.props.dish } }}>
                <Button name={this.props.dish.id}>Edit</Button>&nbsp;
                </Link>
                <Button variant="danger" style={{margin:'1rem'}} onClick={this.props.deleteDish} name={this.props.dish._id}>Delete</Button>
              </Card.Body>
            </Col>
            
          </Row>
        </Card>
        <br/>
      </div>
    );
  }
}

export default Dish;