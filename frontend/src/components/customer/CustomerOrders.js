// View list of all the orders placed (along with order Date-Time, order status)
// 2. Filter the order based on the order status – Order Received, Preparing,
// (If Delivery option selected) On the way, Delivered (If Pickup option selected) Pick up Ready, Picked up
 
import React, { Component } from 'react';
import { Alert, Table, Button, Modal} from "react-bootstrap";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from "react-redux";
import { getCustomerOrders } from "../../redux/action/orderActions";
import paginationFactory from 'react-bootstrap-table2-paginator';

class CustomerOrders extends Component {
    constructor(props) {
        super(props);
        this.setState({
            noRecord: false,
        });
    }

    componentWillMount(){
        this.props.getCustomerOrders(localStorage.getItem("customer_id"));
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
                console.log('CustomerOrders -> componentWillReceiveProps -> orders : ', orders);
                this.setState({
                    ordersList: orders.ordersList,
                    activePage: 1
                });
            }
        }
    }

    showOrder = (e) => {
        console.log(e.target);
        this.setState({
            modal_order_id: e.target.name,
        })
    }

    ordersView = (index, order) => {
        var date = new Date(order.create_time);
        
        return <tr>
                    <td>{index}</td>
                    <td>{order.rest_name}</td>
                    <td>{date.toLocaleString()}</td>
                    <td>{order.status}</td>
                    <td><Button onClick={this.showOrder} name={order.id}>Order Details</Button></td>
                </tr>;
    }

    dishView = (index, dish) => {
        return <tr>
                    <td>{index}</td>
                    <td>{dish.dish_name}</td>
                    <td>{dish.quantity}</td>
                    <td>{dish.price * dish.quantity}</td>
                </tr>;
    }

    handleDetailsModalClose = () => {
        this.setState({
            modal_order_id: ""
        })
    }

    onStatusSelection = (e) => {
        console.log("Event from dropdown", e.target.text);
        this.setState({
            deliveryMethod: e.target.eventKey,
        })
    }

    columns = [{
        dataField: 'rest_name',
        text: 'Restaurant Name'
      }, {
        dataField: 'create_time',
        text: 'Order Time'
      }, {
        dataField: 'status',
        text: 'Status',
        filter: textFilter()
      }, {
        dataField: 'details',
        text: 'Details'
      }];

    render () {

        let message, orders_table, bootstrapTable;
        let details_modal, modal_order, dish_details_in_modal = [], dish;
        if(this.state && this.state.noRecord) {
            message = <Alert varient ="warning">No Order History.</Alert>
        }

        if (this.state && this.state.ordersList) {
            let bootStrapTableOrders = this.state.ordersList.map(o => { return {
                id: o.order_id,
                rest_name:o.restaurant_name,
                create_time: o.create_time,
                status: o.status,
                details: <Button onClick={this.showOrder} name={o.order_id}>Order Details</Button>
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
                                filter={ filterFactory() }
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

        return(
            <div>
            <center>
                <br/><br/>
                <h2>Your Order History</h2>
                <br/>
                
                {message}
                <br/>
                {orders_table}
                <div style={{marginLeft:"10rem", marginRight:"10rem"}}>
                {bootstrapTable}
                </div>
                {details_modal}
                <br/><br/>
                <Button href="/customer/home">Home</Button>
                </center>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    orders: state.ordersState.customerOrders,
});

function mapDispatchToProps(dispatch) {
    return {
        getCustomerOrders:customer_id => dispatch(getCustomerOrders(customer_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrders);
