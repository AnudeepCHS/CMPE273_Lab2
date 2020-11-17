// Read from local storage the cart dishes and display
// Select delivery method
// Send Order to restaurant

import React, { Component } from 'react';
import { Alert, Table, Button, Dropdown, Modal } from "react-bootstrap";
import { createOrder } from "../../redux/action/orderActions";
import { connect } from "react-redux";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.setState({
            successFlag : false,
            errorFlag : false,
            deliveryMethod : "Home Delivery"
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderCreateStatus) {
            if(nextProps.orderCreateStatus === 'ORDER_POST_SUCCESS') {
                localStorage.setItem("dishes_in_cart", "");
                localStorage.setItem("cart_restaurant_id", "");
                this.setState({
                    successFlag: true,
                    errorFlag : false,
                });
            } else {
                this.setState({
                    successFlag: false,
                    errorFlag : true,
                });
            }
        }
    }

    componentDidMount(){
        document.title = "Dishes in Cart"
        let dishes_in_cart;
        if (localStorage.getItem("dishes_in_cart")) {
            dishes_in_cart= JSON.parse(localStorage.getItem("dishes_in_cart"))
        }
        this.setState({
            dishes_in_cart : dishes_in_cart,
            cart_restaurant_id: localStorage.getItem("cart_restaurant_id"),
        });
    }

    onDeliveryMethodSelection = (e) => {
        console.log("Event from dropdown", e.target.text);
        this.setState({
            deliveryMethod: e.target.text,
        })
    }

    dishesView = (index, dish) => {
        return <tr>
                    <td>{index}</td>
                    <td>{dish.dish_name}</td>
                    <td>{dish.quantity}</td>
                    <td>{dish.dish_price * dish.quantity}</td>
                </tr>;
    }

    placeOrder = () => {
        console.log("Order Submit Call");
        let data = Object.assign({}, {
            restaurant_id: this.state.cart_restaurant_id, 
            customer_id: localStorage.getItem("customer_id"), 
            delivery_method: this.state.deliveryMethod},
            { order_dishes: this.state.dishes_in_cart }
        );
        this.props.createOrder(data);
    }

    render() {

        let dishes = [], dishesInCart, dish, message, submitButton, deliveryMethod, successModal;

        if(this.state && this.state.errorFlag) {
            message = <div>
                        <p style={{ color: "red" }}> Failed to place an Order. Please retry.</p>
                    </div>
        } else if(this.state && this.state.successFlag) {
            message = <div>
                    <p style={{ color: "green" }}> Order Successfully Placed.</p>
                    </div>;
            
            successModal = <Modal
                            show={true}
                            backdrop="static"
                            keyboard={false}
                            centered={true}
                        >
                            <Modal.Header>
                            <Modal.Title>Success</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Order Successfully Placed.
                            </Modal.Body>
                            <Modal.Footer>
                            <Button href="/c_orders" variant="primary">Review Orders</Button>
                            </Modal.Footer>
                        </Modal>
        }

        if (this.state && this.state.dishes_in_cart ) {
            for (var i = 0; i < this.state.dishes_in_cart.length; i++) {
                if(this.state.dishes_in_cart[i]){    
                    dish = this.dishesView((i+1), this.state.dishes_in_cart[i]);
                    dishes.push(dish);
                }
            }

            dishesInCart = 
            <div>
            <h2 style={{ marginLeft:"5rem"}}> Dishes in Cart</h2>
            <br/>
            <Table striped bordered hover style={{ width:"75rem", marginLeft:"5rem"}}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Dish Name</th>
                    <th>Dish Quantity</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes}
                </tbody>
            </Table>
            </div>;

            deliveryMethod = <Dropdown >
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ marginLeft:"5rem"}}>
                                    Select Delivery Type
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.onDeliveryMethodSelection} eventKey='HomeDelivery'>Home Delivery</Dropdown.Item>
                                    <Dropdown.Item onClick={this.onDeliveryMethodSelection} eventKey='PickUp'>Pick Up</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

            submitButton = <Button style={{ marginLeft:"5rem"}} onClick={this.placeOrder}>Place Order</Button>
        } else {
            message = <Alert variant="warning">No dishes in cart!</Alert>
        }

        return(
            <div>

                <br/><br/>
                <div>{message}</div>
                {successModal}
                {dishesInCart}
                <br/>
                {deliveryMethod}
                <br/>
                {submitButton}
                <center>
                    <Button href="/customer/home">Home</Button>
                </center>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orderCreateStatus: state.ordersState.orderCreateStatus,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        createOrder: data => dispatch(createOrder(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Cart);