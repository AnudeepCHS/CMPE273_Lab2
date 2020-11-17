import React, { Component } from 'react';
import { Container, Alert, Row, Col, Card, Button } from "react-bootstrap";
import { getRestaurantReviews } from "../../redux/action/reviewsAction";
import { connect } from "react-redux";

class RestaurantReviewsView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.getRestaurantReviews(localStorage.getItem("restaurant_id"));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reviews) {
            var { reviews } = nextProps;

            if(reviews === 'NO_REVIEWS'){
                this.setState({
                    noReviwes: true,
                });
            } else {
                console.log('RestaurantReviewsView -> componentWillReceiveProps -> reviews : ', reviews);
                this.setState({
                    reviews: reviews,
                });
            }
        }
    }

    getLocaleTime = (create_time) => {
        var ts = new Date(create_time);
        console.log("Timestamp:", ts.toLocaleString);
        return ts.toLocaleString();
    }

    getStars = (rating) => {
        if(rating === 1) {
            return "*";
        } else if(rating === 2) {
            return "**";
        } else if(rating === 3) {
            return "***";
        } else if(rating === 4) {
            return "****";
        } else if(rating === 5) {
            return "*****";
        } 
    }

    reviewsView = (reviewToProcess) => {
        return (
             <Card bg={"light"} style={{ width: "50rem", margin: "2%" }}>
        <Row>
          <Col>
            <Card.Body>
              <Card.Text><b>Rating: </b> <h3>{this.getStars(reviewToProcess.rating)}</h3></Card.Text>
              <Card.Text><b>Review: </b>{reviewToProcess.review}</Card.Text>
              <Card.Text><b>Reviewed On: </b>{this.getLocaleTime(reviewToProcess.create_time)}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
        );
    };

    render () {

        let message, review;
        let reviewsList = [];

        if (this.state && this.state.noReviwes) {
            message = <Alert variant="warning">No rewiews available yet.</Alert>;
        }
        
        if (this.state && this.state.reviews) {
            for (var i = 0; i < this.state.reviews.length; i++) {
                review= this.reviewsView(this.state.reviews[i]);
                reviewsList.push(review);
            }
        }
        
        return(
            <Container className="justify-content">
            <br/><br/>
            <h2><center> Reviews for Your Restaurant </center></h2>
            <br/>
            {message}

            <center>{reviewsList}</center>
            <center><Button href="/r_home">Home</Button></center>

            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
      reviews: state.reviewsState.restaurantReview,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getRestaurantReviews: restaurant_id => dispatch(getRestaurantReviews(restaurant_id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReviewsView);