// View list of orders by customers
// 2. Click and view profile page of each customer
// 3. Update the delivery status of each order – Order Received, Preparing,
// (If Delivery option selected) On the way, Delivered
// (If Pickup option selected) Pick up Ready, Picked up
// 4. There should be 3 filters on orders(New Order, Delivered Order, Cancelled Order)

import React, { Component } from 'react';
import { Alert, Table, Button, Modal, Form} from "react-bootstrap";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from "react-redux";
import { getRestaurantOrders, updateOrder } from "../../redux/action/orderActions";
import backend from "../common/serverDetails"
import { Link } from 'react-router-dom';

class RestaurantOrders extends Component {

    constructor(props) {
        super(props);
        this.setState({
            noRecord: false,
        });
    }

    componentWillMount(){
        this.props.getRestaurantOrders(localStorage.getItem("restaurant_id"));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders) {
            var { orders } = nextProps;

            if(orders.noRecord){
                this.setState({
                    noRecord: orders.noRecord,
                    ordersList: [],
                });
            } else {
                console.log('RestaurantOrders -> componentWillReceiveProps -> orders : ', orders);
                this.setState({
                    ordersList: orders.ordersList,
                    activePage: 1
                });
            }
        }
        if (nextProps.updateOrderStatus) {
            var { updateOrderStatus } = nextProps;

            if (this.state && !this.state.updateOrderStatus) {
                this.setState({
                    updateOrderStatus: updateOrderStatus,
                });
            }
            this.props.getRestaurantOrders(localStorage.getItem("restaurant_id"));
        }
    }

    clearSuccessMessage = (e) => {
        this.setState({
            updateOrderStatus: null,
        })
    }

    updateOrderStatus = (e) => {
        let order_id = e.target.name;
        const data = {
            status: e.target.value,
        };
        this.props.updateOrder(order_id, data)
    }

    showOrder = (e) => {
        console.log(e.target);
        this.setState({
            modal_order_id: e.target.name,
        })
    }

    dishView = (index, dish) => {
        return <tr>
                    <td>{index}</td>
                    <td>{dish.dish_name}</td>
                    <td>{dish.quantity}</td>
                    <td>{dish.price * dish.quantity}</td>
                </tr>;
    }

    showCustomerDetails = (e) => {
        console.log(e.target);
        this.setState({
            modal_cust_id: e.target.name,
        })
    }

    handleDetailsModalClose = () => {
        this.setState({
            modal_order_id: "",
            modal_cust_id: ""
        })
    }

    columns = [{
        dataField: 'cust_name',
        text: 'Customer'
      }, {
        dataField: 'create_time',
        text: 'Order Time'
      }, {
        dataField: 'status',
        text: 'Status',
        filter: textFilter()
      }, {
        dataField: 'details',
        text: 'Order Details',
      }, {
        dataField: 'change_status',
        text: 'Update Status',
      }];

    getStatusFormControl = (order) => {
        let statusDropdown;
        let statusOptions;
        let statusesHomeDelivery = ["New Order", "Preparing", "On The Way", "Delivered", "Cancelled"];
        let statusesPickUp = ["New Order", "Preparing", "Ready For Pick Up", "Picked Up", "Cancelled"];
        let statuses = order.delivery_method === "Home Delivery" ? statusesHomeDelivery : statusesPickUp;
        statusOptions = statuses.map(status => {
            if (status === order.status) {
                return <option selected>{status}</option>;
            }
            return <option>{status}</option>;
        });
        statusDropdown = (
            <Form.Control as="select" style={{ width: "80%" }} name={order.order_id} onClick={this.clearSuccessMessage} onChange={this.updateOrderStatus}>
                {statusOptions}
            </Form.Control>
        );
        return statusDropdown;
    } 

    render() {

        let message, bootstrapTable;
        let details_modal, modal_order, dish_details_in_modal = [], dish;
        let cust_details_modal, modal_customer, modal_customerImgSrc;
        let change_status;

        if(this.state && this.state.noRecord) {
            message = <Alert varient ="warning">No Order History.</Alert>
        }

        if(this.state && this.state.errorFlag) {
            message = <Alert varient ="warning" style={{color:"red"}}>Restaurant Orders fetch failed.</Alert>
        }

        if(this.state && this.state.updateOrderStatus) { 
            if(this.state.updateOrderStatus === 'ORDER_STATUS_UPDATED') {
                message = <Alert varient ='success' style={{color:"green"}}>Order status updated successfully.</Alert>
            } else {
                message = <Alert varient ='error' style={{color:"green"}}>Order status update failed.</Alert>
            }
        }

        if(this.state && this.state.ordersList) {
            let bootStrapTableOrders = this.state.ordersList.map(o => { return {
                id: o.order_id,
                cust_name: <Button onClick={this.showCustomerDetails} name={o.customer_id._id}>{o.customer_id.name}</Button>,
                create_time: o.create_time,
                status: o.status,
                details: <Button onClick={this.showOrder} name={o.order_id}>Order Details</Button>,
                change_status: this.getStatusFormControl(o),

            }});
            var pagination = paginationFactory({
                page: 1,
                paginationSize: 5,
                sizePerPageList: [ {
                    text: '2', value: 2
                  }, {
                    text: '5', value: 5
                  }, {
                    text: 'All', value: this.state.ordersList.length
                  } ]
                
            });

            bootstrapTable = <BootstrapTable 
                                keyField='id' 
                                data={bootStrapTableOrders} 
                                columns={this.columns}
                                filter={ filterFactory()}
                                pagination={ pagination }
                                >
                            </BootstrapTable>
            
        }

        if (this.state && this.state.modal_order_id) {
            console.log("Modal OrderId", this.state.modal_order_id)
            modal_order = this.state.ordersList.find(o => o.order_id === this.state.modal_order_id);
            console.log("Modal Order:", modal_order);
            for (var i = 0; i < modal_order.order_dishes.length; i++) {
                if(modal_order.order_dishes[i]){    
                    dish = this.dishView((i+1), modal_order.order_dishes[i]);
                    dish_details_in_modal.push(dish);
                }
            }
            details_modal = <Modal
                                    show={true}
                                    backdrop="static"
                                    onHide={this.handleDetailsModalClose}
                                    keyboard={false}
                                    centered={true}
                                >
                                    <Modal.Header closeButton>
                                    <Modal.Title>Order Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>Dish Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dish_details_in_modal}
                                            </tbody>
                                        </Table>
                                        
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleDetailsModalClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

        }

        if (this.state && this.state.modal_cust_id) {
            console.log("Modal Customer Id", this.state.modal_cust_id)
            modal_customer = this.state.ordersList.find(o => o.customer_id._id === this.state.modal_cust_id).customer_id;
            console.log("Modal customer:", modal_customer);   
            modal_customerImgSrc = `${backend}/images/customers/${modal_customer._id}/profile/${modal_customer.profile_picture}`;

            cust_details_modal = <Modal
                                    show={true}
                                    backdrop="static"
                                    onHide={this.handleDetailsModalClose}
                                    keyboard={false}
                                    dialogClassName="modal-90w"
                                >
                                    <Modal.Header closeButton>
                                    <Modal.Title>Customer Profile</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <img src={modal_customerImgSrc} style = {{width:'29rem', height:'20rem'}} />
                                        <Table striped bordered hover>
                                            <tbody>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{modal_customer.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone</td>
                                                    <td>{modal_customer.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email Id</td>
                                                    <td>{modal_customer.email_id}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address</td>
                                                    <td>{modal_customer.city}</td>
                                                </tr>
                                                <tr>
                                                    <td>Birth Date</td>
                                                    <td>{modal_customer.dob}</td>
                                                </tr>
                                                <tr>
                                                    <td>About</td>
                                                    <td>{modal_customer.about}</td>
                                                </tr>
                                                <tr>
                                                    <td>Yelping Since</td>
                                                    <td>{modal_customer.join_date}</td>
                                                </tr>
                                                <tr>
                                                    <td>Blog</td>
                                                    <td>{modal_customer.blog_url}</td>
                                                </tr>
                                                <tr>
                                                    <td>Message</td>
                                                    <td><Link to={{pathname: `/restaurant/messages/${modal_customer._id}`, state: modal_customer}}> Send Message to {modal_customer.name} </Link></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleDetailsModalClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

        }

        return (
            <div>
                <br/><br/>
                <h2><center> Your Orders </center></h2>  
                <br/>
                {message}
                <br/>
                <div style={{marginLeft:"15rem", marginRight:"15rem"}}>
                {bootstrapTable}
                </div>
                {details_modal}
                {cust_details_modal}
                {change_status}
                <center><Button href="/r_home">Home</Button></center>
            </div>
            );
    }

}

const mapStateToProps = state => ({
    orders: state.ordersState.restaurantOrders,
    updateOrderStatus: state.ordersState.updateOrderStatus,
});

function mapDispatchToProps(dispatch) {
    return {
        getRestaurantOrders: restaurant_id => dispatch(getRestaurantOrders(restaurant_id)),
        updateOrder: (order_id, statusData) => dispatch(updateOrder(order_id, statusData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantOrders);