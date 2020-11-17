// 4. Add/Edit Dishes in menu (with Dish name, Main Ingredients, Dish Images, Dish Price,
// description, dish category – Appetizer, Salads, Main Course , Desserts, Beverages)
// 5. View list of dishes added by them.

import React, { Component } from 'react';
import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import { postDish } from "../../redux/action/menuActions";
import { connect } from "react-redux";

class RestaurantMenuAdd extends Component {
    constructor(props) {
        super(props);
        this.setState({
            errorFlag : false,
            successFlag : false,
        });
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount () {
        this.setState({});
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            ingredients: this.state.ingredients,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category,
        };
        this.props.postDish(data);
    };

    render() {
        let  dishAddStatus = null;
        if(this.props.status && this.props.status === 'RESTAURANT_MENU_DISH_POST_SUCCESSFUL')
            dishAddStatus = <Alert variant="success">Dish Created Successfully!</Alert>;
        if(this.props.status && this.props.status === 'RESTAURANT_MENU_DISH_POST_FAILED')
            dishAddStatus = <Alert variant="warning">Dish Creation Failed!</Alert>;
        
        return(
            <div>
            <center> <h3>Add A Dish</h3><br /></center> 
            {dishAddStatus}
                <Row>
                    <Col>                       
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="name">
                                <Form.Label column sm="3">
                                    Name:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" name="name" placeholder="Enter Dish Name" onChange={this.onChange} pattern="^[A-Za-z0-9 ,.]+$" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="description">
                                <Form.Label column sm="3">
                                    Description:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" name="description" placeholder="Description of the dish" onChange={this.onChange} pattern="^[A-Za-z0-9 ,.-]+$" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="ingredients">
                                <Form.Label column sm="3">
                                Ingredients:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" name="ingredients" placeholder="Ingredients in the dish" onChange={this.onChange} pattern="^[A-Za-z ,.-]+$" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="price">
                                <Form.Label column sm="3">Price: </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" name="price" placeholder="Enter Dish Price" onChange={this.onChange} pattern="^(\d*\.)?\d+$" required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="category">
                                <Form.Label column sm="3">Category:</Form.Label>
                                <Col sm="4">
                                    <Form.Control as="select" onChange={this.onChange} name="category" required>
                                        <option>Appetizer</option>
                                        <option>Salads</option>
                                        <option>Main Course</option>
                                        <option>Desserts</option>
                                        <option>Beverages</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <br/><br/>
                            <Button style={{marginLeft:"23rem"}} variant="danger" href="/r_menu/view">Cancel</Button>  {''}
                            <Button type="sumbit">Add Item</Button>                            <br/>
                            <br/><br/>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    eventsAdd: state.menuState.postDish,
    status: state.menuState.status,
});

function mapDispatchToProps(dispatch) {
    return {
        postDish: data => dispatch(postDish(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenuAdd);